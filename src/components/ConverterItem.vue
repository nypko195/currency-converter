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
      border: 1px solid #333;
      padding: 10px;
      margin: 10px;
   }

   p {
      margin-left: 10px;
   }
   
</style>