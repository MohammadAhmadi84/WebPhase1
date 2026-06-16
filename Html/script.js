const menuItems = document.querySelectorAll('.pagesNavigation ul');

    menuItems.forEach(item => {
        item.style.cursor = 'pointer';

        
    item.addEventListener('click', () => {
        
        const pageName = item.innerText.toLowerCase().trim();

        
        if (pageName === 'home') {
            window.location.href = 'HomePage.html'; // یا هر اسمی که برای صفحه اصلی گذاشتی
        } else if (pageName === 'contact') {
            window.location.href = 'Contact.html'; // چون متن دو کلمه‌ای است، به فایل about.html وصلش میکنیم
        }else if (pageName === 'recipes') {
            window.location.href = 'RcipeDetails.html'; // چون متن دو کلمه‌ای است، به فایل about.html وصلش میکنیم
        }else if (pageName === 'about us') {
            window.location.href = 'Blogpost.html'; // چون متن دو کلمه‌ای است، به فایل about.html وصلش میکنیم
        }else if (pageName === 'blog') {
            window.location.href = 'BlogList.html'; // چون متن دو کلمه‌ای است، به فایل about.html وصلش میکنیم
        }
    });
});