<template>
   <search-currency></search-currency>
   <h2>Список валют</h2>
   <ul> 
      <base-currency></base-currency>    
      <currency-item
      v-for="cur in state.Valute"
      :key="cur.ID"
      :id="cur.ID"
      :name="cur.Name"
      :charCode="cur.CharCode"
      :numCode="cur.NumCode"
      :value="cur.Value">           
      </currency-item>  
             
   </ul>
</template>

<script>
import BaseCurrency from '../Base/BaseCurrency.vue';
import CurrencyItem from '../components/CurrencyItem.vue';
import SearchCurrency from '../components/SearchCurrency.vue';

import { ref } from 'vue';

export default {    
   components: {
      SearchCurrency,
      CurrencyItem,
      BaseCurrency,
   },
   setup() {
      const state = ref({});

      fetch('https://www.cbr-xml-daily.ru/daily_json.js')
         .then(response => response.json())
         .then(data => state.value = data);   

      return {state};
   },
   data() {
      return {                  
      }
   }, 
   methods: {
   },
}
</script>

<style scoped>
   h2 {
      text-align: center;
   }
</style>