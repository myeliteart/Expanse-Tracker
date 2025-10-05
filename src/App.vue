<template>
  <div class="sm:min-h-screen flex sm:flex-row flex-col justify-between w-full">
    <the-nav></the-nav>
    <section class="w-[90%] sm:max-w-[70%] max-w-[90%] grow mx-auto px-7 py-20">
      <RouterView />
    </section>
    
  </div>
  
</template>

<script setup>
  import TheNav from './components/TheNav.vue';
  import { RouterView } from 'vue-router'
</script>



<style>
.active {
  font-weight: 500;
  color: #ffb900;
}
</style>
