<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.user_name" placeholder="Username" pattern="[a-zA-Z0-9-]+" />
        <input type="password" name="password" v-model="input.user_password" placeholder="Password" pattern="[a-zA-Z0-9-]+" />
        <button type="button" v-on:click="login()">Login</button>
    </div>
</template>

<script>
    import nodeService from "@/nodeService";

    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    user_name: "",
                    user_password: "",
                },
            }
        },
        methods: {
            async login() {
                 /* IF INPUTS NOT EMPTY -> CHECK IF MATCHING WITH DATABASE */
                if(this.input.user_name != "" && this.input.user_password != "") {
                    var haku = JSON.parse('{ "user_name": "' + this.input.user_name + '", "user_password": "' + this.input.user_password + '"}');
                    var response = await nodeService.getTiettyUser(haku);

                    if(response) {
                        this.$emit("authenticated", true);
                        await this.$router.replace({ name: "Browse" });
                    } else {
                        console.log("The username and / or password is incorrect");
                    }
                } else {
                    console.log("A username and password must be present");
                }
            },
        }
    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 100px;
        padding: 20px;
    }
</style>