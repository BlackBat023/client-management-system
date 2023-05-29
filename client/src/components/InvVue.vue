<template>
    <div class="team">
        <div class="team-members table">
            <div class="table-header table-row">
                <div class="table-col name">Product Name</div>
                <div class="table-col id">Product ID</div>
                <div class="table-col price">Price</div>
                <div class="table-col quantity">QTY</div>
                <div class="table-col description">Description</div>
                <div class="table-col table-actions">Actions</div>
            </div>
            <div class="member table-row" v-for="product in prod.products" :key="product.id">
                <div class="table-col name">{{ product.name }}</div>
                <div class="table-col id">{{ product.id }}</div>
                <div class="table-col price">R {{ (product.price / 100).toFixed(2) }} Each</div>
                <div class="table-col quantity">{{ product.quantity }}</div>
                <div class="table-col description">{{ product.description }}</div>
                <div class="action-col button-group">
                    <button class="button button-small" @click="() => toggleInv(product.id)">Update</button>
                    <button class="button button-small button-alert">Delete</button>
                </div>
            </div>
        </div>
        <button class="button" @click="() => toggleInv()">Add</button>
    </div>    
</template>

<script>
// import { ref } from 'vue';
import APIController from '@/controllers/api';

export default {
    name: 'InvVue',
    props: ["toggleInv", "fetchProduct", "prod"],
    setup(props){
        const deleteProduct = async id => {
            const success = await APIController.DeleteProduct(id);
            if(success) {
                props.fetchUsers();
            }
        }

        return {
            deleteProduct,
        }
    }
}
</script>

<style>
.team {
    padding: 16px;
}

.table-row {
    display: flex;
    align-items: center;
}

.table-col {
    flex: 1 1 33.333%;
    padding: 16px;
    color: var(--dark-alt);
}

.table-row {
    background-color: #FFF;
}

.table-row:nth-child(2n+1) {
    background-color: var(--light-alt);
}

.table .table-header {
    background-color: var(--dark);
}

.table .table-header .table-col {
    color: var(--light);
}

.table-actions {
    text-align: right;
}

.search .search-bar {
    background-color: var(--light);
    color: var(--dark);
    width: 200px;
    height: 25px;
    font-size: 16px;
    border-radius: 8px;
    align-self: right;
    margin-left: 85%;
}

span {
    color: var(--light);
    width: 100px;
}
</style>