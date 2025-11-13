    import { useTransectionsStore } from '@/stores/transections'
    
    export function useEditValidate () {
    const store = useTransectionsStore();

    const editFormI = () => { 
      if (store.incomeEditedFields.amount < 1) {
         alert('Amount should be at least $1')
         return;
       } 
      if(store.incomeEditedFields.description == '' || store.incomeEditedFields.amount == '') {
         alert('Missing required fields')
         return;
      } else{
        let index = store.incomeHistory.findIndex(item => item.id === store.incomeEditedFields.id)
        // const oldAmount = store.incomeHistory[index].amount
        // const newAmount = store.incomeEditedFields.amount
        // store.income = store.income - oldAmount
        // store.balance = store.balance - oldAmount

        store.incomeHistory[index].description = store.incomeEditedFields.description
        store.incomeHistory[index].amount = store.incomeEditedFields.amount
        store.incomeHistory[index].lbl = store.incomeEditedFields.lbl
        store.findWithThisLabel()
        // store.income += newAmount
        // store.balance += newAmount

        store.modal = null
     } 
     }

    const editFormE = () => {
      if (store.expanseEditedFields.amount < 1) {
        alert('Amount should be at least $1')
        return;
      }
     if (store.expanseEditedFields.description == '' || store.expanseEditedFields.amount == '') {
          alert('Missing Required FIelds')
          return;
     } else {
          let index = store.expanseHistory.findIndex(item => item.id == store.expanseEditedFields.id)
          // const oldAmount = store.expanseHistory[index].amount
          const newAmount = store.expanseEditedFields.amount
          // store.expanse = store.expanse - oldAmount
          // store.balance = store.balance + oldAmount

          store.expanseHistory[index].description = store.expanseEditedFields.description
          store.expanseHistory[index].amount = newAmount
          store.expanseHistory[index].lbl = store.expanseEditedFields.lbl
           store.findWithThisLabel()
          // store.expanse += newAmount
          // store.balance -= newAmount

          store.ExpModal = null
        } 
      }

        const editFormLabelI = () => { 
          if (store.labelsEditedFields.description !== '') {       
          const indexAll = store.AllLabels.findIndex(itm => itm.id == store.labelsEditedFields.id)
          store.AllLabels[indexAll].description = store.labelsEditedFields.description

          const indexSelected = store.selectedLabels.findIndex(itm => itm == store.labelsEditedFields)
          store.selectedLabels[indexSelected] = store.labelsEditedFields.description

          store.editLabelModal = null
        }

        console.log(store.selectedLabels)
       }

    return { editFormI, editFormE, editFormLabelI }
}