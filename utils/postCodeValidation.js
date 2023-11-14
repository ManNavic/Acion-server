const postCodeValidation = (postCode) => {
  const fourDigits = /[1-9][0-9]{3}/.test(postCode)

  const twoLetters = /[A-Za-z]{2}/.test(postCode)

  const errors = []
  if (!fourDigits) {
    errors.push('Post code must include four digits.')
  }
  if (!twoLetters) {
    errors.push('Post code must include two letters.')
  }
  // if (!ending) {
  //   errors.push('Post code must not contain "sa", "sd", or "ss".')
  // }

  return errors
}

module.exports = { postCodeValidation }
