const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];
const quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow'
});

// Get categoriess
const categoriesSelect = document.getElementById('categories')
const postArticle = document.getElementById('postArticle')
postArticle.addEventListener('click', addArticle)

async function getCates() {
  categoriesSelect.innerHTML = ''
  const data = await axios.get('/api/categories/').catch(err => alert(err))
  data.data.forEach(category => {
    const opt = document.createElement('option')
    opt.value = category._id
    opt.innerText = category.name
    categoriesSelect.appendChild(opt)
  });
}

async function addArticle() {
  const form = document.getElementById('articleForm')
  
  const formData = {
    title: document.getElementById('title').value,
    body: quill.root.innerHTML,
    category: document.getElementById('categories').selectedOptions[0].value
  }

  let valid = false
  if (formData.title.length === 0) {
    alert('Please Enter Title')
  } else if (formData.body.length < 20) {
    alert('Body must be at least 20 letter')
  } else {
    valid = true
  }

  if (!valid) {
    alert(valid.msg)
  } else {
    const url = window.location.href.split('/')
    const _id = url[url.length-1]
    console.log(formData)
    const res = await axios.patch(`/api/articles/${_id}`, formData).catch(err => alert(err))
    form.reset()
    quill.root.innerHTML = ''
    alert('Article Edited successfully!')
  }
}

/**
 * 
 * @param {FormData} article 
 */
function validate (article) {
  const allExisting = !(
    !article.get('title') ||
    !article.get('category') ||
    !article.get('body')
  )
  const validBody = article.get('body').length > 20
  
  if (!allExisting) {
    return { msg: 'Please fill all fields', valid: false }
  } else if (!validBody){
    return { msg: 'Body must be at least 20 letter', valid: false }
  } else {
    return { valid: true }
  }
}

async function getArticle () {
  const url = window.location.href.split('/')
  const _id = url[url.length-1]
  const article = await axios.get(`/api/articles/${_id}`).catch(err => alert(err))

  quill.root.innerHTML = article.data.body
  const titleInput = document.getElementById('title')
  const categoriesInput = document.getElementById('categories')
  titleInput.value = article.data.title;
  const opt = [...categoriesInput.options].find(x => x.value === article.data.category)
  if (opt) { opt.selected = true }
}

getCates()
getArticle()
