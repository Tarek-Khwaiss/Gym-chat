class ChatRoom {

    constructor(userName, room) {
        this.chats = db.collection('chat');
        this.userName = userName;
        this.room = room;
        // global scope 
        this.unsub;
    }

    async addMessage(message) {
        const now = new Date();
        const newMessage = {
            message,
            username: this.userName,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now),
        }
        const response = await this.chats.add(newMessage);
        return response;
    }


    updateMessages(callback) {
        this.unsub =
            this.chats
                .where('room', '==', this.room)
                .orderBy('created_at')
                .onSnapshot(snapshot => {
                    console.log(snapshot);
                    snapshot.docChanges().forEach(change => {
                        if (change.type === 'added') {
                            //update ui here or in the callback function later defined
                            callback(change.doc.data());
                        } else if (change.type === 'removed') {
                            callback(change.doc.data());
                        }
                    });
                });
    }

    updateName(newName) {
        this.userName = newName;
    }

    updateRoom(room) {
        this.room = room;
        if (this.unsub)
            this.unsub();
    }
}