import React, {useEffect} from 'react'
// import $ from 'jquery'
// import {remove, header, notify} from '../Utils/Helpers'

const ModalDelete = ({id, title, inputs, sendData, printInputs, request}) => {

    const remove = e => {
        e.preventDefault()
      
        sendData()

    }

    useEffect(() => {

        // Para pintar values del formulario
        if(  request.data ){            
            // Recorro cada input ...
            inputs.map( (input, index) => Object.keys(request.data).filter(i => {
                                                // Busco c/u una coincidencia con una llave del modulo (API)
                                                return (i === input.name) ?  document.getElementById(input.id).value = request.data[i] : null
                                                   
                                            })       
            )
        }
    }, [request, inputs]);

    return (
        <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby={id+'Title'} aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog modal-dialog-centered modal-md" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">
                    {title}
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <form onSubmit={remove.bind()} autoComplete="off">
                    <div className="modal-body">                

                    { printInputs() }
                                                  
                    </div>
                    <div className="modal-footer">
                        <button type="submit" id="submitDelete" name="submitDelete" className="btn btn-primary" >Aceptar</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    </div>
            </form>
            
        </div>
        </div>
    </div>
    )

}
export default ModalDelete