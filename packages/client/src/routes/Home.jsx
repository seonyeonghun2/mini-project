import React from 'react'
import SiteHeader from '../layouts/SiteHeader'
import SiteFooter from '../layouts/SiteFooter'

import HomeCarousel from '../components/HomeCarousel'

import { Outlet } from 'react-router'
const Home = () => {
  return (
    <>
      <SiteHeader />
      <HomeCarousel />
      <Outlet />
      <SiteFooter />
    </>
  )
}

export default Home