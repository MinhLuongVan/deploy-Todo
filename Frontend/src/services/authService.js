import { apiAuthClient } from "../http-common";

export const requestRegister = async (registerForm) => {
    return await apiAuthClient.post('/i1/auth/register', registerForm);
};
export const requestLogin = async (loginForm) => {
    return await apiAuthClient.post('/i1/auth/login',loginForm,{ withCredentials:true });
};


