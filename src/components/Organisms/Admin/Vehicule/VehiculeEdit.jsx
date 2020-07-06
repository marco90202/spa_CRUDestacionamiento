import React from 'react'
import ModalEdit from '../../../Templates/ModalEdit'
import $ from 'jquery'
import {post, header, notify} from '../../../Utils/Helpers'

const VehiculeEdit = ({resetState, vehiculeToUpdate}) => {
    
    const inputsEdit = [  
        {
            html: 'Marca',
            type: 'text',
            id: 'brandidEdit',
            name: 'brand',
            minLength: '1',
            maxLength: '255',
            required: false
        },
        {
            html: 'Placa',
            type: 'text',
            id: 'plateidEdit',
            name: 'plate',
            minLength: '1',
            maxLength: '255',
            required: false
        }
    ]

    const request = {
            data: vehiculeToUpdate,
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
        if (vehiculeToUpdate !== null){
            post('/vehicules/'+vehiculeToUpdate.id, body, header(), function(code, response) {
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