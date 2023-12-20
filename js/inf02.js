let loadMore = document.querySelector('.pivot');
let btns = document.querySelectorAll('.db-btn');
let pageNum = 0;

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            getData(pageNum);  
            pageNum++;       
        }
    })
})

loadMore.addEventListener('click', () => {
    pageNum = 1;
    getData(pageNum);
})

observer.observe(loadMore);

async function getData(pageNum){

    let main = document.querySelector('.question-center');


    try{
        let request = await fetch(`php/inf02.php`,{
            method: 'post',
            body: "page=" + pageNum,
            headers: {
                'Content-type': "application/x-www-form-urlencoded",
            }
        });
        
        let response = await request.json();
        response.forEach(res => {
            let text = `
            <div class="id">Pytanie: ${res.ID}</div>
            <div class="img">
                <img src="${res.obrazek}" alt="">
            </div>
            <div class="title">
            </div>
            <div class="answers">
                <ul class="answers-list">
                    <li class="answer"><p></p></li>
                    <li class="answer"><p></p></li>
                    <li class="answer"><p></p></li>
                    <li class="answer"><p></p></li>
                </ul>
            </div>
            <button class="show">Pokaż odpowiedz</button>`;

            let element = document.createElement('div');
            element.classList.add('pytanie');
            element.innerHTML = text;
            main.insertBefore(element, loadMore);

            let title = element.querySelector('.title');
            title.textContent = res.title

            let answers = [res.A,res.B,res.C,res.D];
            let newAnswer = [];
            answers.forEach((answer,i) => {
                newAnswer[i] = answer.slice(3,answer.length);
            })

            let answerEl = element.querySelectorAll('.answer');

            answerEl.forEach((answer,i) => {
                answer.textContent = newAnswer[i];
            })

            let showBtn = element.querySelector('.show');

            showBtn.addEventListener('click', () => {
                answerEl.forEach(answer => {
                    let poprawna = res.poprawna_odp.slice(3,res.poprawna_odp.length);
                    //console.log(answer.textContent+" = "+poprawna)
                    if(answer.textContent === poprawna){
                        answer.classList.toggle('active');
                    }
                })
             })


            //answerEl.forEach(answer => {
            //    let poprawna = res.poprawna_odp.slice(3,res.poprawna_odp.length);
            //    console.log(answer.textContent+" = "+poprawna)
            //    if(answer.textContent === poprawna){
            //       answer.classList.toggle('active');
            //    }
            // })
        })
    }catch(error){
        console.log(error);
    }
}
