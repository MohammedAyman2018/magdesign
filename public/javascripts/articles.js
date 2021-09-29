const articleTable = document.querySelector('tbody')
const newArticleButton = document.getElementById('newArticleButton')

const editImageModal = document.getElementById('editArticleImage')
const updateImageForm = document.getElementById('updateImageForm')
const closeModalBtn = document.getElementById('closeModalBtn')
const updateImageBtn = document.getElementById('updateImageBtn')

closeModalBtn.addEventListener('click', closeModal)
updateImageBtn.addEventListener('click', updateImage)
// newArticleButton.addEventListener('click', addArticle)

async function getArticles() {
  const data = await axios.get('/api/articles/').catch(err => alert(err))
  renderArticles(data.data)
}

async function renderArticles (articles) {
  articleTable.innerHTML = ''

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const tr = await createNewRow(article)
    articleTable.appendChild(tr)   
  }
}

function createNewRow (article) {
  const tr = document.createElement('tr')

  // This row will be idx no 
  const trNo = document.querySelectorAll('tr').length 

  // Create name and created At
  const name = document.createElement('td')
  const createdAt = document.createElement('td')
  const category = document.createElement('td')
  category.innerText = article.category.name
  name.innerText = article.title
  createdAt.innerText = article.createdAt.substr(0, 10)
  
  // Icons
  const operations = document.createElement('td')
  const deleteIcon = document.createElement('i')
  deleteIcon.classList.add("ri-delete-bin-line", "text-red-800", "mx-4", "cursor-pointer")
  
  const editArticleImageBtn = document.createElement('button')
  editArticleImageBtn.classList.add("py-2", "px-4", "bg-green-500", "text-white", "font-semibold", "rounded-lg", "shadow-md", "hover:bg-green-700", "focus:outline-none")
  editArticleImageBtn.innerText = 'Edit Article Image'
  editArticleImageBtn.setAttribute('data-article', article._id)
  editArticleImageBtn.addEventListener('click', updateArticleImage)

  const editIcon = document.createElement('i')
  editIcon.classList.add("ri-edit-line", "text-yellow-800", "cursor-pointer")
  const editLink = document.createElement('a')
  editLink.href = `/admin/articles/edit/${article._id}`
  editLink.appendChild(editIcon)
  
  deleteIcon.addEventListener('click', deleteArticle)

  deleteIcon.setAttribute('data-article', article._id)

  deleteIcon.setAttribute('data-idx', trNo)

  operations.appendChild(editArticleImageBtn)
  operations.appendChild(deleteIcon)
  operations.appendChild(editLink)


  name.classList.add('text-center', "p-5", "border", "border-green-600")
  category.classList.add('text-center', "p-5", "border", "border-green-600")
  createdAt.classList.add('text-center', "p-5", "border", "border-green-600")
  operations.classList.add('text-center', "p-5", "border", "border-green-600")
  tr.appendChild(name)
  tr.appendChild(category)
  tr.appendChild(createdAt)
  tr.appendChild(operations)
  return tr
}

async function addArticle() {
  const name = prompt('Enter new article text...')
  if (name) {
    const res = await axios.post('/api/articles/', { name }).catch(err => alert(err))
    const tr = createNewRow(res.data)
    articleTable.appendChild(tr)
  }
}

async function deleteArticle(e) {
  const youSure = confirm('You really want to delete this article? You can\'t undo this.')
  if (youSure) {
    const _id = e.target.getAttribute('data-article')
    const tr = e.target.parentElement.parentElement
    console.log(tr)
    const res = await axios.delete(`/api/articles/${_id}`).catch(err => alert(err))
    tr.remove()
  }
}

function closeModal () {
  editImageModal.classList.add('hidden')
}

async function updateImage (e) {
  const formData = new FormData(updateImageForm)
  const res = await axios.patch(`/api/articles/change-img/${editImageModal.getAttribute('data-article')}`, formData)
  updateImageForm.reset()
  editImageModal.removeAttribute('data-article')
  editImageModal.classList.add('hidden')
  alert('Article Image updated successfully')
}

function updateArticleImage(e) {
  const id = e.target.getAttribute('data-article')
  editImageModal.setAttribute('data-article', id)
  editImageModal.classList.remove('hidden')
}

getArticles()
