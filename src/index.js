import Vue2TouchEvents from 'vue2-touch-events'
import GridSwiper from './components/GridSwiper.vue';

const VueGridSwiper = {
    install(Vue, options) {
        Vue.use(Vue2TouchEvents)

    },
};

export {GridSwiper, VueGridSwiper};
