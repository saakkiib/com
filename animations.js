// Placeholder for extra advanced animations if you want to extend later.
// Example: click shockwave on whole page
document.addEventListener('click', (e)=>{
  const shock = document.createElement('span');
  shock.className = 'shockwave';
  document.body.appendChild(shock);
  shock.style.left = e.clientX + 'px';
  shock.style.top = e.clientY + 'px';
  setTimeout(()=> shock.remove(), 900);
});

// Styles for shockwave injected once
const style = document.createElement('style');
style.textContent = `.shockwave{
  position:fixed; width:10px; height:10px; border-radius:999px; pointer-events:none;
  left:0; top:0; transform:translate(-50%,-50%); background:radial-gradient(circle, rgba(0,255,200,.45), rgba(0,255,200,0));
  animation: shock .9s ease-out forwards;
}
@keyframes shock{
  from{transform:translate(-50%,-50%) scale(.6); opacity:.9}
  to{transform:translate(-50%,-50%) scale(24); opacity:0}
}`;
document.head.appendChild(style);
