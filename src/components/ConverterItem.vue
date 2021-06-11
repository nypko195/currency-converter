<template>   
   <div>      
      <p>{{name}}</p>
      <p>{{value}}</p>
   </div>
</template>

<script>
export default {    
   data() {
      return {
         number: '',
         // name: this.ticker.Name,
      }
   },
   props: ['name', 'value'],
}
</script>

<style scoped>
   div {
      display: flex;
      justify-content: center;
   }
   section {
      border: 1px solid #333;
      padding: 10px;
      margin: 10px;
   }
   button {
      margin-top: 5%;
      height: 5%;
      width: 5%;
      align-content: center;
   }
</style>