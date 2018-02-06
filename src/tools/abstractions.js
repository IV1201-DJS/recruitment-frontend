export function post (endpoint, payload) {
  return new Promise((resolve, reject) => {
    const x = new XMLHttpRequest()
    x.onreadystatechange = () => {
      return (x.readyState !== 4)
        ? false
        : (x.status === 200)
          ? resolve(x.response)
          : reject(x.response)
    }

    x.open('POST', `${process.env.BACKEND}endpoint`)
    x.setRequestHeader('Content-Type', 'application/json')
    x.send(JSON.stringify(payload))
  })
}
