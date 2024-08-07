import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../pages/SignIn.vue';
import SignUp from '../pages/SignUp.vue';
import ForgotPassword from '../pages/ForgotPassword.vue';
import EmailConfirmation from '../pages/EmailConfirmation.vue';
import SetNewPassword from '../pages/SetNewPassword.vue';
import test from '../pages/test.vue';
import { useStore } from '../stores/store';
import Messanger from '../pages/Messanger.vue';

const routes = [
{
    path: '/',
    name: 'SignIn',
    component: SignIn
},
{
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp
},
{
    path: '/ForgotPassword',
    name: 'ForgotPassword',
    component: ForgotPassword
},
{
    path: '/EmailConfirmation',
    name: 'EmailConfirmation',
    component: EmailConfirmation
},
{
    path: '/SetNewPassword',
    name: 'SetNewPassword',
    component: SetNewPassword
},
{
    path: '/Messanger',
    name: 'Messanger',
    component: Messanger
},
{
    path: '/test',
    name: 'test',
    component: test
},
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const store = useStore();
    store.previousRoute = from.name ? String(from.name) : null;

    const previousRoute = store.previousRoute;

    if (to.name === 'SignUp' && previousRoute !== 'SignIn') {
        next({ name: 'SignIn' });
    }
    else if (to.name === 'ForgotPassword' && previousRoute !== 'SignIn') {
        next({ name: 'SignIn' });
    }
    else if (to.name === 'EmailConfirmation' && (!previousRoute || !['ForgotPassword', 'SignUp'].includes(previousRoute))) {
        next({ name: 'SignIn' });
    }
    else if (to.name === 'SetNewPassword' && previousRoute !== 'EmailConfirmation') {
        next({ name: 'SignIn' });
    }
    else {
        next();
    }
});

export default router;
