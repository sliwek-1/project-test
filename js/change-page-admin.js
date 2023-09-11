let sections = document.querySelectorAll('.section');
let btns = document.querySelectorAll('.list-item');

btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let currentBtn = e.target;
        let currentID = currentBtn.dataset.id;

        btns.forEach(btn => {
            btn.classList.remove('active');
        })

        currentBtn.classList.add('active');
    

        sections.forEach(section => {
            section.classList.remove('active')
        })

        sections.forEach(section => {
           if(section.dataset.id == currentID){
                console.log("true")
                section.classList.add('active');
           }
        })
    })
})