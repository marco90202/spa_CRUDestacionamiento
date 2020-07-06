import React from 'react' // eslint-disable-line no-unused-vars
import Axios from 'axios'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment'
import 'moment/locale/es';

const API_URL = process.env.REACT_APP_API_URL

export const datemoment = (timestamp) => moment(timestamp).subtract(5, 'hours').calendar()

export function print() {
    return <div><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure vero suscipit aut libero fugiat aspernatur quos, voluptatibus aliquid commodi veritatis, autem totam mollitia! Beatae amet, repellendus cum provident sit nostrum!</p></div>
}

export function header() {
    return {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}

export const headerPUT = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
    // 'Content-Type': 'application/x-www-form-urlencoded'
    // 'Content-Type': 'multipart/form-data'
    
}

export function get(endpoint = null, headers, fn) {

    if(endpoint === null) return 

    Axios.get(`${API_URL + endpoint}`, {
        headers: headers
    })    
    .then(r => fn(r.status, r.data))
    .catch(er => {
        if(er.response.status===401){
            console.log('401 (Unauthorized)')
            localStorage.clear()
            window.location = '/'
        }

        if(typeof er.response === 'undefined') return fn(500, {error: 'Error de conexión'})
        return fn(er.response.status, er.response)
    })

    // Example:
    // get('/courses', header(), function(code, response) {
    //     console.log(code, response)
    // })
}

export function post(endpoint = null, body = null, headers = null, fn) {

    if(endpoint === null) return 

    Axios.post(`${API_URL + endpoint}`, body, {
        headers: headers
    })
    .then(r => fn(r.status, r.data))
    .catch(er => {
        if(typeof er.response === 'undefined') return fn(500, {error: 'Error de conexión'})
        return fn(er.response.status, er.response)
    })

    // Example:
    // post('/institutions', body, header(), function(code, response) {
    //     // console.log(code, response.data)
    //     if(code === 200){
    //         console.log(response)
    //     }else{
    //         console.log('error en petición', response)
    //     }
    // })
}

export function postFile(endpoint = null, body = null, headers = null, fn) {

    if(endpoint === null) return 

    Axios.post(`${API_URL + endpoint}`, body, headers)
    .then(r => fn(r.status, r.data))
    .catch(er => {
        if(typeof er.response === 'undefined') return fn(500, {error: 'Error de conexión'})
        return fn(er.response.status, er.response)
    })

}

export function put(endpoint = null, body = null, headers = null, fn){

    if(endpoint === null) return 

    Axios.put(`${API_URL + endpoint}`, body, {
        headers: headers
    })
    .then(r => fn(r.status, r.data))
    .catch(er => {
        if(typeof er.response === 'undefined') return fn(500, {error: 'Error de conexion'})
        return fn(er.response.status, er.response)
    })

    // Example:
    // put('/institutions/7', body, header(), function(code, response) {
    //     if(code === 200){
    //         console.log(response)
    //     }else{
    //         console.log('error en petición', response)
    //     }
    // })
}

export function remove(endpoint = null, headers, fn) {

    if(endpoint === null) return 

    Axios.delete(`${API_URL + endpoint}`, {
        headers: headers
    })
    .then(r => fn(r.status, r.data))
    .catch(er => {
        if(typeof er.response === 'undefined') return fn(500, {error: 'Error de conexión'})
        return fn(er.response.status, er.response)
    })

    // Example:
    // remove('/institutions/6', header(), function(code, response) {
    //     if(code === 200){
    //         console.log(response)
    //     }else{
    //         console.log('error en petición', response)
    //     }
    // })
    
}

export function notify(message = '', type = null) {
    switch(type){
        case 'success': return toast.success(message, {
            className: 'rubik-toast'
          })
        case 'warn': return toast.warn(message, {
            className: 'rubik-toast'
          })
        case 'error': return toast.error(message, {
            className: 'rubik-toast'
          })
        case 'info': return toast.info(message, {
            className: 'rubik-toast'
          })
        default: return toast(message, {
            className: 'rubik-toast'
          })
     }
}

export function formatearFecha(fecha){

    if(fecha === null) return null
    var d = new Date(fecha),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    
    return [day, month, year].join('-')
    
}

export const user = () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

export const verifySession = () => {
    const data = localStorage.getItem("token");
    if (data) {
        return true;
    } else {
        return false;
    }
}

export const onlineStatus = () => {
    return navigator.onLine
}

export const userCourses = () => localStorage.getItem('all_courses') ? JSON.parse(localStorage.getItem('all_courses')) : null

export const paginationOpciones = {
    rowsPerPageText : 'Filas por Página',
    rangeSeparatorText : 'de',
    selectAllRowsItem : true,
    selectAllRowsItemText: 'Todos'
}

/* Player helpers */

// solo para cuando activePlayerItem.type = 2
export const printFilePlayer = (activePlayerItem) => {

    return <div style={{height: '500px',
                                backgroundColor: '#f7f8fd',
                                backgroundImage: 'linear-gradient(180deg, #b9cddc 0%, #f7f8fd 50%, #b9cddc 100%)'
                                }}>
                        <div className="container d-flex h-100 ">
                            <div className="row justify-content-center align-self-center w-100 text-center">
                                <div>
                                    <p className="font-weight-bold">{activePlayerItem.name}</p>
                                    <a href={activePlayerItem.file_link} className="btn btn-usil">
                                    <i className="fa fa-cloud-download" aria-hidden="true"></i> Descargar
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

    
    // switch (activePlayerItem.file_format) {
    //     case 'jpg':      

    //     default:

            
            
    // }
}

export const printLinkPlayer = (activePlayerItem) => {

    return <div style={{height: '500px',
                        backgroundColor: '#f7f8fd',
                        backgroundImage: 'linear-gradient(180deg, #b9cddc 0%, #f7f8fd 50%, #b9cddc 100%)'
                        }}>
                <div className="container d-flex h-100 ">
                    <div className="row justify-content-center align-self-center w-100 text-center">
                        <div>
                            <p className="font-weight-bold">{activePlayerItem.name}</p>
                            <a href={activePlayerItem.link} className="btn btn-usil" target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-link" aria-hidden="true"></i> Ir al enlace
                            </a>
                        </div>
                    </div>
                </div>
            </div>
}

export const removeElementById = (elementId) => {
    // let element = document.getElementById(elementId)
    // if(element){
    //     console.log('Se borrara: ', element.innerHTML)
    //     element.innerrHTML = "";
    // }
            // var element = document.getElementById(elementId);
            // if(element === null) return
            // element.removeChild(element);
    // document.getElementsByClassName("my-elements").remove();
    // let element = document.getElementById("elementId");

    // if(element) {
    //     element.remove();
    // }
    // return
}

export const removeElementByTagName = (tag) => {
    var element = document.getElementsByTagName(tag), index;

    for (index = element.length - 1; index >= 0; index--) {
        element[index].parentNode.removeChild(element[index]);
    }
}

export const removeIframes = () => {
    var iframe = document.getElementsByTagName('iframe'), index;

    for (index = iframe.length - 1; index >= 0; index--) {
        iframe[index].parentNode.removeChild(iframe[index]);
    }
}