import React from 'react'
import $ from 'jquery'
import {post, header, notify} from '../Utils/Helpers'

const Modal = ({resetState, id, title, printInputs, request}) => {

    

    const create = e => {
        e.preventDefault()

        // const form = e.target

        var body = {};

        let datos = document.querySelectorAll('#'+id+' input')

        datos.forEach(function(row){
            body[row.name] = row.value;            
        })

        // Todo Validar tambien que los values respectivos tengan contenido

        post(request.endpoint, body, header(), function(code, response) {
            console.log(response.data)
            if(code === 200){                
                notify(request.successMessage, 'success')
                $('#'+id).modal('hide')
                resetState()
            }else{
                notify(response.data.error+request.errorMessage, 'error')
            }
        })

    }
         
    

    return (
        <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby={id+'Title'} aria-hidden="true">
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

                <form onSubmit={create.bind()} autoComplete="off">
                        <div className="modal-body">                

                            { printInputs() }
                            
                        </div>
                        <div className="modal-footer">
                            <button type="submit" id="submitAdd" name="submitAdd" className="btn btn-primary" >Guardar</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        </div>
                </form>
                
            </div>
            </div>
        </div>
    )
}
export default Modal