import {defineStore} from 'pinia'
export const useTodosStore = defineStore({
    id: 'todo',
    state:() => ({
        todos: [],
        chosenTodo: {} | undefined
    }),
    actions : {
        findTodoPage(data) {
            this.todos = data;
        },
        getChosenTodo(id) {
            this.chosenTodo = this.todos.find(todo => todo._id === id)
        }
       
    }
}
    
)