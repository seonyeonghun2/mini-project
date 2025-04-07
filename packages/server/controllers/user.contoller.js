import User from "../models/User.js";
import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
const getUserNameById = async (req, res) => {
  try {
    const findUserId = req.params.id
    const foundUser = await User.findById(findUserId);
    if (!foundUser) {
      res.status(401).json({
        message: '일치하는 회원정보가 없습니다'
      })
    }
    res.status(200).json({
      username: foundUser.username
    })
  } catch (err) {
    res.status(500).json({ message: '일치하는 회원정보가 없습니다'})
  }
}
const regist = async (req, res) => {
  const { username, password, email, phone, sns } = req.body;
  try {
    // 이미 등록된 회원이 있는지 : _id (몽고db가 자체적으로?)
    const existUser = await User.findOne({
      $or: [{ email }, { username }, { phone }]
    })

    if (existUser) {
      return res.status(400).json({
        message: '해당 정보로 등록된 사용자가 이미 존재합니다.'
      })
    }
    
    // 방법1. User 컨트롤러에서 regist 요청처리시, 암호 해싱
    let newUser = {
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      phone,
      sns
    }

    const user = new User(newUser);
    await user.save()

    res.status(201).json({
      message: '신규 사용자가 등록되었습니다'
    })
  } catch (err) {
    console.log("resit is failed : ", err)
  }

}
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 입력한 email 기준으로 user 모델을 이용해, db내에 User를 찾고,    
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: '이메일 또는 아이디를 다시 확인하세요!'
      })
    }
    // 있으면! 그 정보중에 password를 전송한 password랑 비교하고~    
    const isMatch = bcrypt.compareSync(password, user.password); // true

    if (!isMatch) {
      return res.status(400).json({
        message: '비밀번호가 틀렸습니다. 다시 확인하세요!'
      })
    }
    const userInfo = { // 비밀번호 - 암호화안된채로, 클라이언트로 전송될수 있으니 주의!
      name: user.username,
      id: user._id
    }
    // 일치하면 로그인했다고 응답! --> 필요하면 jwt 토큰으로 정보를 해시(암호화)
    // 실제 운영목적의 서버에서는, 보안상 expiresIn(토큰 만료시간) 옵션을 설정하는것을 권장
    const token = jwt.sign(userInfo, process.env.JWT_SECRET);
    console.log(token);
    res.cookie('nexcent', token, { httpOnly: false, secure: false, maxAge: 24 * 60 * 60 * 1000, path: '/'})    
    // 브라우저에서 쿠키 응답이 확인이 되지 않는다면, 서버측에서 콘솔에 출력해서 확인
    console.log(res.getHeaders()['set-cookie'])
    res.status(200).json({
      message: '로그인 성공!',
      data: userInfo
    })
  } catch (err) {
    console.log(err)
    return res.status(404).json({
      message: '회원정보가 존재하지 않습니다.'
    })
  }
}

export default { regist, login, getUserNameById }