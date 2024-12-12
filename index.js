import{a as q,i as h,S as M}from"./assets/vendor-4dYZuk4Q.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const $="https://pixabay.com/api/",j="47381624-f2c157926f525f6b292de8ebe";async function p(e,r=1){const{data:s}=await q(`${$}`,{params:{key:j,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r}});return s}const y=document.querySelector(".load-more-js"),B=document.querySelector(".loader-js");function g(e){return e.map(({webformatURL:r,largeImageURL:s,tags:n,likes:t,views:o,comments:a,downloads:S})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${s}">
          <img class="gallery-image" src="${r}" alt="${n}" width="360" height="200" />
        </a>
        <ul class="info-list">
            <li class="info-item">
              <h3 class="item-title">Likes</h3>
              <p class="item-descr">${t}</p>
            </li>
            <li class="info-item">
              <h3 class="item-title">Views</h3>
              <p class="item-descr">${o}</p>
            </li>
            <li class="info-item">
              <h3 class="item-title">Comments</h3>
              <p class="item-descr">${a}</p>
            </li>
            <li class="info-item">
              <h3 class="item-title">Downloads</h3>
              <p class="item-descr">${S}</p>
            </li>
          </ul>
      </li>
  `).join("")}function d(e){h.show({message:e,position:"topRight",closeOnClick:!0,progressBar:!1,messageColor:"white",backgroundColor:"#ef4040"})}function b(e){h.show({title:"X",message:`${e}`,position:"center",color:"red"})}function L(){y.classList.replace("load-more-hidden","load-more")}function u(){y.classList.replace("load-more","load-more-hidden")}function c(e){B.style.display=`${e}`}const v=document.querySelector(".form-js"),A=document.querySelector(".input-js"),m=document.querySelector(".gallery-js"),f=document.querySelector(".load-more-js");v.addEventListener("submit",O);f.addEventListener("click",P);let l,i=1,w=new M(".gallery a",{captionDelay:250,captions:!0,captionsData:"alt"});async function O(e){if(e.preventDefault(),i=1,m.innerHTML="",l=A.value.trim(),u(),!l){d("Sorry, the request cannot be empty. Please try again...");return}c("block");try{const r=await p(l,i);if(!r.hits.length){d("Sorry, there are no images matching your search query. Please try again!");return}m.insertAdjacentHTML("beforeend",g(r.hits)),w.refresh(),i<r.totalHits/15&&L()}catch(r){b(r.message)}finally{e.target.reset(),c("none")}}async function P(){i++,f.disabled=!0,u(),c("block");try{const e=await p(l,i);m.insertAdjacentHTML("beforeend",g(e.hits)),w.refresh(),i>=e.totalHits/15&&(u(),d("We're sorry, but you've reached the end of search results."));const s=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({left:0,top:s*2,behavior:"smooth"})}catch(e){b(e.message)}finally{f.disabled=!1,L(),c("none")}}
//# sourceMappingURL=index.js.map
