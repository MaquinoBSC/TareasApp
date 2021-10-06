const db= firebase.firestore();

const taskForm= document.querySelector('#task-form');
taskForm.addEventListener('submit', async(e)=> {
    e.preventDefault();

    const title= taskForm['task-title'].value;
    const description= taskForm['task-description'].value;

    const response= await db.collection('tasks').doc().set({
        title,
        description
    });

    console.log(response);
});
