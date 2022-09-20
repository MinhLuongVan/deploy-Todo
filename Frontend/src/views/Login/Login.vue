<template>
  <div class="lg:bg-gradient-to-r from-sky-300 to-green-300 sm:bg-white">
    <div class="container ">
      <div class="block xl:grid grid-cols-2 gap-4 ">
        <!-- BEGIN: Register Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <div>
            <img
              class="-intro-x w-full h-full mt-14"
              src="@/assets/images/logo1.jpg"
            />
            <p class="text-center pt-4 text-red-500 font-serif text-2xl">
              -----Welcome to my app-----
            </p>
          </div>
        </div>
        <!-- END: Register Info -->
        <!-- BEGIN: Register Form -->
        <div class="h-screen flex lg:py-5 sm:py-0 ">
          <div
            class=" mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8  xl:p-0 shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="intro-x font-serif text-purple-700 text-2xl xl:text-3xl text-center xl:text-left mt-32"
            >
              Sign In
            </h2>
            <div class="intro-x mt-2 xl:hidden text-center text-purple-700">
              A few more clicks to sign in to your account. Manage all your
              e-commerce accounts in one place
            </div>
            <div class="intro-x mt-8" @keyup.enter="submitLogin">
              <input
                type="text"
                v-model="state.username"
                class="intro-x login__input rounded-lg text-purple-500 text-base py-3 px-4 block mt-4"
                placeholder="Username"
              />
              <small class="text-red-500 text-sm" v-if="v$.username.$error">
                {{ v$.username.$errors[0].$message }}
              </small>
              <input
                type="password"
                v-model="state.password"
                class="intro-x login__input rounded-lg text-purple-500 text-base py-3 px-4 block mt-4"
                placeholder="Password"
              />
              <small class="text-red-500 text-sm" v-if="v$.password.$error">
                {{ v$.password.$errors[0].$message }}
              </small>
            </div>
            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
              <button
                class="bg-blue-500 hover:bg-blue-700 rounded-xl py-2 font-serif px-4 w-full text-lg text-white align-top"
                @click="submitLogin"
              >
                Login
              </button>
              <div class="mt-5 justify-center flex text-base">
                <p class="font-serif text-lg">
                  Do not have an account ?
                  <a
                    class="text-red-500 hover:text-red-700"
                    href="/register"
                    >Sign up</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useValidate from '@vuelidate/core';
import { useAuthStore } from '../../stores/auth';
import { required, minLength } from '@vuelidate/validators';
import dom from '@left4code/tw-starter/dist/js/dom';
import { requestLogin } from '../../services/authService';
import {
  setNotificationToastMessage,
  setNotificationFailedWhenGetData
} from '../../utils/myFunction';

export default {
  name: 'Login',
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const authStore = useAuthStore();

    const state = ref({
      username: '',
      password: ''
    });

    const rules = {
      username: { required },
      password: { required, minLength: minLength(6) }
    };
    const v$ = useValidate(rules, state);
    const submitLogin = async () => {
      const result = await v$.value.$validate();
      if (result) {
        const loginForm = {
          username: state._rawValue.username,
          password: state._rawValue.password
        };
        const res = await requestLogin(loginForm);
          if (res.data.success) {
            authStore.loginUser(res.data.data);
            router.push('/todolist');
          } else {
            setNotificationToastMessage(res.data.message, false);
          }
        username.value = '';
        password.value = '';
      } else {
        setNotificationFailedWhenGetData();
      }
    };

    onMounted(() => {
      dom('body')
        .removeClass('main')
        .removeClass('error-page')
        .addClass('login');
    });

    return {
      router,
      submitLogin,
      state,
      v$,
      username,
      password
    };
  }
};
</script>

