import { useEffect, useState } from 'react'
import axios from 'axios';
const Posts = () => {
    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/api/posts', {
            withCredentials: true
        })
            .then(res => {
                console.log(res)
                setLoading(false)
                setPosts(res.data)
            }).catch(err => console.error(err.message))
    }, [])
    return (
        <div className="py-5">
            {loading && <div>로딩중...</div>}
            <table className='table table-striped w-75 mx-auto'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {posts && posts.map((post, i) => <tr key={i}><td>{i + 1}</td><td>{post.title}</td><td>{post.author}</td><td>{new Date(post.createdAt).toLocaleDateString()}</td></tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default Posts