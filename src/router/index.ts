import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../pages/SignIn.vue';

const routes = [
{
    path: '/',
    name: 'SignIn',
    component: SignIn
},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
