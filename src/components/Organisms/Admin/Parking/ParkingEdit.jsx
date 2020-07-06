import React from 'react'
import ModalEdit from '../../../Templates/ModalEdit'
import $ from 'jquery'
import {post, header, notify} from '../../../Utils/Helpers'

const VehiculeEdit = ({resetState, ParkingToUpdate}) => {
    
    const inputsEdit = [  
        {
            html: 'Posición',
            type: 'text',
            id: 'positionidEdit',
            name: 'place',
            minLength: '1',
            maxLength: '255',
            required: false
        },
        {
            html: 'Piso',
            type: 'text',
            id: 'levelidEdit',
            name: 'level',
            minLength: '1',
            maxLength: '255',
            required: false
        },
        {
            html: 'Estado',
            type: 'text',
            id: 'statusidEdit',
            name: 'status',
            minLength: '1',
            maxLength: '255',
            required: false
        }

    ]

    const request = {
            data: ParkingToUpdate,
            successMessage: 'Vehiculo actualizado correctamente',
            errorMessage: 'Ocurrió un error.'
    }

    const sendData = () =>{
        var body = {};

        let datos = document.querySelectorAll('#modalEdit input')

        datos.forEach(function(row){
            body[row.name] = row.value;            
        })

        // Todo Validar tambien que los values respectivos tengan contenido
        if (ParkingToUpdate !== null){
            post('/parkings/'+ParkingToUpdate.id, body, header(), function(code, response) {
                if(code === 200){               
                    notify(request.successMessage, 'success')
                    $('#modalEdit').modal('hide')
                    resetState()
                }else{
                    notify(response.data.error.plate+request.errorMessage, 'error')
                }
            })  

        }


    }

    const printInputs = () => inputsEdit.map( (row,index) => {
    
        return <div key={index} className="form-group">
                    <label 
                        htmlFor={row.id} 
                        className="col-form-label">
                            {row.html} { row.required ? <span className="text-danger" >*</span> : null}
                    </label>
                    <input 
                        type={row.type} 
                        className="form-control" 
                        id={row.id} 
                        name={row.name}
                        minLength={row.minLength}                                                 
                        maxLength={row.maxLength} 
                        required= { row.required ? 'required' : null }
                    />
                </div> 
                }
        )

    return (
        <ModalEdit resetState={resetState} id={'modalEdit'} title={'Editar módulo'} inputs={inputsEdit} 
           printInputs={printInputs}
           sendData={sendData}
           request={request}/>
    )

}
export default VehiculeEdit