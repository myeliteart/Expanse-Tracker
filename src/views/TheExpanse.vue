<template>
   <h1 class="text-3xl font-bold">Expanse History</h1>
   <hr class="mt-2 border-gray-400"></hr>
         <p v-if="!store.expanseHistory.length" class="text-center pt-10">Expanse History is currently empty</p>
   <ul class="">
      <li v-for="(expanse, index) in store.expanseHistory" :key="expanse" class="flex justify-between items-center py-4 border-b border-gray-400 text-1xl content-center">
          <span class="wrap-break-word text-1xl font-medium grow max-w-32 md:max-w-64">{{ expanse.description }}</span>
         <base-button :mode="expanse.cat == 'Work' ? 'btnWork' : expanse.cat == 'Rent' ? 'btnRent' : expanse.cat == 'Food' ? 'btnFood' : expanse.cat == 'Other' ? 'btnOther' : ''" v-if="expanse.cat" class="lg:grow-0">{{ expanse.cat }}</base-button>
          <span class="text-1xl font-medium">${{ expanse.amount.toFixed(2) }}</span>
         <span class="cursor-pointer hidden lg:block">
             <font-awesome-icon @click="store.deleteExpanse(expanse)" :icon="['fas', 'trash']" class="text-gray-500 mr-3 md:mr-6"></font-awesome-icon> 
             <font-awesome-icon  @click="store.editedExpanse(expanse)" :icon="['fas', 'pencil']" class="text-gray-500"></font-awesome-icon> 
        </span>
        <div class="cursor-pointer block lg:hidden">
               <font-awesome-icon @click="store.actions(expanse)" :icon="['fas', 'ellipsis']" class="text-gray-500"></font-awesome-icon> 
               <span v-if="store.mobileActions" class="block mt-2 absolute z-20">
               <div class="block">
                     <font-awesome-icon @click="store.deleteExpanse(expanse)" :icon="['fas', 'trash']" class="text-gray-500 bg-gray-100 p-2 rounded"></font-awesome-icon> 
                     </div>
                     <div class="block">
                     <font-awesome-icon @click="store.editedExpanse(expanse)" :icon="['fas', 'pencil']" class="text-gray-500 bg-gray-100 p-2 rounded"></font-awesome-icon>
               </div>
            </span>
         </div>
      </li>
  </ul>

  <teleport to="body">
   <base-modal v-if="store.ExpModal">
      <div class="w-full p-6">
        <edit-expanse></edit-expanse>
      </div>
   </base-modal>

   <base-modal v-if="store.modalDeleteE">
      <font-awesome-icon @click="store.modalDeleteE = null" :icon="['fas', 'xmark']" class="cursor-pointer text-gray-500 absolute right-0 mx-2 my-3"></font-awesome-icon> 
      <div class="w-full p-6 mt-6">
      <p class="text-1xl">Are you sure you want to delete <b>{{ store.modalDeleteE.description }}</b> ?</p>
      </div>
      <div class="flex justify-end mx-4 mb-4">
         <base-button @click="store.modalDeleteE = null" class="mr-2 cursor-pointer">Cancel</base-button>
         <base-button @click="store.confirmDeletion2" class="cursor-pointer" mode="btnActive">Delete</base-button>
      </div>
   </base-modal>

</teleport>

</template>

<script setup>
     import { useTransectionsStore } from '@/stores/transections'
     const store = useTransectionsStore();

     import EditExpanse from '@/components/EditExpanse.vue';
</script>