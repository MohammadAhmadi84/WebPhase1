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
const sidebarRecipes = document.querySelectorAll('.recipeBarItem'); // انتخاب آیتم‌های سایدبار شما


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