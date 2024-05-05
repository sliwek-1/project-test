export function clear(id){
    let main = document.querySelector('.question-center');
    let btnCenter = document.querySelector('.btn-center');
    let resultTitle = document.querySelector('.result-title')
    let resultWynik = document.querySelector('.wynik')
    let userActionsElement = document.querySelector('.userActions').textContent = "";
    let resultProcent = document.querySelector('.procent');
    let navQuestions = document.querySelector('.nav-questions');

    odpowiedzi_user = new Array(40).fill({odp: "Brak odpowiedzi", id: "Brak ID"});;
    resultTitle.textContent = "";
    resultProcent.textContent = "";
    resultWynik.textContent = "";
    main.innerHTML = "";
    btnCenter.innerHTML = "";
    sessionStorage.setItem('exam-id', id);
    sessionStorage.removeItem('response');
    sessionStorage.removeItem('odpowiedzi_user');
    sessionStorage.removeItem('poprawne');
    sessionStorage.removeItem('results');
    sessionStorage.removeItem('userActions');
    navQuestions.innerHTML = "";
}