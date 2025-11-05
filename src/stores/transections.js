import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router';
import { useLocalStorage } from '@vueuse/core';

export const useTransectionsStore = defineStore('transections', () => {

  const incomeHistory = useLocalStorage('incomeHistory', []);
  const expanseHistory = useLocalStorage('expanseHistory', [])
  const AllLabels = useLocalStorage('AllLabels', [])
   const selectedLabels = useLocalStorage('selectedLabels', [])

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
          description: labelDescription.value
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

  const findLabel = computed(() => {
    return AllLabels.value.find(lbl => lbl.description.toLowerCase().split(' ').join('-') == route.params.id);
  })

  const findWithThisLabel = computed(() => {
    const filteredIncome = incomeHistory.value.filter(itm => itm.lbl.some(l => l.description.toLowerCase().split(' ').join('-') === route.params.id ));
    const filteredExpanse = expanseHistory.value.filter(itm => itm.lbl.some(l => l.description.toLowerCase().split(' ').join('-') === route.params.id ))
    return [...filteredIncome, ...filteredExpanse]
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
    //  balance.value = balance.value - modalDelete.value.amount
    //  income.value = income.value - modalDelete.value.amount
     modalDelete.value = null;
  }

  const confirmDeletion2 = () => {
    expanseHistory.value = expanseHistory.value.filter(item => item.id !== modalDeleteE.value.id)
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



  // const formattedAmount = computed(() => {
  //   incomeFields.value.amount = parseFloat().toFixed(2);
  // })

  const toggleDark = () => {
    isDarkMode.value = !isDarkMode.value
  }

  return { balance, income, expanse, actionsBoth, actionsLbl, deleteBoth, editedBoth, findWithThisLabel, labelDescription, AllLabels, LabelModalExpanse, deleteLabel, findLabel, confirmLabelDeletion, editLabel, goToLabelDetails, labelsEditedFields, editLabelModal, DeleteLabelModal, isDarkMode, tabs, ExpModal, selectedLabels, LabelModal, navOpen, modal, incomeHistory, expanseHistory, mobileActions, modalDeleteE, incomeEditedFields, modalDelete, expanseEditedFields, editedIncome, editedExpanse, confirmDeletion, toggleDark, confirmDeletion2, deleteExpanse, deleteIncome, actions, createLabel, cancelLabel }
})