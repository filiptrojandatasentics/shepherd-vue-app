<script setup>
import { ref } from 'vue'
import Button from "primevue/button";
import DatePicker from 'primevue/datepicker';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

defineProps({
  msg: String,
})

const count = ref(0);
const date = ref(null);
const products = [
  {
    code: 'aaa',
    name: 'nnnnnn',
    category: 'c1',
    quantity: 12,
  },
  {
    code: 'bbb',
    name: 'nnnnnn',
    category: 'c2',
    quantity: 33,
  },
];
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <Button type="button" @click="count++">count is {{ count }}</Button>
  </div>
  <div class="card">
    <DatePicker v-model="date" dateFormat="yy-mm-dd"/>
    <p>{{ date }}</p>
  </div>
  <div class="card">
    <DataTable :value="products" tableStyle="min-width: 50rem">
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
    </DataTable>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
