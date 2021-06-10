import { createStore } from 'vuex';

const store = createStore({
   state() {
      return {
         searchCurrency: '',         
      }
   }, 
})

export default store;