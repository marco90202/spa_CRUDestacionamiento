
import React, { Component } from 'react'
import $ from 'jquery'
import { user } from '../Utils/Helpers'
import { Redirect  } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Axios from "axios"
import Loader from "../Organisms/Loader"
import NotAccess from "../Organisms/NotAccess"

/**
 * Este HOC debe de construir el layout básico interno del Administrador
 * con la navegación de administración,
 * además de validar los permisos a este componente solicitado (todas las pestañas internas a mostrarse aqui)
 * @param {*} propValue 
 */

const withLayoutAdmin = (propValue) => (WrappedComponent) => {

    

    return class withLayoutAdmin extends Component {
        
        state = {
            access: null,
            name: null
        }

        componentDidMount() {

            const { match } = this.props
            const API_URL = process.env.REACT_APP_API_URL

            

            Axios.get(`${API_URL}/institutions/${match.params.institution}`,{
                headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
            })
            .then(n => {

                $(document).ready(function () {   
                    $('#sidebarCollapse').on('click', function () {
                        $('#sidebar').toggleClass('active');
                    });
                });
                this.setState({...this, access: true, name: n.data.data.name })
            })
            .catch(err => {
                this.setState({...this, access: false})
            })

            
        }

        render() {

            if(this.state.access === null) return <Loader height={500}/>

            if(!user().is_admin) return <Redirect to='/' />

            if(isNaN(this.props.match.params.institution)) return <Redirect to='/notFound' /> // hay error 

            if(this.state.access === false) return <NotAccess />

            return (
                <>
                    <div className="header mb-6 mr-top-fx">
                        <div className="container-fluid">
                            <div className="header-body">
                            <div className="row align-items-center py-4">
                                    <div className="col-lg-12 col-12" style={{paddingLeft: 0, backgroundColor: 'white', borderRadius: 10+'px'}}>
                                        <button type="button" id="sidebarCollapse" className="btn btn-default">
                                        <i className="fa fa-align-left"></i>
                                        </button>
                                        <p className="d-inline-block mb-0 breat-fx" > 
                                            { this.state.name }
                                        </p>
                                    </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="container-fluid mt--6">
                        <div className="row">

                            {/* SEGUNDO MENU */}
                            <div className="wrapper">

                                <nav id="sidebar">
                                    <ul className="list-unstyled components alist-course-rubik">


                                        <li className="">
                                            <NavLink to={'/institutions/'+this.props.match.params.institution} exact >
                                            Cursos
                                            </NavLink>
                                        </li>
                                       
                                        <li className="">
                                            <NavLink to={'/institutions/'+this.props.match.params.institution+'/users'} >
                                            Personas
                                            </NavLink>
                                        </li>
                                        

                                        <li className="">
                                            <NavLink to={'/institutions/'+this.props.match.params.institution+'/programs'} >
                                            Programas
                                            </NavLink>
                                        </li>
                                        <li className="">
                                            <NavLink to={'/institutions/'+this.props.match.params.institution+'/catalogs'} >
                                            Catálogos
                                            </NavLink>
                                        </li>
                                        <li className="">
                                            <NavLink to={'/institutions/'+this.props.match.params.institution+'/reports'} >
                                            Reportes
                                            </NavLink>
                                        </li>
                                        <li className="">
                                            <NavLink to={'/institutions/'+this.props.match.params.institution+'/settings'} >
                                            Configuraciones
                                            </NavLink>
                                        </li>
                                        



                                    </ul>
                                </nav>
                                <WrappedComponent {...this.props} nameInstitution = {this.state.name} />

                                
                            </div>
                            
                        </div>
                    </div>
                </>
            )

           
        }
    }
}
export default withLayoutAdmin