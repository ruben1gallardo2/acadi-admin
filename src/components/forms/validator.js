const emailRegex = /\S+@\S+\.\S+/

const checkErrors = (field) => {
  const errors = []
  const checks = field.validate
  if (checks.required) {
    if (field.value == null || field.value === '') {
      errors.push({ label: 'validator.required' })
    }
    if (checks.minLength) {
      if (field.value.length < checks.minLength) {
        errors.push({ label: 'validator.minLength', context: { min: checks.minLength } })
      }
    }
    if (checks.minValue) {
      if (Number(field.value) < checks.minValue) {
        errors.push({ label: 'validator.minValue', context: { min: checks.minValue } })
      }
    }
  }
  if (checks.email) {
    if (!emailRegex.test(field.value)) {
      errors.push({ label: 'validator.email', context: {  } })
    }
  }
  if (checks.maxValue) {
    if (Number(field.value) > checks.maxValue) {
      errors.push({ label: 'validator.maxValue', context: { max: checks.maxValue } })
    }
  }
  return errors.slice(0)
}

const hasErrors = (field) => {
  const errors = checkErrors(field)
  return errors.shift()
}

export { checkErrors, hasErrors }
