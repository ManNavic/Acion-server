const emailValidation = (email) => {
  const isValid =
    /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/.test(
      email
    )
  return isValid
}
module.exports = { emailValidation }
