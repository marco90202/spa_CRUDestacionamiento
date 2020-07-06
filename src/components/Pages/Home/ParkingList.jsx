import React, {useState, useEffect} from 'react'
import Loader from '../../Organisms/Loader'
import withLayout from '../../HOC/withLayout'
import { datemoment, get, header, notify } from '../../Utils/Helpers'
import NotFound from '../../Organisms/NotFound'
import $ from 'jquery'
import Datatable from 'react-data-table-component'
import ParkingAdd from '../../Organisms/Admin/Parking/ParkingAdd'
import ParkingEdit from '../../Organisms/Admin/Parking/ParkingEdit'
import ParkingDelete from '../../Organisms/Admin/Parking/ParkingDelete'

import {CSVLink} from 'react-csv'

const ParkingList = ({match}) => {

    const initialState = {
        loader: true,
        data: null, // 
        error: false,

        ParkingToUpdate: null,
        ParkingToRemove: null
    }

    const [scope, setScope] = useState( initialState )

    const resetState = () => {
        setScope({
            ...initialState,
            loader: true,
            data: null
        })
    }

    const edit = (id, place, level,status) => {
        setScope({
            ...scope,
            ParkingToUpdate: {
                id: id,
                place: place,
                level: level,
                status: status
            }
        })
        $('#modalEdit').modal('show')
    }

    const remove = (id, place, level) => {
        setScope({
            ...scope,
            ParkingToRemove: {
                id: id,
                place: place,
                level: level
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
            name: 'Posición',
            selector: 'place',
            sortable: true,
            grow: 1
        },
        {
            name: 'Piso',
            selector: 'level',
            sortable: true
        },
        {
            name: 'Estado',
            selector: 'status',
            sortable: true,
            right: true,
            grow: 2
        },
        {
            name: 'Vehiculo ID',
            selector: 'vehicule_id',
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
                            onClick={ () => edit(row.id, row.place, row.level, row.status) }
                    >
                    <i className="fa fa-pencil"></i>
                    </button>
                    <button  className="btn btn-danger"
                            onClick={ () => remove(row.id, row.place, row.level, row.status) }                           
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

        get(`/parkings`, header(), function(code, response) {
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
                <CSVLink data={scope.data} filename={"Parkings.csv"} className="btn btn-sm pull-right btn-success">
                                <i className="fa fa-download" aria-hidden="true"></i> Exportar CSV 
                            </CSVLink>
                </div>
    }


    if (scope.loader) return <p>Cargando...</p>
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
                    <h1>Vehiculos de clientes registrados </h1>

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
            <ParkingAdd resetState={resetState}  />

            <ParkingEdit resetState={resetState} ParkingToUpdate={scope.ParkingToUpdate}/>

            <ParkingDelete resetState={resetState} match={match} ParkingToRemove={scope.ParkingToRemove} />
           
        </div>
        
    )
}

export default withLayout()(ParkingList)
