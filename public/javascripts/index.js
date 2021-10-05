const mainCardSection = document.getElementById('mainCards')
const categoryCardSection = document.getElementById('categoryCrds')

async function getPageData () {
  const res =await axios.get('/api/articles/index/all')
  const latestArticles = res.data.leatest
  const articles = res.data.articles
  const categories = res.data.categories 
  // mainCardSection.innerHTML = generateMainCards(articles)
  categories.forEach(category => {
    const myArticles = articles.filter(article => article.category.name === category.name)
    if (myArticles.length > 0) {
      categoryCardSection.innerHTML += generateCategoryColumn(category, myArticles)
    }
  });
  console.log(res)
}

function generateMainCards (articlesArr) {
  const cards = []
  articlesArr.forEach(article => {
    const card = `
      <div class="main_cards my-10">
      <div class="pic"><a href="/article/${article.title}"> <img class="w-full rounded-md" src="${article.img}"/></a></div>
      <div class="content">
        <div class="top text-sm mt-10"><a class="font-bold" href="#">${article.category.name} </a><span class="text-gray-400">-${article.createdAt.substr(0,10)}</span></div>
        <h2 class="mt-3 mb-3 text-lg font-extrabold leading-sung tracking-wide"><a href="/article/${article.title}"> ${article.title}.</a></h2>
        <p class="text-gray-500 mt-2 text-sm leading-sung tracking-wide">${article.desc}</p><a class="flex mt-10 " href="#">
          <div class="author-pic w-16 mr-5"><img class="rounded-full" src="../images/slider1/person_1.jpg"/></div>
          <div class="author-info mt-2"><strong class="block text-sm">Wina Putri</strong></div></a>
      </div>
      </div>
    `
    cards.push(card)
  });
  return cards
}

function generateCategoryColumn (category, articlesArr) {
  let col = `
  <div class="block my-28">
  <h1 class="text-2xl font-extrabold mb-0">${category.name}</h1>
  <div class="parent">
  `
  articlesArr.forEach(article => {
    const card = `
      <div class="business_cards md:flex block my-12">
      <div class="pic md:w-80 w-full md:mb-0 mb-6 mr-3"><img class="w-full rounded-md " src="${article.img}"/></div>
      <!--content-->
      <div class="content">
        <div class="top text-sm "><a class="font-bold" href="#">${article.category.name} </a><span class="text-gray-400">- ${article.createdAt.substr(0,10)}</span></div>
        <h2 class="pr-10"><a class="text-lg font-extrabold " href="/article/${article.title}">${article.title}</a></h2><a class="flex mt-2" href="#">
          <div class="author-pic w-12 mr-5"><img class="rounded-full" src="../images/slider1/person_1.jpg"/></div>
          <div class="author-info mt-2"><strong class="block text-sm">Wina Putri</strong>
      </div>
      </div>
    `
    col += card
  });
  col += '</div></div>'
  return col
}

getPageData()
