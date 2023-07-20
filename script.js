const API_KEY = "a50e903b6a829039d24a0ebd03dc1b2d";
const url = "https://gnews.io/api/v4/search?q=";

window.addEventListener("load",() => fetchnews("India"));

function reload(){
    window.location.reload();
}

async function fetchnews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardscontainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');

    cardscontainer.innerHTML="";

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        filldDataInCard(cardClone,article);
        cardscontainer.appendChild(cardClone);
        
    });
}

function filldDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle= cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-us",{timeZone:"Asia/Jakarta"});

    newsSource.innerHTML=`${article.source.name} • ${date}`;
    cardClone.firstElementChild.addEventListener("click",()=>{window.open(article.url,"_blank");
    });
}

let curSelectedNav=null;
function onNavItemClick(id){
    fetchnews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}

const searchButton=document.getElementById("search-button");
const searchText=document.getElementById("search-text");
searchButton.addEventListener("click",()=>{
    const query=searchText.value;
    if(!query) return;
    fetchnews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;

});

