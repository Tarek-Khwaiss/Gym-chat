const messageForm = document.querySelector('.send-message');
const changeUsernameForm = document.querySelector('.update-name');
const ul = document.querySelector('.chat-window');
const updateMessage = document.querySelector('.message-update');
const room = document.querySelector('.chatroom');

// local storage creation
let username = localStorage.getItem('username');

// 1st thing to do update the message card with new message
let initialUser = new ChatRoom('Tarek', 'crossfit');

// get current room
let currentRoom = 'crossfit';

// get messages
initialUser.updateMessages((data) => renderUI(ul, data));

room.addEventListener('click', e => {
    // 1. clear the list
    if (e.target.tagName === 'BUTTON') {
        clear(ul);
        // 2. get the value of the button
        const currRoom = e.target.textContent;

        // change the room name and re call updateMessages
        initialUser.updateRoom(currRoom);

        // reload the list with a query that targets the clicked button
        initialUser.updateMessages((data) => renderUI(ul, data));
    }

});


messageForm.addEventListener('submit', e => {

    e.preventDefault();
    const messageInput = messageForm.message.value;
    messageForm.reset();

    initialUser.addMessage(messageInput);
    // initialUser.updateMessages((data) => renderUI(data));

});

changeUsernameForm.addEventListener('submit', e => {

    e.preventDefault();
    const nameInput = changeUsernameForm.newname.value.trim();

    changeUsernameForm.reset();

    initialUser.updateName(nameInput);
    // show the message 

    updateMessage.textContent = `your name was updated to ${nameInput}`;
    setTimeout(() => updateMessage.textContent = '', 3000);
    localStorage.setItem('username', nameInput);
});

if (username) {
    initialUser.updateName(username);
} else {
    initialUser.updateName('new user');
}











// functional pattern to review later
// const chats = db.collection('chat');

// // function: adds a message document to firestore
// const addMessage = async (room, username, message) => {
//     let now = new Date();
//     const newMessage = {
//         message,
//         username,
//         room,
//         created_at: firebase.firstore.Timestamp.fromDate(now),
//     }
//     const response = await chats.add(newMessage);
//     return response;
// }

// // function that listens to changes in the database according to the room
// const listenToMessages = (room) => {
//     chats
//         .where('room', '==', room)
//         .orderBy('created_at')
//         .onSnapshot(snapshot => {
//             console.log(snapshot);
//             snapshot.docChanges().forEach(change => {
//                 if (change.type === 'added') {
//                     //update ui here or in the callback function
//                     console.log(change.doc.data());
//                 } else if (change.type === 'removed') {
//                     // update ui here or in a callback function
//                 }
//             });
//         });
// }

// const updateName = (newName) => {
//     // here we should consider using classes, now I see

// }


