import { useState } from 'react';
import {Button, Col, Form, InputGroup, Row, Container} from 'react-bootstrap'
import axios from 'axios'
function SignUp() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email_id: '',
    email_address: '',
    password: '',
    phone: '',
    sns: ''
  })
  
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,      
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    // 폼에 모든값을 입력하고, 완료 버튼 누르면 --> Form Validation : true로 변경하고,
    // 이어서 서버에 axios 요청!

    axios.post('http://localhost:3000/users/regist', {
      username: formData.username,
      email: `${formData.email_id}@${formData.email_address}`,
      password: formData.password,
      phone: formData.phone,
      sns: formData.sns
    })
    .then(function (response) {
      console.log(response);
      // 응답에 따라 메인 페이지로 이동하게 한다던지..
      if (response.status === 201 || response.status === 200) {
        confirm('회원가입 성공! 첫페이지로 이동하시겠습니까?') ? location.href='/' : null
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };

  return (
    <Container className="py-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>이름</Form.Label>
            <Form.Control
              required
              type="text"
              name="username"
              value={formData.username}
              placeholder="이름을 작성하세요"
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom02">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="숫자, 문자, 특수문자 조합"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustomUseremail">
            <Form.Label>이메일</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="이메일 아이디"
                aria-describedby="inputGroupPrepend"
                value={formData.email_id}
                name="email_id"
                onChange={handleChange}
                required
              />
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="이메일 도메인"
                aria-describedby="inputGroupPrepend"
                value={formData.email_address}
                name="email_address"
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                이메일 주소를 입력하세요!
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Label>전화번호</Form.Label>
            <Form.Control type="tel" placeholder="연락처" required maxLength="11" value={formData.phone}
                name="phone"
                onChange={handleChange}/>
            <Form.Control.Feedback type="invalid">
              연락가능한 번호를 - 없이 숫자만 입력하세요
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom04">
            <Form.Label>SNS</Form.Label>
            <Form.Control type="url" placeholder="https://insta.com/your_channel" required value={formData.sns}
                name="sns"
                onChange={handleChange} />
            <Form.Control.Feedback type="invalid">
              본인 소유의 소셜미디어 계정이 있다면, 계정 주소를 입력하세요
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        {/* <Row className="mb-3">
        <Form.Group as={Col} md="12" className="mb-3">
          <Form.Check
            required
            label="가입 동의"
            feedback="회원가입을 완료하려면, 가입 동의에 체크해야 합니다."
            value={formData.agreement}
                name="agreement"
                onChange={handleChange}
            feedbackType="invalid"
          />
        </Form.Group>
        </Row> */}
        <Row className='justify-content-center'>
          <Col md={{ span: 4, offset: 4 }}>
            <Button type="submit" variant="success">완료</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default SignUp;