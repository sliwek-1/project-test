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

        let response = await request.text()

        if(response == "success"){
            location.href = "/quiz/quiz-aplication//main.php";
        }
    }catch(error){
        console.log(error)
    }
})
