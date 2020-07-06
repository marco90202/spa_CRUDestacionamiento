import React from 'react'
import ModalAdd from '../../../Templates/ModalAdd'


const VehiculeAdd = ({resetState}) => {

    const inputsAdd = [
        {
            html: 'Nombres',
            type: 'string',
            id: 'firstnameidAdd',
            name: 'firstname',
            minLength: '1',
            maxLength: '255',
            required: true
        },
        {
            html: 'Apellidos',
            type: 'string',
            id: 'lastnameidAdd',
            name: 'lastname',
            minLength: '1',
            maxLength: '255',
            required: true
        },
        {
            html: 'Email',
            type: 'email',
            id: 'emailidAdd',
            name: 'email',
            minLength: '1',
            maxLength: '255',
            required: true
        },
        {
            html: 'Contraseña',
            type: 'password',
            id: 'passwordidAdd',
            name: 'password',
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
                    endpoint: '/clients',
                    successMessage: 'Cliente creado correctamente.',
                    errorMessage: 'Ocurrió un error.'
                }}/>
            </>
    )


}
export default VehiculeAdd 