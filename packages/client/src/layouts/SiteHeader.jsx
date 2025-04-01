import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { Container, Row, Col, Button} from 'react-bootstrap'
import siteLogo from '../assets/site-logo.png'
import { NavLink } from 'react-router'
const SiteHeader = () => {
    const handleClick = () => {
        alert('회원가입화면으로 이동합니다')
    }
  return (
    <header className='py-3'>
        <Container>
            <Row className='align-items-center justify-content-between'>
                <Col className='logo'>
                    <img src={siteLogo} alt="logo" />
                </Col>
                <Col className="d-flex align-items-center gap-3 ml-auto">
                    <nav>
                        <ul className="d-flex gap-3">
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink to='/about'>about</NavLink></li>
                            <li><NavLink to='/board'>community</NavLink></li>
                        </ul>
                    </nav>
                    <Button onClick={handleClick}>Register Now <i className="bi bi-arrow-right"></i></Button>
                </Col>
            </Row>
        </Container>
    </header>
  )
}

export default SiteHeader