<template lang="pug">
button(:class="{'form-button': isForm, 'modal-button': isModal, 'history-button': isHistory}").button.pointer 
    span(:class="{'button__title': isForm}") {{ $t(title) }}
</template>

<script>
    export default {
        props: {    
            title: {
                type: String,
                default: null
            },
            isForm: { 
                type: Boolean,
                default: false
            },
            isModal: { 
                type: Boolean,
                default: false
            },
            isHistory: {
                type: Boolean,
                default: false
            },
            isDisabled: {
                type: Boolean,
                default: false
            }
        },
    }
</script>

<style lang="scss" scoped>
.button { 
    padding: 16px 0px;
    width: 100%;
    border: 1px solid #1BB16E;
    // filter: drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.37));
    border-radius: 10px;

    text-align: center;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #030303;

    transition: all .3s;

    &:hover { 
        transition: all .3s;
        // background: #E7E7E7;
        // background: #161616;
        // background: #333333;
        background: rgba(16, 16, 16, 0.85);
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.22);
        // backdrop-filter: blur(4px);
        color: #f5f5f5;
    }

    @include mid { 
        padding: 1.528vw 0;
        border: 0.069vw solid #1BB16E;
        border-radius: 0.694vw;
        font-size: 1.250vw;
        line-height: 1.528vw;
        filter: none;
    }
}
.form-button { 
    margin-top: 8px;
    margin-bottom: 24px;
    padding: 11px 0px;
    background: #13AD68;
    border-radius: 5px;
    border: none;
    filter: none;
    transition: all .3s;
    
    &:hover { 
        background: #00C86F;
        transition: all .3s;
    }
    @include mid { 
        margin: 0;
        width: 11.667vw;
        font-size: 0.972vw;
        line-height: 1.181vw;
        padding: 0.904vw 0 0.833vw ;
        border: 0.069vw solid #1BB16E;
        border-radius: 0.347vw;
    }
}
.button__title { 
    color: #fff;
    padding-left: 18px;
    position: relative;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;

    &::before { 
        position: absolute;
        display: block;
        content: "";
        background-image: url("/images/icons/search.svg");
        background-repeat: no-repeat;
        background-size: contain;
        width: 10px;
        height: 10px;
        top: 50%;
        transform: translateY(-50%);
        left: 0%;

        @include mid { 
            width: 0.833vw;
            height: 0.833vw;
        }
    }

    @include mid { 
        font-size: 0.972vw;
        line-height: 1.181vw;
        padding-left: 1.389vw;

    }
}
.modal-button { 
    transition: all .3s;
    background: #13AD68;
    filter: none;
    color: #ffffff;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    border-radius: 5px;

    @include mid { 
        font-size: 1.111vw;
        line-height: 1.389vw;
        border-radius: 0.347vw;
    }
    &:hover { 
        transition: all .3s;
        background-color: transparent;
        color: #030303;
    }
}
.history-button { 
    background: #13AD68;
    border-radius: 5px;
    filter: none;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;

    @include mid { 
        background-color: transparent;
        border: 0.069vw solid #13AD68;
        filter: drop-shadow(0 0.208vw 0.278vw rgba(0, 0, 0, 0.16));
        border-radius: 0.347vw;
        font-weight: 500;
        font-size: 0.972vw;
        line-height: 1.181vw;
        color: #030303;
        width: 10.139vw;
    }
}
</style>