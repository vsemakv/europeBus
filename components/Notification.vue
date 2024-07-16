<template lang="pug">
transition(name='fade')
    .notification(
      v-show="isOpen"
    )
      .notification__inner
        .notification__content
          p(
            v-for="(msg, i) in messages"
            :key="i"
          ) {{ $t(msg) }}
</template>

<script>
    export default {
        props: {
            type: String,
            messages: Array,
            fixed: {
                type: Boolean,
                default: false,
            },
            canBeClosed: {
                type: Boolean,
                default: true,
            },
            durationBeforeClose: {
                type: Number,
                default: 5,
            },
            toBottom: {
                type: Boolean,
                default: false,
            },
            float: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            isOpen() {
                return this.messages && this.messages.length > 0 && !this.wasClosed
            },
        }
        
    }
</script>

<style lang="scss" scoped>
.notification {
    z-index: 99;
    position: absolute;
    background: #F33B3B;
    top: 0px;
    width: 100%;
    padding-block: 5px;

    &__content {
        & p {
            text-align: center;
            font-weight: 400;
            font-size: 16px;
            line-height: 135%;
            /* identical to box height, or 22px */

            display: flex;
            align-items: center;
            justify-content: center;
            letter-spacing: 0.09em;
            text-transform: uppercase;

            color: #FFF;

        }
    }
}
</style>