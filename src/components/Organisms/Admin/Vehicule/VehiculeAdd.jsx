import React,{useEffect,useState} from 'react'
import ModalAdd from '../../../Templates/ModalAdd'
import {  get, header } from '../../../Utils/Helpers'


const UsersAdd = ({resetState}) => {

    const [scope, setScope] = useState({
        vehiculesbrands: [],
        error: false,
        loader: true
    })

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
            type: 'text',
            id: 'client_idAdd',
            name: 'client_id',
            minLength: '1',
            maxLength: '255',
            required: true
        }
    ]

    useEffect(() => {

        if(!scope.loader) return

        get('/vehiculebrands', header(), function(code, response) {
            if(code === 200){
                console.log(response.data)
                setScope({
                    ...scope,
                    vehiculesbrands: response.data,
                    loader: false
                })
            }else{
                setScope({
                    ...scope,
                    loader: false,
                    error:true
                })
            }
        })        

        
    }, [scope])




    // const printInputs = () => inputsAdd.map( (row,index) => <div key={index} className="form-group">
    //                                                             <label 
    //                                                                 htmlFor={row.id} 
    //                                                                 className="col-form-label">
    //                                                                     {row.html} { row.required ? <span className="text-danger" >*</span> : null}
    //                                                             </label>
    //                                                             <input 
    //                                                                 type={row.type} 
    //                                                                 className="form-control" 
    //                                                                 id={row.id} 
    //                                                                 name={row.name} 
    //                                                                 minLength={row.minLength}                                                 
    //                                                                 maxLength={row.maxLength} 
    //                                                                 required= { row.required ? 'required' : null }
    //                                                             />
    //                                                         </div>

    //                                     )

    const printInputs = () => (     
                            <div  className="form-group">
                            <label 
                                    htmlFor={inputsAdd[0].id} 
                                    className="col-form-label">
                                        {inputsAdd[0].html} { inputsAdd[0].required ? <span className="text-danger" >*</span> : null}
                                </label>
                                <select type={inputsAdd[0].type} className="form-control" id={inputsAdd[0].id} name={inputsAdd[0].name}  required>
                                    <option value="">Seleccione una marca</option>
                                    {
                                        scope.vehiculesbrands.map((p, index) => <option type={inputsAdd[0].type} id={inputsAdd[0].id} name={inputsAdd[0].name} key={index} value={p.brand}>{p.brand}</option>)
                                    }
                                </select>        
                            <label 
                                    htmlFor={inputsAdd[1].id} 
                                    className="col-form-label">
                                        {inputsAdd[1].html} { inputsAdd[1].required ? <span className="text-danger" >*</span> : null}
                                </label>
                                <input 
                                    type={inputsAdd[1].type} 
                                    className="form-control" 
                                    id={inputsAdd[1].id} 
                                    name={inputsAdd[1].name} 
                                    minLength={inputsAdd[1].minLength}                                                 
                                    maxLength={inputsAdd[1].maxLength} 
                                    required= { inputsAdd[1].required ? 'required' : null }
                                />
                                <label 
                                    htmlFor={inputsAdd[2].id} 
                                    className="col-form-label">
                                        {inputsAdd[2].html} { inputsAdd[2].required ? <span className="text-danger" >*</span> : null}
                                </label>
                                <input 
                                    type={inputsAdd[2].type} 
                                    className="form-control" 
                                    id={inputsAdd[2].id} 
                                    name={inputsAdd[2].name} 
                                    minLength={inputsAdd[2].minLength}                                                 
                                    maxLength={inputsAdd[2].maxLength} 
                                    required= { inputsAdd[2].required ? 'required' : null }
                                />
                            </div>
                            )

   

    

    return (
            <>
                <ModalAdd resetState={resetState} id={'modalAdd'} title={'Agregue un vehiculo'} printInputs={printInputs} request={{
                    endpoint: '/vehicules',
                    successMessage: 'Vehiculo asignado correctamente.',
                    errorMessage: 'Ocurrió un error.'
                }}/>
            </>
    )


}
export default UsersAdd 