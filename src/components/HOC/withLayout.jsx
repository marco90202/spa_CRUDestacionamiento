import React, { Component } from 'react'
import $ from 'jquery'
import Cookies from 'js-cookie'
import { ToastContainer } from 'react-toastify'
import { onlineStatus, user } from '../Utils/Helpers'
import Options from '../Organisms/Navigation/Options'
import { NavLink } from 'react-router-dom'

const removeToken = () => {
    localStorage.clear()
    window.location = '/'
}

const printFirstName = () => {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).firstname : null
}

const headerOptions = () => {
    if (user() === null ){
            return <>
                    <ul className="navbar-nav align-items-center ml-md-auto ">            
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/login' >
                                <button className="btn btn-usil">Ingresar</button>
                            </NavLink>
                        
                        </li>
                    </ul>
                </>
    } else{
        return <>
                <ul className="navbar-nav align-items-center ml-md-auto ">
                    <li className="nav-item d-xl-none">

                    <div id="sidenav-toggler-sm" className="pr-3 sidenav-toggler sidenav-toggler-light" data-action="sidenav-pin" data-target="#sidenav-main">
                        <div  className="sidenav-toggler-inner">
                            <i className="sidenav-toggler-line"></i>
                            <i className="sidenav-toggler-line"></i>
                            <i className="sidenav-toggler-line"></i>
                        </div>
                    </div>
                    </li>
                    <li className="nav-item d-sm-none d-none">
                    <a className="nav-link" href="#!" data-action="search-show" data-target="#navbar-search-main">
                        <i className="fa fa-search"></i>
                    </a>
                    </li>
                    
                </ul>
                <ul className="navbar-nav align-items-center ml-auto ml-md-0">
                    <li className="nav-item dropdown">
                        <a className="nav-link pr-0" href="#!" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div className="media align-items-center">
                                <span className="avatar avatar-sm rounded-circle">
                                    <img alt="placeholder" src={require("./../../assets/img/user_default.png")} />
                                </span>
                                <div className="media-body ml-2 d-none d-lg-block">
                                    <span className="mb-0 text-sm  font-weight-bold">Hola! {printFirstName()} <i className="fa fa-caret-down"></i></span>
                
                                </div>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                                <NavLink className="dropdown-item" to='/profile' >
                                    <i className="fa fa-user"></i>
                                    <span>Mi perfil</span>
                                </NavLink>
                            <a href="#!" className="dropdown-item d-none">
                                <i className="fa fa-cogs"></i>
                                <span>Configuración</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <span className="dropdown-item" onClick={() => removeToken()}>
                                <i className="fa fa-sign-out"></i>
                                <span>Salir</span>
                            </span>
                        </div>
                    </li>                                        
                </ul>
            </>
    }
}
const withLayout = (propValue) => (WrappedComponent) => {
    return class withLayout extends Component {

        componentDidMount() {
            $( document ).ready(function() {
                // console.log('Cargué layout global')                
          
                function addActive() {
                    $(".sidenav-toggler").addClass("active");
                    $(".sidenav-toggler").data("action", "sidenav-unpin"); 
                    $("body").removeClass("g-sidenav-hidden").addClass("g-sidenav-show g-sidenav-pinned")
                    $("body").append('<div class="backdrop d-xl-none" data-action="sidenav-unpin" data-target=' + $("#sidenav-main").data("target") + " />");
                    Cookies.set("sidenav-state", "pinned")
                }
                function removeActive() {
                    $(".sidenav-toggler").removeClass("active");
                     $(".sidenav-toggler").data("action", "sidenav-pin");
                     $("body").removeClass("g-sidenav-pinned").addClass("g-sidenav-hidden");
                     $("body").find(".backdrop").remove(); 
                     Cookies.set("sidenav-state", "unpinned");
                }

                function defaultPin() {
                    Cookies.set("sidenav-state", "unpinned")

                }

                
          
                // var t = Cookies.get("sidenav-state") ? Cookies.get("sidenav-state") : "unpinned";
          
                // console.log(t)

                if(Cookies.get("sidenav-state") === "pinned") addActive();

                if(!Cookies.get("sidenav-state")){defaultPin()}
          
                if($(window).width() > 1200 ){
                    // PANTALLA ANCHA. CUANDO MENU APARECE AL HACER HOVER
                    // console.log(1,'MENU SUELTO')
                    // console.log('PANTALLA ANCHA')

                    if(Cookies.get("sidenav-state") === "unpinned"){
                        $("body").removeClass("g-sidenav-show").addClass("g-sidenav-hidden")
                    }
                    


                        $("#sidenav-toggler-lg").on("click", function() {
                            // t.preventDefault();

                            // console.log('CLICK NATIVO EN ANCHO')

                            if(Cookies.get("sidenav-state") === "unpinned"){
                                // aqui se debe pinear si se da click

                                // console.log('DI UN FK CLICK', 'PINEARE')
                                addActive();
                            }else{
                                // aqui se debe despinear si se da click
                                // console.log('DI UN FK CLICK', 'DES-PINEARE')

                                removeActive();

                            }
                        })
                    
          
                }else{
                    // PANTALLA CHICA . CUANDO MENU SE QUEDA QUIETO
                    // console.log(2, 'SE HA PINEADO EL MENU')
                    // console.log('PANTALLA CHICA')


                    $("body").on("click", '[data-action=sidenav-unpin]', function() {
                        // t.preventDefault();
                        removeActive();
                    })
                    $("body").on("click", '[data-action=sidenav-pin]', function() {
                        // t.preventDefault();
                        addActive();
                    })
                    
                }

                $(".sidenav").on("mouseenter", function() {
                    // console.info('entre mouse')
                    $("body").hasClass("g-sidenav-pinned") || $("body").removeClass("g-sidenav-hide").removeClass("g-sidenav-hidden").addClass("g-sidenav-show")
                });
                $(".sidenav").on("mouseleave", function() {
                    // console.log('sali mouse')
                    if(Cookies.get("sidenav-state") === 'unpinned'){
                        // console.log('oculto enlaces')
                            $("body").removeClass("g-sidenav-show").addClass("g-sidenav-hidden")
                    }
                });

                

                $(window).on("resize", function() {
                    if($(window).width() < 768){
                        // console.log('RESIZE A CHICO')
                        defaultPin()
                        removeActive();

                        $("body").on("click", '[data-action=sidenav-unpin]', function(t) {
                            t.preventDefault();
                            removeActive();
                        })
                        $("body").on("click", '[data-action=sidenav-pin]', function(t) {
                            t.preventDefault();
                            addActive();
                        })

                        $('#notify-dropdown').removeClass('dropdown-menu-right').addClass('dropdown-menu-left');

                    }else{
                        if(Cookies.get("sidenav-state") === 'unpinned'){
                            $("body").removeClass("g-sidenav-show").addClass("g-sidenav-hidden")
                        }
                        // document.location.reload()
                    }
                })
          
                
          
            });
        }

        render() {

            return (
                <>
                    <nav className="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white" id="sidenav-main">
                        <div className="scrollbar-inner">

                            <div className="sidenav-header d-flex align-items-center">
                                <a className="navbar-brand usil-logo" href="/">
                                <span className={onlineStatus() ? "icon-usil-circular logo-circular logo-online" : "icon-usil-circular logo-circular logo-offline" } ><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span></span>
                                <i className={onlineStatus() ? "circle-status online" : "circle-status offline"}></i>
                                </a>
                                <div className="ml-auto">
                                <div id="sidenav-toggler-lg" className="sidenav-toggler d-none d-xl-block" data-action="sidenav-unpin" data-target="#sidenav-main">
                                    <div className="sidenav-toggler-inner">
                                        <i className="sidenav-toggler-line"></i>
                                        <i className="sidenav-toggler-line"></i>
                                        <i className="sidenav-toggler-line"></i>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <Options  />
                        </div>
                    </nav>

                    <div className="main-content" id="panel">

                        <nav className="navbar navbar-top navbar-expand navbar-light bg-white border-bottom bg-shadow-fx fixed-top">
                            <div className="container-fluid">
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">                                       
                                    { headerOptions() }
                                </div>
                            </div>
                        </nav>

                        <WrappedComponent {...this.props} varGlobal='Soy una variable global' />
                        <ToastContainer />
                        
                    </div>

                </>
            )
        }
    }
}

export default withLayout




