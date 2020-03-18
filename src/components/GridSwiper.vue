<template>
    <div class="swipe-grid"
         v-touch:end="movedHandler"
         v-touch:moving="movingHandler"
         v-touch:start="startHandler"
         :style="{width: width, height: height}"
         ref="swipeGrid"
    >
        <div class="swipe-grid-wrapper"
             :style="{marginTop: computedTop}" :class="{animate: animating}"
        >
            <div class="swipe-grid-row" v-for="(n, rowIndex) in slots.length"
                 :style="{marginLeft: calculateLeft(rowIndex), height: height}"
                 :class="{animate: animating}"
                 :key="rowIndex">
                <div class="swipe-grid-item" v-for="(n, itemIndex) in slots[rowIndex]" :style="{width: width}">
                    <slot :name="`${rowIndex}.${itemIndex}`"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GridSwiper',
    data() {
        return {
            slideX: [],
            slideY: 0,
            startFingerX: 0,
            startFingerY: 0,
            currentFingerX: 0,
            currentFingerY: 0,
            isAnimatingX: false,
            isAnimatingY: false,
            animating: false,
            slideWidth: 0,
            slideHeight: 0,
        };
    },
    props: {
        width: {
            type: String,
            required: false,
            default: '100vw',
        },
        height: {
            type: String,
            required: false,
            default: '100vh',
        },
    },
    mounted() {
        for (let i = 0; i < this.slots.length; i++) {
            this.slideX.push(0);
        }

        this.slideWidth = this.$refs.swipeGrid.offsetWidth;
        this.slideHeight = this.$refs.swipeGrid.offsetHeight;
    },
    computed: {
        computedTop() {
            if (this.isAnimatingY) {
                return (this.slideY * this.slideHeight * -1) + ((this.startFingerY - this.currentFingerY) * -1) + 'px';
            }
            return this.slideY * this.slideHeight * -1;
        },
        slots() {
            let slots = [];
            Object.keys(this.$slots).forEach(slot => {
                const splitted = slot.split('.');
                if (!slots[splitted[0]]) {
                    slots[splitted[0]] = 0;
                }
                slots[splitted[0]]++;
            });
            return slots;
        },
    },
    methods: {
        calculateLeft(ySlideNumber) {
            if (this.isAnimatingX) {
                return (this.slideX[ySlideNumber] * this.slideWidth * -1) + ((this.startFingerX - this.currentFingerX) * -1) + 'px';
            }
            return this.slideX[ySlideNumber] * this.slideWidth * -1 + 'px';
        },
        movingHandler(touch) {
            this.currentFingerX = touch.touches[0].clientX;
            this.currentFingerY = touch.touches[0].clientY;

            if (!this.isAnimatingX && !this.isAnimatingY) this.determineMovingDirection();
        },
        movedHandler(touch) {
            this.animating = true;
            setTimeout(() => {
                this.animating = false;
                this.isAnimatingX = false;
                this.isAnimatingY = false;
            }, 300);
            const hasMovedEnough = this.ifIsMoving(this.slideWidth / 3, this.slideHeight / 3,
                () => {
                    if (this.startFingerX > this.currentFingerX) {
                        if (this.slideX[this.slideY] === this.slots[this.slideY] - 1) return;
                        this.slideX[this.slideY] += 1;
                    } else {
                        if (this.slideX[this.slideY] === 0) return;
                        this.slideX[this.slideY] -= 1;
                    }
                },
                () => {
                    if (this.startFingerY > this.currentFingerY) {
                        if (this.slideY === this.slots.length - 1) return;
                        this.slideY += 1;
                    } else {
                        if (this.slideY === 0) return;
                        this.slideY -= 1;
                    }
                });
            this.startFingerX = 0;
            this.startFingerY = 0;
            this.currentFingerX = 0;
            this.currentFingerY = 0;
        },
        ifIsMoving(thresholdX, thresholdY, callbackX, callbackY) {
            const movingDistanceX = Math.abs(this.startFingerX - this.currentFingerX);
            const movingDistanceY = Math.abs(this.startFingerY - this.currentFingerY);

            if (movingDistanceX > movingDistanceY) {
                if (movingDistanceX < thresholdX) return false;
                callbackX();
                return true;
            } else {
                if (movingDistanceY < thresholdY) return false;
                callbackY();
                return true;
            }

        },
        determineMovingDirection() {
            this.ifIsMoving(20, 20,
                () => {
                    this.isAnimatingX = true;
                },
                () => {
                    this.isAnimatingY = true;
                });
        },
        startHandler(touch) {
            this.startFingerX = touch.touches[0].clientX;
            this.startFingerY = touch.touches[0].clientY;

            this.currentFingerX = touch.touches[0].clientX;
            this.currentFingerY = touch.touches[0].clientY;
        },
    },
};
</script>

<style>
html
{
    overflow: hidden !important;
}

.swipe-grid
{
    overflow: hidden;
}

.swipe-grid-row
{
    white-space: nowrap;
}

.swipe-grid-item
{
    display: inline-block;
    height:  100%;
}

.swipe-grid-item > div
{
    width:  100%;
    height: 100%;
}

.swipe-grid-row.animate
{
    transition: margin-left 0.3s;
}

.swipe-grid-wrapper.animate
{
    transition: margin-top 0.3s;
}
</style>
