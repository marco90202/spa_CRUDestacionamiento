import React from 'react'


const Tabs = () => {
    return (
        <div className="container-fluid bg-white">
        <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="mb-3">
            <small className="text-uppercase font-weight-bold">With icons</small>
          </div>
          <div className="nav-wrapper">
            <ul className="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
              <li className="nav-item">
                <a className="nav-link mb-sm-3 mb-md-0 active" 
                id="tabs-icons-text-1-tab" 
                data-toggle="tab" 
                href="#tabs-icons-text-1" 
                role="tab" aria-controls="tabs-icons-text-1" aria-selected="true">
                    <i className="ni ni-cloud-upload-96 mr-2"></i>Home
                </a>
                
              </li>
              <li className="nav-item">
                <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false"><i className="ni ni-bell-55 mr-2"></i>Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-3-tab" data-toggle="tab" href="#tabs-icons-text-3" role="tab" aria-controls="tabs-icons-text-3" aria-selected="false"><i className="ni ni-calendar-grid-58 mr-2"></i>Messages</a>
              </li>
            </ul>
          </div>
          <div className="card shadow">
            <div className="card-body">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                  <p className="description"> PESTAÑA 1 Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.</p>
                  <p className="description">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                </div>
                <div className="tab-pane fade" id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                  <p className="description">PESTAÑA 2 Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
                </div>
                <div className="tab-pane fade" id="tabs-icons-text-3" role="tabpanel" aria-labelledby="tabs-icons-text-3-tab">
                  <p className="description">PEST 3 Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
         </div>
    </div>
    )
}

export default Tabs