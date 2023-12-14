function anticheat(){
    let userActions = [];
    window.addEventListener('blur', () => {
        let currentData = new Date();
        let actionData = currentData.getTime();
        userActions.push({data: actionData});
        sessionStorage.setItem('userActions', JSON.stringify(userActions))
    })
}

export { anticheat }