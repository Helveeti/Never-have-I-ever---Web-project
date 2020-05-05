import Vue from 'vue'
import VueRouter from 'vue-router'

import HaasteForm from "@/components/HaasteForm";
import HaasteTable from "@/components/HaasteTable";
import Missing from "@/components/Missing";
import Login from "@/components/Login";
import OmaSivu from "@/components/OmaSivu";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {path: '/', redirect: {name: "login"}},
        {path: "/login", name: "login", component: Login},
        {path: '/browse', name: 'Browse', component: HaasteTable},
        {path: '/form', name: 'Form', component: HaasteForm},
        {path: '/account', name: 'Account', component: OmaSivu},
        {path: '*', component: Missing}
    ]
});