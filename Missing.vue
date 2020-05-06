<template>
    <div id="missing">
        <!-- NAV -->
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

        <h1>Page not found. 404</h1>
    </div>
</template>

<script>
    import navbar from "@/components/navbar";

    export default {
        name: "Missing",
        components: {navbar}
    }
</script>

<style scoped>

</style>
