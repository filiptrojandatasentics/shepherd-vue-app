<script setup>
import { ref, onMounted } from "vue";
import Fieldset from 'primevue/fieldset';
import { InputNumber } from "primevue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IftaLabel from 'primevue/iftalabel';
import { Form } from '@primevue/forms';
import { useToast } from 'primevue/usetoast';
import { Toast } from "primevue";
import { Message } from "primevue";
import { Button } from "primevue";
import { AutoComplete } from "primevue"; // Add AutoComplete import

const toast = useToast();

const users = [
    {name:'jiri.jelinek@datasentics.com', rate: 800},
    {name:'filip.trojan@datasentics.com', rate: 900},
    {name:'david.vopelka@datasentics.com', rate: 1000},
    {name:'tomas.bouma@datasentics.com', rate: 800},
    {name:'ondrej.kral@datasentics.com', rate: 800},
    {name:'ondrej.pleticha@datasentics.com', rate: 800},
];

// For AutoComplete suggestions
const filteredUsers = ref([]);

// Create a fresh new default object each time
const createDefaultPerson = () => ({
    name: "",
    rate: 800,
    fte: 0.5,
    work: 10
});

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
        person: createDefaultPerson()
    }
});

onMounted(() => {
    // Initialize person with default values
    resetPersonForm();
});

// Function to reset the form after submission
const resetPersonForm = () => {
    project.value.people.person = createDefaultPerson();
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
        values: project.value.people.person, // Pass current form values
        errors
    };
};

// Function to search users for AutoComplete
const searchUsers = (event) => {
    let filtered = [];
    let query = event.query.toLowerCase();
    
    filtered = users.filter(user => user.name.toLowerCase().includes(query));
    filteredUsers.value = filtered.map(u => u.name);
};

// Function to handle user selection and update rate
const onUserSelect = (event) => {
    const selectedUser = users.find(user => user.name === event.value);
    if (selectedUser) {
        project.value.people.person.rate = selectedUser.rate;
    }
};

const onFormSubmit = (e, action) => {
    const valid = !Object.keys(resolver({}).errors).length;
    
    if (action === 'save') {
        if (valid) {
            const person_name = project.value.people.person.name;
            const ind = project.value.people.list.findIndex(
                person => person.name.toLowerCase() === person_name.toLowerCase()
            );

            // Create a new object with the current values (deep copy)
            const newPerson = {
                name: project.value.people.person.name,
                rate: project.value.people.person.rate,
                fte: project.value.people.person.fte,
                work: project.value.people.person.work
            };
                
            if (ind >= 0) {
                project.value.people.list[ind] = newPerson;
                
                toast.add({
                    severity: 'success',
                    summary: `Person ${person_name} updated`,
                    life: 3000
                });
            } else {
                // Add the new person to the list
                project.value.people.list.push(newPerson);
                
                toast.add({
                    severity: 'success',
                    summary: `Person ${person_name} added to project`,
                    life: 3000
                });
            }
            
            // Reset the form for the next entry
            resetPersonForm();
        }
    } else if (action === 'delete') {
        const person_name = project.value.people.person.name;
        const ind = project.value.people.list.findIndex(
            person => person.name.toLowerCase() === person_name.toLowerCase()
        );
        
        if (ind >= 0) {
            // Remove the person from the list
            project.value.people.list.splice(ind, 1);
            
            toast.add({
                severity: 'success',
                summary: `Person ${person_name} deleted`,
                life: 3000
            });
            
            // Reset the form after deletion
            resetPersonForm();
        } else {
            toast.add({
                severity: 'error',
                summary: `Person ${person_name} not found`,
                life: 3000
            });
        }
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
            <Form v-slot="$form" :resolver class="flex flex-col gap-4 w-full sm:w-56">
                <div class="flex flex-col gap-1">
                    <IftaLabel>
                        <AutoComplete 
                            v-model="project.people.person.name" 
                            name="name" 
                            :suggestions="filteredUsers" 
                            @complete="searchUsers"
                            @item-select="onUserSelect"
                            field="name"
                            placeholder="name" 
                            fluid 
                            id="person-name" />
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
                <div class="button-group flex gap-2">
                    <Button type="button" @click="e => onFormSubmit(e, 'save')" severity="secondary" label="Add/Update" />
                    <Button type="button" @click="e => onFormSubmit(e, 'delete')" severity="danger" label="Delete" />
                </div>
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