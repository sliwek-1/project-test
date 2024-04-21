window.addEventListener('DOMContentLoaded', () => {
    let btnsE = document.querySelectorAll('.list-item');
    btnsE.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            try{
                sessionStorage.setItem('examSaveStatus', true)
                
                let examID = sessionStorage.getItem('exam-id')
                let examData = sessionStorage.getItem('startedExamData');
    
                let request = await fetch('php/saveStartedExam.php',{
                    method: 'post',
                    body: 'status=' + 'w trakcie&startData=' + examData + '&examID=' + examID,
                    headers: {
                        'Content-type': "application/x-www-form-urlencoded",
                    }
                })
    
                let response = await request.text();
            }catch(error){
                console.log(error);
            }
        })
    })
    
})

function saveExam(examID, userID, status){
    
}

export { saveExam }