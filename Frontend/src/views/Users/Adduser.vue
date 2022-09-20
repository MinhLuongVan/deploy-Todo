<template>
  <div class="bg-gradient-to-r from-sky-300 to-green-300 h-screen">
    <div class="flex w-full h-20 bg-cyan-200 ">
      <img src="../../assets/images/lg.jpg" class="w-28 h-full" />
      <h2
        class="text-3xl text-center text-purple-700 font-serif font-bold mt-5 ml-8"
      >
        List Users
      </h2>
    </div>
    <div class="w-full flex justify-center mt-5">
      <div class="w-5/6 lg:w-3/5 ">
        <div class=" box p-5">
          <h1 class="text-2xl text-center font-serif text-purple-700">
            Form add user
          </h1>
          <div class="mt-4">
            <input
              id="crud-form-1"
              type="text"
              v-model="state.firstname"
              class="w-full border-1 border-neutral-200 rounded-md"
              placeholder="firstname"
            />
            <small class="text-red-500 text-sm" v-if="v$.firstname.$error">
              {{ v$.firstname.$errors[0].$message }}
            </small>

            <input
              id="crud-form-1"
              type="text"
              v-model="state.lastname"
              class="w-full border-1 border-neutral-200 rounded-md mt-4"
              placeholder="lastname"
            />
            <small class="text-red-500 text-sm" v-if="v$.lastname.$error">
              {{ v$.lastname.$errors[0].$message }}
            </small>

            <input
              id="crud-form-1"
              type="text"
              v-model="state.username"
              class="w-full border-1 border-neutral-200 rounded-md mt-4"
              placeholder="username"
            />
            <small class="text-red-500 text-sm" v-if="v$.username.$error">
              {{ v$.username.$errors[0].$message }}
            </small>
            <input
              id="crud-form-1"
              type="password"
              v-model="state.password"
              @keyup.enter="handlAddUser"
              class="w-full border-1 border-neutral-200 rounded-md mt-4"
              placeholder="password"
            />
            <small class="text-red-500 text-sm" v-if="v$.password.$error">
              {{ v$.password.$errors[0].$message }}
            </small>
          </div>

          <div class="text-right mt-5">
            <button
              type="button"
              class="border-2 w-24 h-8 rounded-lg font-serif mr-1"
              @click="router.push('/user')"
            >
              Cancel
            </button>
            <button
              type="button"
              class="w-24 h-8 text-white font-serif bg-purple-500 hover:bg-purple-700 rounded-lg"
              @click="handlAddUser"
            >
              Add
            </button>
          </div>
        </div>
        <!-- END: Form Layout -->
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import useValidate from '@vuelidate/core';
import UserService from '../../services/userServices'
import { required,minLength } from '@vuelidate/validators';
import { useAuthStore } from '../../stores/auth';

export default {
  name: 'Adduser',
  setup() {
    const router = useRouter();
    const firstname = ref('');
    const lastname = ref('');
    const username = ref('');
    const password = ref('');
    const users = ref([]);
    const authStore = useAuthStore()

    const state = ref({
      firstname: '',
      lastname: '',
      username: '',
      password: ''
    });

    const rules = {
      firstname: { required },
      lastname: { required },
      username: { required },
      password: { required, minLength: minLength(6) }
    };
    //create
    const v$ = useValidate(rules, state);
    const handlAddUser = async () => {
      const result = await v$.value.$validate();
      if (result) {
        const addUser = {
          firstname: state._rawValue.firstname,
          lastname: state._rawValue.lastname,
          username: state._rawValue.username,
          password: state._rawValue.password
        };
        const res = await UserService.add(addUser);
        if (res.data) {
          if (res.data.success) {
            router.push('/user');
            firstname.value = '';
            lastname.value = '';
            username.value = '';
            password.value = '';
          } else {
            console.log('Lỗi')
          }
        }
      }
    };
    return {
      router,
      username,
      firstname,
      lastname,
      password,
      users,
      v$,
      state,
      handlAddUser
    };
  }
};
</script>
