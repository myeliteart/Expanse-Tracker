<template>
    <Form class="text-left mt-4" @submit="Validate.decrement" :validation-schema="Validate.schema">
        <div>
            <label for="desc">Expanse Description</label>
            <Field type="text" name="desc" class="border border-gray-400 w-full mt-1 rounded px-2 py-1 outline-0"></Field>
            <small class="text-red-600"><ErrorMessage name="desc" /></small>
        </div>
        <div class="my-3">
             <label for="amount">Expanse Amount</label>
            <Field type="number" name="amount" class="border border-gray-400 w-full mt-1 rounded px-2 py-1 outline-0"></Field>
            <small class="text-red-600"><ErrorMessage name="amount" /></small>
        </div>
        <div class="my-3">
            <label for="selectedOption">Category</label>
            <Field v-model="store.selectedCatE" name="selectedOption" as="select" class="border border-gray-400 w-full mt-1 rounded px-2 py-1 outline-0">
                <option v-for="c in store.expanseFields.cat" :value="c.value">{{ c.text }}</option>
            </Field>
            <small class="text-red-600"><ErrorMessage name="catg" /></small>
        </div>
        <div class="mt-4">
            <base-button type="submit" mode="btnActive" class="font-medium w-full cursor-pointer">Add Expanse</base-button>
        </div>
   </Form>
</template>

<script setup>
     import { useTransectionsStore } from '@/stores/transections'
     const store = useTransectionsStore();

    import { Field, Form, ErrorMessage } from 'vee-validate';

     import { useValidate } from '@/composables/Validate'
    const Validate = useValidate();

</script>
