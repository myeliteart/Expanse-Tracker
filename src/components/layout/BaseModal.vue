<template>
    <div @click="cncl"></div>
    <dialog open>
        <slot></slot>
    </dialog>
</template>

<script setup>
     import { useTransectionsStore } from '@/stores/transections'
     const store = useTransectionsStore();

     const cncl = () => {
        store.modal = null
        store.ExpModal = null
        store.modalDeleteE = null
        store.modalDelete = null
     }
</script>


<style scoped>
     div{
        position: fixed;
        opacity: 0.8;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.75);
        z-index: 10;
    }
      dialog {
        position: fixed;
        top: 30%;
        left: 0%;
        width: 30%;
        margin: 0 auto;
        border: none;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        border-radius: .3rem;
        overflow: hidden;
        z-index: 100;
    }

    @media (width <= 1280px) {
        dialog {
        width: 45%;
    }
    }

    @media (width <= 1024px) {
        dialog {
        width: 55%;
    }
    }

     @media (width <= 768px) {
        dialog {
        width: 65%;
    }
    }

    @media (width <= 640px) {
        dialog {
        width: 70%;
    }
    }
</style>