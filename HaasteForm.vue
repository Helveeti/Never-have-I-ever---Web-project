<template>
    <div id="haaste-form">

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

        <form @submit.prevent="handleSubmit">
            <label>Name</label>
            <input
                    ref="first"
                    type="text"
                    :class="{ 'has-error': submitting && invalidName }"
                    v-model="haaste.name"
                    @focus="clearStatus"
                    @keypress="clearStatus"
            />
            <label>Never have I ever...</label>
            <input
                    type="text"
                    :class="{ 'has-error': submitting && invalidStatement }"
                    v-model="haaste.statement"
                    @focus="clearStatus"
            />
            <div class="radio">
                <input type="radio"
                       v-model="haaste.kieli"
                       @focus="clearStatus"
                       id="ENG"
                       value="ENG"
                       name="ENG">
                <label for="ENG">ENG</label>
                <input type="radio"
                       v-model="haaste.kieli"
                       @focus="clearStatus"
                       id="FIN"
                       value="FIN"
                       name="FIN">
                <label for="FIN">FIN</label>
            </div>
            <p v-if="error && submitting" class="error-message">
                ❗Please fill out all required fields
            </p>
            <p v-if="success" class="success-message">
                ✅ Prompt successfully added
            </p>
            <button>Add Prompt</button>
        </form>
    </div>
</template>

<script>
    import nodeService from "@/nodeService";
    import navbar from "@/components/navbar";

    export default {
        name: "haaste-form",
        components: {navbar},
        data() {
            return {
                submitting: false,
                error: false,
                success: false,
                haaste: {
                    name: '',
                    statement: '',
                    kieli: ''
                }
            }
        },
        methods: {
            handleSubmit() {
                this.submitting = true
                this.clearStatus()

                if (this.invalidName || this.invalidStatement || this.invalidLanguage) {
                    this.error = true
                    return
                }

                this.addHaaste(this.haaste)
                this.$refs.first.focus()
                this.haaste = {
                    name: '',
                    statement: '',
                    kieli: ''
                }
                this.error = false
                this.success = true
                this.submitting = false
            },

            clearStatus() {
                this.success = false
                this.error = false
            },

            async addHaaste(haaste){
                var response = await nodeService.addHaasteet(haaste);
                var data = JSON.parse(JSON.stringify(response));
                this.haasteet = data;

                console.log("Added");
            },
        },
        computed: {
            invalidName() {
                return this.haaste.name === ''
            },

            invalidStatement() {
                return this.haaste.statement === ''
            },
            invalidLanguage(){
                return this.haaste.kieli == ''
            }
        },
    }
</script>

<style scoped>
    form {
        margin-bottom: 2rem;
    }

    [class*='-message'] {
        font-weight: 500;
    }

    .error-message {
        color: #d33c40;
    }

    .success-message {
        color: #32a95d;
    }
</style>