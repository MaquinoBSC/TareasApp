const taskForm= document.querySelector('#task-form');
taskForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    const title= taskForm['task-title'].value;
    const description= taskForm['task-description'].value;
})
