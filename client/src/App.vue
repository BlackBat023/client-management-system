<template>
  <div class="dashboard">
    <HeaderVue :userList="userList" />
    <main>
      <ToolBar :toggleForm="toggleForm" :userList="userList" />
      <router-view :formActive="formActive" :toggleForm="toggleForm" :toggleInv="toggleInv" :prod="prod" :order="order" :prodId="prodId" :userId="userId"/>
      <UserForm v-if="formActive" :toggleForm="toggleForm" :userId="userId" :fetchUsers="fetchUsers"/>
      <InvForm v-if="invActive" :toggleInv="toggleInv" :prodId="prodId" :fetchProduct="fetchProduct" />
    </main>
  </div>
</template>

<script>
import { ref } from 'vue'
import APIController from '@/controllers/api'
import HeaderVue from '@/components/HeaderVue'
import ToolBar from '@/components/ToolBar'
import UserForm from '@/components/UserForm'
import InvForm from '@/components/InvForm.vue'
import { store } from '@/main'

export default {
  name: 'App',
  components: {
    HeaderVue,
    ToolBar,
    UserForm,
    InvForm,
},
  setup () {
    const userList = ref([]);
    const prod = ref([]);
    const formActive = ref(false);
    const userId = ref(false);
    const prodId = ref(false);
    const invActive = ref(false);
    const order = ref([]);

    const fetchUsers = async () => {
      userList.value = await APIController.FetchUsers();
      if(userList.value){
        store.dispatch("createUserList", userList.value);
      }
      
    }

    const toggleForm = (id = false) => {
      formActive.value = !formActive.value;
      userId.value = false;
      
      if(id) {
        userId.value = id;
      }
    }

    const fetchProduct = async () => {
        prod.value = await APIController.FetchProducts();
        store.dispatch('createProductList', prod.value);
    }

    const fetchOrders = async () => {
      order.value = await APIController.FetchOrders();
      store.dispatch('createOrders', order);
      // console.log(order.value);
    }

    const toggleInv = (id = false) => {
      invActive.value = !invActive.value;
      prodId.value = false;

      if(id) {
        prodId.value = id;
      }
    }

    
    return {
      userList,
      order,
      store,
      fetchUsers,
      formActive,
      toggleForm,
      userId,
      fetchProduct,
      fetchOrders,
      toggleInv,
      prod,
      prodId,
      invActive,
    } 
  },
  mounted () {
    this.fetchUsers();
    this.fetchProduct();
    this.fetchOrders();
  },
}
</script>

<style>
:root {
  --primary: #0112fc;
  --primary-alt: #2f8ee7;
  --light: #EEEEEE;
  --light-alt: #F8F8F8;
  --grey: #9c9c9c;
  --dark: #131A26;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira sans", sans-serif;
}

body {
  background-color: var(--light);
}

main {
  width: 100vw;
  overflow: hidden;
}

input, button {
  appearance: none;
  outline: none;
  border: none;
  background: none;
}

.button {
  display: inline-block;
  padding: 8px 16px;
  background-color: var(--primary);
  color: #FFF;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 6px;
  transition: 0.4s;
}

.button:hover {
  background-color: var(--primary-alt);
}

.button.button-outline {
  background-color: transparent;
  border: 2px solid var(--primary);
  padding: 6px 14px;
  color: var(--primary);
}

.button.button-outline:hover {
  color: #FFF;
  background-color: var(--primary);
}

.button.button-small {
  padding: 4px 8px;
  font-size: 18px;
  font-weight: 600;
}

.button.button-alert {
  background-color: crimson;
}

.button-group {
  display: flex;
  margin: 0 -8px;
}

.button-group.grou-end {
  justify-content: flex-end;
}

.button-group .button {
  margin: 0 8px;
}
</style>
