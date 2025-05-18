<script setup>
import { ref, onMounted } from "vue";
import Fieldset from 'primevue/fieldset';
import { InputNumber } from "primevue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IftaLabel from 'primevue/iftalabel';
import { Form } from '@primevue/forms';
import { reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import { Toast } from "primevue";
import { InputText } from "primevue";
import { Message } from "primevue";
import { Button } from "primevue";

const toast = useToast();

const users = [
    {name:'jiri.jelinek@datasentics.com', rate: 800},
    {name:'filip.trojan@datasentics.com', rate: 900},
    {name:'david.vopelka@datasentics.com', rate: 1000},
    {name:'tomas.bouma@datasentics.com', rate: 800},
    {name:'ondrej.kral@datasentics.com', rate: 800},
    {name:'ondrej.pleticha@datasentics.com', rate: 800},
];

const default_person = {
    name: "jara",
    rate: 800,
    fte: 0.5,
    work: 0
};

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
                rate: 900,
                fte: 0.3,
                work: 20
            },
            {
                name: 'robin.siroky',
                rate: 800,
                fte: 0.8,
                work: 80
            },
        ],
        selected_person: null,
        person: default_person
    }
});

onMounted(() => {
    // Initialize person with default values if needed
    resetPersonForm();
});

// Function to reset the form after submission
const resetPersonForm = () => {
    project.value.people.person = default_person;
};

const resolver = ({ values }) => {
    const errors = {};

    if (!project.value.people.person.name) {
        errors.name = [{ message: 'name is required.' }];
    }

    if (project.value.people.person.fte == 0) {
        errors.fte = [{ message: 'fte must be greater than zero' }];
    }

    if (project.value.people.person.work == 0) {
        errors.work = [{ message: 'work must be greater than zero' }];
    }

    return {
        values, // (Optional) Used to pass current form values to submit event.
        errors
    };
};

const onFormSubmit = ({ valid }) => {
    if (valid) {
        // Create a new object with the current values (deep copy)
        const newPerson = {
            name: project.value.people.person.name,
            rate: project.value.people.person.rate,
            fte: project.value.people.person.fte,
            work: project.value.people.person.work
        };
        
        // Add the new person to the list
        project.value.people.list.push(newPerson);
        
        toast.add({
            severity: 'success',
            summary: 'Person added to project',
            life: 3000
        });
        
        // Reset the form for the next entry
        resetPersonForm();
    }
};
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
    <Fieldset legend="people">
        <div class="card">
            <DataTable 
                :value="project.people.list" 
                selectionMode="single"
                dataKey="name"
                v-model:selection="project.people.selected_person"
                tableStyle="min-width: 50rem">
                <Column field="name" header="name"></Column>
                <Column field="rate" header="rate"></Column>
                <Column field="fte" header="fte"></Column>
                <Column field="work" header="work"></Column>
            </DataTable>
        </div>
        <div class="card flex justify-center">
            <Toast />
            <Form v-slot="$form" :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
                <div class="flex flex-col gap-1">
                    <IftaLabel>
                        <InputText v-model="project.people.person.name" name="name" type="text" placeholder="name" fluid id="person-name" />
                        <label for="person-name">name</label>
                    </IftaLabel>
                    <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{ $form.name.error?.message }}</Message>
                </div>
                <div class="flex flex-col gap-1">
                    <IftaLabel>
                        <InputNumber v-model="project.people.person.rate" name="rate" placeholder="rate" fluid id="person-rate" />
                        <label for="person-rate">rate in czk per hour</label>
                    </IftaLabel>
                </div>
                <div class="flex flex-col gap-1">
                    <IftaLabel>
                        <InputNumber v-model="project.people.person.fte" name="fte" placeholder="fte" fluid id="person-fte" :minFractionDigits="1" :maxFractionDigits="3" />
                        <label for="person-fte">full time equivalent</label>
                    </IftaLabel>
                    <Message v-if="$form.fte?.invalid" severity="error" size="small" variant="simple">{{ $form.fte.error?.message }}</Message>
                </div>
                <div class="flex flex-col gap-1">
                    <IftaLabel>
                        <InputNumber v-model="project.people.person.work" name="work" placeholder="work" fluid id="person-work" />
                        <label for="person-work">work</label>
                    </IftaLabel>
                    <Message v-if="$form.work?.invalid" severity="error" size="small" variant="simple">{{ $form.work.error?.message }}</Message>
                </div>
                <Button type="submit" severity="secondary" label="Add/Update" />
            </Form>
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