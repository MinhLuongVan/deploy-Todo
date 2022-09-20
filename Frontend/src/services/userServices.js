// import {apiClient,apiAuthClient } from "../http-common";

// export const requestGetAllUsers = async () => {
//     return await apiClient.get('i1/user/');
// };

// export const requestAddUser = async (addUser) => {
//     return await apiAuthClient.post('i1/auth/register',addUser);
// };

// export const requestUpdateUser = async (updateUser) => {
//     return await apiClient.put(`i1/user/${updateUser._id}`,  
//     updateUser);
// };

// export const requestFindUserUpdate = async (id) => {
//     return await apiClient.get(`i1/user/${id}`);
// };

// export const requestDeleteUser = async (userId) => {
//     return await apiClient.delete(`i1/user/${userId}`);
// };

import {apiClient,apiAuthClient } from "../http-common";

class UserService {
    show(token){
        return apiClient(token).get('i1/user/');
    }
    add(addUser){
        return apiAuthClient.post('i1/auth/register',addUser);
    }
    find(id,token) {
        return apiClient(token).get(`i1/user/${id}`);
    }
    update(updateUser,token){
        return apiClient(token).put(`i1/user/${updateUser._id}`,updateUser)
    }
    delete(userId,token){
        return apiClient(token).delete(`i1/user/${userId}`);
    }
}
export default new UserService()
