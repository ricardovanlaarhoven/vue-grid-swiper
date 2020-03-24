import Vue from 'vue';
import App from './App.vue';
import {VueGridSwiper}  from '../src/index.js';

Vue.use(VueGridSwiper);
new Vue({
    render: h => h(App),
}).$mount('#app');
