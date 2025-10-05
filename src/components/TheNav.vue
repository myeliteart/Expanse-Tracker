<template>
    
  <nav class="bg-gray-800 text-white list-none">
        <div class="flex flex-row justify-between items-center">
                <router-link to="/" class="pt-4 pb-2 pl-6" @click="store.navOpen = false">
                    <h2 class="text-2xl font-bold mb-2.5 text-amber-400">Expanse Tracker</h2>
                </router-link>
                <div class="block sm:hidden">
                   <button v-if="!store.navOpen" @click="store.navOpen = !store.navOpen" class="pr-6 cursor-pointer">
                      <span class="block h-0.5 w-6 bg-gray-400 mb-1"></span>
                      <span class="block h-0.5 w-6 bg-gray-400 mb-1"></span>
                      <span class="block h-0.5 w-6 bg-gray-400"></span>
                  </button>
                  
                <font-awesome-icon v-if="store.navOpen" @click="store.navOpen = false" :icon="['fas', 'x']" class="text-gray-400 pr-6 cursor-pointer"></font-awesome-icon> 
              </div>
                </div>
           

        <!-- desktop -->

     <ul class="py-6 sm:w-64 sm:px-7 leading-10 hidden sm:block">
        <li class="flex justify-between items-center">
            <router-link to="/" class="">
                <font-awesome-icon :icon="['fas', 'house']" class="mr-2"></font-awesome-icon> 
                Home
            </router-link>
        </li>
         <li class="flex justify-between items-center">
            <router-link to="/income" class="">
                <font-awesome-icon :icon="['fas', 'money-bill']" class="mr-2"></font-awesome-icon> 
                Income
            </router-link>
        </li>
         <li class="flex justify-between items-center">
            <router-link to="/expanse" class="">
                <font-awesome-icon :icon="['fas', 'credit-card']" class="mr-2"></font-awesome-icon> 
                Expanse
            </router-link>
        </li>
         <li class="flex justify-between items-center">
            <router-link to="/faq" class="">
                <font-awesome-icon :icon="['fas', 'circle-question']" class="mr-2"></font-awesome-icon> 
                FAQ
            </router-link>
        </li>
    </ul>

     <!-- mobile -->

    <ul v-if="store.navOpen" class="pt-2 block sm:hidden leading-14">
        <li class="flex justify-between items-center border-t-1 border-t-gray-400 px-7">
          <router-link to="/" class="block" @click="store.navOpen = false">
             <font-awesome-icon :icon="['fas', 'house']" class="mr-2"></font-awesome-icon> 
              Home
          </router-link>
        </li>
        <li class="flex justify-between items-center border-t-1 border-t-gray-400 px-7">
          <router-link to="/income" class="block" @click="store.navOpen = false">
            <font-awesome-icon :icon="['fas', 'money-bill']" class="mr-2"></font-awesome-icon>   
            Income
          </router-link>
        </li>
        <li class="flex justify-between items-center border-t-1 border-t-gray-400 px-7">
          <router-link to="/expanse" class="block" @click="store.navOpen = false">
           <font-awesome-icon :icon="['fas', 'credit-card']" class="mr-2"></font-awesome-icon>   
            Expanse
          </router-link>
        </li>
         <li class="flex justify-between items-center border-t-1 border-t-gray-400 px-7">
          <router-link to="/faq" class="block" @click="store.navOpen = false">
           <font-awesome-icon :icon="['fas', 'circle-question']" class="mr-2"></font-awesome-icon>   
            FAQ
          </router-link>
        </li>
    </ul>
    </nav>
</template>

<script setup>
    import { useTransectionsStore } from '@/stores/transections'
    const store = useTransectionsStore();
</script>