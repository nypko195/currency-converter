<template>
   <section>
      <label for="search">Поиск валюты</label>
      <input type="text" :v-model="searchCurrency" placeholder="Наименование">
   </section>
</template>

<script>
export default { 
   emits: ['search-valute'],
   data() {
      return {
         searchCurrency: 'рубль',
      }
   },   
}
</script>

<style scoped>
   input {
      margin-left: 10px;
   }
</style>