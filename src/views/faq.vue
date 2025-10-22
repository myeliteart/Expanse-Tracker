<template>
     <font-awesome-icon class="cursor-pointer mb-2" :icon="['fas', 'arrow-left']" @click="router.back"></font-awesome-icon>
   <h1 class="text-3xl font-bold">Frequently asked Questions</h1>
   <hr class="my-2 border-gray-400"></hr>     

    <div class="card">
        <Accordion value="0">
            <AccordionPanel value="0">
                <AccordionHeader>How do I add a new income entry?</AccordionHeader>
                <AccordionContent>
                    <p class="m-0">
                        Go to the "Income" tab, fill in the description, amount, and category, then click "Add Income" The balance and total income will update automatically.
                    </p>
                </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="1">
                <AccordionHeader>How do I record an expense?</AccordionHeader>
                <AccordionContent>
                    <p class="m-0">
                       Open the "Expense" tab, enter the details and amount, then click "Add Expense" The balance will automatically decrease based on the expense amount.
                    </p>
                </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="2">
                <AccordionHeader>Can I edit an income or expense entry?</AccordionHeader>
                <AccordionContent>
                    <p class="m-0">
                       Yes! Click the "Edit" icon next to the entry. Make your changes in the modal form, and click "Save." The totals and balance will adjust automatically.
                    </p>
                </AccordionContent>
            </AccordionPanel>
             <AccordionPanel value="3">
                <AccordionHeader>What happens if I delete an entry?</AccordionHeader>
                <AccordionContent>
                    <p class="m-0">
                        Deleting an income or expense removes it from history and recalculates your totals and balance.
                    </p>
                </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="4">
                <AccordionHeader>How do I access edit/delete options on mobile?</AccordionHeader>
                <AccordionContent>
                    <p class="m-0">
                       Tap the ellipsis (…) icon next to an entry. A small menu will appear with Edit and Delete options. Only the selected entrys menu will open.
                    </p>
                </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="5">
                <AccordionHeader>Can I use this app on any device?</AccordionHeader>
                <AccordionContent>
                    <p class="m-0">
                       Yes! The tracker is responsive and works on desktop, tablet, and mobile screens.
                    </p>
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
    </div>
</template>

<script setup>
     import { useRouter } from 'vue-router';
     const router = useRouter();

   import Accordion from 'primevue/accordion';
   import AccordionPanel from 'primevue/accordionpanel';
   import AccordionHeader from 'primevue/accordionheader';
   import AccordionContent from 'primevue/accordioncontent';
</script>

<style>

   .p-accordionheader {
       border-width: 0px !important;
       background-color: #f1f1f1 !important;
       color: rgb(20, 30, 63) !important;
       padding: 7px 12px !important;
       font-weight: 500 !important;
       border-radius: .3rem !important;
   }

   .p-accordionpanel {
      border-width: 0px !important;
      padding: 7px 0 !important;
   }

   .p-accordion-content {
        border-width: 0px !important; /* Adjust the value as needed */
    }
    .p-accordioncontent-content {
       border-width: 0px !important;
       padding: 9px !important;
    }

</style>