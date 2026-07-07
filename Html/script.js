const menuItems = document.querySelectorAll('.pagesNavigation ul');

    menuItems.forEach(item => {
        item.style.cursor = 'pointer';

        
    item.addEventListener('click', () => {
        
        const pageName = item.innerText.toLowerCase().trim();

        
        if (pageName === 'home') {
            window.location.href = 'HomePage.html'; 
        } else if (pageName === 'contact') {
            window.location.href = 'Contact.html'; 
        }else if (pageName === 'recipes') {
            window.location.href = 'RcipeDetails.html'; 
        }else if (pageName === 'about us') {
            window.location.href = 'Blogpost.html'; 
        }else if (pageName === 'blog') {
            window.location.href = 'BlogList.html'; 
        }
    });
});


const playButton = document.querySelector('.PlayButton');


    if (playButton) {
    playButton.style.cursor = 'pointer';

    
    playButton.addEventListener('click', () => {
        window.location.href = 'RcipeDetails.html';
    });
}

const searchInput = document.querySelector('.searchArea');
const searchForm = document.querySelector('.blogSearch form');
const blogItems = document.querySelectorAll('.blogMenuItem');
const sidebarRecipes = document.querySelectorAll('.recipeBarItem'); 

if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
    });
}


if (searchInput) {
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase().trim();

        
        blogItems.forEach(item => {
            const titleElement = item.querySelector('.blogDiscription h2');
            if (titleElement) {
                const titleText = titleElement.innerText.toLowerCase();
                if (titleText.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none'; 
                }
            }
        });

        sidebarRecipes.forEach(recipe => {
            const recipeTitleElement = recipe.querySelector('h3');
            if (recipeTitleElement) {
                const recipeTitleText = recipeTitleElement.innerText.toLowerCase();
                if (recipeTitleText.includes(searchTerm)) {
                    recipe.style.display = 'flex';
                } else {
                    recipe.style.display = 'none'; 
                }
            }
        });
    });
}

const pageButtons = document.querySelectorAll('.blogNavigation li');
const allBlogItems = document.querySelectorAll('.blogMenuItem');
const itemsPerPage = 2; 

function showPage(pageNumber) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    allBlogItems.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.style.display = 'flex'; 
        } else {
            item.style.display = 'none'; 
        }
    });

    pageButtons.forEach(btn => {
        if (btn.innerText === String(pageNumber)) {
            btn.style.backgroundColor = 'black';
            btn.style.color = 'white';
        } else {
            if (btn.innerText !== '...' && !btn.querySelector('img')) {
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }
        }
    });
}

pageButtons.forEach(button => {
    button.style.cursor = 'pointer';

    button.addEventListener('click', () => {
        const clickedPage = button.innerText.trim();

        const pageNumber = parseInt(clickedPage);

        if (!isNaN(pageNumber) && pageNumber <= 3) {
            showPage(pageNumber);
        }
    });
});

if (allBlogItems.length > 0) {
    showPage(1);
}

const recipeCards = document.querySelectorAll('.recipe-card');

recipeCards.forEach(card => {
    card.style.cursor = 'pointer';
    
    card.addEventListener('click', () => {
        window.location.href = 'RcipeDetails.html';
    });
});

const hamburgerBtn = document.getElementById('hamburgerBtn');
const pagesNavigation = document.getElementById('pagesNavigation');

hamburgerBtn.addEventListener('click', () => {
  const isOpen = pagesNavigation.classList.toggle('open');
  hamburgerBtn.classList.toggle('active', isOpen);
  hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

document.addEventListener('click', (event) => {
  const isClickInsideNav = pagesNavigation.contains(event.target);
  const isClickOnButton = hamburgerBtn.contains(event.target);

  if (!isClickInsideNav && !isClickOnButton && pagesNavigation.classList.contains('open')) {
    pagesNavigation.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }
});



const BASE_URL = "https://foodieland-oq9b.onrender.com";


const SENDING_MESSAGES = [
    { delay: 0, text: "در حال ارسال..." },
    { delay: 5000, text: "سرور رایگان است و ممکن است کمی طول بکشد..." },
    { delay: 15000, text: "سرور در حال بیدار شدن است، لطفاً کمی صبر کنید..." },
    { delay: 30000, text: "تقریباً تمام شد، فقط چند ثانیه دیگر..." },
];


function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setStatusMessage(statusEl, type, html) {
    statusEl.className = `nlStatusMessage nl${type}`; // nlSuccess | nlError | nlInfo
    statusEl.innerHTML = html;
}


function setButtonLoading(button, isLoading) {
    button.disabled = isLoading;
    if (isLoading) {
        button.dataset.originalValue = button.value;
        button.value = "در حال ارسال...";
    } else {
        button.value = button.dataset.originalValue || "Subscribe";
    }
}


async function subscribeNewsletter(email) {
    const response = await fetch(`${BASE_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        if (response.status === 409) {
            throw new Error("این ایمیل قبلاً در خبرنامه ثبت شده است.");
        }
        if (response.status === 400) {
            throw new Error(data?.message || "ایمیل واردشده معتبر نیست.");
        }
        if (response.status >= 500) {
            throw new Error("سرور با مشکل مواجه شده. لطفاً چند لحظه دیگر دوباره امتحان کنید.");
        }
        throw new Error(data?.message || `خطا در ثبت‌نام (کد ${response.status}).`);
    }

    return data;
}

function initNewsletterForm() {
    const subscribeForm = document.querySelector(".Subscribe form");
    if (!subscribeForm) return; 

    const emailInput = subscribeForm.querySelector(".EmailInput");
    const submitButton = subscribeForm.querySelector(".SubscribeButton");

    let statusEl = subscribeForm.querySelector(".nlStatusMessage");
    if (!statusEl) {
        statusEl = document.createElement("p");
        statusEl.className = "nlStatusMessage";
        subscribeForm.appendChild(statusEl);
    }

    subscribeForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();

        if (!email) {
            setStatusMessage(statusEl, "Error", "لطفاً ایمیل خود را وارد کنید.");
            return;
        }

        if (!isValidEmail(email)) {
            setStatusMessage(statusEl, "Error", "فرمت ایمیل واردشده صحیح نیست.");
            return;
        }

        setButtonLoading(submitButton, true);
        setStatusMessage(statusEl, "Info", SENDING_MESSAGES[0].text);

        const timers = SENDING_MESSAGES.slice(1).map(({ delay, text }) =>
            setTimeout(() => setStatusMessage(statusEl, "Info", text), delay)
        );

        try {
            await subscribeNewsletter(email);

            setStatusMessage(statusEl, "Success", "✓ با موفقیت در خبرنامه ثبت‌نام شدید!");
            emailInput.value = "";
        } catch (error) {
            console.error("subscribeNewsletter error:", error);

            const friendlyMessage =
                error.message === "Failed to fetch"
                    ? "امکان اتصال به سرور وجود ندارد. اتصال اینترنت خود را بررسی کنید."
                    : error.message;

            setStatusMessage(
                statusEl,
                "Error",
                `${friendlyMessage} <button type="button" class="nlRetryLink" id="nlRetryBtn">تلاش مجدد</button>`
            );

            const retryBtn = statusEl.querySelector("#nlRetryBtn");
            if (retryBtn) {
                retryBtn.addEventListener("click", () => subscribeForm.requestSubmit());
            }
        } finally {
            timers.forEach(clearTimeout);
            setButtonLoading(submitButton, false);
        }
    });
}

document.addEventListener("DOMContentLoaded", initNewsletterForm);