    import { useTransectionsStore } from '@/stores/transections'
    import * as yup from 'yup';
    
    export function useValidate() {
      const store = useTransectionsStore();

        const schema = yup.object().shape({
        desc: yup.string().required('Description is Required'),
        amount: yup.number().required('Amount is Required').min(1, 'Min Amount should be $1'),
        selectedOption:  yup.string().required('Please select an option')
    })

    
    function increment (values, { resetForm } ) {
      store.balance += values.amount
      store.income += values.amount

      const eli = {
        id: store.incomeHistory.length + 1,
        description: values.desc,
        amount: values.amount,
        cat: store.selectedCatI
      }
      store.incomeHistory.unshift(eli)
      resetForm();
  }

  function decrement (values, { resetForm } ) {
      store.balance -= values.amount
      store.expanse += values.amount

      const eli = {
        id: store.expanseHistory.length + 1,
        description: values.desc,
        amount: values.amount,
        cat: store.selectedCatE
      }
      store.expanseHistory.unshift(eli)

      resetForm();
  }


    return { schema, increment, decrement }
}