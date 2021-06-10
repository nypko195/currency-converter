<template>
   <base-converter>
      <converter-item    
      >    
      </converter-item>
   </base-converter>
</template>

<script>
import BaseConverter from '../Base/BaseConverter.vue';
import ConverterItem from '../components/ConverterItem.vue';

export default {
   props: ['tickerList'],
   components: {
      BaseConverter,
      ConverterItem,      
   }
}
</script>