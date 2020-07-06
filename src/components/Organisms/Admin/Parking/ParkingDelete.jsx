import React from 'react'
import ModalDelete from '../../../Templates/ModalDelete'
import $ from 'jquery'
import {remove, header, notify} from '../../../Utils/Helpers'

const UsersDelete = ({ resetState, vehiculeToRemove}) => {

    const inputsDelete = [
        {
            html: '¿Seguro que desea eliminar el vehiculo?',
            type: 'text',
            id: 'idDelete',
            name: 'id',
            minLength: '2',
            maxLength: '255',
            required: true,
            readOnly: true
        }
    ]

    const request = {
        data: vehiculeToRemove,
        successMessage: 'Vehiculo eliminado correctamente',
        errorMessage: 'Ocurrió un error.'
    }

    const sendData = () =>{
        var body = {};

        let datos = document.querySelectorAll('#modalDelete input')
        datos.forEach(function(row){
            body[row.name] = row.value;            
        })
        
        // Todo Validar tambien que los values respectivos tengan contenido
        if (vehiculeToRemove !== null){
            remove('/vehicules/'+vehiculeToRemove.id, header(), function(code, response) {

                if(code === 200){               
                    notify(request.successMessage, 'success')
                    $('#modalDelete').modal('hide')
                    resetState()
                }else{
                    notify(response.data.error+request.errorMessage, 'error')
                }
            })

        }


    }

    const printInputs = () => inputsDelete.map( (row,index) => <div key={index} className="form-group">
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
                                                                    readOnly= {row.readOnly ? true : false }
                                                                />
                                                            </div>

                                        )

    return (
       <ModalDelete resetState={resetState} id={'modalDelete'} title={'Eliminar módulo'} inputs={inputsDelete} 
       printInputs={printInputs}
       sendData={sendData}
       request={request} />
    )

}
export default UsersDelete