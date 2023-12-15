window.addEventListener('DOMContentLoaded', () => {
    showDetalis();
})

function showDetalis(){
    let btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
        btn.addEventListener('click',async (e) => {
            try{
                e.preventDefault();
                let currentElement = e.target.parentElement.parentElement;
                let examIdElement = currentElement.querySelector('.exam-id');
                let userIdElement = currentElement.querySelector('.user-id');

                let formData = new FormData();
                formData.append('examID', examIdElement.textContent);
                formData.append('userID', userIdElement.textContent);

                let request = await fetch('php/userDetails.php', {
                    method: 'post',
                    body: formData
                })

                let response = await request.json();

                generateData(response)
            }catch(error){
                console.log(error);
            }
        })
    })
}

function generateData(data){
    
}