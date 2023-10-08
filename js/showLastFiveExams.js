window.addEventListener('DOMContentLoaded', () => {
    getTimelineData("Wszystkie");
    getExamsType();
})
    
let myChart2 = ""

function getExamsType(){
    let btns = document.querySelectorAll('.list-item');

    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            myChart2.destroy()
            let element = e.target;
            let id = element.dataset.id;
            getTimelineData(id)
        })
    })
}

async function getTimelineData(data){
    try{
        let request = await fetch('php/getTimeline.php',{
            method: 'post',
            body: `id=${data}`,
            headers: {
                'Content-type': "application/x-www-form-urlencoded",
            }
        });
        let response = await request.json();

       // console.log(response)
        showResults(response)
    }catch(error){
        console.log(error)
    }
}

function showResults(response){
    let data = {
        labels: ['1,' , '2.' , '3.' , '4.' , '5.'],
        datasets: [{
            label: 'Ostatnie 5 rozwiązanych przez ciebie egzaminów',
            data: response.reverse().map(res => res.wynik),
            borderColor: 'rgb(4, 175, 217, 1)',
            backgroundColor: 'rgb(4, 175, 217, 1)',
            borderWidth: 2
        }],
    };

    let options = {
        responsive: true, 
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 100, 
            }
        },
    };

    let ctx = document.getElementById('timeline').getContext('2d');

    myChart2 = new Chart(ctx, {
        type: 'line', 
        data: data, 
        options: options 
    });
}
