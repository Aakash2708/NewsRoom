const API_key="c63ac4e2629c4a01b5cbbb2736c1aced"
const url="https://newsapi.org/v2/everything?q="

window.addEventListener('load',()=>fetchNews("India"));
function reload()
{
    window.location.reload();
}
async function fetchNews(query){
  const ress=await  fetch(`${url}${query}&apikey=${API_key}`);
  const data= await ress.json();
  bindData(data.articles);
}
function bindData(articles)
{
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplates=document.getElementById('template-news-card');
    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplates.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,article)
{
    const newsImg =cardClone.querySelector('#news-img');
    const newsTitle =cardClone.querySelector('#news-title');
    const newssource =cardClone.querySelector('#news-source');
    const newsDesc =cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    const date = new Date(article.publishedAt).toLocaleDateString("en-US",{
        timeZone :"Asia/Jakarta"
    });
    newssource.innerHTML=`${article.source.name} ▪️ ${date}`;
    cardClone.firstElementChild.addEventListener('click',()=>
        window.open(article.url,"_blank"));

}
let curSelectedNav=null;
function onNavItemClick(id)
{
    fetchNews(id);
    const navItem =document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');
searchButton.addEventListener('click',()=>
{
    const query = searchText.value;
    if (!query)return ;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
});