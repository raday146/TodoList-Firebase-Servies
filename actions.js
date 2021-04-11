const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
const backTask = new BackTask();


const render = (todo, id) =>{
  const htm = `
   <li class="list-group-item d-flex justify-content-between align-items-center my-2" data-id=${id}>
       <span id="task">${todo.task}</span>
       <i class="far fa-trash-alt delete"></i>
  </li>`
  list.innerHTML += htm;
};

addForm.addEventListener('submit', e => {
 e.preventDefault();
 const todo = addForm.add.value.trim();
 console.log(todo);
 if(todo.length){
    backTask.addTask(todo).then(() =>{
       // generateTamplate(todo);
        console.log('todo');
        scrollBy(0,window.screenY);
        addForm.reset();

    });
 }
});

list.addEventListener('click', e => {
    if(e.target.classList.contains('delete')){
        backTask.deleteTask(e.target.parentNode.getAttribute('data-id'));
        e.target.parentNode.remove();
    }
    
});
const filterTodos = (term) => {
    Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add('filtered'));

    Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));
     console.log(term);
};
search.addEventListener('keyup', () => {

    if(list.children.length && search.value.trim().length){
     const term = search.value.trim().toLowerCase();
     filterTodos(term);
    }else if(search.value.trim().length){
      document.querySelector('.no-result').textContent =`Empty List`;      
    }else{
        const term = search.value.trim().toLowerCase();
        document.querySelector('.no-result').textContent =``;
        filterTodos(term);

    } 
});

backTask.getTask((task, id) =>{
    console.log(task);
    render(task,id);
});