<template>
    <div class="details-head">
        <h3 class="details-title">Client Details</h3>
        <button class="button button-small" @click="backButton()">Back</button>
    </div>
    <div class="details-card">
        <div class="details-item details-avatar">{{ name[0].toUpperCase() }}</div>
        <div class="details-group">
            <div class="details-item">Customer ID: {{ user.id }}</div>
            <div class="details-item">Name: {{ user.name }}</div>
            <div class="details-item">Contact Number: {{ user.phone }}</div>
            <div class="details-item">Delivery Address: <br/> {{ user.address }}</div>
        </div>
    </div>
    <div class="details-title">Order History</div>
    <div class="card-container" v-for="(order, index) in orders" :key="index">
        <div class="details-card" v-if="id === order.userId">
            <div class="orders-group table-row">
                <div class="orders-item">Product: {{ order.product }}</div>
                <div class="orders-item">Quantity: {{ order.qty }}</div>
                <div class="orders-item">Options: {{ order.option }}</div>
                <div class="orders-item">Price: {{ order.price }}</div>
                <div class="orders-item">Fee: {{ order.fee }}</div>
                <div class="orders-item">Order Number: {{ order.orderNo }}</div>
                <div class="orders-item">Order Date: {{ order.date }}</div>
            </div>
            <div class="button-group group-end">
                <button class="button button-small" @click="() => toggleOrder(order.id)">Update</button>
            </div>
        </div>
    </div>
    <OrderForm v-if="activeOrder" :toggleOrder="toggleOrder" :orderId="orderId" :fetchOrders="fetchOrders" />
    
    
</template>

<script>
import { ref } from 'vue';
import APIController from '@/controllers/api';
import { mapState } from 'vuex';
import OrderForm from '@/components/OrderForm.vue'

export default {
    components: {
        OrderForm,
    },
    data(){
        return {
            id: this.$route.params.id,
            name: this.$route.params.name,
        }
    },
    setup(){
        const orderId = ref(false);
        const user = ref({});
        const activeOrder = ref(false);

        const getUser = async (id) =>{
            user.value = await APIController.FetchUser(id);
            console.log(user.value);
        }

        const toggleOrder = (id = false) => {
            activeOrder.value = !activeOrder.value;
            orderId.value = false;

            if(id){
                orderId.value = id;
            }
        }

        return {
            getUser,
            user,
            activeOrder,
            toggleOrder,
            orderId,
        }
    },
    computed:{
        ...mapState([
            'users',
            'orders'
        ]),
    },
    methods: {
        backButton(){
            this.$router.go(-1);
        },
        fetchOrders(){
            this.$store.dispatch('createOrders');
            console.log(this.orders);
        },
    },
    mounted(){
        this.getUser(this.id);
        this.fetchOrders();
        console.log(this.id);
        console.log(this.orders.id);
    }, 
}
</script>

<style>

.details-title {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 300;
    font-size: 32px;
    text-align: center;
    color: var(--dark);
    text-align: center;
}

.details-card {
    margin: 20px;
    padding: 6px;
    background-color: var(--grey);
    border-radius: 5px;
    flex: auto;
}

.details-card .details-item {
    margin: 20px;
    padding: 2px;
    word-spacing: 1px;
}

.details-item {
    color: black;
}

.details-group {
    flex-direction: column;
    display: inline-flex;
    position: relative;
    align-items: right;
    margin-left: 50%;
}

.button {
    margin-left: 20px;
}

.details-avatar {
    display: inline-block;
    position: relative;
    background-color: #312d2d;
    color: #9328da;
    width: 100px;
    height: 100px;
    border-radius: 100px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 62px;
    font-weight: 700;
    padding-top: 20px;
    text-align: center;
}

.items-group {
    position: relative;
    align-items: right;
    margin-left: 50%;
}

.orders-item {
    text-align: center;
    margin: 8px;
}

.card-container {
    max-width: 1024px;
    align-content: center;
    display: flex;
    flex-wrap: nowrap;
    margin-left:auto;
    margin-right:auto;
}


</style>