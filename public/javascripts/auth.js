async function admin () {
  const wina = localStorage.getItem('wina')
  if (wina) {
    try {
      await axios.post('/auth/', JSON.parse(wina))
    } catch (error) {
      location.href = '/'
    }
  } else {
    location.href = '/'
  }
}

admin()
