import React, {useState} from 'react'
import Axios from 'axios'
import { Redirect, NavLink  } from 'react-router-dom'

const Login = () => {

  
    const [blocked, setBlocked] = useState(true)

    const authentication = e => {
        e.preventDefault();
        const form = e.target
        
        const data = {
          'username': form.username.value,
          'password': form.password.value,
          'grant_type': process.env.REACT_APP_API_GRANT_TYPE,
          'client_id': process.env.REACT_APP_API_CLIENT_ID,
          'client_secret': process.env.REACT_APP_API_CLIENT_SECRET
        }
      
        let messageErrors = [];
        
        if( form.username.value !== '' && form.password.value !== ''){
          const usernameSuccess = validateInput('username',Object.values(data)[0]);
          const emailSuccess = validateInput('password',Object.values(data)[1]);
          const API_URL = process.env.REACT_APP_API_URL
          if(usernameSuccess === true && emailSuccess === true){
            document.getElementById('errors').innerHTML = `
                                            <div class="col-md-12 " style="height: 100px">
                                                <div class="container d-flex h-100" style="min-height: 120px">
                                                    <div class="row justify-content-center align-self-center">
                                                        <div class="container-loader">
                                                            <div class="item item-1"></div>
                                                            <div class="item item-2"></div>
                                                            <div class="item item-3"></div>
                                                            <div class="item item-4"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`
            document.getElementById('submit').disabled = true
            Axios.post(`${API_URL}/loginazo`, data)
              .then(r => {
                if(r.data.success){
                  // console.warn(r.data);
                  // sessionStorage.setItem('userData', JSON.stringify(responseJSON));
                  localStorage.setItem('token', r.data.data.access_token)
                  localStorage.setItem('refresh_token', r.data.data.refresh_token)
                  localStorage.setItem('user', JSON.stringify(r.data.data.user))
      
                  //TODO Importante: pendiente realizar una peticion de validacion del token registrado en localStorage,
                  // por si un usuario pndx coloca cualquier token desde el inspector del navegador, de lo contrario remover el token del storage mostrando un mensaje a ese usuario
                    //   window.location = "/"
                    // return <Redirect to='/' />
                    setBlocked(false)
                }else{
                  document.getElementById('errors').innerHTML = '<p class="text-danger">Por favor, vuelva a intentarlo en unos minutos.</p>';
                }
              })
              .catch(e => {
                document.getElementById('submit').disabled = false
                document.getElementById('errors').innerHTML = '<p class="text-danger">Error al iniciar sesión. Por favor, vuelva a intentarlo.</p>';
              })
            
      
          }else{
            
            if(usernameSuccess.success === false){
              messageErrors.push(usernameSuccess.error);
            }
            if(emailSuccess.success === false){
              messageErrors.push(emailSuccess.error);
            }
            console.log(messageErrors);
            let msj = '';
            messageErrors.map(function(e) {
              msj += '<p class="text-danger">'+e+'</p>';
              return true;
           });
           document.getElementById('errors').innerHTML = msj;
          }
          
        }else{
          document.getElementById('errors').innerHTML = '<p class="text-danger">Debe completar usuario y contraseña.</p>';
        }
      
    }
    
    const validateInput = (fieldName, value) => {    
        let fieldValid;
        let formError;
        switch (fieldName) {
          case 'username':
            fieldValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            formError = fieldValid ? '' : 'Correo electrónico es invalido.';
            break;
          case 'password':
            fieldValid = value.length >= 6;
            formError = fieldValid ? '': 'Contraseña tiene al menos 6 caracteres.';
            break;  
          default:
            break;
        }
        return (fieldValid) ? true : {'success': false,'error': formError};
      }


    if( !blocked ) return   <Redirect to={{
                                            pathname: "/",
                                            search: "?login=success",
                                            // state: { byLogin: true }
                                        }}
                            />

    return (

        <div className="container-fluid new-padding-login">
            <div className="row no-gutters">
                <div className="col-md-3">
                    <div className="login-container new-padding-left">
                        <div className="logo-container-login">
                            <ul>
                                <li>
                                    <img src={require('../../assets/img/logo_estacionamiento.svg')} className="img-fluid" alt="USIL" style={{height: '100px'}}/>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="clearfix"></div>

                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p className="text-intro-login text-center">
                                        Ingrese su correo y contraseña para accedera la plataforma
                                    </p>

                                    <form onSubmit={authentication.bind()} className="form" autoComplete="off">
                                        <div className="form-group">
                                            <label>Correo:</label>
                                            <input type="email" className="form-control" name="username" id="username" placeholder="Ingrese su correo electrónico" required/>
                                            <input autoComplete="false" name="hidden" type="text" style={{display: 'none'}} />
                                        </div>
                                        <div className="form-group">
                                            <label>Contraseña</label>
                                            <input type="password" className="form-control" name="password" id="password" placeholder="Ingrese su contraseña" required/>
                                        </div>
                                        {/* <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="recordarme" />
                                            <label className="form-check-label">Recordarme</label>
                                        </div> */}

                                        <div className="form-group">
                                            {/* <input id="submit" type="submit" name="submit" className="btn btn-primary btn-md" value="Iniciar sesión"/> */}
                                            <button id="submit" className="btn btn-primary btn-block">
                                                <i className="fa fa-sign-in"></i> Ingresar a la plataforma
                                            </button>
                                        </div>
                                        <div className="form-group">
                                            {/* <input id="submit" type="submit" name="submit" className="btn btn-primary btn-md" value="Iniciar sesión"/> */}
                                            <NavLink to={'/register'} id="register" className="btn btn-primary btn-block">
                                                <i className="fa fa-sign-in"></i> Registrarse
                                            </NavLink>
                                        </div>
                                    </form>
                                    <div id="errors" style={{textAlign:'center'}}>

                                        

                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 login-picture" >
                    <div className="bg-login"></div>
                    <div className="overlay"></div>
                    <div className="cont-data-photographer">
                        <p>Fotografía - <strong>NexoInmoviliario</strong></p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Login
