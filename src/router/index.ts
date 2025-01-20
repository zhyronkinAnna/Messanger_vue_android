import { createRouter, createWebHashHistory } from 'vue-router';
import SignIn from '../pages/SignIn.vue';
import SignUp from '../pages/SignUp.vue';
import ForgotPassword from '../pages/ForgotPassword.vue';
import EmailConfirmed from '../pages/EmailConfirmed.vue';
import SetNewPassword from '../pages/SetNewPassword.vue';
import test from '../pages/test.vue';
import SaveToken from '../pages/SaveToken.vue';
import Messanger from '../pages/Messanger.vue';
import Chats from '../pages/Chats.vue';
import MessangerMe from '../pages/MessangerMe.vue';
import PleaseConfirmEmail from '../pages/PleaseConfirmEmail.vue';

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
    path: '/EmailConfirmed',
    name: 'EmailConfirmed',
    component: EmailConfirmed
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
{
    path: '/SaveToken',
    name: 'SaveToken',
    component: SaveToken
},
{
    path: '/Chats',
    name: 'Chats',
    component: Chats
    // //TODO: то что должен видеть юсер первым  + Удалить чат вью и переименоваьт файл чатМе
},
{
    path: '/Messanger',
    name: 'Messanger',
    component: MessangerMe
},
{
    path: '/PleaseConfirmEmail',
    name: 'PleaseConfirmEmail',
    component: PleaseConfirmEmail,
}
];


const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
