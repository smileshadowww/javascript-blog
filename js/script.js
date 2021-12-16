'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  articleAuthor: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-sidebar-tags').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-sidebar-authors').innerHTML),
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optAuthorsListSelector = '.authors';
//  optCloudClassCount = '5',
//  optCloudClassPrefix  = 'tag-size-';

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

/*++++++++++++++++++++++++++ TITLE LINKS o(*°▽°*)o ++++++++++++++++++++++++++*/

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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

/*++++++++++++++++++++++++++ TAGS (∪.∪ )...zzz ++++++++++++++++++++++++++*/
function calculateTagsParams(tags){
  let params = {max:0, min:999999};
  for(let tag in tags){
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
}
function calculateTagClass(count, params){
  const maxNumber = params.max/5;
  let tagSize = '';
  let tag = count;
  if(tag>= maxNumber*5){
    tagSize = 'tag-size-5';
  }else if (tag>= maxNumber*4){
    tagSize = 'tag-size-4';
  }else if (tag>= maxNumber*3){
    tagSize = 'tag-size-3';
  }else if (tag>= maxNumber*2){
    tagSize = 'tag-size-2';
  }else {
    tagSize = 'tag-size-1';
  }
  return tagSize;
}

function generateTags(customSelector = ''){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
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
      const linkHTMLData = {id: singleTag, title: singleTag};
      const linkHTML = templates.articleTag(linkHTMLData);
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      //if(!Object.prototype.hasOwnProperty.call(allTags, "singleTag")){
      if(!allTags[singleTag]){
      /* [NEW] add generated code to allTags array */
        allTags[singleTag] = 1;
      } else {
        allTags[singleTag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsPlace.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  /* [NEW] add html from allTags to tagList */
  const allTagsData = {tags: []};

  for(let singleTag in allTags){
    allTagsData.tags.push({
      tag: singleTag,
      count: allTags[singleTag],
      className: calculateTagClass(allTags[singleTag], tagsParams)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
  // tagList.innerHTML = allTags.join(' ');
  console.log(allTags);
}

generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const tagLinksActive = clickedElement.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let link of tagLinksActive){
    /* remove class active */
    link.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let link of targetTagLinks){
    /* add class active */
    link.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  console.log(generateTitleLinks);
}

function addClickListenersToTags(){
  /* find all links to tags */
  const linksTags = document.querySelectorAll('.tags a');
  /* START LOOP: for each link */
  for(let link of linksTags){
  /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

/*++++++++++++++++++++++++++ AUTHORS (｡･∀･)ﾉﾞ ++++++++++++++++++++++++++*/

function generateAuthors(customSelector = ''){
  /* [NEW] create a new variable allTags with an empty object */
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);
  console.log(customSelector);
  /* START LOOP: for every article: */
  for(const article of articles){
  /* find tags wrapper */
    const authorsPlace = article.querySelector(optArticleAuthorSelector);
    console.log(authorsPlace);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const author = article.getAttribute('data-author');
    console.log(author);
    /* split tags into array */
    /* generate HTML of the link */
    const linkHTMLData = {id: author, title: author};
    const linkHTML = templates.articleAuthor(linkHTMLData);
    /* add generated code to html variable */
    html = html + linkHTML;
    /* [NEW] check if this link is NOT already in allTags */
    //if(!Object.prototype.hasOwnProperty.call(allAuthors, "singleTag")){
    if(!allAuthors[author]){
    /* [NEW] add generated code to allTags array */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    authorsPlace.innerHTML = html;
  }
  /* [NEW] find list of tags in right column */
  const authorsList = document.querySelector(optAuthorsListSelector);

  const authorsParams = calculateTagsParams(allAuthors);
  console.log('authorsParams:', authorsParams);
  /* [NEW] add html from allTags to tagList */
  const allAuthorsData = {authors: []};

  for(let author in allAuthors){
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
      className: calculateTagClass(allAuthors[author], authorsParams)
    });
  }
  authorsList.innerHTML = templates.authorCloudLink(allAuthorsData);
  console.log(allAuthorsData);
  // tagList.innerHTML = allTags.join(' ');
  console.log(allAuthors);
}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);
  /* find all tag links with class active */
  const authorLinksActive = clickedElement.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active tag link */
  for(let link of authorLinksActive){
    /* remove class active */
    link.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let link of targetAuthorLinks){
    /* add class active */
    link.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
  console.log(generateTitleLinks);
}

function addClickListenersToAuthors(){
  /* find all links to tags */
  const linksAuthors = document.querySelectorAll('a[href^="#author"]');
  /* START LOOP: for each link */
  for(let link of linksAuthors){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
