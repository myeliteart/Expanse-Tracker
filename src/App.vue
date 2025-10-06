<template>
  <div class="relative min-h-screen flex sm:flex-row flex-col justify-between w-full" :class="store.isDarkMode == false ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'">
    <the-nav></the-nav>
    <div class="relative text-end mt-4 mr-4 sm:absolute sm:top-5 sm:right-8 cursor-pointer" @click="store.toggleDark">
      <font-awesome-icon class="" :icon="['fas', 'circle-half-stroke']"></font-awesome-icon> 
      {{ store.isDarkMode == false ? 'Dark' : 'Light' }}
    </div>
      <section class="w-[90%] sm:max-w-[70%] max-w-[90%] grow mx-auto px-7 py-20">
          <RouterView />
      </section>
  </div>
  
</template>

<script setup>
  import TheNav from './components/TheNav.vue';
  import { RouterView } from 'vue-router'

  import { useTransectionsStore } from '@/stores/transections'
  const store = useTransectionsStore();

</script>


<style>
  .active {
    font-weight: 500;
    color: #ffb900;
  }
</style>
