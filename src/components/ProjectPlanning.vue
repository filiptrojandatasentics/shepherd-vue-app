<script setup>
import { ref, onMounted, computed } from "vue";
import Fieldset from 'primevue/fieldset';
import { InputNumber } from "primevue";
import PeopleFieldset from './PeopleFieldset.vue'; // Import the new component

const users = [
    {name:'jiri.jelinek@datasentics.com', rate: 800},
    {name:'filip.trojan@datasentics.com', rate: 900},
    {name:'david.vopelka@datasentics.com', rate: 1000},
    {name:'tomas.bouma@datasentics.com', rate: 800},
    {name:'ondrej.kral@datasentics.com', rate: 800},
    {name:'ondrej.pleticha@datasentics.com', rate: 800},
    {name:'dome.lorinczy@datasentics.com', rate: 800},
    {name:'robin.siroky@datasentics.com', rate: 800},
    {name:'marketa.krenkova@datasentics.com', rate: 800},
    {name:'kyuu', rate: 600},
];

const project = ref({
    config: {
        work_step: 1,
        work_unit: "md",
    },
    total: {
        work: 0,
        time: 5*30*20,
    },
    people: {
        list: [],
    }
});

// Update people list
const updatePeopleList = (newList) => {
    project.value.people.list = newList;
};

onMounted(() => {
    // Any initialization if needed
});
</script>

<template>
    <Fieldset legend="total">
        <div class="card flex justify-center">
            <div class="flex flex-col gap-1">
                <IftaLabel>
                    <InputNumber v-model="project.total.work" showButtons :step="project.config.work_step" id="project-total-work" />
                    <label for="project-total-work">project total work</label>
                </IftaLabel>
            </div>
            <div class="flex flex-col gap-1">
                <IftaLabel>
                    <InputNumber v-model="project.config.work_step" id="config-work-step" />
                    <label for="config-work-step">work step</label>
                </IftaLabel>
            </div>
        </div>
    </Fieldset>
    
    <PeopleFieldset
        :totalWork="project.total.work"
        :peopleList="project.people.list"
        :users="users"
        @update:peopleList="updatePeopleList"
    />
    
    <Fieldset legend="time">
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </Fieldset>
    <Fieldset legend="period by people">
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </Fieldset>
    <Fieldset legend="person by time">
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </Fieldset>
</template>

<style>
.cell-zero {
  background-color: #d1fae5; /* light green */
}

.cell-nonzero {
  background-color: #ffedd5; /* light orange */
}
</style>