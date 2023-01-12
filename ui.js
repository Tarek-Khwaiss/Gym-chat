

const clear = (list) => {
    list.innerHTML = '';
}


const renderUI = (list, data) => {
    const date = dateFns.distanceInWordsToNow(
        data.created_at.toDate(),
        {
            addSuffix: true
        }
    )
    let html =
        `<li class="list-group-item">
        <span class="username">${data.username}</span>
        <span class="message">${data.message}</span>    
        <div class="time">${date}</div>               
    </li>`

    list.innerHTML += html;

}







