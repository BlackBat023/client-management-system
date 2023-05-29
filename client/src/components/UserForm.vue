<template>
    <div class="user-form">
        <div class="form-overlay" @click="() => toggleForm()"></div>
        <form class="form" @submit.prevent="(userId == false) ? createUser() : updateUser()">
            <h3>User Form</h3>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" class="form-control" v-model="user.name"/>

            </div>
            <div class="form-group">
                <label for="phone">Phone</label>
                <input type="tel" name="phone" id="phone" class="form-control" v-model="user.phone"/>

            </div>
            <div class="form-group">
                <label for="password">Address</label>
                <input type="text" name="address" id="address" class="form-control" v-model="user.address"/>

            </div>
            <input type="submit" :value="(userId != false) ? 'Update' : 'Add'" class="button"/>
        </form>
    </div>   
</template>

<script>
import { ref } from 'vue';
import APIController from '@/controllers/api'

export default {
    props: ["toggleForm", "fetchUsers", "userId"],
    setup (props) {
        const user = ref({});

        const getUser = async () => {
            user.value = await APIController.FetchUser(props.userId);
        }

        const createUser = async () => {
            const success = await APIController.CreateUser(user.value.name, user.value.phone, user.value.address);
            console.log(typeof success);
            if(success){
                props.toggleForm();
                props.fetchUsers();
            }
        }
        
        const updateUser = async () => {
            const tempUser = await APIController.UpdateUser(user.value.name, user.value.phone, user.value.address, props.userId);

            if(tempUser) {
                props.toggleForm();
                props.fetchUsers();
            }
        }

        return {
            user,
            getUser,
            createUser,
            updateUser,
        }
    },
    mounted () {
        if(this.userId != false) {
            this.getUser();
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