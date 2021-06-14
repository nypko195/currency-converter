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
      }
   },
   methods: {     
      calcConverter() {
         const result = ((this.inputValue *  100 * this.valueLast) / (100 * this.valueFirst));
         return result;
      },
      swapConverter() {
      }      
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
            const k = 1000 / item.Value;
            let a = (k * 100) / 1000;
            return this.valueFirst = a;       
         }
      },
      selectedLast() {
         this.arrLast = this.tickerList.filter(tic => 
         tic.CharCode == this.selectedLast);

         for(let item of this.arrLast) {            
            const k = 1000 / item.Value;
            let a = (k * 100) / 1000;
            return this.valueLast = a;
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
   }

   .last__converter {
      margin: 15px;
      border: 1px solid #333;
      margin: 0 auto;
   }

   button {
      margin: 0 15px;
   }

   input { 
      text-align: center;
   }
</style>