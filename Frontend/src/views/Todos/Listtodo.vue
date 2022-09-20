<template>
   <div class="bg-gradient-to-r from-sky-300 to-green-300 ">
    <div class="flex justify-between h-20 bg-cyan-200 ">
      <div class="flex">
        <img src="../../assets/images/lg.jpg" class="w-28 h-full" />
        <h2 class="text-3xl text-violet-700 font-serif font-bold mt-5 ml-2">
          List Todos
        </h2>
      </div>
      <div>
        <Dropdown>
          <DropdownToggle>
            <UsersIcon class="w-6 h-6 mt-7 mr-8 mb-1 text-indigo-700" />
          </DropdownToggle>
          <DropdownMenu class="w-28 mb-5">
            <DropdownContent class="text-base text-purple-700">
              <DropdownItem @click="handlUser, router.push('/user')">
                <UserIcon class="w-4 h-4 mr-2" /> User
              </DropdownItem>
              <DropdownItem @click="handlLogout">
                <LogOutIcon class="w-4 h-4 mr-2" /> Logout
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div
        class="intro-y col-span-12 flex flex-wrap items-center justify-center mt-2"
      >
        <button
          class="w-28 h-8 ml-5 bg-purple-500 hover:bg-purple-700 text-white font-serif text-base shadow-md mr-2 rounded-lg"
          @click="router.push('/addtodo')"
        >
          + Add Todo
        </button>
      </div>
    </div>
    <div class="flex justify-center mt-3">
      <p class="text-xl font-serif text-red-600">
        Your Todos for Today : {{ currentDate() }}
      </p>
    </div>
    <!-- BEGIN: Data List -->
    <div class="intro-y col-span-12 lg:overflow-visible h-screen ">
      <table class="table table-report">
        <thead v-if="todoHidden !== 0">
          <tr>
            <th
              class="text-center text-xl font-serif  whitespace-nowrap"
            >
              Title
            </th>
            <th
              class="text-center text-xl font-serif "
            >
             Created
            </th>
            <th
              class="text-center text-xl font-serif  whitespace-nowrap"
            >
              Actions
            </th>
          </tr>
        </thead>
        <thead v-else>
          <h1 class="text-center text-lg font-serif text-blue-700">
            Bạn chưa có công việc nào,hãy thêm công việc của bạn!
          </h1>
        </thead>
        <tbody  >
          <tr v-for="item in todos" :key="item._id" class="w-full">
            <td class="text-lg  lg:w-3/5 sm:2/5">
              <div class="flex items-center ">
                <input class="rounded-xl lg:w-5 lg:h-5 sm:w-4 sm:h-4"
                  :id="'checkbox-' + item._id"
                  :checked="item.status"
                  type="checkbox"
                  true-value="true"
                  false-value="false"
                  @change="clickBox(item)"
                />
                <!-- <p
                  v-if="item.title.length >= 50"
                  class="font-serif pl-3 text-purple-500"
                >
                  {{ item.title.slice(0, 49) }}...
                </p> -->
                <p class=" max-w-4xl pl-2 ">
                  {{ addSpaceTitle(item.title) }}
                </p>
              </div>
            </td>
            <td class="text-lg  text-center lg:w-1/5 ">
              <p >
                {{ moment(item.createdAt).format('H:mm') }}
              </p>
            </td>
            <td class="lg:w-1/5 sm:2/5">
              <div class="flex justify-center items-center">
                <a
                  class="flex items-center text-green-500 "
                  @click="handlUpdate(item)"
                >
                  <EditIcon class="w-5 h-5 mr-2 ml-2" />
                </a>
                <a
                  class="flex items-center text-danger"
                  @click="actionOpenDeleteModal(item._id)"
                >
                  <Trash2Icon class="w-5 h-5 mr-2" />
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="mt-10" v-if="todoHidden !== 0">
        <paginate
          class="flex justify-center"
          :page-count="totalPages"
          :click-handler="getToDoPage"
          :prev-text="'<<'"
          :next-text="'>>'"
          :container-class="'pagination'"
        >
        </paginate>
      </div>
      <Modal
        :show="deleteConfirmationModal"
        @hidden="deleteConfirmationModal = false"
      >
        <ModalBody class="p-0">
          <div class="p-5 text-center">
            <XCircleIcon class="w-12 h-12 text-danger mx-auto mt-3" />
            <div class="text-3xl mt-5 text-purple-700 font-serif">
              Are you sure?
            </div>
            <div class="mt-2 text-purple-700 text-base font-serif">
              Do you really want to delete this content?
            </div>
          </div>
          <div class="px-5 pb-8 text-center">
            <button
              type="button"
              @click="deleteConfirmationModal = false"
              class="w-24 h-8 border-2 rounded-lg mr-1"
            >
              Cancel
            </button>
            <button
              type="button"
              class="w-24 h-8 text-white rounded-lg bg-red-500 hover:bg-red-700"
              @click="handlDelete()"
            >
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
   </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodosStore } from '../../stores/todo';
