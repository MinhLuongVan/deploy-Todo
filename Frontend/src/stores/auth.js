import { defineStore } from "pinia";
import Cookies from "js-cookie";
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    currentUser: [],
    isAuthenticated: false,
    token: ''
   
  }),
  getters: {
    getMessageAuth: (state) => state.message,
    authenticate: (state) => state.isAuthenticated,
  },
  actions: {
    async loginUser(currentUser) {
        this.currentUser = currentUser;
        this.isAuthenticated = true;
        Cookies.set('token', currentUser.Token);
    },

    getToken() {
      this.token = Cookies.get("token")
    },

    async registerUser(currentRegister) {
      // const res = await requestRegister(registerForm);

      this.currentUser = currentRegister;
      this.isAuthenticated = false;
     
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "Todo",
        storage: localStorage,
      },
    ],
  },
})