    import { useTransectionsStore } from '@/stores/transections'
    
    export function useEditValidate () {
    const store = useTransectionsStore();

    const editFormI = () => {
      if(store.incomeEditedFields.description == '' || store.incomeEditedFields.amount === '' || store.incomeEditedFields.cat == '') {
        alert('Missing required fields')
        return;
      } if (store.incomeEditedFields.amount < 1) {
         alert('Amount should be at least $1')
         return;
       } 
        let index = store.incomeHistory.findIndex(item => item.id == store.incomeEditedFields.id)
        const oldAmount = store.incomeHistory[index].amount
        const newAmount = store.incomeEditedFields.amount
        store.income = store.income - oldAmount
        store.balance = store.balance - oldAmount

        store.incomeHistory[index].description = store.incomeEditedFields.description
        store.incomeHistory[index].amount = newAmount
        store.incomeHistory[index].cat = store.incomeEditedFields.cat

        store.income += newAmount
        store.balance += newAmount

        store.modal = null
     }

    const editFormE = () => {
     if (store.expanseEditedFields.description == '' || store.expanseEditedFields.amount === ''  || store.expanseEditedFields.cat == '') {
         alert('Missing Required FIelds')
         return;
     } 
     if (store.expanseEditedFields.amount < 1) {
        alert('Amount should be at least $1')
        return;
      }
          let index = store.expanseHistory.findIndex(item => item.id == store.expanseEditedFields.id)
          const oldAmount = store.expanseHistory[index].amount
          const newAmount = store.expanseEditedFields.amount
          store.expanse = store.expanse - oldAmount
          store.balance = store.balance + oldAmount

          store.expanseHistory[index].description = store.expanseEditedFields.description
          store.expanseHistory[index].amount = newAmount
          store.expanseHistory[index].cat = store.expanseEditedFields.cat

          store.expanse += newAmount
          store.balance -= newAmount

          store.ExpModal = null
        }

    return { editFormI, editFormE }
}