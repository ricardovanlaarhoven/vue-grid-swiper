import GridSwiper from './components/GridSwiper.vue';

if (typeof window !== 'undefined' && 'Vue' in window) {
    window.Vue.component('GridSwiper', GridSwiper);
}

export default GridSwiper;
