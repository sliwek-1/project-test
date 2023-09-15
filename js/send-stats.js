window.addEventListener('DOMContentLoaded', () => {
    sendStatsData();
    initialData()
})

let myCharts = "";

async function initialData(){
    try{
        let request = await fetch('php/getKlasyStats.php', {
            method: 'post',
            body: "select-klasa-stats=" + "wszystkie",
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })

        let response = await request.json();
        renderStats(response)
    }catch(error){
        console.log(error);
    }
}

function sendStatsData(){
    let sendBtn = document.querySelector('.send-klasa-stats');

    sendBtn.addEventListener('click', async (e) => {
        try{
            e.preventDefault();
            myCharts.destroy();
            let statsForm = document.querySelector('.stats-form');
            let formData = new FormData(statsForm);
            let request = await fetch('php/getKlasyStats.php', {
                method: 'post',
                body: formData
            })

            let response = await request.json();
            renderStats(response)
        }catch(error){
            console.log(error)
        }
    })
}

function renderStats(data){
    let array = Object.values(data);
    let result = 0;
    array.forEach(element => {
        let count = parseFloat(element.wynik);

        result += count;
    })
    drawChart(result, array.length);
}

function drawChart(result,length){
    let ctx = document.querySelector('#klasa-stats').getContext('2d');

    let date= {
        datasets: [{
            data: [(result/length).toFixed(2), 100-(result/length).toFixed(2)],
            backgroundColor: [
                'rgb(4, 175, 217, 1)',
                'rgba(0, 0, 0, 0.2)'
            ],
        }]
    };
    myCharts = new Chart(ctx, {
        type: 'doughnut',
        data: date,
    });
}