import React from 'react'
import {user} from '../../Utils/Helpers'
import { NavLink } from 'react-router-dom'
// import ddd from '../CMS/AdminCMS'

const Options = () => {

    // Se está validando para mostrar las copciones aún cuando no haya login de usuario
    return (
        <>
            <div className="navbar-inner">
                <div className="collapse navbar-collapse" id="sidenav-collapse-main">

                <ul className="navbar-nav">
                    
                    
                    
                    {
                        user()
                        ?
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/'} exact>
                                <i className="fa fa-user-o text-info"></i>
                                <span className="nav-link-text">Clientes</span>
                            </NavLink>
                        </li>
                        : null
                    }
                    {
                        user()
                        ?
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/vehicule'} >
                                <i className="fa fa-car text-info"></i>
                                <span className="nav-link-text">Vehiculos</span>
                            </NavLink>
                        </li>
                        : null
                    }
                    {
                        user()
                        ?
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/parking'} >
                                <i className="fa fa-map-marker text-info"></i>
                                <span className="nav-link-text">Estacionamientos</span>
                            </NavLink>
                        </li>
                        : null
                    }
                    
                    {/* <li className="nav-item">
                        <NavLink className="nav-link" to='/calendar'>
                            <i className="fa fa-calendar text-danger"></i>
                            <span className="nav-link-text">Calendario</span>
                        </NavLink>
                    </li>
                     <li className="nav-item">

                        <NavLink className="nav-link" to='/groups'>
                            <i className="fa fa-group text-primary"></i>
                            <span className="nav-link-text">Grupos</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/conversations'>
                            <i className="fa fa-envelope-o text-warning"></i>
                            <span className="nav-link-text">Correo</span>
                        </NavLink>
                    </li> */}
                </ul>

                {
                    !user() ? null : <hr className="my-3" />
                }

                

               
                </div>
            </div>
        </>
    )
}

export default Options
