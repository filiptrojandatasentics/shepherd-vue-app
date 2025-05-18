<script setup>
import { ref, onMounted } from "vue";
import Fieldset from 'primevue/fieldset';
import { InputNumber } from "primevue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const users = [
    'jiri.jelinek@datasentics.com',
    'filip.trojan@datasentics.com',
    'david.vopelka@datasentics.com',
    'tomas.bouma@datasentics.com',
    'ondrej.kral@datasentics.com',
    'ondrej.pleticha@datasentics.com',
];

const project = ref({
    config: {
        work_step: 1,
        work_unit: "md",
    },
    total: {
        work: 100,
        time: 5*30*20,
    },
    people: {
        list: [
            {
                name: "filip.trojan",
                fte: 0.3,
                rate: 900,
                work: 20
            },
            {
                name: 'robin.siroky',
                fte: 0.8,
                rate: 800,
                work: 80
            }
        ],
        selected_person: null,
        person: {
            name: null,
            fte: null,
            rate: null,
            work: null
        }
    }
});

onMounted(() => {
});
</script>

<template>
    <Fieldset legend="total">
            <InputNumber v-model="project.total.work" showButtons :step="project.config.work_step" />
            <InputNumber v-model="project.config.work_step" />
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </Fieldset>
    <Fieldset legend="people">
        <div class="card">
            <DataTable 
                :value="project.people.list" 
                selectionMode="single"
                dataKey="name"
                v-model:selection="project.people.selected_person"
                tableStyle="min-width: 50rem">
                <Column field="name" header="name"></Column>
                <Column field="fte" header="fte"></Column>
                <Column field="rate" header="rate"></Column>
                <Column field="work" header="work"></Column>
            </DataTable>
        </div>
    </Fieldset>
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
