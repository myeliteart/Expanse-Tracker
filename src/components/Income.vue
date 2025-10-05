<template>
    <Form class="text-left mt-4" @submit="Validate.increment" :validation-schema="Validate.schema">
        <div>
            <label for="desc">Income Description</label>
            <Field type="text" name="desc" class="border border-gray-400 w-full mt-1 rounded px-2 py-1 outline-0"></Field>
            <small class="text-red-600"><ErrorMessage name="desc" /></small>
        </div>
        <div class="my-3">
             <label for="amount">Income Amount</label>
            <Field type="number" name="amount" class="border border-gray-400 w-full mt-1 rounded px-2 py-1 outline-0"></Field>
            <small class="text-red-600"><ErrorMessage name="amount" /></small>
        </div>
        <div class="my-3">
            <label for="selectedOption">Category</label>
            <Field v-model="store.selectedCatI" name="selectedOption" as="select" class="border border-gray-400 w-full mt-1 rounded px-2 py-1 outline-0">
                <option v-for="c in store.incomeFields.cat" :value="c.value">{{ c.text }}</option>
            </Field>
            <small class="text-red-600"><ErrorMessage name="selectedOption" /></small>
        </div>
        <div class="mt-4">
            <base-button type="submit" mode="btnActive" class="font-medium w-full cursor-pointer">Add Income</base-button>
        </div>
   </Form>

    <!-- <form class="text-left mt-4" @submit.prevent="store.increment">
        <div>
            <label>Income Description</label>
            <input type="text" v-model.trim="store.incomeFields.description" class="border border-gray-400 w-full mt-1 rounded px-2 py-1 outline-0">
        </div>
        <div class="my-3">
            <label>Income Amount</label>
            <input type="number" v-model.trim="store.incomeFields.amount" class="border border-gray-400 w-full mt-1 rounded px-2 py-1 outline-0">
        </div>
       
         <div>
            <label>Categories</label>
            <select v-model.trim="store.selectedCatI" class="border border-gray-400 w-full mt-1 rounded px-2 py-1 outline-0">
                <option v-for="c in store.incomeFields.cat" :value="c.value">{{ c.text }}</option>
            </select>
        </div>
        <div class="mt-4">
            <base-button type="submit" mode="btnActive" class="font-bold w-full cursor-pointer">Add Transaction</base-button>
        </div>
   </form> -->
</template>

<script setup>
    import { useTransectionsStore } from '@/stores/transections'
    const store = useTransectionsStore();

    import { Field, Form, ErrorMessage } from 'vee-validate';

    import { useValidate } from '@/composables/Validate'
    const Validate = useValidate();
</script>
