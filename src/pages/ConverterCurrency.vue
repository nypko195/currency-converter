<template>
   <base-converter>
      <select v-model="selected">
         <option
         v-for="ticker in tickerList"
         :key="ticker.ID"
         :charCode="ticker.CharCode">
         {{ ticker.CharCode }}</option>
      </select>
      <converter-item
         v-for="ticker in winList"
         :key="ticker.ID"
         :name="ticker.Name"
         :value="ticker.Value">
      </converter-item>
   </base-converter>
</template>

<script>
import BaseConverter from '../Base/BaseConverter.vue';
import ConverterItem from '../components/ConverterItem.vue';

export default {      
   components: {
      BaseConverter,
      ConverterItem,      
   },
   data() {
      return {
         tickerList: [],         
         selected: '',
         winList: [],                    
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
   watch: {
      selected() {
         this.winList = this.tickerList.filter(tic => 
         tic.CharCode ==this.selected);
      }
   }  
}
</script>

<style scoped>
   select {
      width: 100px;
   }
</style>