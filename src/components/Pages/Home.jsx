import React from 'react'
import withLayout from '../HOC/withLayout'
import {notify} from '../Utils/Helpers'

import HomeList from './Home/HomeList'

const Home = ({location}) => {
   
    if (location.search === '?login=success') notify('¡Bienvenido!')

    return (
    <HomeList />
    )
}

export default withLayout()(Home)
