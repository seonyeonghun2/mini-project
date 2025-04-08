import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams, useNavigate } from 'react-router'
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap'

function ViewPost() {
  let navigate = useNavigate()
  let uuid = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({})
  const token = Cookies.get('nexcent')
  if (!token) {
    alert('인증 정보가 존재하지 않습니다')
    navigate('/signin')
  }
  useEffect(() => {

    axios
      .get(`http://localhost:3000/api/posts/${uuid.id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data)
        setPost(res.data)
        setFormData(res.data)
        setLoading(false)
      })
      .catch((err) => console.error(err.message))
  }, [])
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    
    axios
      .put(`http://localhost:3000/api/posts/${uuid.id}`, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 'fail') {
          alert('글 수정 권한이 없습니다')
        }
        //  setPost(res.data)
        setLoading(false)
        //  navigate('/posts')
      })
      .catch((err) => console.error(err.message))
  }

  function convertDate(date) {
    return new Date(date)
      .toLocaleDateString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      })
      .replaceAll('.', '')
      .replaceAll(' ', '-')
  }
  function goPostsList() {
    navigate('/posts')
  }
  function removePost(id) {
    axios
      .delete(`http://localhost:3000/api/posts/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201 || res.statusText === 'Created') {
          navigate('/posts')
        }
      })
      .catch((err) => console.error(err.message))
  }
  if (loading) {
    return <div>로딩중...</div>
  }
  return (
    <>
      <Container className="my-5">
        <h1 className="text-center mb-5">상세보기</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group as={Col} controlId="validationCustomDate">
                <Form.Label>작성일</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="created at"
                  disabled
                  defaultValue={convertDate(post.createdAt)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Col} controlId="validationCustomAuthor">
                <Form.Label>작성자</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="author name"
                  name="author"
                  defaultValue={'테스트'}
                  disabled
                  required
                />
                <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-3">
            <Form.Group as={Col} md="12" controlId="validationCustomTitle">
              <Form.Label>제목</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="title text"
                name="title"
                onChange={handleChange}
                defaultValue={post.title}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="12" controlId="validationCustomContent">
              <Form.Label>내용</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="author"
                name="content"
                onChange={handleChange}
                defaultValue={post.content}
                required
              />
              <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Col className="d-flex gap-1 justify-content-end">
              <Button variant="primary" type="button" onClick={goPostsList}>
                목록
              </Button>
              <Button variant="secondary" type="submit">
                수정
              </Button>
              <Button variant="success" type="button" onClick={() => removePost(uuid.id)}>
                삭제
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default ViewPost
