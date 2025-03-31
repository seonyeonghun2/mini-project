import User from "../models/User.js";
const regist = async (req, res) => {
  const {username, passwd, email, phone, sns} = req.body;
  try {    
    // 이미 등록된 회원이 있는지 : _id (몽고db가 자체적으로?)
    const existUser = await User.findOne({
      $or: [{email}, {username}, {phone}]
    })

    if (existUser) {
      return res.status(400).json({
        message: '해당 정보로 등록된 사용자가 이미 존재합니다.'
      })
    }
    
    // 아니라면(=없다면) 새 회원을 생성(=등록)
    const user = new User(req.body);
    await user.save()

    res.status(201).json({
      message: '신규 사용자가 등록되었습니다' 
    })
  } catch (err) {
    console.log("resit is failed : ", err)
  }
  
}

export default regist