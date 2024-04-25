export function generateData(response,id){
    let main = document.querySelector('.question-center');
    let btnCenter = document.querySelector('.btn-center');
    let dobre_odpowiedzi = [];
    let elements = [];
    let examID = document.querySelector('.exam-id');
    let sprawdz = document.createElement('div');

    examID.value = id

    sprawdz.classList.add('sprawdz');
    sprawdz.textContent = "Sprawdz Odpowiedzi";
    btnCenter.append(sprawdz)

    let losuj = document.createElement('div');

    losuj.classList.add('losuj');
    losuj.textContent = "Losuj Dalej";
    btnCenter.append(losuj)

    let element_sprawdz = document.querySelector('.sprawdz');
    if(response && response.length > 0){
        response.forEach((res, i) => {
            let text = `
                <div class="id-element">
                    <span>
                        Pytanie: <span class="id">${i+1}</span>
                    </span>
                </div>
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
                </div>`;
    
            let element = document.createElement('div');
            element.classList.add('pytanie')
            element.classList.add(i+1)
            element.innerHTML = text;
            main.append(element);

            let title = element.querySelector('.title');
            title.textContent = res.title

            let answers = [res.A,res.B,res.C,res.D];
            let answerEl = element.querySelectorAll('.answer');

            answerEl.forEach((answer,i) => {
                answer.textContent = answers[i];
            })

            dobre_odpowiedzi.push({poprawna: res.poprawna_odp});
            elements.push(element)
        })    
        sprawdzanie(elements,dobre_odpowiedzi)
        losujPonownie();
    }else {
        //console.log("No data to generate.")
    }
}
