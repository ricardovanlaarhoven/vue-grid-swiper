# vue-grid-swiper
A swipe carousel for VueJS - Option for full page swiper/carousel

##installation
run in your cli:

`npm i vue-grid-swiper`

add this to your javascript imports

`import GridSwiper from 'vue-grid-swiper';`



##example
```vueJs
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
import GridSwiper from 'vue-grid-swiper';

export default {
    name: 'Example',
    components: {GridSwiper},
};
</script>

```
