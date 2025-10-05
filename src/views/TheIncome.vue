<template>
   <div class="w-full">
      <h1 class="text-3xl font-bold">Income History</h1>
      <hr class="mt-2 border-gray-400"></hr>
      <p v-if="!store.incomeHistory.length" class="text-center pt-10">Income History is currently empty</p>
      <ul class="" v-if="store.incomeHistory.length">
         <li v-for="income in store.incomeHistory" :key="income.id" class="flex justify-between items-center py-4 border-b border-gray-400 text-1xl content-center">
            <span class="wrap-break-word text-1xl font-medium grow max-w-28 md:max-w-64">{{ income.description }}</span>
            <base-button v-if="income.cat" class="lg:grow-0" :mode="income.cat == 'Work' ? 'btnWork' : income.cat == 'Rent' ? 'btnRent' : income.cat == 'Food' ? 'btnFood' : income.cat == 'Other' ? 'btnOther' : ''">{{ income.cat }}</base-button>
            <span class="text-1xl font-medium">${{ income.amount.toFixed(2) }}</span>
            <span class="cursor-pointer hidden lg:block">
                  <font-awesome-icon @click="store.deleteIncome(income)" :icon="['fas', 'trash']" class="text-gray-500 mr-3 md:mr-6"></font-awesome-icon> 
                  <font-awesome-icon  @click="store.editedIncome(income)" :icon="['fas', 'pencil']" class="text-gray-500"></font-awesome-icon> 
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
     import { useTransectionsStore } from '@/stores/transections'
     const store = useTransectionsStore();

     import EditIncome from '@/components/EditIncome.vue';
</script>