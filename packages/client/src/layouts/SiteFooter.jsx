import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { Container, Row, Col, Button} from 'react-bootstrap'
import siteLogoFooter from '../assets/site-logo-footer.png'
const SiteFooter = () => {
  return (
    <footer className='bg-dark text-white py-3'>
      <Container>
        <Row>
          <Col>
            <img src={siteLogoFooter} alt="logo" />
            <p>
            Copyright © 2020 Landify UI Kit.<br />All rights reserved
            </p>
            <ul className="d-flex gap-3">
              <li><i className="bi bi-twitter"></i></li>
              <li><i className="bi bi-pinterest"></i></li>
              <li><i className="bi bi-youtube"></i></li>
              <li><i className="bi bi-instagram"></i></li>
            </ul>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </footer>
  )
}

export default SiteFooter