<template>
   <base-converter>
      <div class="first__converter">
         <select v-model="selectedFirst" @click="inputControl">
            <option disabled>Выберите валюту</option>
            <option
            selected="selected"
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

         <input type="text" 
         v-model="inputValue"
         :class="{display}"
         placeholder="Введите значение">
      </div>

      <button @click="swapConverterValue">Меняет местами</button>

      <div class="last__converter">
         <select v-model="selectedLast">
            <option disabled>Выберите валюту</option>
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
         selectedFirstDual: '',
         selectedLastDual: '',

         arrFirst: [], 
         arrLast: [], 
         arrFirstDual: [],
         arrLastDual: [],

         valueFirst: '', 
         valueLast: '', 
         inputValue: '',
         nominalFirst: '',
         nominalLast: '', 
         
         isDisplayInput: null,
      }
   },
   methods: {     
      calcConverter() {
         const result = ((this.inputValue *  this.nominalFirst * this.valueLast) / (this.nominalLast * this.valueFirst));
         return result.toFixed(4);
      },
      swapConverterValue() {
         this.arrFirstDual = this.arrFirst;
         this.arrLastDual = this.arrLast;
         this.arrFirst = this.arrLastDual;
         this.arrLast = this.arrFirstDual; 
         
         this.selectedFirstDual = this.selectedFirst;
         this.selectedLastDual = this.selectedLast;
         this.selectedFirst = this.selectedLastDual;
         this.selectedLast = this.selectedFirstDual;
      }, 
      inputControl() {
         if(!this.selectedFirst == '') {           
            this.isDisplayInput = true;
         }
      }           
   }, 
   computed: {
      tickerList() {
         return this.$store.state.tickerList;
      },
      display() {
         return this.isDisplayInput == true;
      }                      
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
      display: none; 
      text-align: center;
      border-bottom: 1px solid #333;
   } 

   .display {
      display: block;
   } 
   
   button {
      cursor: pointer;
   }

   select {
      cursor: pointer;
   } 

   @media (max-width: 992px) {
      button {
         width: 74px;
         margin: 10px auto;
      }

      .first__converter {
         width: 370px;
         align-items: center;
      }

      .last__converter {
         width: 370px;
         align-items: center;
      } 

      input {
         padding: 5px;
      }        
   }

   @media (max-width: 576px) {
      

      .first__converter {
         flex-direction: column;
         width: 260px;
      }

      .last__converter {
         flex-direction: column;
         width: 260px
      }
   }
</style>