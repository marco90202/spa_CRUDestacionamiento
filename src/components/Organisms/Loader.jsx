import React from 'react'

const Loader = ({height = 100}) => {

    return (        
        <div className="col-md-12 " style={{height: height + 'px'}}>
            <div className="container d-flex h-100 " style={{minHeight:'120px'}}>
                <div className="row justify-content-center align-self-center">
                    <div className="container-loader">
                        <div className="item item-1"></div>
                        <div className="item item-2"></div>
                        <div className="item item-3"></div>
                        <div className="item item-4"></div>
                    </div>
                </div>
            </div>
        </div>
        // <div className="col-md-12 " style={{height:'400px'}}>
        //     <Loader />
        // </div>
    )
}

export default Loader
