<template>
    <div id="omasivu">

        <!-- NAVBAR -->

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

        <!-- FORM -->

        <form>

            <!-- VIEW USER -->

            <div id="userView">

                <div>
                    Käyttäjänimi:
                    <td v-if="editing === tiedot[0].user_id">
                        <input type="text" v-model="tiedot[0].user_name" />
                    </td>
                    <td v-else>{{tiedot[0].user_name}}</td>

                    <td v-if="editing === tiedot[0].user_id">
                        <button @click="editUser(tiedot[0])">Save</button>
                        <button class="muted-button" @click="editing = null">Cancel</button>
                    </td>
                    <td v-else>
                        <button @click="editMode(tiedot[0].user_id)">Edit</button>
                    </td>

                </div>

            </div>

            <!-- CHANGE PASSWORD -->

            <div id="salasana">
                <div>
                    Vaihda salasana: <input type="password" name="newpassword" v-model="input.new_password" placeholder="New password" pattern="[a-zA-Z0-9-]+{8,}" />
                </div>

                <div>
                    Salana uudestaan: <input type="password" name="repeatpassword" v-model="input.repeat_password" placeholder="Repeat password" pattern="[a-zA-Z0-9-]+{8,}" />
                </div>
                <button type="button" v-on:click="handleSubmit()">Päivitä</button>
            </div>

        </form>

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

    #salasana {
        /*background: red;*/
    }
</style>