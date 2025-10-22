<template>
  <h3 class="text-2xl font-bold mb-4">Edit Label</h3> 
  <form @submit.prevent="editV.editFormLabelI">
    <div>
        <label>Label Description</label>
        <input type="text" v-model.trim="store.labelsEditedFields.description" class="border border-gray-400 w-full mt-1 rounded px-2 py-1 outline-0">
    </div>
    
    <div class="mt-3 flex justify-end">
        <base-button @click="store.editLabelModal = null" class="font-bold cursor-pointer mr-2">Cancel</base-button>
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
