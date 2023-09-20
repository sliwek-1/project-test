let showBtn = document.querySelector('.change-passwd-user');
let closeBtn = document.querySelector('.close-change-passwd-btn');
let changePasswd = document.querySelector('.change-passwd-container');
let submitBtn = document.querySelector('.change-passwd-btn');

closeBtn.addEventListener('click', (e) => {
    changePasswd.classList.remove('active')
})

showBtn.addEventListener('click', (e) => {
    changePasswd.classList.toggle('active');
})

submitBtn.addEventListener('click', async (e) => {
    try{
        e.preventDefault();
        let form = document.querySelector('.chnage-passwd');
        let formData = new FormData(form)
        let request = await fetch('php/change-passwd.php',{
            method: 'post',
            body: formData
        })

        let response = await request.text();

        if(response == "success"){
            location.reload();
        }
    }catch(error){
        console.log(error);
    }
})