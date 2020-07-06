import React from 'react'
import withLayout from '../HOC/withLayout'

import VehiculeList from './Home/VehiculeList'

const Vehicule = () => {
   

    return (
    <VehiculeList />
    )
}

export default withLayout()(Vehicule)