<template>
    <div class="order">
        <div class="order-title">
            <h1 class="title-item">Customer Name: {{ name }}</h1>
        </div>
        <div class="client-details">
            <h3 class="details-item">Customer ID: {{ id }}</h3>
            <h3 class="details-item">Phone number: {{ user.phone }}</h3>
            <h3 class="details-item">Order Number: {{ orderNum }}</h3>
            <h3 class="details-item">Address: {{ user.address }}</h3>
        </div>
        <div class="order-view">
            <div class="view-title">
                <h3 class="table-header table-row">Order Cart</h3>
            </div>
            <div class="cart-view table">
                <div class="add-to-cart table-row">
                    <button class="button" @click="() => toggleOrder()">Add Item</button>
                </div>
                <div class="cart table">
                    <div class="table-row" v-for="(item, index) in cart" :key="index">    
                        <div class="table-col">{{ item.qty }}</div>
                        <div class="table-col">{{ item.name }}</div>
                        <div class="table-col">{{ item.option }}</div>
                        <div class="table-col">R{{ item.fee }}</div>
                        <div class="table-col">R{{ item.price }}</div>
                    </div>
                    <div class="table-row">
                        Total: {{ totalPrice }}
                    </div>
                    <div class="table">
                        <button class="button" @click="() => sendOrder()">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        
        <OrderForm v-if="orderActive" :orderActive="orderActive" :toggleOrder="toggleOrder" />
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { ref } from 'vue';
import APIController from '@/controllers/api';
import OrderForm from '@/components/OrderForm.vue'

export default {
    components: {
        OrderForm,
    },
    props: [
        "fetchOrders",
    ],
    data() {
        return {
            name: this.$route.params.name,
            id: this.$route.params.id,
            orderNum: null,
        }
    },
    setup(){
        const orderActive = ref(false);

        const toggleOrder = () => {
            orderActive.value = !orderActive.value;
        }

        return {
            orderActive,
            toggleOrder,
        }
    },
    computed:{
        ...mapState([
            'cart',
            'users'
        ]),

        ...mapGetters([
            'totalCost',
        ]),

        user() {
            return this.users.user.find(data => data.id == this.id);
        },

        orderNo: () => {
            return Math.floor(Math.random() * 100000);
        },

        totalPrice(){
            const price = this.cart.reduce((total, item) => total + item.price, 0);
            const fee = this.cart.reduce((total, item) => total + item.fee, 0);

            return price + fee;
            
        }

    },
    methods: {
        ...mapMutations([
            'CLEAR_CART',
        ]),

        async sendOrder(){
            console.log(this.cart);
            
            for(let i = 0; i <= this.cart.length - 1; i++){
                try {
                    const order = await APIController.CreateOrder(this.cart[i].name, this.cart[i].qty, this.cart[i].option, this.cart[i].price, this.orderNum, this.cart[i].fee, this.cart[i].date, this.id);
                    if(order){
                        this.clearCart();
                    }
                } catch (error){
                    console.log(error);
                }
            }
            
        },

        clearCart(){
            this.CLEAR_CART();
        },

        getOrderNum(){
            return this.orderNo;
        }
    },
    created(){
        this.orderNum = this.getOrderNum();
        console.log(this.orderNum);
    }
}
</script>
<style scoped>

.order {
    padding-left: 30px;
    padding-top: 10px;
    padding-right: 30px;
}

.order-title .title-item {
    width: 100%;
    color: var(--light);
    text-align: center;
    margin: 8px;
    padding: 4px;
}

.order-title {
    background-color:var(--dark);
}

.order-view {
    height: 100vh;
    margin: 10px auto 10px auto;
    padding: 10px;
    border: 1px dotted var(--dark);
    border-radius: 10px;
    width: 95vw;
}

.view-title {
    align-items: center;
    padding-left: auto;
    padding-right: auto;
}

.client-details {
    width: 100vw;
    align-self: center;
    height: 70px;
    margin: 20px;
}

.cart-view {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
}

.add-to-cart {
    height: auto;
    flex: 1;
}

.cart {
    height: 95%;
    flex: 1;
    background-color: var(--grey);
    border-radius: 5px;
}

button {
    align-self: flex-end;
}
</style>