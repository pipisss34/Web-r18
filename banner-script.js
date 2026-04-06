// Elemen DOM
const bannerTrack = document.getElementById('bannerSlider');
const prevBtn = document.getElementById('prevBannerBtn');
const nextBtn = document.getElementById('nextBannerBtn');
const indicatorsContainer = document.getElementById('bannerIndicators');

// Variabel slider
let currentSlide = 0;
const totalSlides = bannerTrack.children.length;

// Buat indikator titik
function createIndicators() {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = `indicator-dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(dot);
  }
}

// Pindah ke slide tertentu
function goToSlide(index) {
  currentSlide = index;
  updateSliderPosition();
  updateIndicators();
}

// Update posisi slider
function updateSliderPosition() {
  bannerTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Update indikator aktif
function updateIndicators() {
  const dots = document.querySelectorAll('.indicator-dot');
  dots.forEach((dot, idx) => {
    dot.className = `indicator-dot ${idx === currentSlide ? 'active' : ''}`;
  });
}

// Navigasi slide selanjutnya/sebelumnya
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSliderPosition();
  updateIndicators();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSliderPosition();
  updateIndicators();
}

// Auto-slide setiap 5 detik
let autoSlideInterval = setInterval(nextSlide, 5000);

// Hentikan auto-slide saat hover
bannerTrack.parentElement.addEventListener('mouseenter', () => {
  clearInterval(autoSlideInterval);
});

// Lanjutkan auto-slide saat tidak di-hover
bannerTrack.parentElement.addEventListener('mouseleave', () => {
  autoSlideInterval = setInterval(nextSlide, 5000);
});

// Tambah event listener
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Inisialisasi
createIndicators();
