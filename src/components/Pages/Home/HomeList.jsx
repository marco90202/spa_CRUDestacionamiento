import React, {useState, useEffect} from 'react'
import Loader from '../../Organisms/Loader'
import withLayout from '../../HOC/withLayout'
import { datemoment, get, header, notify } from '../../Utils/Helpers'
import NotFound from '../../Organisms/NotFound'
import $ from 'jquery'
import Datatable from 'react-data-table-component'
import UsersAdd from '../../Organisms/Admin/Users/UsersAdd'
import UsersEdit from '../../Organisms/Admin/Users/UsersEdit'
import UsersDelete from '../../Organisms/Admin/Users/UsersDelete'

import {CSVLink} from 'react-csv'

const HomeList = ({match}) => {

    const initialState = {
        loader: true,
        data: null, // 
        error: false,

        userToUpdate: null,
        userToRemove: null
    }

    const [scope, setScope] = useState( initialState )

    const resetState = () => {
        setScope({
            ...initialState,
            loader: true,
            data: null
        })
    }

    const edit = (id, firstname, lastname,email) => {
        setScope({
            ...scope,
            userToUpdate: {
                id: id,
                firstname: firstname,
                lastname: lastname,
                email: email
            }
        })
        $('#modalEdit').modal('show')
    }

    const remove = (id, firstname, lastname) => {
        setScope({
            ...scope,
            userToRemove: {
                id: id,
                firstname: firstname,
                lastname: lastname
            }
        })
        $('#modalDelete').modal('show')
    }

    const columnas = [
        {
            name: 'ID',
            selector: 'id',
            sortable: true,
            grow: 1
        },
        {
            name: 'Nombres',
            selector: 'firstname',
            sortable: true,
            grow: 1
        },
        {
            name: 'Apellidos',
            selector: 'lastname',
            sortable: true
        },
        {
            name: 'Correo',
            selector: 'email',
            sortable: true,
            right: true,
            grow: 2
        },
        {
            name: 'Fecha de registro',
            selector: 'created_at',
            sortable: true,
            grow: 3,
            ignoreRowClick: true,
            cell: row => datemoment(row.created_at)
        },
        {
            name: '',
            selector: '',
            sortable: true,
            grow: 3,
            right: true,
            ignoreRowClick: true,
            cell: row => (
                <div>
                    <button  className="btn btn-info"
                            onClick={ () => edit(row.id, row.firstname, row.lastname, row.email) }
                    >
                    <i className="fa fa-pencil"></i>
                    </button>
                    <button  className="btn btn-danger"
                            onClick={ () => remove(row.id, row.firstname, row.lastname, row.email) }                           
                    >
                        <i className="fa fa-trash"></i>                    
                    </button>
                </div>
            )
        }
    ]

    const paginationOpciones = {
        rowsPerPageText : 'Filas por Página',
        rangeSeparatorText : 'de',
        selectAllRowsItem : true,
        selectAllRowsItemText: 'Todos'
    }

    useEffect(() => {  

        if(!scope.loader) return

        get(`/clients`, header(), function(code, response) {
            if(code === 200){

                setScope({
                    ...scope,
                    loader: false,
                    data: response.data
                })
            }else{
                setScope({
                    ...scope,
                    loader: false,
                    error: true,
                    errorMessage: code === 500 ? response.error : 'Ocurrió un error. Vuelva a intentarlo más tarde' 
                })
            }
        })


    }, [scope, match]);

    if(scope.loader) return <Loader height={500}/>


    const cabecera = () => {
       return <div className="row" >
                <CSVLink data={scope.data} filename={"Inscritos.csv"} className="btn btn-sm pull-right btn-success">
                                <i className="fa fa-download" aria-hidden="true"></i> Exportar CSV 
                            </CSVLink>
                </div>
    }


    // if (scope.loader) return <p>Cargando...</p>
    if (scope.error) {
        notify(scope.errorMessage, 'error')    
        return <NotFound />
    }

    return (

        <div className="container-fluid bg-white mt-6">
            <div className="row">
                <div className="col-12">
                    <button className="btn btn-usil pull-right"
                    data-toggle="modal" 
                    data-target="#modalAdd" 
                    data-backdrop="static" 
                    data-keyboard="false"
                    >
                        <i className="fa fa-plus"></i> Agregar
                    </button>
                    <h1>Clientes registrados </h1>

                </div>
               
                
            </div>
            <div className="row">

                        <div className="col-md-12">
                            
                            <div className="table-responsive">
                            <Datatable 
                                columns = { columnas }
                                data = { scope.data }
                                // title = {"Lista de estudiantes del curso " + course.longname}
                                title={cabecera()}
                                pagination 
                                paginationComponentOptions = { paginationOpciones }
                                fixedHeader
                                fixedHeaderScrollHeight = "600px"
                                // pointerOnHover = {true}
                                // onRowClicked = { ({fullname}) => test(fullname)}
                            />
                            </div>
                        </div>

            </div>
            <UsersAdd resetState={resetState}  />

            <UsersEdit resetState={resetState} userToUpdate={scope.userToUpdate}/>

            <UsersDelete resetState={resetState} match={match} userToRemove={scope.userToRemove} />
           
        </div>
        
    )
}

export default withLayout()(HomeList)
