<template>
    <div class="toolbar">
        <h2>Client Management System</h2>
        <div class="button-group">
            <router-link class="nav" :to="{ name: 'teamvue' }"><button class="button">Home</button></router-link>
            <router-link class="nav" :to="{ name: 'inv' }"><button class="button">Inventory</button></router-link>
            <router-link class="nav" :to="{ name: 'deliveries' }"><button class="button">Deliveries</button></router-link>
            <button class="button" @click="() => toggleForm()">Add Client</button>
            <button class="button button-outline" @click="() => exportClients()">Export Client List</button>
        </div>
    </div>    
</template>

<script>

export default {
    props: ["toggleForm", "users", "toggleInvForm"],
    methods:{
        async exportClients(){
            return fetch('http://localhost:8000/api', { responseType: 'arraybuffer' })
            .then(response => {
                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', 'clients.xlsx');
                document.body.appendChild(fileLink);
                fileLink.click();
            })
        }
    }
}
</script>

<style>
.toolbar {
    padding: 16px;
    display: flex;
    align-content: center;
    justify-content: space-between;
}

.toolbar h2 {
    color: var(--dark);
    font-size: 32px;
    font-weight: 400;
}
</style>