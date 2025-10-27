    import { useTransectionsStore } from '@/stores/transections'
    import * as yup from 'yup';
    
    export function useValidate() {
      const store = useTransectionsStore();

        const schema = yup.object().shape({
        desc: yup.string().required('Description is Required'),
        amount: yup.number().typeError('Amount must be a number').required('Amount is Required').min(1, 'Min Amount should be $1'),
        // selectedOption: yup.string().notRequired()
    })

    function increment (values, { resetForm } ) {
      const eli = {
        id: store.incomeHistory.length + 1,
        description: values.desc,
        amount: Number(values.amount),
        lbl: store.selectedLabels,
        type: 'income'
     }
     if(store.incomeHistory.find(inc => inc.description == values.desc)){
      alert('This income description is already in use')
      return;
     } else {
      // store.balance += values.amount
      // store.income += values.amount
      store.incomeHistory.unshift(eli)
      resetForm();
      store.selectedLabels = []
     }
  }

  function decrement (values, { resetForm } ) { 
      const eli = {
        id: store.expanseHistory.length + 1,
        description: values.desc,
        amount: Number(values.amount),
        lbl: store.selectedLabels,
        type: 'expanse'
      }
    if(store.expanseHistory.find(exp => exp.description == values.desc)){
      alert('This expanse description is already in use')
      return;
     } else {
      // store.balance -= values.amount
      // store.expanse += values.amount
      store.expanseHistory.unshift(eli)
      resetForm();
      store.selectedLabels = []
  }
}

    return { schema, increment, decrement }
}