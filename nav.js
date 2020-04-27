import HaasteForm from "@/components/HaasteForm";
import HaasteTable from "@/components/HaasteTable";
import Missing from "@/components/Missing";
import Login from "@/components/Login";

const routes = [
    {path: '/', name: 'Login', component: Login},
    {path: '/browse', name: 'Browse', component: HaasteTable},
    {path: '/form', name: 'Form', component: HaasteForm},
    {path: '*', component: Missing}
];

export default routes;