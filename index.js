const db= firebase.firestore();

const taskForm= document.querySelector('#task-form');
const tasksContainer= document.getElementById('tasks-container');

const saveTask= (title, description)=> {
    return db.collection('tasks').doc().set({
        title,
        description
    });
}

const getTasks= ()=> db.collection('tasks').get();

const onGetTasks= (callback)=> db.collection('tasks').onSnapshot(callback)


window.addEventListener('DOMContentLoaded', async(e)=> {
    onGetTasks((querySnapshot)=> {
        tasksContainer.innerHTML= "";
        
        querySnapshot.forEach(doc=> {
            console.log(doc.data());
            const task= doc.data();
    
            tasksContainer.innerHTML += `
            <div class="card card-body mt-2 border-primary">
                <h3 class="h5">${task.title}</h3>
                <p>${task.description}</p>
                <div>
                    <button class="btn btn-warning">Delete</button>
                    <button class="btn btn-success">Edit</button>
                </div>
            </div>`
        });
    });

});



taskForm.addEventListener('submit', async(e)=> {
    e.preventDefault();

    const title= taskForm['task-title'];
    const description= taskForm['task-description'];

    await saveTask(title.value, description.value);
    title.focus();

    taskForm.reset();

});
