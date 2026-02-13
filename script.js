const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const questionScreen = document.getElementById('question-screen');
const mainCardScreen = document.getElementById('main-card-screen');
const music = document.getElementById('bgMusic');
const collageBg = document.getElementById('photo-collage-bg');
const envelope = document.getElementById('secret-envelope');

let yesScale = 1;
let noScale = 1;
let clickCount = 0;
const targetClicks = 7; // Berapa kali dia harus klik Yes sampai terbuka

// 1. Fitur Tombol NO (Mengecil dan Kabur)
noBtn.addEventListener('mouseover', () => {
    // Tombol kabur
    const p = 50;
    const maxX = window.innerWidth - noBtn.offsetWidth - p;
    const maxY = window.innerHeight - noBtn.offsetHeight - p;
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.floor(Math.random() * maxX) + p/2 + 'px';
    noBtn.style.top = Math.floor(Math.random() * maxY) + p/2 + 'px';

    // Tombol mengecil
    noScale -= 0.1;
    if (noScale < 0.2) noScale = 0.2; // Batas minimal ukuran biar gak hilang total
    noBtn.style.transform = `scale(${noScale})`;
});

// 2. Fitur Tombol YES (Membesar & Click Challenge)
yesBtn.addEventListener('click', () => {
    clickCount++;
    
    // Yes membesar setiap diklik
    yesScale += 0.3;
    yesBtn.style.transform = `scale(${yesScale})`;
    
    // Kasih teks gemes di tombol
    if (clickCount === 1) yesBtn.innerText = "Really? 😍";
    if (clickCount === 3) yesBtn.innerText = "Are You Sure? 😘";
    if (clickCount === 5) yesBtn.innerText = "OMG ❤️";

    // Jika sudah mencapai target klik
    if (clickCount >= targetClicks) {
        openFinalScreen();
    }
});

function openFinalScreen() {
    questionScreen.classList.add('hidden');
    mainCardScreen.classList.remove('hidden');
    collageBg.classList.remove('hidden-element');
    envelope.classList.remove('hidden-element');
    
    music.play().catch(() => console.log("Music play failed"));
    
    createCollage();
    setInterval(createFloatingHearts, 300);
}

// 3. Buat Kolase (Tetap Sama)
function createCollage() {
    collageBg.innerHTML = '';
    const myPhotos = [
        'image/foto1.jpg', 'image/foto2.jpg', 'image/foto3.jpg', 'image/foto4.jpg', 'image/foto5.jpg',
        'image/foto6.jpg', 'image/foto7.jpg', 'image/foto8.jpg', 'image/foto9.jpg', 'image/foto10.jpg',
        'image/foto11.jpg', 'image/foto12.jpg', 'image/foto13.jpg', 'image/foto14.jpg', 'image/foto15.jpg',
        'image/foto16.jpg', 'image/foto17.jpg', 'image/foto18.jpg', 'image/foto19.jpg', 'image/foto20.jpg'
    ];
    myPhotos.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'bg-photo';
        collageBg.appendChild(img);
        setTimeout(() => img.classList.add('reveal'), i * 100);
    });
}

// 4. Hujan Hati (Tetap Sama)
function createFloatingHearts() {
    const container = document.getElementById('particle-container');
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `position:fixed; left:${Math.random()*100}vw; top:110vh; font-size:${Math.random()*20+10}px; z-index:5; transition:5s linear;`;
    container.appendChild(heart);
    setTimeout(() => { heart.style.top = '-10vh'; heart.style.opacity = '0'; }, 100);
    setTimeout(() => heart.remove(), 5000);
}

// 5. Modal Logic (Tetap Sama)
const modal = document.getElementById('letter-modal');
const closeBtn = document.querySelector('.close-modal');
envelope.onclick = () => modal.classList.remove('hidden-element');
closeBtn.onclick = () => modal.classList.add('hidden-element');
window.onclick = (e) => { if(e.target == modal) modal.classList.add('hidden-element'); }

// --- Tambahan Fitur Interaktif ---

// A. Efek Kursor Hati
document.addEventListener('mousemove', (e) => {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `position:fixed; left:${e.clientX}px; top:${e.clientY}px; pointer-events:none; font-size:15px; z-index:9999; animation:fadeUp 1s forwards;`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
});

// B. Logika Password
const passInput = document.getElementById('passInput');
const submitPass = document.getElementById('submitPass');
const passwordSection = document.getElementById('password-section');
const letterContent = document.getElementById('letter-body-content');
const errorMsg = document.getElementById('errorMsg');

const correctPassword = "200825"; // GANTI TANGGAL JADIANMU DI SINI

submitPass.addEventListener('click', () => {
    if (passInput.value === correctPassword) {
        passwordSection.classList.add('hidden-element');
        letterContent.classList.remove('hidden-element');
    } else {
        errorMsg.style.display = 'block';
        document.querySelector('.modal-content').classList.add('shake-screen');
        setTimeout(() => document.querySelector('.modal-content').classList.remove('shake-screen'), 300);
        passInput.value = "";
    }
});

// C. Update Tombol No (Tambah Getar Layar)
noBtn.addEventListener('mouseover', () => {
    document.body.classList.add('shake-screen');
    setTimeout(() => document.body.classList.remove('shake-screen'), 300);
});