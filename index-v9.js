import { getTasks, saveTask, onGetTasks, deleteTask, getTask, updateTask } from './firebase-v9.js';

// Referencias HTML
const tasksContainer= document.getElementById('tasks-container');
const taskForm= document.getElementById('task-form');
let editStatus= false;
let id= '';


// Ejecutar un evento cuando la aplicacion cargue
window.addEventListener('DOMContentLoaded', async ()=> {
    onGetTasks(( querySnapshot )=> {
        let html= '';
        
        querySnapshot.forEach( doc => {
            const { title, description }= doc.data();
            html+= `
                <div class="card card-body mt-2 border-primary">
                    <h3 class="h5"> ${ title } </h3>
                    <p> ${ description } </p>
                    <div>
                        <button class="btn btn-danger btn-delete" data-id="${ doc.id }"> Delete </button>
                        <button class="btn btn-info btn-edit" data-id="${ doc.id }"> Edit </button>
                    </div>
                </div>
            `;
        });
    
        tasksContainer.innerHTML= html;
        const btnsDelete= tasksContainer.querySelectorAll('.btn-delete');
        const btnsEdit= tasksContainer.querySelectorAll('.btn-edit');

        btnsDelete.forEach( btn => {
            btn.addEventListener( 'click', ( event )=> {
                const { target: { dataset } }= event;
                deleteTask( dataset.id );
            });
        });

        btnsEdit.forEach( btn => {
            btn.addEventListener( 'click', async ( event )=> {
                const { target: { dataset } }= event;
                const task= await getTask( dataset.id );
                taskForm['task-title'].value= task.data().title;
                taskForm['task-description'].value= task.data().description;
                editStatus= true;
                id= dataset.id;
                taskForm['btn-task-save'].innerText= 'Update';
            });
        });
    });
});

taskForm.addEventListener('submit', ( e )=> {
    e.preventDefault();

    const title= taskForm['task-title'];
    const description= taskForm['task-description'];

    if( !editStatus ){
        saveTask( title.value, description.value );
    }
    else{
        updateTask( id, {'title': title.value, 'description': description.value} );
        editStatus= false;
    }
    taskForm.reset();
});