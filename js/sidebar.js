let btnContent = document.querySelector('.btn-forward');
let btnBack = document.querySelector('.btn-back')
let sidebar = document.querySelector('.sidebar');
let btns = document.querySelectorAll('.btn');


btns.forEach(btn => {
    btn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        btnContent.classList.toggle('active');
        btnBack.classList.toggle('active');
    })
})
