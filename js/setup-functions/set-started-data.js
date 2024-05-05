export function setStartedData(){
    sessionStorage.removeItem('startedExamData')
    let data = new Date().getTime();
    sessionStorage.setItem('startedExamData', data);
}