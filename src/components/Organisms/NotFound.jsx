import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="container-fluid mr-top-fx">
            <div className="row not-found__container">                                    
                <div className="col-md-12 text-center">
                <br/><br/>
                    <img src={require('../../assets/img/4041.png')} alt="Not Found"/>
                </div>
                <div className="col-md-12 text-center">
                    <h1 style={{    fontWeight: 'bold',
                                    fontSize: 34+'px'
                                }}>
                        Página no encontrada
                    </h1>                    
                    <div>
                        <br/>
                        <Link 
                            to="/"
                            className="btn btn-outline-dark btn-link-a"
                        >
                            Volver a mis cursos
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
