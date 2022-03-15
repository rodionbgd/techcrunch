var T=Object.defineProperty;var d=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable;var h=(s,e,n)=>e in s?T(s,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):s[e]=n,p=(s,e)=>{for(var n in e||(e={}))k.call(e,n)&&h(s,n,e[n]);if(d)for(var n of d(e))S.call(e,n)&&h(s,n,e[n]);return s};import{o as i,c as l,a,w,v as b,F as g,r as f,b as C,t as m,d as _,e as y,f as v,g as H}from"./vendor.e47efde3.js";const N=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}};N();function O({page:s=1,filters:e={}}={}){const n=new URL("https://techcrunch.com/wp-json/wp/v2/posts");return Object.entries(p({page:s,per_page:10},e)).forEach((c,t)=>{t!==null&&n.searchParams.append(c,t)}),fetch(n).then(c=>c.json())}function U(){const s=new URL("https://techcrunch.com/wp-json/wp/v2/categories");return fetch(s).then(e=>e.json())}var u=(s,e)=>{const n=s.__vccOpts||s;for(const[c,t]of e)n[c]=t;return n};const $={data(){return{items:[],categories:[],selectedCategory:null,page:1}},computed:{availableCategories(){return[{id:null,name:"(no category)"},...this.categories]}},methods:{async loadCategories(){this.categories=await U()},async loadPosts(){this.items=await O({page:this.page,filters:{categories:this.selectedCategory}})},syncHash(){const s=new URLSearchParams(window.location.hash.substring(1)),e=Object.fromEntries(s.entries());e.page&&(this.page=e.page),e.category&&(this.selectedCategory=e.category)},updateHash(){const s=new URLSearchParams;this.page!==1&&s.append("page",this.page),this.selectedCategory!==""&&s.append("category",this.selectedCategory),window.location.hash=s.toString()}},created(){window.addEventListener("hashchange",this.syncHash),this.syncHash(),this.loadCategories(),this.loadPosts()},beforeUnmount(){window.removeEventListener("hashchange",this.syncHash)},watch:{page(){this.loadPosts(),this.updateHash()},selectedCategory(){this.page=1,this.loadPosts(),this.updateHash()}}},j=C("Category: "),x=["value"],E=a("hr",null,null,-1),V=["disabled"],A=a("hr",null,null,-1),B=["href","innerHTML"];function M(s,e,n,c,t,o){return i(),l("div",null,[a("label",null,[j,w(a("select",{"onUpdate:modelValue":e[0]||(e[0]=r=>t.selectedCategory=r)},[(i(!0),l(g,null,f(o.availableCategories,r=>(i(),l("option",{key:r.id,value:r.id},m(r.name),9,x))),128))],512),[[b,t.selectedCategory]])]),E,a("div",null,[a("button",{disabled:t.page===1,onClick:e[1]||(e[1]=r=>t.page-=1)},"Prev",8,V),C(" "+m(t.page)+" ",1),a("button",{onClick:e[2]||(e[2]=r=>t.page++)},"Next")]),A,a("ul",null,[(i(!0),l(g,null,f(t.items,r=>(i(),l("li",{key:r},[a("a",{target:"_blank",href:r.link,innerHTML:r.title.rendered},null,8,B)]))),128))])])}var R=u($,[["render",M]]);const W={};function F(s,e){return i(),l("div",null,"stub")}var D=u(W,[["render",F]]);const q={name:"App",components:{TechCrunch:R,StarWars:D},data(){return{selectedTab:"techcrunch"}},watch:{selectedTab(){window.location.hash=""}}},I={id:"app"},K=a("option",{value:"techcrunch"},"TechCrunch",-1),z=a("option",{value:"starwars"},"StarWars",-1),G=[K,z],J=a("hr",null,null,-1);function Q(s,e,n,c,t,o){const r=_("TechCrunch"),L=_("StarWars");return i(),l("div",I,[w(a("select",{"onUpdate:modelValue":e[0]||(e[0]=P=>t.selectedTab=P)},G,512),[[b,t.selectedTab]]),J,t.selectedTab==="techcrunch"?(i(),y(r,{key:0})):v("",!0),t.selectedTab==="starwars"?(i(),y(L,{key:1})):v("",!0)])}var X=u(q,[["render",Q]]);H(X).mount("#app");
