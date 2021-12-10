'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  this.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targerArticle = document.querySelector(articleSelector);
  console.log(targerArticle);

  /* [DONE] add class 'active' to the correct article */
  targerArticle.classList.add('active');
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find articles */
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  /*Loop start*/
  for(let article of articles){
  /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);
    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#'+articleId+'"><span>'+articleTitle+'</span></a></li>';
    console.log(linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
    console.log(html);
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(customSelector = ''){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);
  console.log(customSelector);
  /* START LOOP: for every article: */
  for(const article of articles){

    /* find tags wrapper */
    const tagsPlace = article.querySelector(optArticleTagsSelector);
    console.log(tagsPlace);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const tagList = article.getAttribute('data-Tags');
    console.log(tagList);
    /* split tags into array */
    const tagsArray = tagList.split(' ');
    console.log(tagsArray);
    /* START LOOP: for each tag */
    for(const singleTag of tagsArray){
      console.log(singleTag);
      /* generate HTML of the link */
      const linkTag = '<li><a href="#tag-'+ singleTag +'">'+ singleTag +'</a></li>';
      /* add generated code to html variable */
      html = html + linkTag;
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsPlace.innerHTML = html;
  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = this.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const tagLinksActive = this.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let link of tagLinksActive){
    /* remove class active */
    link.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetTagLinks = document.querySelectorAll(href);
  /* START LOOP: for each found tag link */
  for(let link of targetTagLinks){
    /* add class active */
    link.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks()('[data-tags~="' + tag + '"]');
  console.log(generateTitleLinks);
}

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

  /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();
