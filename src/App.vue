<script setup>
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import Toolbar from 'primevue/toolbar';
</script>

<template>
  <div>
    <Toolbar style="border-radius: 2rem; padding: 1rem 1rem 1rem 1.5rem">
    <template #start>
        <div class="flex items-center gap-2">
            <router-link to="/hello"><Button label="Hello" text plain /></router-link>
            <router-link to="/budgets"><Button label="Budgets" text plain /></router-link>
            <router-link to="/projects"><Button label="Projects" text plain /></router-link>
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
  <main><router-view></router-view></main>
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
