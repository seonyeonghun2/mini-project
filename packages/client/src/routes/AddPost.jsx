import { useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import SiteHeader from '../layouts/SiteHeader';
import SiteFooter from '../layouts/SiteFooter';
import HomeCarousel from '../components/HomeCarousel';

function AddPost() {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    })
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        const token = Cookies.get('nexcent')
  
        if(!token) {
            alert("인증 정보가 없습니다. 로그인 하세요!")
            location.href='/signin'
        }
        axios.post('http://localhost:3000/api/posts', formData, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 201 || res.statusText === 'Created') {
                location.href = '/posts'
            }
        }).catch((err) => console.error(err.message))
    };

    return (
        <>
            <SiteHeader />
            <HomeCarousel />
            <Container className='py-5'>
                <h2 className="text-center my-3">글쓰기</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Label>제목</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                name="title"
                                placeholder="title here"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className='my-3'>
                        <Form.Group className="mb-3" controlId="validationCustom02">
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" required placeholder='content here!' value={formData.content} onChange={handleChange} name="content" rows={3} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col><Button type="submit">등록</Button></Col>
                    </Row>
                </Form>
            </Container>
            <SiteFooter />
        </>
    );
}

export default AddPost;