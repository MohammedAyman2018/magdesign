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
  const formData = new FormData(form)
  const body = quill.root.innerHTML
  formData.append('body', body)

  const valid = validate(formData)
  if (!valid.valid) {
    alert(valid.msg)
  } else {
    try {
      await axios.post('/api/articles/', formData).catch(err => alert(err))
      form.reset()
      quill.root.innerHTML = ''
      alert('Article Added successfully!')
    } catch (error) {
      alert(error)
    }
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
    !article.get('article-img') ||
    !article.get('body')
  )
  const validBody = article.get('body').length > 20
  const validImage = !!article.get('article-img').name
  
  if (!allExisting) {
    return { msg: 'Please fill all fields', valid: false }
  } else if (!validBody){
    return { msg: 'Body must be at least 20 letter', valid: false }
  } else if (!validImage){
    return { msg: 'Please make sure you uploaded an image', valid: false }
  } else {
    return { valid: true }
  }
}

getCates()


