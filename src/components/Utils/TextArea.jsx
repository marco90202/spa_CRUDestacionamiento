import React, { useEffect} from 'react'
import 'quill/dist/quill.snow.css'
 
import { useQuill } from 'react-quilljs'
 
const TextArea = ({getText}) => {
    const { quill, quillRef, Quill } = useQuill({ modules: { counter: true } });
 
   if (Quill && !quill) {
        Quill.register('modules/counter', function(quill, options) {
            quill.on('text-change', function() {

                // console.log(quillRef.current.firstChild.innerHTML)
                getText(quillRef.current.firstChild.innerHTML)
            })
        })
   }
 
//    const send = () => {
//         // console.log(quillRef.current.firstChild.innerHTML)
//         getText(quillRef.current.firstChild.innerHTML)
//     }
 
   useEffect(() => {
    // Para desmontarlo del DOM
    return () => { console.log("componentWillUnmount"); }
   },[quill])
 
    return (
        <>
            <div style={{ width: 100+'%', height: 250, marginBottom: '150px' }}>
                <div ref={quillRef} />
                <div className="row">
                    <div className="col">
                        <div className="float-right mt-2">
                            {/* <button className="btn btn-secondary">Cancelar</button> */}
                            {/* <button id="sendTextArea"  className="btn btn-primary btn-block" onClick={() => send()}>ENVIAR</button> */}
 
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}




 
export default TextArea