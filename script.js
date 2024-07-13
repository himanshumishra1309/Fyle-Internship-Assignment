const contactButton = document.getElementById('contactButton');
const popupForm = document.getElementById('popupForm');

contactButton.addEventListener('click', () => {
    popupForm.style.display = 'flex';
});

popupForm.addEventListener('click', (event) => {
    if (event.target === popupForm) {
        popupForm.style.display = 'none';
    }
});

const imageWrapper = document.querySelector('.image-wrapper');
const imageItems = document.querySelectorAll('.image-wrapper > *');
const imageLength = imageItems.length;
const perView = 3;
let totalScroll = 0;
const delay = 2000;

imageWrapper.style.setProperty('--per-view', perView);
for (let i = 0; i < perView; i++) {
    imageWrapper.insertAdjacentHTML('beforeend', imageItems[i].outerHTML);
}

let autoScroll = setInterval(scrolling, delay);

function scrolling() {
    totalScroll++;
    if (totalScroll >= imageLength + 1) {
        clearInterval(autoScroll);
        totalScroll = 0;
        imageWrapper.style.transition = '0s';
        imageWrapper.style.left = '0';
        setTimeout(() => {
            autoScroll = setInterval(scrolling, delay);
        }, 100); // Add a small delay before restarting
    } else {
        const widthEl = document.querySelector('.image-wrapper > :first-child').offsetWidth + 20; // Adjust width calculation with gaps
        imageWrapper.style.left = `-${totalScroll * widthEl}px`;
        imageWrapper.style.transition = '.3s';
        updateDots();
    }
}

const slides = document.querySelectorAll('.image-wrapper > *');
const dots = document.querySelectorAll('.dot');
let activeDotIndex = 0;

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    activeDotIndex = totalScroll % imageLength;
    if (dots[activeDotIndex]) {
        dots[activeDotIndex].classList.add('active');
    }
}

function currentSlide(index) {
    clearInterval(autoScroll);
    totalScroll = index - 1;
    scrolling();
    autoScroll = setInterval(scrolling, delay);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => currentSlide(index));
});

slides.forEach((slide) => {
    slide.addEventListener('mouseover', () => {
        clearInterval(autoScroll);
    });
    slide.addEventListener('mouseout', () => {
        autoScroll = setInterval(scrolling, delay);
    });
});

updateDots();


const contentItems = document.querySelectorAll('.content-item');
const mainImage = document.getElementById('mainImage');
let currentIndex = 0;
let autoChange;

function showSlide(index) {
    contentItems.forEach(i => i.classList.remove('active'));
    contentItems[index].classList.add('active');
    mainImage.src = contentItems[index].getAttribute('data-image');
}

function startAutoChange() {
    autoChange = setInterval(() => {
        currentIndex = (currentIndex + 1) % contentItems.length;
        showSlide(currentIndex);
    }, 2000);
}

contentItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        clearInterval(autoChange);
        currentIndex = index;
        showSlide(index);
        startAutoChange();
    });
});

showSlide(currentIndex);
startAutoChange();
