const passwordValidation = (password) => {
  const hasLowerCase = /[a-z]/.test(password)
  const hasUpperCase = /[A-Z]/.test(password)
  const hasDigit = /\d/.test(password)
  const hasSpecialChar = /[@$!%*?&]/.test(password)
  const isLengthValid = password.length >= 8

  const errors = []
  if (!hasLowerCase || !hasUpperCase) {
    errors.push(
      'Password must include at least one uppercase letter and lowercase letter.'
    )
  }
  if (!hasDigit) {
    errors.push('Password must include at least one digit.')
  }
  if (!hasSpecialChar) {
    errors.push('Password must include at least one special character.')
  }
  if (!isLengthValid) {
    errors.push('Password must be at least 8 characters long.')
  }

  return errors
}

module.exports = { passwordValidation }
