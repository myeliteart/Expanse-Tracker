<template>
     <div class="w-full">
        <font-awesome-icon class="cursor-pointer mb-2" :icon="['fas', 'arrow-left']" @click="router.back"></font-awesome-icon>
         <div class="block md:flex md:justify-between items-center content-center">
            <h1 class="text-3xl font-bold">{{ store.findLabel.description }}</h1>
             <div class="flex items-center mt-2">
               <input v-model="store.searchAll" @keyup.enter="store.findWithThisLabel" type="search" :placeholder="`Search ${store.findLabel.description}`" class=" w-full mr-2 md:mt-0 border border-gray-400 rounded px-2 py-1 outline-0">
               <button @click="store.findWithThisLabel" type="submit" class="bg-black px-4 py-1 text-white rounded cursor-pointer hover:bg-gray-800">Search</button>
            </div>
         </div>
        <hr class="mt-2 border-gray-400"></hr>
        <p v-if="!store.FilteredAllHistory.length" class="text-center pt-10">{{ store.findLabel.description }} is currently empty</p>

        <ul v-if="store.FilteredAllHistory.length"> 
        <div v-for="all in store.FilteredAllHistory" :key="all.id" class="py-4 border-b border-gray-400 text-1xl">
         <li class="flex justify-between items-center content-center">
         <span class="text-1xl font-medium grow max-w-28 md:max-w-64">{{ all.date }}</span>

        <div class="wrap-break-word text-1xl grow max-w-28 md:max-w-64">
            <div>
                <font-awesome-icon :icon="['fas', 'tag']" :class="store.isDarkMode == false ? 'text-gray-600' : ''"></font-awesome-icon>
                <span class="ml-1 font-medium" :class="all.type ==  'income' ? 'text-emerald-500' : 'text-red-600'">{{ all.description }}</span>
            </div>
         </div>
         <span class="text-1xl font-medium  grow max-w-28 md:max-w-64">${{ all.amount.toFixed(2) }}</span>

            <span class="cursor-pointer hidden lg:block">
                <font-awesome-icon @click="store.deleteBoth(all)" :icon="['fas', 'trash']" class="mr-3 md:mr-5" :class="store.isDarkMode ==  false ? 'text-gray-500' : 'text-white'"></font-awesome-icon> 
                <font-awesome-icon  @click="store.editedBoth(all)" :icon="['fas', 'pencil']" :class="store.isDarkMode ==  false ? 'text-gray-500' : 'text-white'"></font-awesome-icon> 
            </span>

            <div class="cursor-pointer block lg:hidden">
               <font-awesome-icon @click="store.actionsBoth(all)" :icon="['fas', 'ellipsis']" class="text-gray-500"></font-awesome-icon> 
               <span v-if="store.mobileActions == all.id" class="block mt-2 absolute z-20">
                    <div class="block">
                        <font-awesome-icon @click="store.deleteBoth(all)" :icon="['fas', 'trash']" class="text-gray-500 bg-gray-100 p-2 rounded"></font-awesome-icon> 
                    </div>
                    <div class="block">
                        <font-awesome-icon @click="store.editedBoth(all)" :icon="['fas', 'pencil']" class="text-gray-500 bg-gray-100 p-2 rounded"></font-awesome-icon>
                    </div>
               </span>
            </div>
        </li>
        </div>
        </ul>

         <div class="text-center mt-10 block md:flex justify-center gap-36">
            <h3 class="text-1xl mb-2" v-if="store.findIncomeWithThisLabel.length">
               Income Total: <b class="text-emerald-500">${{ store.findIncomeWithThisLabel.reduce((sum, item) => sum + Number(item.amount), 0).toFixed(2) }}</b>
            </h3>
            <h3 class="text-1xl mb-2" v-if="store.findExpenseWithThisLabel.length">
               Expense Total: <b class="text-red-600">${{ store.findExpenseWithThisLabel.reduce((sum, item) => sum + Number(item.amount), 0).toFixed(2) }}</b>
            </h3>
         </div>
    </div>

<teleport to="body">
   <base-modal v-if="store.modal">
      <font-awesome-icon @click="store.modal = null" :icon="['fas', 'xmark']" class="cursor-pointer text-gray-500 absolute right-0 mx-2 my-3"></font-awesome-icon> 
      <div class="w-full p-6">
        <edit-income></edit-income>
      </div>
   </base-modal>

    <base-modal v-if="store.ExpModal">
      <div class="w-full p-6">
        <edit-expanse></edit-expanse>
      </div>
   </base-modal>

    <base-modal v-if="store.modalDelete">
         <font-awesome-icon @click="store.modalDelete = null" :icon="['fas', 'xmark']" class="cursor-pointer text-gray-500 absolute right-0 mx-2 my-3"></font-awesome-icon> 
         <div class="p-6 mt-6">
            <p class="text-1xl">Are you sure you want to delete <b>{{ store.modalDelete.description }}</b> ?</p>
         </div>
         <div class="flex justify-end mx-4 mb-4">
            <base-button @click="store.modalDelete = null" class="mr-2 cursor-pointer">Cancel</base-button>
            <base-button @click="store.confirmDeletion3" class="cursor-pointer" mode="btnActive">Delete</base-button>
         </div>
   </base-modal>

    <base-modal v-if="store.modalDeleteE">
      <font-awesome-icon @click="store.modalDeleteE = null" :icon="['fas', 'xmark']" class="cursor-pointer text-gray-500 absolute right-0 mx-2 my-3"></font-awesome-icon> 
      <div class="w-full p-6 mt-6">
      <p class="text-1xl">Are you sure you want to delete <b>{{ store.modalDeleteE.description }}</b> ?</p>
      </div>
      <div class="flex justify-end mx-4 mb-4">
         <base-button @click="store.modalDeleteE = null" class="mr-2 cursor-pointer">Cancel</base-button>
         <base-button @click="store.confirmDeletion4" class="cursor-pointer" mode="btnActive">Delete</base-button>
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
     import EditExpanse from '@/components/EditExpanse.vue';

      onMounted(() => {
        store.findWithThisLabel()
      })
</script>