<template>
    <span v-if="store.mobileActions" class="block mt-2 absolute z-20">
        <div class="block">
            <font-awesome-icon @click="store.deleteIncome(income)" :icon="['fas', 'trash']" class="text-gray-500 bg-gray-100 p-2 rounded"></font-awesome-icon> 
            </div>
            <div class="block">
            <font-awesome-icon @click="store.editedIncome(income)" :icon="['fas', 'pencil']" class="text-gray-500 bg-gray-100 p-2 rounded"></font-awesome-icon>
        </div>
    </span>
</template>

<script setup>
     import { useTransectionsStore } from '@/stores/transections'
     const store = useTransectionsStore();
</script>