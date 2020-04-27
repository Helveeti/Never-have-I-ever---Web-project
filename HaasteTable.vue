<template>
    <div id="haaste-table">
        <table>
            <thead>
            <tr>
                <th>Nimi</th>
                <th>Haaste</th>
                <th>Kieli</th>
                <th>Actions</th>
                <th><input type="search" id="search" @keydown="nappain('input', $event)" placeholder="Hae..." width="100%"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="haaste in haasteet" :key="haaste.id">
                <td>{{haaste.name}}</td>
                <td v-if="editing === haaste.id">
                    <input type="text" v-model="haaste.statement" />
                </td>
                <td v-else>{{haaste.statement}}</td>
                <td>{{haaste.kieli}}</td>
                <td v-if="editing === haaste.id">
                    <button @click="editHaaste(haaste)">Save</button>
                    <button class="muted-button" @click="cancelEdit(haaste)">Cancel</button>
                </td>
                <td v-else>
                    <button @click="editMode(haaste)">Edit</button>
                    <button @click="deleteHaaste(haaste.id)">Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import nodeService from "@/nodeService.js";

    var haku = '';

    export default{
        name: 'haaste-table',
        props:{
            haasteet: Array,
        },
        data() {
            return {
                editing: null,
            }
        },
        mounted() {
            this.getHaasteita();
        },
        methods: {
            async getHaasteita(){
                var response = await nodeService.getHaasteet();
                var data = JSON.parse(JSON.stringify(response));
                this.haasteet = data;
            },

            editMode(haaste) {
                this.cachedHaaste = Object.assign({}, haaste)
                this.editing = haaste.id
            },
            cancelEdit(haaste) {
                Object.assign(haaste, this.cachedHaaste)
                this.editing = null;
            },

            editHaaste(haaste) {
                if (haaste.statement === '') return
                this.editHaasteita(haaste.id, haaste)
                this.editing = null
            },

            async editHaasteita(id, updatedHaaste){
                var response = await nodeService.editHaasteet(id, updatedHaaste);
                var data = JSON.parse(JSON.stringify(response));
                this.haasteet = data;

                console.log("Updated");
            },

            async deleteHaaste(id) {
                var response = await nodeService.deleteHaasteet(id);
                var data = JSON.parse(JSON.stringify(response));
                this.haasteet = data;

                console.log("Deleted");
            },

            nappain(where, e){
                console.log(`keyuptest at ${where} with code ${e.key}`);

                if(!(e.key === "Enter" || e.key === "Backspace")){
                    haku += e.key;
                }else if(e.key === "Backspace"){
                    haku = haku.slice(0, -1);
                }else if(e.key === "Enter"){
                    if(haku.length >= 1) {
                        haku = JSON.parse('{ "statement": "' + haku + '"}');
                        this.getYksiHaaste(haku);
                    }else{
                        this.getHaasteita();
                    }
                }


            },

            async getYksiHaaste(haaste){
                var response = await nodeService.getTiettyHaaste(haaste);
                var data = JSON.parse(JSON.stringify(response));
                this.haasteet = data;
            },
        }
    }
</script>

<style scoped>
    button {
        margin: 0 0.5rem 0 0;
    }
</style>