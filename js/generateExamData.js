window.addEventListener('DOMContentLoaded', () => {
    getData()
})

let myChart = "";

async function getData(){
    try{
        let request = await fetch('php/sendUsersExams.php')

        let response = await request.json();
        generateData(response)
    }catch(error){
        console.log(error)
    }
}

function filterData(exam,data){
    let wynik = 0;
    if(exam == "wszystkie"){
        data.forEach(element => {
            wynik += parseFloat(element.wynik)
        })
        getResult(wynik,data.length)
    }else{
        let result = data.filter(element => element.egzamin_typ == exam)
        result.forEach(res => {
            wynik += parseFloat(res.wynik)
        })
        getResult(wynik,result.length)
    }
}

function generateData(data){
    let btns = document.querySelectorAll('.egzamin');

    filterData("wszystkie",data)
    
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            myChart.destroy();
            let currentBtn = e.target;
            let id = currentBtn.dataset.id;
            filterData(id,data)
            console.log("heloo")
        })
    })
}

function getResult(data,ilosc){
    let ctx = document.getElementById('wynik-chart').getContext('2d');
    let date= {
        labels: ['Dobrych odpowiedzi: ', 'Złych odpowiedzi'],
        datasets: [{
            data: [(data/ilosc).toFixed(2), 100-(data/ilosc).toFixed(2)],
            backgroundColor: [
                'rgb(4, 175, 217, 1)',
                'rgba(0, 0, 0, 0.2)'
            ],
        }]
    };
    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: date,
    });
}