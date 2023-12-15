function anticheat(){
    let storageUserActions = sessionStorage.getItem('userActions');
    let userActions = [];

    storageUserActions !== null ? userActions = JSON.parse(storageUserActions) : userActions = [];
    window.addEventListener('blur', () => {
        let currentData = new Date();
        let actionData = currentData;
        userActions.push({data: actionData});
        sessionStorage.setItem('userActions', JSON.stringify(userActions))
    })
}

export { anticheat }