import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
// import Loader from '../../Organisms/Loader'
// import { get, user, header } from '../../Utils/Helpers'

const HomeTerms = () => {

    // const [scope, setScope] = useState({
    //     current_term : null,
    //     total_courses: null,
    //     loader: true,
    //     page: 1,
    //     totalTerms: null
    // })

    // useEffect(() => {
    //     console.log('en UE')

    //     if (scope.loader) {

    //     get(`/users/${user().id}/terms`, header(), function(code, response) {
    //         console.log(code, response, response.data.total)
    //     })

    //     }
    // }, [scope])

    // console.log(scope)

    // if (scope.loader) return <Loader height={500} />

    return (
        <div style={{backgroundColor:''}}>
            <div className="header pb-6 mr-top-fx">
                <div className="container-fluid">
                    <div className="header-body">
                    <div className="row align-items-center py-4">
                            <div className="col-lg-6 col-7" >
                            <p className="d-inline-block mb-0 breat-fx" > <i className="fa fa-folder-open text-info"></i> Carreras Universitarias Pregrado 2019 | Periodo 1</p>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt--6">
                <div className="row">

                    
                    <div className="col-md-3">
                    <div className="card">

                            <div className="codigo-curso">FC-PREIAM07F1M</div>
                            
                            <NavLink to={'/courses/2'}>
                            <img className="card-img-top" src={require("./../../../assets/img/curso4.jpg")} alt=" placeholder" />
                            </NavLink>

                            <div className="card-body card-padding-fx">
                            <a href="curso-interna.html">
                                <h4 className="card-title">Diseño Gráfico</h4>
                            </a>
                            <div className="row">
                                <div className="col">
                                <img alt="placeholder" src={require("./../../../assets/img/2.jpg")} className="circle-img-mini color-warning" /> <p className="floatp cut-string">Melisa Carmona</p>
                                </div>
                                <div className="col">
                                <p className="text-right mrt-6"><i className="fa fa-list-ul"></i> 4 Módulos</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                <div className="progress-wrapper paddtop">
                                        <div className="progress-info">
                                        <span>Progreso</span>
                                        <div className="progress-percentage">
                                            <span>80%</span>
                                        </div>
                                        </div>
                                        <div className="progress">
                                        <div className="progress-bar bg-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: 80+'%'}}></div>
                                        </div>
                                </div>
                                </div>
                            </div>
                            </div>
                    </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomeTerms
