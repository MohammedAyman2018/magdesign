const createdAtHolder = document.getElementById('date')
const titleHolder = document.getElementById('title')
const descHolder = document.getElementById('desc')
const imgHolder = document.getElementById('img')
const bodyHolder = document.getElementById('body')

async function getArticle () {
  const articleName = location.pathname.replace('/article/', '')
  try {
    const res = await axios.get(`/api/articles/${articleName}`)

    const { body, createdAt, desc, img, title } = res.data.article
    createdAtHolder.innerText = createdAt.substr(0, 10)
    titleHolder.innerText = title
    descHolder.innerText = desc
    imgHolder.src = img
    bodyHolder.innerHTML = body
    
    generateRelatedCards(res.data.sameCategories)

    document.title = title
  } catch (error) {
    alert(error)
  }
}

function generateRelatedCards (arr) {
  const parent = document.getElementById('parent')
  arr.forEach(article => {
    const card = `
    <div class="business_cards md:flex block my-12">
      <div class="pic md:w-80 w-full md:mb-0 mb-6 mr-3"><img class="w-full rounded-md " src="${article.img}" />
      </div>
      <!--content-->
      <div class="content">
          <div>
              <div class="top text-sm "><a class="font-bold" href="#">${article.category.name} </a>
                  <span class="text-gray-400">- ${article.createdAt.substr(0,10)}</span>
              </div>
              <h2 class="pr-10"><a class="text-lg font-extrabold "
                      href="/article/${article.title}">${article.title}</a></h2>
              <p>${article.desc}</p>
          </div>
          <div>
              <div class="author-pic w-12 mr-5"><img class="rounded-full" src="../images/slider1/person_1.jpg" />
              </div>
              <div class="author-info mt-2"><strong class="block text-sm">Wina Putri</strong>
              </div>
          </div>
      </div>
    </div>
    ` 
    parent.innerHTML += card 
  });
}

getArticle()