import Cookies from 'js-cookie';
import Paginate from 'vuejs-paginate-next';
import moment from 'moment';
import TodoService from '../../services/todoService'; 
import { useAuthStore } from '../../stores/auth';

export default {
  name: 'Todolist',
  components: {
    Paginate
  },
  setup() {
    const router = useRouter();
    const title = ref('');
    const todoUpdate = ref();
    const truevalue = ref(true);
    const falsevalue = ref(false);
    const { todos, chosenTodo } = storeToRefs(useTodosStore());
    const { findTodoPage, getChosenTodo } = useTodosStore();
    const currentPage = ref(1);
    const totalPages = ref(1);
    const deleteConfirmationModal = ref(false);
    const todoHidden = ref(0);
    const todosStore = useTodosStore();
    const authStore = useAuthStore()

    function currentDate() {
      const current = new Date();
      const date =
        current.getDate() +
        '/' +
        (current.getMonth() + 1) +
        '/' +
        current.getFullYear();
      return date;
    }

    async function getToDoPage(page) {
      if (page === undefined) {
        currentPage.value = 1;
      } else {
        currentPage.value = page;
      }
      const res = await TodoService.findByPage(currentPage.value, authStore.token);
      todoHidden.value = res.data.total;
      findTodoPage(res.data.todo);
      totalPages.value = res.data.totalPages;
    }
    onMounted(() => {
      getToDoPage();
    });
    const handlUpdate = async (data) => {
      if (data) {
        todoUpdate.value = data;
        title.value = data.value;
      }
      router.push(`/edittodo/${data._id}`);
    };

    const actionOpenDeleteModal = (id) => {
      deleteConfirmationModal.value = true;
      getChosenTodo(id);
    };
    const handlDelete = async () => {
      try {
        const todo = await TodoService.delete(todosStore.chosenTodo._id, authStore.token);
        deleteConfirmationModal.value = false;
        getToDoPage();
      } catch (error) {
        console.log(error);
      }
    };
    async function clickBox(data) {
      if (data) {
        const checkboxItem = document.getElementById('checkbox-' + data._id);
        if (checkboxItem.checked) {
          const item = {
            _id: data._id,
            title: data.title,
            status: truevalue.value
          };
          const res = await TodoService.update(item, authStore.token);
          if (res) {
            getToDoPage();
          }
        } else {
          const item = {
            _id: data._id,
            title: data.title,
            status: falsevalue.value
          };
          const res = await TodoService.update(item, authStore.token);
          if (res) {
            getToDoPage();
          }
        }
      }
    }
    const handlLogout = async () => {
      try {
        await Cookies.remove('cookieRefesh');
        Cookies.remove('token');
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    };

    function addSpaceTitle(title) {
       if(title.includes(" ")){
        return title;
       }else {
        const titleSplit = title.match(/.{1,10}/g) || [];
        return titleSplit.join(" ");
       }
    }

    return {
      router,
      todos,
      title,
      handlDelete,
      handlUpdate,
      handlLogout,
      getToDoPage,
      currentPage,
      totalPages,
      clickBox,
      deleteConfirmationModal,
      chosenTodo,
      actionOpenDeleteModal,
      todoHidden,
      currentDate,
      moment,
      addSpaceTitle
    };
  }
};
</script>
<style>
.page-item {
  font-size: 14px;
  cursor: pointer;
}
</style>
