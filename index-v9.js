import { saveTask } from './firebase-v9.js';

// Ejecutar un evento cuando la aplicacion cargue
window.addEventListener('DOMContentLoaded', ()=> {
    
});

const taskForm= document.getElementById('task-form');
taskForm.addEventListener('submit', ( e )=> {
    e.preventDefault();

    const title= taskForm['task-title'];
    const description= taskForm['task-description'];
    saveTask( title.value, description.value );
    taskForm.reset();
});