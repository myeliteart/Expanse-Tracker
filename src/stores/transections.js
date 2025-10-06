import { ref, } from 'vue'
import { defineStore } from 'pinia'
// import { useLocalStorage } from '@vueuse/core';

export const useTransectionsStore = defineStore('transections', () => {

  const balance = ref(0)
  const income = ref(0)
  const expanse = ref(0)
  const selectedCatE = ref('Food');
  const selectedCatI = ref('Work');
  const incomeHistory = ref ([]);
  const expanseHistory = ref([]);
  // const incomeHistory = useLocalStorage('incomeHistory', []);
  // const expanseHistory = useLocalStorage('expanseHistory', [])

  //  const income = computed(() => {
  //   incomeHistory.value.reduce((sum, i) => sum + (i.amount), 0)
  // })

  const incomeFields = ref (
    {
      description: '',
      amount: '',
      cat: [
    {
      text: 'Food',
      value: 'Food'
    },
     {
      text: 'Work',
      value: 'Work'
    },
     {
      text: 'Rent',
      value: 'Rent'
    },
     {
      text: 'Other',
      value: 'Other'
    }
  ]});

    const expanseFields = ref (
    {
      description: '',
      amount: '',
      cat: [
    {
      text: 'Food',
      value: 'Food'
    },
     {
      text: 'Work',
      value: 'Work'
    },
     {
      text: 'Rent',
      value: 'Rent'
    },
     {
      text: 'Other',
      value: 'Other'
    }
  ]});

  const incomeEditedFields = ref (null);

  const expanseEditedFields = ref (null);
  

  const tabs = ref (['Income', 'Expanse'])

  const navOpen = ref (false);
  const modal = ref(null);
  const modalDelete = ref(null);
  const modalDeleteE = ref(null)
  const ExpModal = ref(null);

  const mobileActions = ref(null);
  const isDarkMode = ref(false);

  // const filterNumericValue = (event) => {
  //    let value = event.target.value;
  //     value = value.replace(/[^0-9]/g, '');
  //     incomeFields.value.amount = value;
  // }

  const deleteIncome = (inc) => {
    modalDelete.value = inc
    mobileActions.value = null
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

  const editedExpanse = (expanse) => {
      ExpModal.value = expanse;
      mobileActions.value = null
      expanseEditedFields.value = {
        ...(expanse)
      }
  }

  const confirmDeletion = () => {
     incomeHistory.value = incomeHistory.value.filter(item => item.id !== modalDelete.value.id)
     balance.value = balance.value - modalDelete.value.amount
     income.value = income.value - modalDelete.value.amount
     modalDelete.value = null;
  }

  const confirmDeletion2 = () => {
    expanseHistory.value = expanseHistory.value.filter(item => item.id !== modalDeleteE.value.id)
    balance.value = balance.value + modalDeleteE.value.amount
    expanse.value = expanse.value - modalDeleteE.value.amount
    modalDeleteE.value = null;
  }

  const actions = (income) => {
    mobileActions.value = mobileActions.value == income.id ? null : income.id;
  }

  // const formattedAmount = computed(() => {
  //   incomeFields.value.amount = parseFloat().toFixed(2);
  // })

  const toggleDark = () => {
    isDarkMode.value = !isDarkMode.value
  }

  return { balance, income, toggleDark, isDarkMode, expanse, tabs, ExpModal, mobileActions, modalDeleteE, incomeEditedFields, modalDelete, expanseEditedFields, editedIncome, editedExpanse, confirmDeletion, confirmDeletion2, incomeFields, navOpen, selectedCatE, modal, selectedCatI, expanseFields, incomeHistory, expanseHistory, deleteExpanse, deleteIncome, actions }
})