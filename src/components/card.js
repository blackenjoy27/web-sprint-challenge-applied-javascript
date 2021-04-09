import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  let divCard = document.createElement("div");
  divCard.classList.add("card");

  let divHeadline = document.createElement("div");
  divHeadline.classList.add("headline");
  divHeadline.textContent = article.headline;

  let divAuthor = document.createElement("div");
  divAuthor.classList.add("author");

  divCard.appendChild(divHeadline); divCard.appendChild(divAuthor);

  let divImg = document.createElement("div");
  divImg.classList.add("img-container");

  let img = document.createElement("img");
  img.setAttribute("src", article.authorPhoto);

  divImg.appendChild(img);

  let spanAuthorName = document.createElement("span");
  spanAuthorName.textContent = `By ${article.authorName}`;

  divAuthor.appendChild(divImg); divAuthor.appendChild(spanAuthorName);

  divCard.addEventListener("click",e=>{
    console.log(article.headline);
  })

  return divCard;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  function addCards(arry){
    arry.forEach(article=>{
      let theArticle = Card(article);
      document.querySelector(selector).appendChild(theArticle);
    })
  }
  axios
  .get(`https://lambda-times-api.herokuapp.com/articles`)
  .then(res=>{
    addCards(res.data.articles.bootstrap);
    addCards(res.data.articles.javascript);
    addCards(res.data.articles.jquery);
    addCards(res.data.articles.node);
    addCards(res.data.articles.technology);
  })
  .catch(e=>{
    console.log("Something is wrong");
  })
}

export { Card, cardAppender }
