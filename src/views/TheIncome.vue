<template>
   <div class="w-full">
      <font-awesome-icon class="cursor-pointer mb-2" :icon="['fas', 'arrow-left']" @click="router.back"></font-awesome-icon>
       <div class="block md:flex md:justify-between items-center content-center">
         <h1 class="text-3xl font-bold mb-2 md:mb-0">Income History</h1>
         <div class="flex items-center my-1">
            <input v-model.trim="store.searchIncome" @keyup.enter="store.searchAllIncomes" type="search" placeholder="Search Income History" class=" w-full mr-2 md:mt-0 border border-gray-400 rounded px-2 py-1 outline-0">
            <button @click="store.searchAllIncomes" type="submit" :class="store.isDarkMode == false ? 'bg-black text-white  hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'" class="px-4 py-1 rounded cursor-pointer">Search</button>
         </div>
   </div>
      
      <hr class="mt-2 border-gray-400"></hr>
      <p v-if="!store.FilteredincomeHistory.length" class="text-center pt-10">Income History is currently empty</p>
      <ul v-if="store.FilteredincomeHistory.length"> 
        <div v-for="income in store.FilteredincomeHistory" :key="income.id" class="py-4 border-b border-gray-400 text-1xl">
         <li class="flex justify-between items-center content-center">
         <span class="text-1xl font-medium grow max-w-28 md:max-w-64">{{ income.date }}</span>
         
         <div class="wrap-break-word text-1xl grow max-w-28 md:max-w-64">
           
            <div class="font-medium">{{ income.description }}</div>

             <div v-for="item in income.lbl" class="grow lg:grow-0 mt-1">
               <font-awesome-icon v-if="item" :icon="['fas', 'tag']" :class="store.isDarkMode == false ? 'text-gray-600' : ''"></font-awesome-icon>
               <span class="ml-1 cursor-pointer hover:underline" @click="store.goToLabelDetails(item)">{{ item.description }}</span> 
             </div>
         </div>
            <span class="text-1xl font-medium grow max-w-28 md:max-w-64">${{ income.amount.toFixed(2) }}</span>
            <span class="cursor-pointer hidden lg:block">
                  <font-awesome-icon @click="store.deleteIncome(income)" :icon="['fas', 'trash']" class="mr-3 md:mr-5" :class="store.isDarkMode ==  false ? 'text-gray-500' : 'text-white'"></font-awesome-icon> 
                  <font-awesome-icon  @click="store.editedIncome(income)" :icon="['fas', 'pencil']" :class="store.isDarkMode ==  false ? 'text-gray-500' : 'text-white'"></font-awesome-icon> 
            </span>

            <div class="cursor-pointer block lg:hidden">
                <font-awesome-icon @click="store.actions(income)" :icon="['fas', 'ellipsis']" class="text-gray-500"></font-awesome-icon> 
                <span v-if="store.mobileActions == income.id" class="block mt-2 absolute z-20">
                  <div class="block">
                     <font-awesome-icon @click="store.deleteIncome(income)" :icon="['fas', 'trash']" class="text-gray-500 bg-gray-100 p-2 rounded"></font-awesome-icon> 
                  </div>
                  <div class="block">
                        <font-awesome-icon @click="store.editedIncome(income)" :icon="['fas', 'pencil']" class="text-gray-500 bg-gray-100 p-2 rounded"></font-awesome-icon>
                  </div>
               </span>
            </div>
            </li>
           </div>
         </ul>
      </div>

<teleport to="body">
   <base-modal v-if="store.modal">
      <font-awesome-icon @click="store.modal = null" :icon="['fas', 'xmark']" class="cursor-pointer text-gray-500 absolute right-0 mx-2 my-3"></font-awesome-icon> 
      <div class="w-full p-6">
        <edit-income></edit-income>
      </div>
   </base-modal>

    <base-modal v-if="store.modalDelete">
         <font-awesome-icon @click="store.modalDelete = null" :icon="['fas', 'xmark']" class="cursor-pointer text-gray-500 absolute right-0 mx-2 my-3"></font-awesome-icon> 
         <div class="p-6 mt-6">
            <p class="text-1xl">Are you sure you want to delete <b>{{ store.modalDelete.description }}</b> ?</p>
         </div>
         <div class="flex justify-end mx-4 mb-4">
            <base-button @click="store.modalDelete = null" class="mr-2 cursor-pointer">Cancel</base-button>
            <base-button @click="store.confirmDeletion" class="cursor-pointer" mode="btnActive">Delete</base-button>
         </div>
   </base-modal>
</teleport>

</template>

<script setup>
      import { onMounted } from 'vue';
     import { useRouter } from 'vue-router';
     const router = useRouter();
     import { useTransectionsStore } from '@/stores/transections'
     const store = useTransectionsStore();

     import EditIncome from '@/components/EditIncome.vue';

     onMounted(() => {
      store.FilteredincomeHistory = [...store.incomeHistory]
     })
</script>