<template>
  <div class="bg-gradient-to-r from-sky-300 to-green-300 h-screen">
    <div class="flex w-full h-20 bg-cyan-200 ">
      <img src="../../assets/images/lg.jpg" class="w-28 h-full" />
      <h2
        class="text-3xl text-center text-purple-700 font-serif font-bold mt-5 ml-8"
      >
        List Todos
      </h2>
    </div>
    <div class="w-full flex justify-center mt-5">
      <div class="w-5/6 lg:w-3/5 ">
        <div class=" box p-5">
          <div>
            <h1 class="text-2xl text-center font-serif text-purple-700">
              Form add todo
            </h1>
            <input
              id="crud-form-1"
              type="text"
              v-model="state.title"
              @keyup.enter="handlAddTodo"
              class="w-full text-green-700 outline-none rounded-md mt-4"
              placeholder="New todo..."
            />
            <small class="text-red-500 text-sm" v-if="v$.title.$error">
              {{ v$.title.$errors[0].$message }}
            </small>
          </div>

          <div class="text-right mt-5">
            <button
              type="button"
              class="border-2 w-24 h-8 rounded-lg font-serif mr-1"
              @click="router.push('/todolist')"
            >
              Cancel
            </button>
            <button
              class="btn w-24 h-8 mr-1 mb-2 rounded-lg font-serif text-white bg-purple-500 hover:bg-purple-700"
              @click="handlAddTodo"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import TodoService from '../../services/todoService';
import useValidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useAuthStore } from '../../stores/auth';
export default {
  name: 'Addtodo',
  setup() {
    const router = useRouter();
    const title = ref('');
    const todos = ref([]);
    const authStore = useAuthStore()

    const state = ref({
      title: ''
    });

    const rules = {
      title: { required }
    };
    const v$ = useValidate(rules, state);
    //create
    const handlAddTodo = async () => {
      const result = await v$.value.$validate();
      if (result) {
        const addToDo = {
          title: state._rawValue.title
        };
        const res = await TodoService.add(addToDo, authStore.token);
        if (res.data.success) {
          router.push('/todolist');
          title.value = '';
        }
      }
    };
    return {
      router,
      title,
      v$,
      state,
      todos,
      handlAddTodo
    };
  }
};
</script>
