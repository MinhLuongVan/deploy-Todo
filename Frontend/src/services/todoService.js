// import { apiClient } from "../http-common";
// export const requestGetToDoByPage = async (page) => {
//     return await apiClient.get(`td1/list/page?limit=5&page=${page}`);
// };

// export const requestAddToDo = async (addToDo) => {
//     return await apiClient.post('td1/list/todo',addToDo);
// };

// export const requestUpdateToDo = async (todoUpdate) => {
//     return await apiClient.put(`td1/list/${todoUpdate._id}`,todoUpdate);
// };

// export const requestFindToDoUpdate = async (id) => {
//     return await apiClient.get(`td1/list/${id}`);
// };

// export const requestDeleteToDo = async (id) => {
//     return await apiClient.delete(`td1/list/${id}`);
// };


import { apiClient} from "../http-common";

class TodoService {
    add(addToDo, token) {
        return apiClient(token).post('td1/list/todo', addToDo);
    }

    find(id, token) {
        return apiClient(token).get(`td1/list/${id}`);
    }

    update(todoUpdate, token) {
        return apiClient(token).put(`td1/list/${todoUpdate._id}`,todoUpdate);
    }

    delete(id, token) {
        return apiClient(token).delete(`td1/list/${id}`);
    }
    
    findByPage(page, token) {
        return apiClient(token).get(`td1/list/page?limit=5&page=${page}`);
    }   
}

export default new TodoService()

