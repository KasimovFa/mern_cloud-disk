function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validation = (type, value) => {
  if (type === 'email') {
     return validateEmail(value)
  }
  if (type === "number") {
    return value.length > 3 ? true : false
  }
  if (type === 'password') {
    if (value.length > 6) {
     return true
   }
  }
   
  return false
} 