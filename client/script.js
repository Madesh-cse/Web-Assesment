// Hamburger Drop Down
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-list");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});


// Image Slider
const slides = document.querySelectorAll(".main-slide img");
const thumbs = document.querySelectorAll(".thumb");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;

function showSlide(i) {
  slides.forEach((s) => s.classList.remove("active"));
  thumbs.forEach((t) => t.classList.remove("active"));

  slides[i].classList.add("active");
  thumbs[i].classList.add("active");
}

nextBtn.onclick = () => {
  index = (index + 1) % slides.length;
  showSlide(index);
};

prevBtn.onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
};

thumbs.forEach((thumb, i) => {
  thumb.onclick = () => {
    index = i;
    showSlide(index);
  };
});

// Zoom Effect
const preview = document.querySelector(".zoom-preview");
const mainSlide = document.querySelector(".main-slide");

mainSlide.addEventListener("mousemove", (e) => {
  const activeImg = document.querySelector(".main-slide img.active");
  if (!activeImg) return;

  preview.style.display = "block";

  const rect = activeImg.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const xPercent = (x / rect.width) * 100;
  const yPercent = (y / rect.height) * 100;

  preview.style.backgroundImage = `url(${activeImg.src})`;
  preview.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
});

mainSlide.addEventListener("mouseleave", () => {
  preview.style.display = "none";
});

// ── Accordion ──
document.getElementById("faqList").addEventListener("click", function (e) {
  const btn = e.target.closest(".faq-question");
  if (!btn) return;

  const item = btn.closest(".faq-item");
  const isOpen = item.classList.contains("open");
  
  document.querySelectorAll(".faq-item").forEach(function (i) {
    i.classList.remove("open");
    i.querySelector(".faq-question").setAttribute("aria-expanded", "false");
  });
  if (!isOpen) {
    item.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
  }
});

function handleSubmit() {
  const emailInput = document.getElementById("emailInput");
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    emailInput.classList.add("error");
    setTimeout(function () {
      emailInput.classList.remove("error");
    }, 2000);
    return;
  }

  showToast();
  emailInput.value = "";
}

// Toast Notification
function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(function () {
    toast.classList.remove("show");
  }, 3500);
}

document.getElementById("emailInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") handleSubmit();
});

// App section image slider
const appsTrack = document.getElementById("appsTrack");
const appsPrevBtn = document.getElementById("prevBtn");
const appsNextBtn = document.getElementById("nextBtn");

let appsIndex = 0;

function getStep() {
  const card = appsTrack.querySelector(".app-card");
  const trackStyle = window.getComputedStyle(appsTrack);

  const gap = parseInt(trackStyle.columnGap || trackStyle.gap || 0);
  const cardWidth = card.offsetWidth;

  return cardWidth + gap;
}

function getMaxIndex() {
  const cards = appsTrack.querySelectorAll(".app-card");
  const wrapper = appsTrack.parentElement;

  const step = getStep();
  const visibleWidth = wrapper.clientWidth;

  const visibleCards = Math.floor(visibleWidth / step);

  return Math.max(0, cards.length - visibleCards);
}

const track = document.getElementById('appsTrack');
const AppprevBtn = document.getElementById('prevBtn');
const AppnextBtn = document.getElementById('nextBtn');

const cardGap = 20;
let currentIndex = 0;

function getCardWidth() {
  const card = track.querySelector('.app-card');
  return card ? card.offsetWidth + cardGap : 400;
}

function getMaxIndex() {
  const cards = track.querySelectorAll('.app-card');
  const totalCardsWidth = cards.length * getCardWidth() - cardGap;
  const wrapperWidth = track.parentElement.offsetWidth;
  const maxScroll = totalCardsWidth - wrapperWidth;
  return maxScroll > 0 ? Math.ceil(maxScroll / getCardWidth()) : 0;
}

function getMaxTranslate() {
  const cards = track.querySelectorAll('.app-card');
  const totalCardsWidth = cards.length * getCardWidth() - cardGap;
  const wrapperWidth = track.parentElement.offsetWidth;
  return Math.max(0, totalCardsWidth - wrapperWidth);
}

function updateTrack() {
  const maxTranslate = getMaxTranslate();
  const translateX = Math.min(currentIndex * getCardWidth(), maxTranslate);
  track.style.transform = `translateX(-${translateX}px)`;
  AppprevBtn.disabled = currentIndex === 0;
  AppnextBtn.disabled = translateX >= maxTranslate;
}

AppprevBtn.addEventListener('click', function () {
  if (currentIndex > 0) {
    currentIndex--;
    updateTrack();
  }
});

AppnextBtn.addEventListener('click', function () {
  if (!nextBtn.disabled) {
    currentIndex++;
    updateTrack();
  }
});

// Reset on resize
window.addEventListener('resize', function () {
  currentIndex = Math.min(currentIndex, getMaxIndex());
  updateTrack();
});

updateTrack();


// Tabs component
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
const tabIds = [
  "raw-material",
  "extrusion",
  "cooling",
  "sizing",
  "quality-control",
  "marking",
  "cutting",
  "packaging",
];

function activateTab(index) {
  tabs.forEach((t) => t.classList.remove("active"));
  panels.forEach((p) => p.classList.remove("active"));
  tabs[index].classList.add("active");
  panels[index].classList.add("active");
}

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => activateTab(i));
});
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const activeIndex = [...tabs].findIndex((t) =>
      t.classList.contains("active"),
    );
    if (btn.classList.contains("prev")) {
      activateTab((activeIndex - 1 + tabs.length) % tabs.length);
    } else {
      activateTab((activeIndex + 1) % tabs.length);
    }
  });
});

// Model 
  const openBtn = document.getElementById("openModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const modal = document.getElementById("modal");

  openBtn.addEventListener("click", () => {
    modal.classList.add("active");

  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  document.getElementById("downloadForm").addEventListener("submit", function (e) {
    e.preventDefault();

    alert("Form submitted! Download will start.");

    modal.classList.remove("active");
  });