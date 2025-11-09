import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router';
import { useLocalStorage } from '@vueuse/core';

export const useTransectionsStore = defineStore('transections', () => {

  const incomeHistory = useLocalStorage('incomeHistory', []);
  const expanseHistory = useLocalStorage('expanseHistory', [])
  const AllLabels = useLocalStorage('AllLabels', [])
   const selectedLabels = useLocalStorage('selectedLabels', [])

  let FilteredincomeHistory = ref([]);
  let FilteredExpenseHistory = ref([]);
  let FilteredAllHistory = ref([]);

  const income = computed(() => {
    return incomeHistory.value.reduce((sum, i) => sum + Number(i.amount), 0).toFixed(2)
  })

  const expanse = computed(() => {
    return expanseHistory.value.reduce((sum, e) => sum + Number(e.amount), 0).toFixed(2)
  })

   const balance = computed(() => {
    return income.value - expanse.value
   })

  // const balance = ref(0)
  // const income = ref(0)
  // const expanse = ref(0)
  // const incomeHistory = ref ([]);
  // const expanseHistory = ref([]);

  const router = useRouter();
  const route = useRoute();

  // const incomeFields = ref (
  //   {
  //     description: '',
  //     amount: '',
  //     lbl: []
  // });


  //   const expanseFields = ref (
  //   {
  //     description: '',
  //     amount: '',
  //     lbl: []
  // });

  const incomeEditedFields = ref (null);
  const expanseEditedFields = ref (null);
  
  const labelsEditedFields = ref (null);

  const tabs = ref (['Income', 'Expense'])

  const navOpen = ref (false);
  const modal = ref(null);
  const modalDelete = ref(null);
  const modalDeleteE = ref(null)
  const ExpModal = ref(null);
  const LabelModal = ref(false);
  const LabelModalExpanse = ref(false);

  const DeleteLabelModal = ref(null);
  const editLabelModal = ref(null);

  const mobileActions = ref(null);
  const isDarkMode = ref(false);

  const labelDescription = ref ('');

   const searchIncome = ref('');
   const searchExpense = ref('');
   const searchAll = ref('');
  // const filterNumericValue = (event) => {
  //    let value = event.target.value;
  //     value = value.replace(/[^0-9]/g, '');
  //     incomeFields.value.amount = value;
  // }

  const createLabel = () => {
    if(labelDescription.value !== '') {
      if(!AllLabels.value.find(itm => itm.description == labelDescription.value)) {
        const hello = {
          id: AllLabels.value.length + 1,
          description: labelDescription.value,
          date: new Date().toLocaleDateString()
        }
         AllLabels.value.unshift(hello);
         LabelModal.value = false;
      }
    }
    labelDescription.value = ''
  }

  const deleteLabel = (lbl) => {
    DeleteLabelModal.value = lbl
    mobileActions.value = null
  }

  const confirmLabelDeletion = () => {
    AllLabels.value = AllLabels.value.filter(itm => itm.id !== DeleteLabelModal.value.id)

    incomeHistory.value.forEach(inc => {
      inc.lbl = inc.lbl.filter(lbl => lbl.id !== DeleteLabelModal.value.id)
    })
     expanseHistory.value.forEach(exp => {
      exp.lbl = exp.lbl.filter(lbl => lbl.id !== DeleteLabelModal.value.id)
    })
    DeleteLabelModal.value = null 
  }

  const editLabel = (lbl) => {
    editLabelModal.value = lbl
    mobileActions.value = null
    labelsEditedFields.value = {  
      ...(lbl)
    }
  }

  const cancelLabel = () => {
     LabelModal.value = false;
     labelDescription.value = ''
  }

  const goToLabelDetails = (label) => {
    router.push({name: 'labelsDetails', params: {id: label.description.toLowerCase().split(' ').join('-')}})
  }

  // const filteredTheIncome = computed(() => {
  //   return incomeHistory.value.filter(i => i.description.toLowerCase().includes(searchIncome.value.toLocaleLowerCase()) || searchIncome.value == '')
  // })

  //  const filteredTheExpense = computed(() => {
  //   return expanseHistory.value.filter(e => e.description.toLowerCase().includes(searchExpense.value.toLocaleLowerCase()) || searchExpense.value == '')
  // })

  const searchAllIncomes = () => {
      FilteredincomeHistory.value = incomeHistory.value.filter(i => i.description.toLowerCase().includes(searchIncome.value.toLocaleLowerCase()))
      console.log('searchIncome:', searchIncome.value)
      console.log('incomeHistory length:', incomeHistory.value.length)
      console.log('filtered before:', FilteredincomeHistory.value)
    }

  watch(searchIncome, (newVal) => {
    if(newVal == ''){
       FilteredincomeHistory.value = [...incomeHistory.value]
    }
  })

  const searchAllExpenses = () => {
      FilteredExpenseHistory.value = expanseHistory.value.filter(e => e.description.toLowerCase().includes(searchExpense.value.toLocaleLowerCase()))
  }

   watch(searchExpense, (newVal) => {
    if(newVal == ''){
       FilteredExpenseHistory.value = [...expanseHistory.value]
    }
  })

  const findLabel = computed(() => {
    return AllLabels.value.find(lbl => lbl.description.toLowerCase().split(' ').join('-') == route.params.id);
  })

//   const findWithThisLabel = () => {
//   if (!route.params.id) return

//   const term = (searchAll.value || '').toString().trim().toLowerCase()

//   const filteredIncome = incomeHistory.value.filter(itm =>
//     itm.lbl.some(l => l.description.toLowerCase().split(' ').join('-') === route.params.id)
//   )
//   const filteredExpanse = expanseHistory.value.filter(itm =>
//     itm.lbl.some(l => l.description.toLowerCase().split(' ').join('-') === route.params.id)
//   )

//     let withLabel = [...filteredIncome, ...filteredExpanse]

//     if (term) {
//       withLabel = withLabel.filter(itm =>(itm.description || '').toLowerCase().includes(term))
//     } 
//       FilteredAllHistory.value = withLabel
// }

const findWithThisLabel = () => {
  if (!route.params.id) return // safety check
  console.log('route:', route.params.id)

  const term = (searchAll.value || '').trim().toLowerCase()
  const currentLabelSlug = route.params.id

  // first: only items that have the current label
  const filteredIncome = incomeHistory.value.filter(itm =>
    itm.lbl.some(l => l.description.toLowerCase() === currentLabelSlug)
  )

  const filteredExpanse = expanseHistory.value.filter(itm =>
    itm.lbl.some(l => l.description.toLowerCase().split(' ').join('-') === currentLabelSlug)
  )

  let withLabel = [...filteredIncome, ...filteredExpanse]

  // second: apply search filter if searchAll has value
  if (term) {
    withLabel = withLabel.filter(itm =>
      (itm.description || '').toLowerCase().includes(term)
    )
  }

  // finally, assign to your reactive array
  FilteredAllHistory.value = withLabel
}


 watch(searchAll, (newVal) => {
    if(newVal == ''){
      findWithThisLabel()
    }
  })
  // const findWithThisLabel = () => {
  //   const term = (searchAll.value || '').toString().trim().toLowerCase()
  //   if(!route.params.id) {
  //       const allItems = [...incomeHistory.value, ...expanseHistory.value]
  //     if(!term) {
  //       FilteredAllHistory.value = allItems
  //     } else {
  //       FilteredAllHistory.value = allItems.filter(itm => itm.description.toLowerCase().includes(term))
  //     }
  //     return
  //   } 
  //   const filteredIncome = incomeHistory.value.filter(itm => itm.lbl.some(l => l.description.toLowerCase().split(' ').join('-') === route.params.id ))
  //   const filteredExpanse = expanseHistory.value.filter(itm => itm.lbl.some(l => l.description.toLowerCase().split(' ').join('-') === route.params.id ))
  //   const withLabel = [...filteredIncome, ...filteredExpanse]

  //   if(!term) {
  //     FilteredAllHistory.value = withLabel
  //   } else {
  //     FilteredAllHistory.value = withLabel.filter(itm => itm.description || '').toLowerCase().includes(term)
  //   }
  // }

  const findIncomeWithThisLabel = computed(() => {
    return incomeHistory.value.filter(itm => itm.lbl.some(l => l.description.toLowerCase().split(' ').join('-') === route.params.id ));
  })

   const findExpenseWithThisLabel = computed(() => {
    return expanseHistory.value.filter(itm => itm.lbl.some(l => l.description.toLowerCase().split(' ').join('-') === route.params.id ));
  })

  
  const deleteIncome = (inc) => {
    modalDelete.value = inc
    mobileActions.value = null
  }

  const deleteBoth = (transection) => {
    if(transection.type == 'income') {
      modalDelete.value = transection
      mobileActions.value = null
    } else {
       modalDeleteE.value = transection
       mobileActions.value = null
    }
  }

  const deleteExpanse = (exp) => {
    modalDeleteE.value = exp
    mobileActions.value = null
  }

  const editedIncome = (income) => {
    modal.value = income;
    mobileActions.value = null
    incomeEditedFields.value = {
      ...(income)
    }
  }

  const editedBoth = (transection) => {
     if(transection.type == 'income') {
     modal.value = transection;
     mobileActions.value = null
     incomeEditedFields.value = {
      ...(transection)
    }
    } else {
        ExpModal.value = transection;
        mobileActions.value = null
        expanseEditedFields.value = { 
        ...(transection)
      }
    }
  }

  const editedExpanse = (expanse) => {
      ExpModal.value = expanse;
      mobileActions.value = null
      expanseEditedFields.value = {
        ...(expanse)
      }
  }

  const confirmDeletion = () => {
     incomeHistory.value = incomeHistory.value.filter(item => item.id !== modalDelete.value.id)
     FilteredincomeHistory.value = [...incomeHistory.value]
    //  balance.value = balance.value - modalDelete.value.amount
    //  income.value = income.value - modalDelete.value.amount
     modalDelete.value = null;
  }

  const confirmDeletion2 = () => {
    expanseHistory.value = expanseHistory.value.filter(item => item.id !== modalDeleteE.value.id)
    FilteredExpenseHistory.value = [...expanseHistory.value]
    // balance.value = balance.value + modalDeleteE.value.amount
    // expanse.value = expanse.value - modalDeleteE.value.amount
    modalDeleteE.value = null;
  }

  const confirmDeletion3 = () => {
    incomeHistory.value = incomeHistory.value.filter(item => item.id !== modalDelete.value.id)
    findWithThisLabel()
    // balance.value = balance.value + modalDeleteE.value.amount
    // expanse.value = expanse.value - modalDeleteE.value.amount
    modalDelete.value = null;
  }
  
  const confirmDeletion4 = () => {
    expanseHistory.value = expanseHistory.value.filter(item => item.id !== modalDeleteE.value.id)
    findWithThisLabel()
    // balance.value = balance.value + modalDeleteE.value.amount
    // expanse.value = expanse.value - modalDeleteE.value.amount
    modalDeleteE.value = null;
  }

  const actions = (income) => {
    mobileActions.value = mobileActions.value == income.id ? null : income.id;
  }

  const actionsLbl = (lbl) => {
    mobileActions.value = mobileActions.value == lbl.id ? null : lbl.id;
  }

  const actionsBoth = (all) => {
    mobileActions.value = mobileActions.value == all.id ? null : all.id;
  }


  const toggleDark = () => {
    isDarkMode.value = !isDarkMode.value
  }

  return { balance, income, expanse, findIncomeWithThisLabel, confirmDeletion3, confirmDeletion4, FilteredAllHistory, searchAll, searchAllIncomes, searchAllExpenses, FilteredExpenseHistory, FilteredincomeHistory, findExpenseWithThisLabel, searchIncome, searchExpense, actionsBoth, actionsLbl, deleteBoth, editedBoth, findWithThisLabel, labelDescription, AllLabels, LabelModalExpanse, deleteLabel, findLabel, confirmLabelDeletion, editLabel, goToLabelDetails, labelsEditedFields, editLabelModal, DeleteLabelModal, isDarkMode, tabs, ExpModal, selectedLabels, LabelModal, navOpen, modal, incomeHistory, expanseHistory, mobileActions, modalDeleteE, incomeEditedFields, modalDelete, expanseEditedFields, editedIncome, editedExpanse, confirmDeletion, toggleDark, confirmDeletion2, deleteExpanse, deleteIncome, actions, createLabel, cancelLabel }
})