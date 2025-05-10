<script setup>
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import Toolbar from 'primevue/toolbar';
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <Toolbar style="border-radius: 2rem; padding: 1rem 1rem 1rem 1.5rem">
    <template #start>
        <div class="flex items-center gap-2">
            <Button label="Hello" text plain />
            <Button label="Budgets" text plain />
            <Button label="Projects" text plain />
            <Button label="POs" text plain />
            <Button label="Invoices" text plain />
            <Button label="Customers" text plain />
            <Button label="People" text plain />
            <Button label="Preferences" text plain />
            <Button label="Tags" text plain />
        </div>
    </template>
    <template #end>
        <div class="flex items-center gap-2">
            <Avatar image="src/assets/Filip-Trojan-320-320.png" style="width: 32px; height: 32px" />
        </div>
    </template>
    </Toolbar>
  </div>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Ahoj Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
