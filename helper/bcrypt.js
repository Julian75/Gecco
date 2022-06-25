

const encrypt = async (textPplain) => {
  const hash = await bcrypt.hash(textPplain, 10)
  return hash
}

const compare = async (passwordPplain, hashPassword) => {
  return await bcrypt.compare(passwordPplain, hashPassword)
}

module.exports = {encrypt, compare}
