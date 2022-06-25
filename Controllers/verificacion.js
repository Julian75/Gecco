const { encrypt } = require("../helper/bcrypt")

const registerCtrl = async (req, res) => {
  try {
    const { email, password, name} = req.body
    const passwordHash = await encrypt(password)
    const registerUser = await userModel.create({
      email,
      name,
      password: passwordHash
    })

    res.send({ data: registerUser })
  }catch (e){
    httpError(res, e)
  }
}
