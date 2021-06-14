<template>
   <base-converter>
      <div class="first__converter">
         <select v-model="selectedFirst">
            <option
            v-for="ticker in tickerList"
            :key="ticker.ID"
            :charCode="ticker.CharCode">
            {{ ticker.CharCode }}
            </option>
         </select>
         <converter-item
            v-for="ticker in arrFirst"
            :key="ticker.ID"
            :name="ticker.Name">                        
         </converter-item>
         <input type="text" v-model="inputValue">
      </div>
      <button @click="swapConverter">Меняет местами</button>
      <div class="last__converter">
         <select v-model="selectedLast">
            <option
            v-for="ticker in tickerList"
            :key="ticker.ID"
            :charCode="ticker.CharCode">
            {{ ticker.CharCode }}           
            </option>
         </select>
         <converter-item
            v-for="ticker in arrLast"
            :key="ticker.ID"
            :name="ticker.Name"
            :value="calcConverter()">                      
         </converter-item>
      </div>
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
         selectedFirst: '',
         selectedLast: '',
         arrFirst: [], 
         arrLast: [], 
         valueFirst: '', 
         valueLast: '', 
         inputValue: '',
         nominalFirst: '',
         nominalLast: '',
         arrFirstDual: [],
         arrLastDual: [],
         selectedFirstDual: '',
         selectedLastDual: '',
      }
   },
   methods: {     
      calcConverter() {
         const result = ((this.inputValue *  this.nominalFirst * this.valueLast) / (this.nominalLast * this.valueFirst));
         return result.toFixed(4);
      },
      swapConverter() {
         this.arrFirstDual = this.arrFirst;
         this.arrLastDual = this.arrLast;
         this.arrFirst = this.arrLastDual;
         this.arrLast = this.arrFirstDual; 
         
         this.selectedFirstDual = this.selectedFirst;
         this.selectedLastDual = this.selectedLast;
         this.selectedFirst = this.selectedLastDual;
         this.selectedLast = this.selectedFirstDual;
      },      
   }, 
   computed: {
      tickerList() {
         return this.$store.state.tickerList;
      },                     
   }, 
   created() {
      this.$store.dispatch('getTickers');  
   },
   watch: {
      selectedFirst() {
         this.arrFirst = this.tickerList.filter(tic => 
         tic.CharCode == this.selectedFirst);
         
         for(let item of this.arrFirst) { 
            let nominal = item.Nominal;                    
            const toRuble = 1000 / (item.Value / nominal);
            let course = (toRuble * nominal) / 1000;
            return this.valueFirst = course, this.nominalFirst = nominal;       
         }                  
      },
      selectedLast() {
         this.arrLast = this.tickerList.filter(tic => 
         tic.CharCode == this.selectedLast);

         for(let item of this.arrLast) {             
            let nominal = item.Nominal;                        
            const toRuble = 1000 / (item.Value / nominal);            
            let course = (toRuble * nominal) / 1000;           
            return this.valueLast = course, this.nominalLast = nominal;
         }       
      },                  
   }  
}
</script>

<style scoped>
   select {
      width: 60px;
   }
   
   div {
      display: flex;
      justify-content: center;
   }

   .first__converter {
      margin: 15px;
      border: 1px solid #333;
      margin: 0 auto;
      padding: 5px;
   }

   .last__converter {
      margin: 15px;
      border: 1px solid #333;
      margin: 0 auto;
      padding: 5px;
   } 

   input {
      display: block; 
      text-align: center;
      border-bottom: 1px solid #333;
   }   
</style>