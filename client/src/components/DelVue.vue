<template>
    <div class="team">
        <div class="team-members table">
            <div class="table-header table-row">
                <h2>Scheduled Deliveries for {{ date }}</h2>
            </div>
            <div class="table-header table-row">
                <div class="table-col name">Date</div>
                <div class="table-col phone">Name</div>
                <div class="table-col phone">Phone</div>
                <div class="table-col address">Address</div>
                <div class="table-col product">Product</div>
                <div class="table-col qty">Qty</div>
                <div class="table-col option">Option</div>
                <div class="table-col option">Price</div>
                <div class="table-col option">Delivery</div>
            </div>
            <div v-if="orderData">
                <template v-for="order in orderData" :key="order.id">
                    <div class="table-row">
                        <div class="table-col name">{{ order.date }}</div>
                        <div class="table-col name">{{ order.name }}</div>
                        <div class="table-col phone">{{ order.phone }}</div>
                        <div class="table-col address">{{ order.address }}</div>
                        <div class="table-col product">{{ order.product }}</div>
                        <div class="table-col qty">{{ order.qty }}</div>
                        <div class="table-col option">{{ order.option }}</div>
                        <div class="table-col option">{{ order.price }}</div>
                        <div class="table-col option">{{ order.fee }}</div>
                    </div>
                </template>
            </div>
            <div class="table-row no-orders" v-else>No Deliveries Scheduled</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
// import { ref } from 'vue';

export default {
    name: 'DelVue',
    data() {
        return {
            date: new Date().toISOString().split("T")[0],
        }
    },
    setup() {

    },
    computed: {
        ...mapState([
            'users',
            'orders'
        ]),

        orderData() {
            const updateOrders = this.orders.filter(order => order.date === this.date).map(order => {
                const filteredUser = this.users.find(user => user.id === order.userId);

                if (filteredUser) {
                    return {
                        ...order,
                        name: filteredUser.name,
                        phone: filteredUser.phone,
                        address: filteredUser.address
                    };
                }
                return order;
            });
            return updateOrders;

        },
    },
}
</script>
<style scoped>
.table-title {
    font-weight: bold;
    color: black;
    text-align: center;
    margin: 8px;
    padding: 4px;

}

.no-orders {
    text-align: center;
    margin: 4px;
    font-size: 20px;
}

.table-header h2 {
    margin: 8px;
    text-align: center;
}
</style>