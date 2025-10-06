<template>
    <button :class="mode">
        <slot></slot>
    </button>
</template>

<script setup>
    const props = defineProps(['mode'])
</script>

<style scoped>
      button, button:hover {
        background-color: transparent;
        border: 1px solid #3a3a3a;
        padding: 7px 13px;
        border-radius: .3rem;
        font-weight: bold;
    }

       .btnDark, .btnDark:hover {
        background-color: transparent;
        border: 1px solid #fff;
        padding: 7px 13px;
        border-radius: .3rem;
        font-weight: bold;
    }
    
    .btnWork, .btnWork:hover {
        background-color: transparent;
        border: 1px solid #23aba2;
        color: #23aba2;
        padding: 5px 12px;
        border-radius: .3rem;
        font-weight: bold;
    }
    
    .btnRent, .btnRent:hover {
        background-color: transparent;
        border: 1px solid #a58d12;
        color: #a58d12;
        padding: 5px 12px;
        border-radius: .3rem;
        font-weight: bold;
    }

    .btnFood, .btnFood:hover {
         background-color: transparent;
        border: 1px solid #c96d03;
        color: #c96d03;
        padding: 5px 12px;
        border-radius: .3rem;
        font-weight: bold;
    }

    .btnOther, .btnOther:hover {
        background-color: transparent;
        border: 1px solid #8f51f4;
        color: #8f51f4;
        padding: 5px 12px;
        border-radius: .3rem;
        font-weight: bold;
    }

    .btnActive {
        background-color: #000;
        border: 1px solid #000;
        color: #ffb900;
        padding: 7px 13px;
        border-radius: .3rem;
        font-weight: bold;
    }
    .btnActive:hover {
        background-color: #3a3a3a;
        border: 1px solid #3a3a3a;
        color: #ffb900;
        padding: 7px 13px;
        border-radius: .3rem;
        font-weight: bold;
    }

     .btnActiveDark {
        background-color: #ffb900;
        border: 1px solid #ffb900;
        color: #000;
        padding: 7px 13px;
        border-radius: .3rem;
        font-weight: bold;
    }
    .btnActiveDark:hover {
         background-color: #e3a909;
        border: 1px solid #e3a909;
        color: #000;
        padding: 7px 13px;
        border-radius: .3rem;
        font-weight: bold;
    }
</style>