import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'

export const store = createStore({
    state(){
        return {
            orders: [

            ],
            products: [

            ],
            users: [

            ],
            cart: [

            ],
        }
    },
    mutations: {
        addUserList: (state, userList) => {
            state.users = userList;
        },

        addProductList: (state, productList) => {
            state.products = productList;
        },

        addOrders: (state, ordersList) => {
            state.orders = ordersList.orders;
        },

        ADD_TO_CART: (state, order) => {
            state.cart.push(order);
        },

        clearCart: (state) => {
            state.cart = [];
        }

    },
    actions: {
        createUserList({commit}, userList) {

            commit("addUserList", userList);
        },

        createProductList({commit}, productList){
            
            commit("addProductList", productList);
        },

        createOrders({commit}){
            fetch("http://localhost:8000/api/orders/all")
                .then(results => results.json())
                .then(data => {
                    console.log(data);
                    commit("addOrders", data);
                }).catch((err) => {
                    console.log(err);
                });
        },

        createCartList({commit}, cartList){
            commit("ADD_TO_CART", cartList);
        },
    },
    getters: {
        users(state){
            return state.users;
        },

        products(state){
            return state.products;
        },

        orders(state){
            return state.orders;
        },

        cart(state){
            return state.cart;
        },
        
    }
})
createApp(App).use(router).use(store).mount('#app')
