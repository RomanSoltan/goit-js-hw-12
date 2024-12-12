import{a as y,S as b,i as c}from"./assets/vendor-D0cagnvz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const w="https://pixabay.com/api/",L="47381624-f2c157926f525f6b292de8ebe";async function h(r,t=1){const{data:o}=await y(`${w}`,{params:{key:L,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}});return o}function p(r){return r.map(({webformatURL:t,largeImageURL:o,tags:n,likes:e,views:s,comments:l,downloads:g})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${o}">
          <img class="gallery-image" src="${t}" alt="${n}" width="360" height="200" />
        </a>
        <ul class="info-list">
            <li class="info-item">
              <h3 class="item-title">Likes</h3>
              <p class="item-descr">${e}</p>
            </li>
            <li class="info-item">
              <h3 class="item-title">Views</h3>
              <p class="item-descr">${s}</p>
            </li>
            <li class="info-item">
              <h3 class="item-title">Comments</h3>
              <p class="item-descr">${l}</p>
            </li>
            <li class="info-item">
              <h3 class="item-title">Downloads</h3>
              <p class="item-descr">${g}</p>
            </li>
          </ul>
      </li>
  `).join("")}const m=document.querySelector(".loader-js"),S=document.querySelector(".form-js"),C=document.querySelector(".input-js"),u=document.querySelector(".gallery-js"),i=document.querySelector(".load-more-js");S.addEventListener("submit",q);i.addEventListener("click",$);let d,a=1,f=new b(".gallery a",{captionDelay:250,captions:!0,captionsData:"alt"});async function q(r){if(r.preventDefault(),a=1,u.innerHTML="",d=C.value.trim(),!d){c.show({message:"Sorry, the request cannot be empty. Please try again...",position:"topRight",closeOnClick:!0,progressBar:!1,messageColor:"white",backgroundColor:"#ef4040"});return}m.style.display="block";try{const t=await h(d,a);if(!t.hits.length){c.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",closeOnClick:!0,progressBar:!1,messageColor:"white",backgroundColor:"#ef4040"});return}u.insertAdjacentHTML("beforeend",p(t.hits)),f.refresh(),a<t.totalHits/15&&i.classList.replace("load-more-hidden","load-more")}catch(t){c.show({title:"X",message:`${t.message}`,position:"center",color:"red"})}finally{r.target.reset(),m.style.display="none"}}async function $(){a++,i.disabled=!0,i.classList.replace("load-more","load-more-hidden"),m.style.display="block";try{const r=await h(d,a);u.insertAdjacentHTML("beforeend",p(r.hits)),f.refresh(),a>=r.totalHits/15&&(i.classList.replace("load-more","load-more-hidden"),c.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",closeOnClick:!0,progressBar:!1,messageColor:"white",backgroundColor:"#ef4040"}));const o=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({left:0,top:o*2,behavior:"smooth"})}catch(r){c.show({title:"X",message:`${r.message}`,position:"center",color:"red"})}finally{i.disabled=!1,i.classList.replace("load-more-hidden","load-more"),m.style.display="none"}}
//# sourceMappingURL=index.js.map
