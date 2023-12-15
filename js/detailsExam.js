window.addEventListener('DOMContentLoaded', () => {
    let detalisElement = document.querySelector('.user-details');
    let cover = document.querySelector('.cover');
    let delBtn = document.querySelector('.del-btn');

    delBtn.addEventListener('click', () => {
        detalisElement.classList.remove('active');
        cover.classList.remove('active');
        let detalis = document.querySelector('.details').innerHTML = "";
    })

    showDetalis();
})

function showDetalis(){
    let btns = document.querySelectorAll('.btn');
    let detalisElement = document.querySelector('.user-details');
    let cover = document.querySelector('.cover');
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

                detalisElement.classList.add('active');
                cover.classList.add('active')
                generateData(response)
            }catch(error){
                //console.log(error);
            }
        })
    })
}

function generateData(data){
    let detalisElement = document.querySelector('.details');
    
    data.forEach((element, i) => {
        let text = `
            <tr>
                <td>Wykroczenie nr.:${i + 1}</td>
                <td>${element.id}</td>
                <td>${element.exam_id}</td>
                <td>${element.user_id}</td>
                <td>${element.action}</td>
            </tr>`;

        detalisElement.innerHTML += text;
    })
}
