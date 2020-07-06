import React from 'react'
import withLayout from '../HOC/withLayout'

import ParkingList from './Home/ParkingList'

const Parking = () => {
   

    return (
    <ParkingList />
    )
}

export default withLayout()(Parking)