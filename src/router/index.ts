import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../pages/SignIn.vue';
import SignUp from '../pages/SignUp.vue';
import ForgotPassword from '../pages/ForgotPassword.vue';
import EmailConfirmation from '../pages/EmailConfirmation.vue';
import SetNewPassword from '../pages/SetNewPassword.vue';
import test from '../pages/test.vue';

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
    path: '/test',
    name: 'test',
    component: test
},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
