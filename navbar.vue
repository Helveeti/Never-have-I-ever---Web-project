<template>
    <b-navbar
            toggleable="md"
            type="dark"
            variant="info">
        <b-navbar-nav>
            <b-nav-item :to="{ name: 'Form' }"  >Lisää tapahtuma</b-nav-item>
            <b-nav-item :to="{ name: 'Browse' }">Listaa tapahtuma</b-nav-item>
        </b-navbar-nav>
        <b-navbar-brand :to="{ name: 'HaasteTable' }">Oma tili</b-navbar-brand>
    </b-navbar>
</template>

<script>
    export default {
        name: "navbar"
    }
</script>

<style scoped>

</style>