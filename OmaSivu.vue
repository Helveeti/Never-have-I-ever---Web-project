<template>
    <div id="omasivu">

        <!-- ----------------------------------------- NAVBAR -->

        <b-container>
            <b-row>
                <b-col>
                    <navbar />
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <router-view/>
                </b-col>
            </b-row>
        </b-container>

        <!-- ----------------------------------------- TABLE -->

        <table>
            <thead>
            <tr>
                <th>Käyttäjänimi</th>
                <th>Käyttäjäoikeudet</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in tiedot" :key="user.id">
                <td v-if="editing === user.id">
                    <input type="text" v-model="user.user_name" />
                </td>
                <td v-else>{{user.user_name}}</td>
                <td>{{user.user_level}}</td>
                <td v-if="editing === user.id">
                    <button @click="editUser(user)">Save</button>
                    <button class="muted-button" @click="editing = null">Cancel</button>
                </td>
                <td v-else>
                    <button @click="editMode(user.id)">Edit</button>
                </td>
            </tr>
            </tbody>

            <br>
            <br>

            <input type="password" name="newpassword" v-model="input.new_password" placeholder="New password" pattern="[a-zA-Z0-9-]+{8,}" />
            <input type="password" name="repeatpassword" v-model="input.repeat_password" placeholder="Repeat password" pattern="[a-zA-Z0-9-]+{8,}" />
            <button type="button" v-on:click="handleSubmit()">Päivitä</button>
        </table>

    </div>
</template>

<script>
    import navbar from "@/components/navbar";
    import nodeService from "@/nodeService";

    export default {
        name: 'OmaSivu',
        components: {navbar},
        props: {
            tiedot: Array,
        },
        data() {
            return {
                editing: null,
                input: {
                    new_password: "",
                    repeat_password: "",
                },
            }
        },
        mounted() {
            this.getUserSession();
        },
        methods: {
            async getUserSession() {
                var response = await nodeService.getStorageInfo();
                var data = JSON.parse(JSON.stringify(response));
                this.tiedot = data;
            },

            editMode(id) {
                this.editing = id
            },

            editUser(user) {
                if (user.user_name === '') return
                this.editUsers(user.user_id, user.user_name)
                this.editing = null
            },

            async editUsers(id, updatedUsername){
                var response = await nodeService.editUsername(id, updatedUsername);
                var data = JSON.parse(JSON.stringify(response));
                this.haasteet = data;

                console.log("Updated");
            },

            handleSubmit() {
                if(this.input.new_password != "" && this.input.repeat_password != ""){

                    if(this.input.new_password == this.input.repeat_password){
                        nodeService.updatePassword(this.tiedot[0].user_id, this.input.new_password);
                    }else{
                        console.log("Passwords are not matching.");
                    }

                }else{
                    console.log("Inputs must be filled.");
                }

            },
        }
    }
</script>

<style scoped>
    button {
        margin: 0 0.5rem 0 0;
    }
</style>