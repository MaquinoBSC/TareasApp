const db= firebase.firestore();

const taskForm= document.querySelector('#task-form');
const tasksContainer= document.getElementById('tasks-container');

const saveTask= (title, description)=> {
    return db.collection('tasks').doc().set({
        title,
        description
    });
}

const onGetTasks= (callback)=> db.collection('tasks').onSnapshot(callback);

const deleteTask= (id)=> db.collection('tasks').doc(id).delete();


window.addEventListener('DOMContentLoaded', async(e)=> {
    onGetTasks((querySnapshot)=> {

        tasksContainer.innerHTML= "";

        querySnapshot.forEach((doc)=> {
            console.log(doc.data());
            const task= doc.data();
            task.id= doc.id;
    
            tasksContainer.innerHTML += `
            <div class="card card-body mt-2 border-primary">
                <h3 class="h5">${task.title}</h3>
                <p>${task.description}</p>
                <div>
                    <button class="btn btn-warning btn-delete" data-id=${doc.id}>Delete</button>
                    <button class="btn btn-success">Edit</button>
                </div>
            </div>`

            const btnsDelete= document.querySelectorAll('.btn-delete');
            btnsDelete.forEach((btn)=> {
                btn.addEventListener('click', async(e)=> {
                    await deleteTask(e.target.dataset.id);
                });
            });
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
