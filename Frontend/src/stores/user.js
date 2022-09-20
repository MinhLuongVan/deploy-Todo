import {defineStore} from 'pinia'
import { useTodosStore } from './todo'
export const useAuthorStore = defineStore ({
    id: 'user',
    state:() => ({
        users :[],
        chosenUser : {} | undefined
    }),
    getters: {
        getUser :(state) =>{
            const todoStore = useTodosStore();
            return state.users.find((user) => user.id === todoStore.todo.owner)
        }
    },
    actions : {
       findUserAll(data){
        this.users = data;
       },
        // async getIdDelete() {
        //     try {
        //         const res = await UserService.find();
        //         this.users = res.data.users;
        //     } catch (error) {
        //         console.log(error)
                
        //     }
        // },
        
        getChosenUser(id) {
            this.chosenUser = this.users.find(user => user._id === id)
        }
    }   
})
