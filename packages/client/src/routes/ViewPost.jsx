import { useState, useEffect } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams, useNavigate } from 'react-router';
import { Container, Row, Col, Button }from 'react-bootstrap';

function ViewPost() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    let navigate = useNavigate();
    let params = useParams();

    const token = Cookies.get('nexcent')
    if (!token) {
        alert("인증 정보가 존재하지 않습니다");
        navigate('/signin')        
    }

    useEffect(()=>{
        axios.get(`http://localhost:3000/api/posts/${params.id}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setPost(res.data)
            setLoading(false)
        }).catch((err) => console.error(err.message))
    }, [])

    function convertDate(date) {       
        return new Date(date).toLocaleDateString('ko-KR', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit'
        }).replaceAll('.','').replaceAll(' ','-')
    }
    function goPostsList() {
        navigate('/posts')
    }
    function removePost(id){
        axios.delete(`http://localhost:3000/api/posts/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if(res.status===201 || res.statusText === 'Created') {
                navigate('/posts')
            }
        }).catch((err) => console.error(err.message))
    }
    if (loading) {
        return <div>로딩중...</div>
    }
    return (
        <>
            <Container className='py-5'>
                <Row>
                    <Col>
                        <h2 className="text-center my-3">상세보기</h2>
                        <table className="table table-striped d-flex gap-1">
                            <thead className="w-25">
                                <tr className='d-flex flex-column'>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>작성일</th>
                                    <th className="flex-grow-10">내용</th>
                                </tr>
                            </thead>
                            <tbody className="w-75">
                                <tr className='d-flex flex-column'>
                                    <td className="text-start">{post.title}</td>
                                    <td className="text-start">{post.author.username}</td>
                                    <td className="text-start">{convertDate(post.createdAt)}</td>
                                    <td className="text-start">{post.content}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='d-flex gap-1 justify-content-end'>
                            <Button variant="primary" onClick={goPostsList}>목록</Button>
                            <Button variant="secondary">수정</Button>
                            <Button variant="success" onClick={() => removePost(params.id)}>삭제</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ViewPost;