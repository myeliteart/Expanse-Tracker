<template>
<div class="justify-between gap-14 lg:gap-24 flex flex-col lg:flex-row items-top mx-auto">
    <div class="w-full lg:w-[65%]">
        <div class="flex items-center justify-center">
             <font-awesome-icon :icon="['fas', 'calculator']" class="text-3xl text-gray-500"></font-awesome-icon> 
             <h2 class="text-3xl font-medium ml-6">Your Balance: <span class=" font-bold">${{ Number(store.balance || 0).toFixed(2) }}</span></h2>
        </div>
        <hr class="mt-2 border-gray-400"></hr>
        
        <div class="flex mt-6 justify-between">
            <div class="text-center">
                <h3 class="text-2xl font-medium mb-2">Income</h3>
                <h2 class="font-bold text-2xl text-emerald-600">${{ store.income.toFixed(2) }}</h2>
            </div>
            <div class="text-center">
                <h3 class="text-2xl font-medium mb-2">Expanses</h3>
                <h2 class="font-bold text-2xl text-red-700">${{ store.expanse.toFixed(2) }}</h2>
            </div>
        </div>
    </div>
    <div class="sm:mt-0 mt-2 w-full lg:w-[35%]">
        <div class="mb-3">
            <base-button v-for="tab in store.tabs" class="w-fit cursor-pointer mr-3" @click="selectedTab = tab.toLowerCase()" :mode="selectedTab == tab.toLowerCase() ? 'btnActive' : ''">{{ tab }}</base-button>
        </div>
        <keep-alive>
            <component :is="selectedTab"></component>
        </keep-alive>
    </div>
</div>
</template>

<script setup>
    import { shallowRef } from 'vue'
     const selectedTab = shallowRef ('income')

    import { useTransectionsStore } from '@/stores/transections'
    const store = useTransectionsStore();
</script>