import User from "../models/User.js";
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
    
    const user = new User(req.body);
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
    const isMatch = password == user.password; // <-- undefined

    if (!isMatch) {
      return res.status(400).json({
        message: '비밀번호가 틀렸습니다. 다시 확인하세요!'
      })
    }
    const userInfo = { // 비밀번호 - 암호화안된채로, 클라이언트로 전송될수 있으니 주의!
      name: user.username,
      id: user._id
    }
    // 일치하면 로그인했다고 응답!
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

export default { regist, login }