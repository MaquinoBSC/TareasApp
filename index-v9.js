import { getTasks, saveTask, onGetTasks, deleteTask } from './firebase-v9.js';

// Referencias HTML
const tasksContainer= document.getElementById('tasks-container');
const taskForm= document.getElementById('task-form');


// Ejecutar un evento cuando la aplicacion cargue
window.addEventListener('DOMContentLoaded', async ()=> {
    onGetTasks(( querySnapshot )=> {
        let html= '';
        
        querySnapshot.forEach( doc => {
            const { title, description }= doc.data();
            html+= `
                <div>
                    <h3> ${ title } </h3>
                    <p> ${ description } </p>
                    <button class="btn-delete" data-id="${ doc.id }"> Delete </button>
                </div>
            `;
        });
    
        tasksContainer.innerHTML= html;
        const btnsDelete= tasksContainer.querySelectorAll('.btn-delete');

        btnsDelete.forEach( btn => {
            btn.addEventListener( 'click', ( event )=> {
                const { target: { dataset } }= event;
                deleteTask( dataset.id );
            });
        });
    });
});

taskForm.addEventListener('submit', ( e )=> {
    e.preventDefault();

    const title= taskForm['task-title'];
    const description= taskForm['task-description'];
    saveTask( title.value, description.value );
    taskForm.reset();
});