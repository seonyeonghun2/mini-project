const regist = (req, res) => {
  const {username, passwd, email, phone, sns} = req.body;
  console.log(req.body);
  // res.json({
  //   message: "user is created!",
  //   data: req.body
  // })
}

export default regist