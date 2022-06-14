const db= firebase.firestore();

const taskForm= document.querySelector('#task-form');
const tasksContainer= document.getElementById('tasks-container');
const buttonFirestoreV9= document.getElementById('buttonFirestoreV9');


let editStatus= false;
let id= "";

const saveTask= (title, description)=> {
    return db.collection('tasks').doc().set({
        title,
        description
    });
}

const onGetTasks= (callback)=> db.collection('tasks').onSnapshot(callback);

const deleteTask= (id)=> db.collection('tasks').doc(id).delete();

const getTask= (id)=> db.collection('tasks').doc(id).get();

const updateTask= (id, taskUpdated)=> db.collection('tasks').doc(id).update(taskUpdated);


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
                    <button class="btn btn-success btn-edit" data-id=${doc.id}>Edit</button>
                </div>
            </div>`

            const btnsDelete= document.querySelectorAll('.btn-delete');
            btnsDelete.forEach((btn)=> {
                btn.addEventListener('click', async(e)=> {
                    await deleteTask(e.target.dataset.id);
                });
            });

            const btnsEdit= document.querySelectorAll('.btn-edit');
            btnsEdit.forEach((btn)=> {
                btn.addEventListener('click', async(e)=> {
                    const doc= await getTask(e.target.dataset.id);
                    
                    editStatus= true;
                    id= doc.id;
                    taskForm['task-title'].value= doc.data().title;
                    taskForm['task-description'].value= doc.data().description;
                    taskForm['btn-task-form'].innerText= "Update"
                });
            });
        });
    });
});



taskForm.addEventListener('submit', async(e)=> {
    e.preventDefault();

    const title= taskForm['task-title'];
    const description= taskForm['task-description'];

    if(!editStatus){
        await saveTask(title.value, description.value);
    }
    else{
        await updateTask(id, {
            title: title.value, 
            description: description.value
        });

        editStatus= false;
        id= "";
        taskForm['btn-task-form'].innerText= "Save";
    }

    title.focus();

    taskForm.reset();
});


buttonFirestoreV9.addEventListener('click', ()=> {
    window.location= 'index-v9.html'; 
});