<template>
    <div class="team">
        <div class="team-members table">
            <div class="table-header table-row">
                <h2>Client List</h2>
                <div class="table-col search">
                    <input type="text" class="search-bar" v-model="searchQuery" placeholder="Search Client Name..."/>
                </div>
            </div>
            <div class="table-header table-row">
                <div class="table-col name">Name</div>
                <div class="table-col phone">Phone</div>
                <div class="table-col phone">Address</div>
                <div class="table-col table-actions">Actions</div>
                <div class="table-col table-actions" v-if="filterSearch">
                    <span v-if="!searchQuery">Total:</span><span v-else>Found:</span> {{ filterSearch.length }} clients
                </div>
            </div>
            <div class="member table-row" v-for="(user, index) in filterSearch" :key="index">
                    <div class="table-col name">{{ user.name }}</div>
                    <div class="table-col phone">{{ user.phone }}</div>
                    <div class="table-col phone">{{ user.address }}</div> 
                <div class="table-col actions">
                    <div class="button-group group-end">
                        <button class="button button-small" @click="() => toggleForm(user.id)">Update</button>
                        <button class="button button-small button-alert" @click="() => deleteUser(user.id)">Delete</button>
                    </div>
                </div>
                <div class="table-col actions">
                    <router-link class="nav" :to="{ name: 'clientDetails',  params: { id: user.id, name: user.name } }">
                        <div class="button button-small">Details</div>
                    </router-link>
                    <router-link class="nav" :to="{ name: 'ClientOrder', params: { name: user.name, id: user.id } }">
                        <div class="button button-small">Order</div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import APIController from '@/controllers/api'
import { ref } from 'vue'
import { mapState } from 'vuex'


export default {
    props: ["fetchUsers", "toggleForm"],
    data(){
        return {
        }
    },
    setup (props) {
        const searchQuery = ref("");


        const deleteUser = async id => {
            const success = await APIController.DeleteUser(id);
            if(success) {
                props.fetchUsers();
            }
        }

        return {
            deleteUser,
            searchQuery,
        }
    },
    computed: {
        ...mapState([
            'users'
        ]),

        filterSearch () {
            return this.users.user.filter((item) => {
               if(this.users.user){ return item.name.toLowerCase().match(this.searchQuery.toLowerCase()); }
            });
            
        }
    },
    mounted(){

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
    color: var(--dark);
}

.table-row {
    background-color: #FFF;
}

.table-row:nth-child(2n) {
    background-color: var(--grey);
}

.table .table-header {
    background-color: var(--dark);
}

.table .table-header .table-col {
    color: var(--light);
}

.table-header h2 {
    color: #fff;
    margin-left: 20px;
}

.table-actions {
    text-align: right;
}

.search {
    margin-left: -150px;
}

.search .search-bar {
    background-color: var(--light);
    color: var(--dark);
    width: 200px;
    height: 25px;
    font-size: 16px;
    border-radius: 8px;
}

span {
    color: var(--light);
    width: 100px;
}
</style>