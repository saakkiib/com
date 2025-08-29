/* ========= Matrix Background ========= */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
function sizeCanvas(){ canvas.width = innerWidth; canvas.height = innerHeight; }
sizeCanvas(); addEventListener('resize', sizeCanvas);

const letters = "01";
let fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array.from({length: columns}, () => 1);

function drawMatrix(){
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#0f0";
  ctx.font = fontSize + "px monospace";
  for (let i=0;i<drops.length;i++){
    const text = letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(text, i*fontSize, drops[i]*fontSize);
    if (drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 33);

/* ========= Fake Hacker Code Stream ========= */
const codeStream = document.getElementById('code-stream');
const codeLines = [
  "npm run deploy",
  "git push origin main",
  "gcc main.c -O2",
  "pip install --upgrade life",
  "ssh root@matrix",
  "Decrypting payload...",
  "Access granted.",
  "SELECT * FROM skills WHERE dev='Sadman'",
  "curl -s https://api"
];
function spawnLine(){
  const el = document.createElement('div');
  el.textContent = codeLines[Math.floor(Math.random()*codeLines.length)];
  el.style.position = 'absolute';
  el.style.left = Math.random()*100 + 'vw';
  el.style.top = '100vh';
  el.style.color = 'rgba(0,255,163,.8)';
  el.style.font = '12px monospace';
  el.style.textShadow = '0 0 8px rgba(0,255,163,.8)';
  el.style.transform = 'translateY(0)';
  el.style.transition = 'transform 4s linear, opacity 4s linear';
  codeStream.appendChild(el);
  requestAnimationFrame(()=>{
    el.style.transform = 'translateY(-110vh)';
    el.style.opacity = '0';
  });
  setTimeout(()=>el.remove(), 4200);
}
setInterval(spawnLine, 300);

/* ========= Neon Clock ========= */
function updateClock(){
  const now = new Date();
  const time = now.toLocaleTimeString('en-GB', {hour12:true});
  const date = now.toLocaleDateString('en-GB', {weekday:'long', year:'numeric', month:'long', day:'numeric'});
  document.getElementById('matrixClock').textContent = time;
  document.getElementById('matrixDate').textContent = date;
}
setInterval(updateClock, 1000); updateClock();

/* ========= Theme Toggle ========= */
const modeBtn = document.getElementById('modeToggle');
modeBtn.addEventListener('click', ()=>{
  document.body.classList.toggle('light');
  modeBtn.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
});

/* ========= Reveal on Scroll ========= */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('is-visible'); })
},{threshold:.12});
revealEls.forEach(el=>io.observe(el));

/* ========= Entry Overlay ========= */
const overlay = document.getElementById('entry-overlay');
const enterBtn = document.getElementById('enterBtn');
function portalOut(){
  overlay.style.transition = 'opacity .9s ease, transform .9s ease';
  overlay.style.transform = 'scale(1.06)';
  overlay.style.opacity = '0';
  setTimeout(()=> overlay.style.display='none', 900);
}
enterBtn.addEventListener('click', portalOut);

/* ========= Buttons Ripple Position ========= */
document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('click',(e)=>{
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--x', (e.clientX - rect.left) + 'px');
    btn.style.setProperty('--y', (e.clientY - rect.top) + 'px');
  });
});

/* ========= Fight Stage Toggle ========= */
const showFight = document.getElementById('showFight');
const hideFight = document.getElementById('hideFight');
const fight = document.getElementById('fight');
showFight.addEventListener('click', ()=> fight.classList.remove('hidden'));
hideFight.addEventListener('click', ()=> fight.classList.add('hidden'));
const aboutText = [
  "🎓 BSc in Computer Science at United International University (Studying)",
  "📘 HSC (Science): Rajshahi New Govt Degree College",
  "🏫 SSC (Science): Mohadevpur SM High School",
  "📍 Currently living in Dhaka",
  "🏡 Hometown: Naogaon, Rajshahi"
];

let textIndex = 0;
let charIndex = 0;
const typingSpeed = 60;
const erasingSpeed = 40;
const delayBetween = 1200;

const typingElement = document.getElementById("typing-text");

function type() {
  if (charIndex < aboutText[textIndex].length) {
    typingElement.textContent += aboutText[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetween);
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = aboutText[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    textIndex++;
    if (textIndex >= aboutText.length) textIndex = 0;
    setTimeout(type, typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, delayBetween);
});
let initialCount = 23304;
let lastCount = initialCount;

// শুধু page load এ API call
async function updateVisitorOnce() {
  try {
    const res = await fetch('https://abacus.jasoncameron.dev/hit/sakib-emni/key');
    const data = await res.json();
    const apiValue = data.value || 0;
    const total = initialCount + apiValue;

    const visitorEl = document.getElementById('visitor-count');
    visitorEl.innerText = total;
    visitorEl.setAttribute('data-text', total);
    lastCount = total;

    // Animate on first update
    visitorEl.classList.add('increase');
    setTimeout(() => visitorEl.classList.remove('increase'), 500);

  } catch (err) {
    console.log("CountAPI error:", err);
    const visitorEl = document.getElementById('visitor-count');
    visitorEl.innerText = lastCount;
    visitorEl.setAttribute('data-text', lastCount);
  }

  // Country update
  try {
    const geoRes = await fetch('https://ipapi.co/json/');
    const geoData = await geoRes.json();
    document.getElementById('visitor-country').innerText = geoData.country_name || "Unknown";
  } catch (err) {
    console.log("IPAPI error:", err);
    document.getElementById('visitor-country').innerText = "Unknown";
  }
}

// প্রথমবার page load এ একবার run
updateVisitorOnce();
<script>
  // Widget লোড হলে হুক করা
  document.addEventListener('DOMContentLoaded', function () {
    // widget ইনপুট ধরো
    const input = document.querySelector('[role="uploadcare-uploader"]');
    const statusEl = document.getElementById('upload-status');
    const listEl = document.getElementById('uploaded-list');

    // widget instance
    const widget = uploadcare.Widget(input);

    // ফাইল সিলেক্ট হলে
    widget.onUploadComplete(function(fileInfo){
      // একক ফাইলের ক্ষেত্রে
      addItem(fileInfo);
    });

    // একাধিক ফাইলের ক্ষেত্রে (groups)
    widget.onUploadCompleteGroup && widget.onUploadCompleteGroup(function(groupInfo){
      statusEl.textContent = `✅ ${groupInfo.count} টি ফাইল জমা হয়েছে।`;
      groupInfo.files().forEach(promise => {
        promise.then(addItem);
      });
    });

    function addItem(fileInfo){
      statusEl.textContent = '✅ ফাইল জমা হয়েছে।';
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="${fileInfo.cdnUrl}" target="_blank" rel="noopener">
          ${fileInfo.name} (${Math.round(fileInfo.size/1024)} KB)
        </a>
      `;
      listEl.appendChild(li);
    }
  });
</script>
