<template>
    <div class="user-form">
        <div class="form-overlay" @click="() => toggleOrder()"></div>
        <form class="form" @submit.prevent="addToCart({ name, qty, option, price, fee, date })">
            <h3>Product Form</h3>
            <div class="form-group">
                <label for="product">Product Name</label>
                <select class="form-control" v-model="name">
                    <option v-for="(item, index) in products.products" :key="index" :value="item.name">{{ item.name }}</option>
                </select>

            </div>
            <div class="form-group">
                <label for="qty">Quantity</label>
                <input type="number" name="qty" id="name" class="form-control" v-model="qty"/>

            </div>
            <div class="form-group"> 
                <label for="price">Price</label>
                <input type="number" min="0.01" max="10000.00" step="0.01" name="price" id="price" class="form-control" v-model="price"/>

            </div>
            <div class="form-group">
                <label for="option">Option</label>
                <select class="form-control" v-model="option">
                    <option>Tip&go</option>
                    <option>Packaway</option>
                </select>

            </div>
            <div class="form-group">
                <label for="fee">Delivery Fee</label>
                <input type="number" name="fee" id="quantity" class="form-control" v-model="fee" />

            </div>
            <div class="form-group">
                <label for="date">Order Date</label>
                <input type="date" name="date" id="name" class="form-control" v-model="date"/>

            </div>
            <input type="submit" :value="(orderId != false) ? 'Update' : 'Add'" class="button"/>
        </form>
    </div>   
</template>

<script>
// import { ref } from 'vue';
// import APIController from '@/controllers/api';
import { mapState, mapMutations } from 'vuex';

export default {
    props: ['toggleOrder'],
    data() {
        return {
            name: "",
            qty: "",
            price: "",
            fee: "",
            option: "",
            date: "",
            orderId: false,
        }
    },
    methods:{
        ...mapMutations(['ADD_TO_CART']),

        addToCart(order){
            this.ADD_TO_CART(order);
            this.toggleOrder();
        }


    },
    computed: {
        ...mapState([
            'products'
        ]),
    },
    mounted(){
        console.log(this.products.products);
    }
}

</script>

<style>

</style>