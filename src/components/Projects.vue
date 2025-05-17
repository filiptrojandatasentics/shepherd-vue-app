<script setup>
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import ProjectPlanning from './ProjectPlanning.vue';
</script>

<template>
    <Tabs value="0">
        <TabList>
            <Tab value="main">Main</Tab>
            <Tab value="fundings">Fundings</Tab>
            <Tab value="planning">Planning</Tab>
            <Tab value="people">People</Tab>
        </TabList>
        <TabPanels>
            <TabPanel value="main"></TabPanel>
            <TabPanel value="fundings"></TabPanel>
            <TabPanel value="projects"></TabPanel>
            <TabPanel value="planning">
              <ProjectPlanning></ProjectPlanning>
            </TabPanel>
            <TabPanel value="people"></TabPanel>
        </TabPanels>
    </Tabs>
</template>

<script>
export default {
  name: 'Projects'
}
</script>
