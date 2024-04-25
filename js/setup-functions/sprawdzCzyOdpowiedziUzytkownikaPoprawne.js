import { checkIdIsValid } from "../sprawdzanie/checkIdIsValid";



// funkcja zlicza poprawne odpowiedzi gdzy odpowiedz użydkownika do komkretnego pytania jest zgodna z poprawną
// nadaje odpowiednie klasy dla dobrej oraz złej odpowiedzi ponadto zlicza procentowy wynik oraz przekazuje te parametry do funkcji wyświetlającej wynik
export function sprawdzCzyOdpowiedziUzytkownikaPoprawne(odp, poprawne){
    let answersList = document.querySelectorAll('.answers-list');
    let result = 0;
    let examID = document.querySelector('.exam-id').value;
    let id = examID.slice(0,5);

    
    checkIdIsValid()

    answersList.forEach((ans, i) => {
        let answers = ans.querySelectorAll('.answer');
        answers.forEach(answer => {
            if(answer.textContent == odp[i].odp){
                //console.log(i ,answer.textContent, user_odp[i]?.odp)
                if(poprawne[i].poprawna == odp[i]?.odp){
                    answer.classList.add('odpgood');
                    result++;
                }else{
                    answer.classList.add('odpbad');
                    let answersElement = answer.parentElement;
                    let otherAnswers = [...answersElement.querySelectorAll('.answer')];
                    otherAnswers.forEach(answer => {
                        if(answer.textContent == poprawne[i].poprawna){
                                answer.classList.add('active');
                        }
                    })
                }
            }

           if(odp[i]?.odp == "Brak odpowiedzi"){  
                if(answer.textContent == poprawne[i].poprawna){
                    //console.log(poprawne[i].poprawna)
                    answer.style.background = 'royalblue';
                }
            }
        })
    })

    let wynik = (result/parseInt(poprawne.length) * 100).toFixed(1);
    pokazWynik(result,poprawne.length,wynik);
    if(poprawne.length == 40){
        sendExamData(wynik,id);
    }
}

async function sendExamData(wynik, id){
    try{
        let dataStart = sessionStorage.getItem('startedExamData');
        let data = new Date().getTime();
        let formData = new FormData();
        let userActions = sessionStorage.getItem("userActions") ?? 0;

        formData.append("date-end",data);
        formData.append("wynik",wynik);
        formData.append("exam-id",id);
        formData.append("data-start",dataStart);
        formData.append("userActions", userActions)

        let request = await fetch('php/storageExam.php',{
            method: 'post',
            body: formData
        })

        let response = await request.text()

        console.log(response)
    }catch(error){
        console.log(error)
    }
}