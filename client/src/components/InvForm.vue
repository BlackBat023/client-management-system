<template>
    <div class="user-form">
        <div class="form-overlay" @click="() => toggleInv()"></div>
        <form class="form" @submit.prevent="(prodId == false) ? addProduct() : updateProduct()">
            <h3>Product Form</h3>
            <div class="form-group">
                <label for="name">Product Name</label>
                <input type="text" name="name" id="name" class="form-control" v-model="product.name"/>

            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input type="number" min="0.01" max="10000.00" step="0.01" name="price" id="price" class="form-control" v-model="product.price"/>

            </div>
            <div class="form-group">
                <label for="description">Product description</label>
                <input type="text" name="description" id="description" class="form-control" v-model="product.description"/>

            </div>
            <div class="form-group">
                <label for="qunatity">QTY</label>
                <input type="text" name="address" id="quantity" class="form-control" v-model="product.quantity" />

            </div>
            <input type="submit" :value="(prodId != false) ? 'Update' : 'Add'" class="button"/>
        </form>
    </div>   
</template>

<script>
import { ref } from 'vue';
import APIController from '@/controllers/api'

export default {
    props: ["toggleInv", "fetchProduct", "prodId"],
    setup (props) {
        const product = ref({});

        const getProduct = async () => {
            product.value = await APIController.FetchProduct(props.prodId);
        }

        const addProduct = async () => {
            const tempItem = await APIController.AddProduct(product.value.name, product.value.price, product.value.description, product.value.quantity);
            
            if(tempItem == true){
                props.toggleInv();
                props.fetchProduct();
            }
        }
        
        const updateProduct = async () => {
            const tempItem = await APIController.UpdateProduct(product.value.name, product.value.price, product.value.description, product.value.quantity, props.prodId);
            console.log(tempItem);
            console.log(product.value.name, product.value.price, product.value.description, product.value.quantity, props.prodId);
            if(tempItem) {
                props.toggleInv();
                props.fetchProduct();
            }
        }

        return {
            getProduct,
            addProduct,
            updateProduct,
            product,
        }
    },
    mounted(){
        if(this.prodId != false) {
            this.getProduct();
        }
    }
}
</script>

<style>
.user-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;

    display: flex;
    align-items: center;
    justify-content: center;
}

.user-form .form-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.6);
}

.user-form .form {
    position: relative;
    z-index: 1;
    background-color: #FFF;
    padding: 16px;
    border-radius: 8px;
    width: 100%;
    max-width: 480px;
}

.user-form .form h3 {
    color: var(--dark);
    font-size: 28px;
    margin-bottom: 16px;
}

.form-group {
    display: block;
    margin-bottom: 16px;
}

.from-group label {
    display: block;
    margin-bottom: 4px;
}

.form-group .form-control {
    display: block;
    width: 100%;
    border: 1px solid var(--light);
    padding: 12px 16px;
    border-radius: 4px;
    transition: 0.4s;
    font-size: 18px;
    color: var(--grey);
}

.form-group .form-control:focus {
    box-shadow: 0, 0, 4px, rgba(0, 0, 0, 0.15);
    border-color: transparent;
}

.button-warning {
    background-color:crimson;
}
</style>