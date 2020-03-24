<template>
    <grid-swiper width="100vw" height="100vh">
        <template #0.0>
            <img src="https://picsum.photos/1920/1080?1" width="100%" height="100%"/>
        </template>
        <template #0.1>
            <img src="https://picsum.photos/1920/1080?2" width="100%" height="100%"/>
        </template>
        <template #1.0>
            <img src="https://picsum.photos/1920/1080?3" width="100%" height="100%"/>
        </template>
        <template #1.1>
            <img src="https://picsum.photos/1920/1080?4" width="100%" height="100%"/>
        </template>
    </grid-swiper>
</template>

<script>
import {GridSwiper} from '../src/';

export default {
    name: 'Example',
    components: {GridSwiper: GridSwiper},
};
</script>
<style>
body{
    margin: 0;
}
</style>
