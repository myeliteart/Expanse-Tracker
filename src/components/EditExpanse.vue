<template>
  <h3 class="text-2xl font-bold mb-4">Edit Transection</h3> 
  <form @submit.prevent="editV.editFormE">
    <div>
        <label>Expanse Description</label> 
        <input type="text" v-model.trim="store.expanseEditedFields.description" class="border border-gray-400 w-full mt-1 rounded px-2 py-1 outline-0">
    </div>
     <div class="my-3">
        <label>Expanse Amount</label>
        <input type="number" v-model.trim="store.expanseEditedFields.amount" class="border border-gray-400 w-full mt-1 rounded px-2 py-1 outline-0">
    </div>
     <div v-if="store.AllLabels.length">
        <label>Labels</label>
        <div v-for="label in store.AllLabels" :key="label.id" class="my-2 wrap-break-word">
            <input type="checkbox" v-model="store.expanseEditedFields.lbl" :value="label" :class="store.isDarkMode == true ? 'accent' : '' "/>
            {{ label.description }} 
        </div>
    </div>

    <div class="mt-3 flex justify-end">
        <base-button @click="store.ExpModal = null" class="font-bold cursor-pointer mr-2">Cancel</base-button>
        <base-button type="submit" mode="btnActive" class="font-bold cursor-pointer">Save</base-button>
    </div>
  </form>
</template>

<script setup>
     import { useTransectionsStore } from '@/stores/transections'
     const store = useTransectionsStore();

      import { useEditValidate } from '@/composables/EditValidate'
    const editV = useEditValidate();
</script>

<style scoped>
   input[type=checkbox] {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
</style>
