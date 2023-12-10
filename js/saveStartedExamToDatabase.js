window.addEventListener('DOMContentLoaded', () => {
    let startExamButton = document.querySelector('.startExam');
    let coverScreen = document.querySelector('.saveExam');
    startExamButton.addEventListener('click', async (e) => {
        e.preventDefault();
        try{
            coverScreen.classList.remove('active')
            sessionStorage.setItem('examSaveStatus', true)
            
            let examData = sessionStorage.getItem('startedExamData');

            let request = await fetch('php/saveStartedExam.php',{
                method: 'post',
                body: 'status=' + 'w trakcie&startData=' + examData,
                headers: {
                    'Content-type': "application/x-www-form-urlencoded",
                }
            })

            let response = await request.text();
            console.log(response)
        }catch(error){
            console.log(error);
        }
    })
})

function saveExam(examID, userID, status){
    
}

export { saveExam }