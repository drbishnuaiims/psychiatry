const grid=document.getElementById("guidelineGrid");
const input=document.getElementById("searchInput");
const count=document.getElementById("resultCount");
const meta=document.getElementById("searchMeta");
const empty=document.getElementById("emptyState");
const topBtn=document.getElementById("topBtn");
const themeBtn=document.getElementById("themeToggle");

function render(query=""){
  const q=query.trim().toLowerCase();
  const results=GUIDELINES.filter(g=>
    [g.title,g.shortTitle,g.category,g.description,...g.tags,...(g.keywords||[])].join(" ").toLowerCase().includes(q)
  );
  grid.innerHTML=results.map((g,i)=>`
    <a class="card" href="${g.url}" style="animation-delay:${i*45}ms">
      <div class="card-top"><span class="tag">${g.category}</span><span class="year">${g.year}</span></div>
      <h3>${g.title}</h3><p>${g.description}</p>
      <div class="card-bottom"><span>${g.tags.slice(0,3).join(" · ")}</span><span class="read">Read →</span></div>
    </a>`).join("");
  count.textContent=`${results.length} ${results.length===1?"resource":"resources"}`;
  empty.classList.toggle("hidden",results.length!==0);
  meta.textContent=q ? `${results.length} result${results.length===1?"":"s"} for “${query}”` : "";
}
function setTheme(theme){
  document.documentElement.dataset.theme=theme;
  localStorage.setItem("cpg-theme",theme);
  themeBtn.textContent=theme==="dark"?"☀":"☾";
}
const saved=localStorage.getItem("cpg-theme");
setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"));
render();

input.addEventListener("input",e=>render(e.target.value));
themeBtn.addEventListener("click",()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark"));
document.addEventListener("keydown",e=>{
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();input.focus();}
  if(e.key==="Escape"){input.value="";render();input.blur();}
});
addEventListener("scroll",()=>topBtn.classList.toggle("show",scrollY>450));
topBtn.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
document.getElementById("year").textContent=new Date().getFullYear();

const params=new URLSearchParams(location.search);
if(params.get("q")){input.value=params.get("q");render(params.get("q"));document.getElementById("guidelines").scrollIntoView();}
