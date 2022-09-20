<template>
  <div class="lg:bg-gradient-to-r from-sky-300 to-green-300 sm:bg-white">
    <div class="container">
      <div class="block xl:grid grid-cols-2 gap-4">
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
        <div class="h-screen flex lg:py-5 sm:py-0">
          <div
            class="my-1 mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0  shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="intro-x font-serif text-purple-700 text-2xl xl:text-3xl text-center xl:text-left mt-24"
            >
              Sign Up
            </h2>
            <div class="intro-x mt-2 xl:hidden text-center text-purple-700">
              A few more clicks to sign in to your account. Manage all your
              e-commerce accounts in one place
            </div>
            <div class="intro-x mt-8" @keyup.enter="submitRegister">
              <input
                type="text"
                v-model="state.firstname"
                class="intro-x login__input rounded-lg text-purple-500 text-base py-3 px-4 block"
                placeholder="First Name"
              />
              <small class="text-red-500 text-sm" v-if="v$.firstname.$error">
                {{ v$.firstname.$errors[0].$message }}
              </small>

              <input
                type="text"
                v-model="state.lastname"
                class="intro-x login__input rounded-lg text-purple-500 text-base py-3 px-4 block mt-4"
                placeholder="Last Name"
              />
              <small class="text-red-500 text-sm" v-if="v$.lastname.$error">
                {{ v$.lastname.$errors[0].$message }}
              </small>
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
                @click="submitRegister"
              >
                Register
              </button>
             
              <div class=" mt-5 justify-center flex text-base ">
                <p  class="font-serif text-lg">
                  Do not have an account ?
                  <a class=" text-red-500 hover:text-red-700" 
                  href="/">Sign In</a> 
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Register Form -->
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import useValidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import dom from '@left4code/tw-starter/dist/js/dom';
import {requestRegister} from '../../services/authService'
import {
  setNotificationToastMessage,
  setNotificationFailedWhenGetData
} from '../../utils/myFunction';

export default {
  name: 'Register',
  setup() {
    const router = useRouter();
    const firstname = ref('');
    const lastname = ref('');
    const username = ref('');
    const password = ref('');
    const authStore = useAuthStore();
    const state = ref({
      firstname: '',
      lastname: '',
      username: '',
      password: ''
    });

    const rules = {
      firstname: { required },
      lastname: {required},
      username: { required},
      password: { required, minLength: minLength(6) }
    };
    const v$ = useValidate(rules, state);
    const submitRegister = async () => {
      const result1 = await v$.value.$validate();
      if (result1) {
          const registerForm = {
            firstname: state._rawValue.firstname,
            lastname: state._rawValue.lastname,
            username: state._rawValue.username,
            password: state._rawValue.password
          };
          const res = await requestRegister(registerForm);
          if(res.data){
            if(res.data.success) {
            authStore.registerUser(res.data.data);
            router.push('/');
            }else {
              setNotificationToastMessage(res.data.message, false);
            }
            
          }else {
            setNotificationFailedWhenGetData();
          }
          firstname.value = '';
          lastname.value = '';
          username.value = '';
          password.value = '';
      }else {
        console.log('Lỗi');
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
      v$,
      state,
      firstname,
      lastname,
      username,
      password,
      submitRegister
    };
  }
};
</script>
