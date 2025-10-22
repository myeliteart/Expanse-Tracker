<template>
    <Form class="text-left mt-4" @submit="Validate.decrement" :validation-schema="Validate.schema">
        <div>
            <label for="desc">Expense Description</label>
            <Field type="text" name="desc" class="border border-gray-400 w-full mt-1 rounded px-2 py-1 outline-0"></Field>
            <small class="text-red-600"><ErrorMessage name="desc" /></small>
        </div>
        <div class="my-3">
             <label for="amount">Expense Amount</label>
            <Field type="number" name="amount" class="border border-gray-400 w-full mt-1 rounded px-2 py-1 outline-0"></Field>
            <small class="text-red-600"><ErrorMessage name="amount" /></small>
        </div>
        <!-- <div class="my-3">
            <div class="mb-3"><label>Labels</label></div>

             <div v-for="label in store.AllLabelsExpanse" :key="label.id" class="my-2 wrap-break-word">
                <input type="checkbox" v-model="store.selectedLabelsExpanse" :value="label" :class="store.isDarkMode == true ? 'accent' : '' "/>
                {{ label.description }}
            </div>

           <div @click="store.LabelModalExpanse = true" class="mt-2 border border-gray-400 w-fit rounded py-2 px-3 cursor-pointer">
               <font-awesome-icon :icon="['fas', 'plus']" :class="store.isDarkMode == false ? 'text-gray-600' : 'text-white'"></font-awesome-icon> 
                New Label
            </div>
        </div> -->
        <div class="mt-4">
            <base-button type="submit"  :mode="store.isDarkMode ==  false ? 'btnActive' : 'btnActiveDark'" class="font-medium w-full cursor-pointer">Add Expense</base-button>
        </div>
   </Form>

   <!-- <Teleport to="body">
     <base-modal v-if="store.LabelModalExpanse">
        <font-awesome-icon @click="store.LabelModalExpanse = false" :icon="['fas', 'xmark']" class="cursor-pointer text-gray-500 absolute right-0 mx-2 my-3"></font-awesome-icon> 
        <div class="p-4">
            <label>Label Note <small>(E.g. Food, Work, Rent etc.)</small></label>
            <input type="text" v-model.trim="store.labelDescriptionExpanse" class="border border-gray-400 w-full mt-1 rounded px-2 py-1 outline-0" />
            <div class="mt-4 flex justify-end">
                <base-button @click="store.cancelLabel" class="font-medium w-fit cursor-pointer mr-2">Cancel</base-button>
                <base-button @click="store.createLabelExpanse" mode="btnActiveDark" class="font-medium w-fit cursor-pointer">Create Label</base-button>
            </div>
        </div>
    </base-modal>
   </Teleport> -->

</template>

<script setup>
     import { useTransectionsStore } from '@/stores/transections'
     const store = useTransectionsStore();

    import { Field, Form, ErrorMessage } from 'vee-validate';

     import { useValidate } from '@/composables/Validate'
    const Validate = useValidate();

</script>

<style scoped>
    input[type=checkbox] {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
    .accent {
        appearance: none; /* Hides the default checkbox */
        -webkit-appearance: none; /* For older WebKit browsers */
        position: relative;
        background-color: transparent; /* Default background color */
        border: 1px solid #fff;
        border-radius: .1rem;
    }
    .accent[type="checkbox"]::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        width: 0.8em;
        height: 0.8em;
        background-color: white; /* Color of the checkmark */
        transition: transform 0.2s ease-in-out;
    }

    .accent[type="checkbox"]:checked::before {
        transform: translate(-50%, -50%) scale(1);
    }

</style>