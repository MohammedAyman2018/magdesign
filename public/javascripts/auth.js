async function admin () {
  const wina = localStorage.getItem('wina')
  if (wina) {
    try {
      const res = await axios.post('/auth/', JSON.parse(wina))
      console.log(res)
    } catch (error) {
      location.href = '/'
    }
  } else {
    location.href = '/'
  }
}

admin()
