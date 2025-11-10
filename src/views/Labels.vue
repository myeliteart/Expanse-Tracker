<template>
    <div class="w-full">
        <font-awesome-icon class="cursor-pointer mb-2" :icon="['fas', 'arrow-left']" @click="router.back"></font-awesome-icon>
        <h1 class="text-3xl font-bold">Labels</h1>
        <hr class="mt-2 border-gray-400"></hr>
        <p v-if="!store.AllLabels.length" class="text-center pt-10">Labels is currently empty</p>

      <ul v-if="store.AllLabels.length">
        <div v-for="label in store.AllLabels" :key="label.id" class="py-4 border-b border-gray-400 text-1xl">
         <li class="flex justify-between items-center content-center">
        <span class="text-1xl font-medium grow  max-w-52 md:max-w-[85%]">{{ label.date }}</span>
         <div class="wrap-break-word text-1xl grow max-w-52 md:max-w-[85%]">
            <div>
                <font-awesome-icon :icon="['fas', 'tag']" :class="store.isDarkMode == false ? 'text-gray-600' : ''"></font-awesome-icon>
                <span @click="store.goToLabelDetails(label)" class="cursor-pointer hover:underline ml-1">{{ label.description }}</span>
            </div>
         </div>
            <span class="cursor-pointer hidden lg:block">
                <font-awesome-icon @click="store.deleteLabel(label)" :icon="['fas', 'trash']" class="mr-3 md:mr-5" :class="store.isDarkMode ==  false ? 'text-gray-500' : 'text-white'"></font-awesome-icon> 
                <font-awesome-icon  @click="store.editLabel(label)" :icon="['fas', 'pencil']" :class="store.isDarkMode ==  false ? 'text-gray-500' : 'text-white'"></font-awesome-icon> 
            </span>

            <div class="cursor-pointer block lg:hidden">
                <font-awesome-icon @click="store.actionsLbl(label)" :icon="['fas', 'ellipsis']" class="text-gray-500"></font-awesome-icon> 
               <span v-if="store.mobileActions == label.id" class="block mt-2 absolute z-20">
                    <div class="block">
                        <font-awesome-icon @click="store.deleteLabel(label)" :icon="['fas', 'trash']" class="text-gray-500 bg-gray-100 p-2 rounded"></font-awesome-icon> 
                    </div>
                    <div class="block">
                        <font-awesome-icon @click="store.editLabel(label)" :icon="['fas', 'pencil']" class="text-gray-500 bg-gray-100 p-2 rounded"></font-awesome-icon>
                    </div>
               </span>
            </div>
          </li>
        </div>
        </ul>
        <div class="justify-center text-center mt-5">
         <button @click="store.LabelModal = true" class="border border-gray-400 w-fit rounded py-2 px-3 cursor-pointer">
            <font-awesome-icon :icon="['fas', 'plus']" :class="store.isDarkMode == false ? 'text-gray-600' : 'text-white'"></font-awesome-icon> 
            New Label
         </button>
        </div>
     </div>

     <teleport to="body">
        <base-modal v-if="store.DeleteLabelModal">
            <font-awesome-icon @click="store.DeleteLabelModal = null" :icon="['fas', 'xmark']" class="cursor-pointer text-gray-500 absolute right-0 mx-2 my-3"></font-awesome-icon> 
            <div class="p-6 mt-6">
                <p class="text-1xl">Are you sure you want to delete <b>{{ store.DeleteLabelModal.description }}</b> ?</p>
            </div>
            <div class="flex justify-end mx-4 mb-4">
                <base-button @click="store.DeleteLabelModal = null" class="mr-2 cursor-pointer">Cancel</base-button>
                <base-button @click="store.confirmLabelDeletion" class="cursor-pointer" mode="btnActive">Delete</base-button>
            </div>
        </base-modal>

        <base-modal v-if="store.editLabelModal">
            <font-awesome-icon @click="store.editLabelModal = null" :icon="['fas', 'xmark']" class="cursor-pointer text-gray-500 absolute right-0 mx-2 my-3"></font-awesome-icon> 
            <div class="w-full p-6">
                <edit-labels></edit-labels>
            </div>
        </base-modal>

     <base-modal v-if="store.LabelModal">
        <font-awesome-icon @click="store.LabelModal = false" :icon="['fas', 'xmark']" class="cursor-pointer text-gray-500 absolute right-0 mx-2 my-3"></font-awesome-icon> 
        <div class="p-4">
            <label>Label Note <small>(E.g. Food, Work, Rent etc.)</small></label>
            <input type="text" v-model.trim="store.labelDescription" class="border border-gray-400 w-full mt-1 rounded px-2 py-1 outline-0" />
            <div class="mt-4 flex justify-end">
                <base-button @click="store.cancelLabel" class="font-medium w-fit cursor-pointer mr-2">Cancel</base-button>
                <base-button @click="store.createLabel" mode="btnActiveDark" class="font-medium w-fit cursor-pointer">Create Label</base-button>
            </div>
        </div>
    </base-modal>

     </teleport>
</template>


<script setup>
     import { useRouter } from 'vue-router';
     const router = useRouter();
     import { useTransectionsStore } from '@/stores/transections'
     const store = useTransectionsStore();

     import EditLabels from '@/components/EditLabels.vue';
</script>
