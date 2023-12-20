function anticheat(){
    let storageUserActions = sessionStorage.getItem('userActions');
    let userActions = [];

    storageUserActions !== null ? userActions = JSON.parse(storageUserActions) : userActions = [];
    window.addEventListener('blur', () => {
        let d = new Date,
        dformat = [d.getMonth()+1,
                   d.getDate(),
                   d.getFullYear()].join('/')+' '+
                  [d.getHours(),
                   d.getMinutes(),
                   d.getSeconds()].join(':');
        let actionData = dformat;
        userActions.push({data: actionData});
        sessionStorage.setItem('userActions', JSON.stringify(userActions))
    })
}

export { anticheat }