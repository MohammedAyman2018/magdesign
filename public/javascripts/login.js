const username = document.getElementById('username')
const password = document.getElementById('password')
const btn = document.getElementById('btn')

btn.addEventListener('click', async function () {
  const user = {
    name: username.value,
    password: password.value
  }
  try {
    const res = await axios.post('/auth', user)
    localStorage.setItem('wina', JSON.stringify(user))
    location.href = '/admin/articles'
  } catch (error) {
    alert(error.response.data)
  } 
})
