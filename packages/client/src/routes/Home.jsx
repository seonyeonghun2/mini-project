import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import SiteHeader from '../layouts/SiteHeader'
import SiteFooter from '../layouts/SiteFooter'
import HomeCarousel from '../components/HomeCarousel'
import { Outlet } from 'react-router'
import { jwtDecode } from "jwt-decode";
const Home = () => {
  const [userInfo, setUserInfo] = useState(null)
  useEffect(() => {
    const token = Cookies.get('nexcent')
    try {
      if(token) {
        const decodedToken = jwtDecode(token)
        setUserInfo(decodedToken)
      } 
    } catch (err) {
      console.error(err.message)
    }
  }, [])
  const handleLogOut = () => {
    if(confirm("로그아웃 하시겠습니까?")) {
      Cookies.remove('nexcent')
      location.href='/'
    }
  }
  return (
    <>
      <SiteHeader userInfo={userInfo} handleLogOut={handleLogOut} />
      <HomeCarousel />
      <Outlet />
      <SiteFooter />
    </>
  )
}

export default Home