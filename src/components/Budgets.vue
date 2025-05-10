<script setup>
import { ref } from 'vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import BudgetMain from './BudgetMain.vue';
import BudgetSupply from './BudgetSupply.vue';
import BudgetProjects from './BudgetProjects.vue';
import BudgetInvoices from './BudgetInvoices.vue';
import BudgetPeople from './BudgetPeople.vue';
</script>

<template>
    <h1>Budget Page</h1>
    <Tabs value="0">
        <TabList>
            <Tab value="main">Main</Tab>
            <Tab value="supply">Supply</Tab>
            <Tab value="projects">Projects</Tab>
            <Tab value="invoices">Invoices</Tab>
            <Tab value="people">People</Tab>
        </TabList>
        <TabPanels>
            <TabPanel value="main"><BudgetMain></BudgetMain></TabPanel>
            <TabPanel value="supply"><BudgetSupply></BudgetSupply></TabPanel>
            <TabPanel value="projects"><BudgetProjects></BudgetProjects></TabPanel>
            <TabPanel value="invoices"><BudgetInvoices></BudgetInvoices></TabPanel>
            <TabPanel value="people"><BudgetPeople></BudgetPeople></TabPanel>
        </TabPanels>
    </Tabs>
</template>

<script>
export default {
  name: 'Budgets'
}
</script>