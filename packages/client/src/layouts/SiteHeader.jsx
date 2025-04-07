import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { Container, Row, Col, Button} from 'react-bootstrap'
import siteLogo from '../assets/site-logo.png'
import { NavLink } from 'react-router'
const SiteHeader = ({ userInfo, handleLogOut }) => {
    const handleClick = () => {
        location.href='/signup'
    }
  return (
    <header className='py-3'>
        <Container>
            <div className='w-100 text-end border-bottom py-2'>{ userInfo ? (
                <>
                    <span>{userInfo.name}님 로그인중</span> {" | "}
                    <NavLink to='/modify'>정보수정</NavLink> {" "}
                    <NavLink onClick={handleLogOut}>로그아웃</NavLink>
                </>
            ) : (
                <>
                    <NavLink to='/signin'>로그인</NavLink>{" "}
                    <Button onClick={handleClick}>Register Now <i className="bi bi-arrow-right"></i></Button>
                </>
            )}</div>
        </Container>
        <Container>
            <Row className='align-items-center justify-content-between my-3'>
                <Col className='logo' md="4">
                    <img src={siteLogo} alt="logo" />
                </Col>
                <Col className="d-flex align-items-center gap-3" md="8">
                    <nav className='w-100'>
                        <ul className="d-flex gap-5 justify-content-between">
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink to='/about'>about</NavLink></li>
                            <li><NavLink to='/posts'>posts</NavLink></li>
                        </ul>
                    </nav>
                </Col>
            </Row>
        </Container>
    </header>
  )
}

export default SiteHeader