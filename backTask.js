
// ADD YOUR SERVERLESS INFO 

const connector = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""

};

class BackTask{

    constructor(){
        firebase.initializeApp(connector);
        this.db = firebase.firestore().collection('todo');
        this.unsub;   
    }

    async addTask(newTask){
        const now = new Date();
        const dTask = {
            task: newTask,
            tDate: firebase.firestore.Timestamp.fromDate(now)
        };
        return await this.db.add(dTask);
    }
    
    // Listener to information flowing 

    getTask(callback){
        this.unsub = this.db.orderBy('tDate')
        .onSnapshot(snapshot =>{
            snapshot.docChanges().forEach(element => {
                if(element.type === 'added'){
                    callback(element.doc.data(), element.doc.id);
                }else if(element.type ==='removed'){
                    console.log(element.doc.id);
                }
            });
        });

    }
    deleteTask(id){
        this.db.doc(id).delete().then(() =>{
            console.log('Task deleted');
        }).catch(err => console.log(err));

    }

}

