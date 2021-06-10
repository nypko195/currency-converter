<template>
   <search-currency></search-currency>
   <h2>Список валют</h2>
   <ul v-if="isFilterList"> 
      <base-currency></base-currency>    
      <currency-item
      v-for="cur in tickerList"
      :key="cur.ID"
      :id="cur.ID"
      :name="cur.Name"
      :charCode="cur.CharCode"
      :numCode="cur.NumCode"
      :value="cur.Value">           
      </currency-item>            
   </ul>
   <ul v-else> 
      <base-currency></base-currency>    
      <currency-item
      v-for="cur in filterTickerList"
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

export default {    
   components: {
      SearchCurrency,
      CurrencyItem,
      BaseCurrency,
   },
   data() {
      return {
         tickerList: [],
         filterTickerList: [],                                                
      }
   },
   created() {
      fetch('https://www.cbr-xml-daily.ru/daily_json.js')
         .then(response => response.json())
         .then(data => this.tickerList = data.Valute)
         const a = Object.values(this.tickerList);
         this.tickerList = a;    
   },   
   computed: { 
      isFilterList()  {
         return this.filterTickerList.length >= 0;   
        // return false;      
      }  
   }, 
   watch: {
      filterTickerList() {
         this.tickerList.filter(ticker => ticker.CharCode.includes(this.$store.state.searchCurrency))
      }
   }
}
</script>

<style scoped>
   h2 {
      text-align: center;
   }
</style>