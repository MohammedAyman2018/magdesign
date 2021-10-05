const cateTable = document.querySelector('tbody')
const newCateButton = document.getElementById('newCateButton')

newCateButton.addEventListener('click', addCategory)

async function getCates() {
  const data = await axios.get('/api/categories/').catch(err => alert(err))
  renderCates(data.data)
}

async function renderCates (cats) {
  cateTable.innerHTML = ''

  for (let i = 0; i < cats.length; i++) {
    const cate = cats[i];
    const tr = await createNewRow(cate)
    cateTable.appendChild(tr)   
  }
}

function createNewRow (cate) {
  const tr = document.createElement('tr')

  // This row will be idx no 
  const trNo = document.querySelectorAll('tr').length 

  // Create name and created At
  const name = document.createElement('td')
  const createdAt = document.createElement('td')
  name.innerText = cate.name
  createdAt.innerText = cate.createdAt.substr(0, 10)
  
  // Icons
  const operations = document.createElement('td')
  const deleteIcon = document.createElement('i')
  deleteIcon.classList.add("ri-delete-bin-line", "text-red-800", "mx-4", "cursor-pointer")
  const editIcon = document.createElement('i')
  editIcon.classList.add("ri-edit-line", "text-yellow-800", "cursor-pointer")

  deleteIcon.addEventListener('click', deleteCategory)
  editIcon.addEventListener('click', editCategory)

  deleteIcon.setAttribute('data-category', cate._id)
  editIcon.setAttribute('data-category', cate._id)

  deleteIcon.setAttribute('data-idx', trNo)
  editIcon.setAttribute('data-idx', trNo)

  operations.appendChild(deleteIcon)
  operations.appendChild(editIcon)


  name.classList.add('text-center', "border", "border-green-600")
  createdAt.classList.add('text-center', "border", "border-green-600")
  operations.classList.add('text-center', "border", "border-green-600")
  tr.appendChild(name)
  tr.appendChild(createdAt)
  tr.appendChild(operations)
  return tr
}

async function addCategory() {
  const name = prompt('Enter new category text...')
  if (name) {
    try {
      const res = await axios.post('/api/categories/', { name }).catch(err => alert(err))
      const tr = createNewRow(res.data)
      cateTable.appendChild(tr)
    } catch (error) {
      alert(error)
    }
  }
}

async function deleteCategory(e) {
  const youSure = confirm('You really want to delete this category? You can\'t undo this.')
  if (youSure) {
    const _id = e.target.getAttribute('data-category')
    const tr = e.target.parentElement.parentElement
    try {
      await axios.delete(`/api/categories/${_id}`).catch(err => alert(err))
      tr.remove()
    } catch (error) {
      alert(error)
    }
  }
}

async function editCategory(e) {
  const name = prompt('Enter new category name...')
  if (name) {
    const _id = e.target.getAttribute('data-category')
    const tr = e.target.parentElement.previousElementSibling.previousElementSibling
    try {
      await axios.patch(`/api/categories/${_id}`, { name }).catch(err => alert(err))
      tr.innerText = name
    } catch (error) {
      alert(error)
    }
  }
}

getCates()
