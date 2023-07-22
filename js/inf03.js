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
        let request = await fetch(`php/inf03.php`,{
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
                            ${res.title}
                        </div>
                        <div class="answers">
                            <ul class="answers-list">
                                <li class="answer">${res.A}</li>
                                <li class="answer">${res.B}</li>
                                <li class="answer">${res.C}</li>
                                <li class="answer">${res.D}</li>
                            </ul>
                        </div>
                        <button class="show">Pokaż odpowiedz</button>`;

                    let element = document.createElement('div');
                    element.classList.add('pytanie');
                    element.innerHTML = text;
                    main.insertBefore(element, loadMore);

                    let showBtn = element.querySelector('.show');

                    let answersElement = element.querySelectorAll('.answer');

                    showBtn.addEventListener('click', () => {
                        answersElement.forEach(answer => {
                            if(answer.textContent === res.poprawna_odp){
                                answer.classList.toggle('active');
                            }
                        })
                    })
        })

        console.log(response);

    }catch(error){
        console.log(error);
    }
}
