<template>   
   <div>      
      <p>{{name}}</p>
      <p>{{value}}</p>      
   </div>  
</template>

<script>
export default {    
   props: ['name', 'value'],
   data() {
      return {
         number: '',
         inputValue: '',
      }
   },
   methods: {

   }
}
</script>

<style scoped>
   div {
      display: flex;
      justify-content: center;
      border: 1px solid #333;
      padding: 10px;
      margin: 10px;
   }

   p {
      margin-left: 10px;
   }

   input {
      text-align: center;
   }
   
</style>