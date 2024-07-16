<template lang="pug">
.support 
    .support__content.d-flex-c 
        p {{ $t('support.title') }}
        img(src="/images/icons/ukraine.svg", alt="Зображення державного прапору" width="100%" height="100%")

</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.support { 
    width: 100%;
    &__content { 
        width: 100%;
        height: 24px;
        background: #F5F5F5;
        border-radius: 0px 0px 10px 10px;

        @include mid { 
            height: 1.389vw;
        }
        p { 
            font-weight: 500;
            font-size: 11px;
            line-height: 13px;
            color: #030303;

            @include mid { 
                font-size: 0.972vw;
                line-height: 1.181vw;
            }
        }

        img { 
            margin-left: 8px;
            width: 12px;
            height: 8px;

            @include mid { 
                margin-left: 0.556vw;
                width: 1.042vw;
                height: 0.694vw;
            }
        }
    }
    
}
</style>