let submit = document.querySelector('.submit');
let form = document.querySelector('.form');


submit.addEventListener('click', async (e) => {
    e.preventDefault();
    try{
        let formData = new FormData(form)
        let request = await fetch('php/login.php',{
            method: 'post',
            body: formData
        })

        let response = await request.json()
        
        let loginInfo = document.querySelector('.info-login');
        loginInfo.classList.add('active');
        loginInfo.textContent = response.status;
        if(response.status == "success"){
            sessionStorage.setItem('userID', JSON.stringify(response.id))
            location.href = "/quiz/quiz-aplication/main.php";
            console.log("success")
        }
    }catch(error){
        console.log(error)
    }
})
