<template>
  <div class="bg-gradient-to-r from-sky-300 to-green-300 h-screen">
    <div class="flex w-full h-20 bg-cyan-200">
      <img src="../../assets/images/lg.jpg" class="w-28 h-full" />
      <h2
        class="text-3xl text-center text-purple-700 font-serif font-bold mt-5 ml-8"
      >
        List Users
      </h2>
    </div>
    <div class="w-full flex justify-center mt-5">
      <div class="w-5/6 lg:w-3/5">
        <div class="box p-5">
          <div class="intro-y mx-1 box p-5">
            <h1 class="text-2xl text-center font-serif text-purple-700">
              Form update user
            </h1>
            <div>
              <input
                id="crud-form-1"
                type="text"
                v-model="username"
                class="w-full border-1 border-neutral-200 rounded-md mt-4"
                placeholder="username"
              />
              <input
                id="crud-form-1"
                type="password"
                v-model="password"
                @keyup.enter="actionUpdateUser()"
                class="w-full border-1 border-neutral-200 rounded-md mt-4"
                placeholder="password"
              />
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
                @click="actionUpdateUser()"
              >
                Update
              </button>
            </div>
          </div>
          <!-- END: Form Layout -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import UserService from '../../services/userServices';
import { useAuthStore } from '../../stores/auth';

export default {
  name: 'Updateuser',
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const route = useRoute();
    const updateUserId = ref('');
    const authStore = useAuthStore();
    const actionUpdateUser = async () => {
      try {
        const updateUser = {
          _id: updateUserId.value,
          username: username.value,
          password: password.value
        };
        const res = await UserService.update(updateUser, authStore.token);
        router.push('/user');
      } catch (error) {
        console.log(error);
      }
      username.value = '';
      password.value = '';
    };

    // tìm title tương ứng theo id
    const findUserUpdate = async () => {
      try {
        const res = await UserService.find(route.params.id, authStore.token);
        username.value = res.data.data.username;
        password.value = res.data.data.password;
        updateUserId.value = res.data.data._id;
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      findUserUpdate();
    });
    return {
      router,
      username,
      password,
      actionUpdateUser
    };
  }
};
</script>
