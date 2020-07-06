import React from 'react'
import ModalAdd from '../../../Templates/ModalAdd'


const UsersAdd = ({resetState}) => {

    const inputsAdd = [
        {
            html: 'Marca',
            type: 'text',
            id: 'brandidAdd',
            name: 'brand',
            minLength: '1',
            maxLength: '255',
            required: true
        },
        {
            html: 'Placa',
            type: 'text',
            id: 'plateidAdd',
            name: 'plate',
            minLength: '1',
            maxLength: '255',
            required: true
        },
        {
            html: 'Cliente ID',
            type: 'number',
            id: 'client_idAdd',
            name: 'client_id',
            minLength: '1',
            maxLength: '255',
            required: true
        }
    ]

    const printInputs = () => inputsAdd.map( (row,index) => <div key={index} className="form-group">
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

                                        )

    return (
            <>
                <ModalAdd resetState={resetState} id={'modalAdd'} title={'Agregue un cliente'} printInputs={printInputs} request={{
                    endpoint: '/vehicules',
                    successMessage: 'Vehiculo asignado correctamente.',
                    errorMessage: 'Ocurrió un error.'
                }}/>
            </>
    )


}
export default UsersAdd 