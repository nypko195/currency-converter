<template>
   <div>
      <section>
         <h2>{{ name }}</h2>
         <select name="Валюта">{{ CharCode }}</select>
         <input type="number">
      </section>
      <button>Меняет местами</button>
      <section>
         <h2>{{ name }}</h2>
         <select name="Валюта">{{ CharCode }}</select>
         <input type="number">
      </section>
   </div>
</template>

<script>
export default {   
   data() {
      return {
         number: '',
         name: tickerList.Name,
      }
   }
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