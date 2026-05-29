const cards = Array.from(document.querySelectorAll('.destination-card'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const mainTitle = document.getElementById('mainTitle');
const subTitle = document.getElementById('subTitle');
const description = document.getElementById('description');
const container = document.getElementById('carouselContainer');

let currentIndex = 2; // စတင်မယ့် ကတ်အညွှန်း (၃ ခုမြောက်ကတ်)
let isTransitioning = false; // ကတ်ပြောင်းနေစဉ် MouseMove ကို ခေတ္တ ပိတ်ထားရန် Variable

// Update Carousel Positioning & 3D Layering
function updateCarousel() {
    isTransitioning = true; // ကတ်နေရာစပြင်တာနဲ့ မောက်စ်သက်ရောက်မှုကို ပိတ်မယ်

    cards.forEach((card, index) => {
        card.classList.remove('active');
        
        let offset = index - currentIndex;
        
        if (offset < -2) offset += cards.length;
        if (offset > 2) offset -= cards.length;

        
        if (offset === 0) {
            card.classList.add('active');
            card.style.transform = `translateX(0) scale(1.15) translateZ(120px) rotateY(0deg)`;
            card.style.zIndex = 5;
            card.style.opacity = '1';
            card.style.filter = 'none';
            
            // Text Update
            if(mainTitle) mainTitle.textContent = card.dataset.title;
            if(subTitle) subTitle.textContent = `— ${card.dataset.subtitle}`;
            if(description) description.textContent = card.dataset.desc;
            
        } else if (offset === 1 || offset === -4) {
            // Right Card
            card.style.transform = `translateX(95%) scale(0.85) rotateY(-25deg) translateZ(0px)`;
            card.style.zIndex = 4;
            card.style.opacity = '0.7';
            card.style.filter = 'blur(1px)';
        } else if (offset === -1 || offset === 4) {
            // Left Card
            card.style.transform = `translateX(-95%) scale(0.85) rotateY(25deg) translateZ(0px)`;
            card.style.zIndex = 4;
            card.style.opacity = '0.7';
            card.style.filter = 'blur(1px)';
        } else if (offset === 2 || offset === -3) {
            // Far Right Card
            card.style.transform = `translateX(180%) scale(0.7) rotateY(-40deg) translateZ(-100px)`;
            card.style.zIndex = 3;
            card.style.opacity = '0.35';
            card.style.filter = 'blur(2px)';
        } else if (offset === -2 || offset === 3) {
            // Far Left Card
            card.style.transform = `translateX(-180%) scale(0.7) rotateY(40deg) translateZ(-100px)`;
            card.style.zIndex = 3;
            card.style.opacity = '0.35';
            card.style.filter = 'blur(2px)';
        } else {
            card.style.transform = `translateX(0) scale(0) translateZ(-200px)`;
            card.style.zIndex = 0;
            card.style.opacity = '0';
        }
    });

    // ကတ်တွေ နေရာရွေ့တဲ့ Animation Speed (0.5s = 500ms) ပြီးသွားတဲ့အခါမှ
    // MouseMove သက်ရောက်မှုကို ပြန်ဖွင့်ပေးမှာဖြစ်ပါတယ်။
    setTimeout(() => {
        isTransitioning = false;
    }, 500); 
}

/* --- Click Events --- */
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
});

cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (currentIndex !== index) {
            currentIndex = index;
            updateCarousel();
        }
    });
});

/* --- Mouse Move Hover Effect --- */
container.addEventListener('mousemove', (e) => {
    // ကတ်တွေ ရွေ့လျားနေတုန်းဆိုရင် MouseMove ကုဒ်ကို အလုပ်မလုပ်ခိုင်းဘဲ ကျော်သွားစေပါတယ်
    if (isTransitioning) return; 

    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; 
    
    const activeCard = document.querySelector('.destination-card.active');
    if (activeCard) {
        
        activeCard.style.transform = `translateX(0) scale(1.15) translateZ(120px) rotateY(${x * 25}deg)`;
    }
    
    // if(mainTitle && subTitle) {
    //     mainTitle.style.transform = `translateX(${x * 10}px)`;
    //     subTitle.style.transform = `translateX(${x * 5}px)`;
    // }
});

/* --- Mouse Leave --- */
container.addEventListener('mouseleave', () => {
    updateCarousel();
    if(mainTitle && subTitle) {
        mainTitle.style.transform = 'translateX(0)';
        subTitle.style.transform = 'translateX(0)';
    }
});

// Initial Load
updateCarousel();
