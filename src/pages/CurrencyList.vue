<template>
   <!-- <search-currency></search-currency> -->
   <form>
      <label for="search">Поиск валюты</label>
      <input type="text" v-model="searchCurrency" placeholder="Наименование">
   </form>
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
      :value="cur.Value"
      :previous="cur.Previous">                
      </currency-item>            
   </ul>
</template>

<script>

import BaseCurrency from '../Base/BaseCurrency.vue';
import CurrencyItem from '../components/CurrencyItem.vue';
// import SearchCurrency from '../components/SearchCurrency.vue';

export default {    
   components: {
      // SearchCurrency,
      CurrencyItem,
      BaseCurrency,
   },        
   data() {
      return {
         tickerList: [],
         filterTickerList: [], 
         searchCurrency: '',
         arrayFilterCharCode: [],   
         arrayFilterName: [],  
         arrayFinal: [],                                          
      }
   },    
   created() {
      fetch('https://www.cbr-xml-daily.ru/daily_json.js')
         .then(response => response.json())
         .then(data => {
            const values = Object.values(data.Valute);                        
            this.tickerList = values;
         });             
   },   
   computed: { 
      isFilterList()  {
         return this.filterTickerList.length <= 0;   
        // return false;      
      }  
   }, 
   watch: {
      searchCurrency: function() {
         this.arrayFilterCharCode = this.tickerList.filter(ticker => 
         ticker.CharCode.toLowerCase().includes(this.searchCurrency));
         
         this.arrayFilterName = this.tickerList.filter(ticker =>
         ticker.Name.toLowerCase().includes(this.searchCurrency));

         this.arrayFinal = this.arrayFilterCharCode.concat(this.arrayFilterName);
         this.filterTickerList = this.arrayFinal;       
      },              
   },
}
</script>

<style scoped>
   h2 {
      text-align: center;
   }
</style>