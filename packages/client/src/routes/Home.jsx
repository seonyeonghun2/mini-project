import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import SiteHeader from '../layouts/SiteHeader'
import SiteFooter from '../layouts/SiteFooter'
import HomeCarousel from '../components/HomeCarousel'
import { Outlet } from 'react-router'
const Home = () => {
  const [userInfo, setUserInfo] = useState(null)
  useEffect(() => {
    const cookie = Cookies.get('nexcent')
    // console.log(cookie.split('\"')[3]) //관리자(username)
    if(cookie) {
      setUserInfo(cookie.split('\"')[3])
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