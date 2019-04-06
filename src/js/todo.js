class ToDo {
    constructor() {
        this.button = document.getElementsByClassName('todo__button')[0];
        this.input = document.getElementsByClassName('todo__input')[0];
        this.todos = document.getElementsByClassName('todos')[0];
        this.todosList = [];

        this.button.addEventListener("click", event => this.addTodo(event));
        this.todos.addEventListener("click", event => {
            if(event.target.className === 'todo__remove') {
                this.removeTodo(event.target.dataset.index);
            }
        });
        this.refresh();
    }
    refresh() {
        if(this.todosList.length > 0) {
            let todosString = '';
            for (let i=0; i<this.todosList.length; i++) {
                todosString = todosString + `<div><span>${this.todosList[i]}</span><button data-index='${i}' class='todo__remove'>X</button></div>`;
            }
            this.todos.innerHTML = todosString;
        } else {
            this.todos.innerHTML = '';
        }
    }
    addTodo() {
        if(this.input.value) {
            this.todosList.push(this.input.value);
            this.input.value = '';
            this.refresh();
        }
    }
    removeTodo(index) {
        if (this.todosList.length > 1) {
            this.todosList.splice(index, 1);
        } else {
            this.todosList = [];
        }
        this.refresh();
    }
}

export default ToDo;