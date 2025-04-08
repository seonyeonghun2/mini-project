import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {Container,Row,Col} from 'react-bootstrap'
import {useNavigate, Link} from 'react-router'
const Posts = () => {
    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)
    let navigate = useNavigate()
    useEffect(() => {
        const token = Cookies.get("nexcent")

        token ? setIsAuth(true) : setIsAuth(false)

        axios
            .get('http://localhost:3000/api/posts', {
                withCredentials: true,
            })
            .then((res) => {
                // console.log(res)
                setLoading(false)
                setPosts(res.data)
            })
            .catch((err) => console.error(err.message))
    }, [])
    function convertDate(date) {       
        return new Date(date).toLocaleDateString('ko-KR', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit'
        }).replaceAll('.','').replaceAll(' ','-')
    }
    function goPostWrite(){
        navigate('/addPost')
    }
    return (
        <Container className="py-5">
            {loading && <div>로딩중...</div>}
            <Row>
                <h2 className='text-center mb-3'>커뮤니티 | 글목록</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>글쓴이</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts &&
                            posts.map((post, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td><Link to={`/post/${post.uuid}`}>{post.title}</Link></td>
                                    <td>{post.author.username}</td>
                                    <td>
                                        {convertDate(post.createdAt)}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </Row>
            <Row className='justify-content-end'>
                <Col md={2}>{isAuth && <button onClick={goPostWrite}>글쓰기</button>}</Col>
            </Row>
        </Container>
    )
}

export default Posts
