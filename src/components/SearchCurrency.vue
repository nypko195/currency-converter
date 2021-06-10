<template>
   <form>
      <label for="search">Поиск валюты</label>
      <input type="text" v-model="searchCurrency" placeholder="Наименование">
   </form>
</template>

<script>
export default {    
   computed: {
      searchCurrency() {         
         return this.$store.state.searchCurrency;
      }
   }
}
</script>

<style scoped>
   input {
      margin-left: 10px;
   }
</style>