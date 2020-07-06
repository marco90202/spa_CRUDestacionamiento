import React from 'react'
import ModalAdd from '../../../Templates/ModalAdd'


const ParkingAdd = ({resetState}) => {

    const inputsAdd = [
        {
            html: 'Posición',
            type: 'text',
            id: 'placeidAdd',
            name: 'place',
            minLength: '1',
            maxLength: '255',
            required: true
        },
        {
            html: 'Piso',
            type: 'number',
            id: 'levelidAdd',
            name: 'level',
            minLength: '1',
            maxLength: '255',
            required: true
        },
        {
            html: 'Estado',
            type: 'text',
            id: 'statusidAdd',
            name: 'status',
            minLength: '1',
            maxLength: '255',
            required: true
        },
        {
            html: 'Vehiculo ID',
            type: 'number',
            id: 'vehicule_idAdd',
            name: 'vehicule_id',
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
                    endpoint: '/parkings',
                    successMessage: 'Vehiculo asignado correctamente.',
                    errorMessage: 'Ocurrió un error.'
                }}/>
            </>
    )


}
export default ParkingAdd 