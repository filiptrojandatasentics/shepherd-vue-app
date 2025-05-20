<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";
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
import { AutoComplete } from "primevue";

const props = defineProps({
  totalWork: Number,
  peopleList: Array,
  users: Array
});

const emit = defineEmits(['update:peopleList']);

const toast = useToast();

// For AutoComplete suggestions
const filteredUsers = ref([]);

// Create a fresh new default object each time
const createDefaultPerson = () => ({
    name: "",
    rate: 800,
    fte: 0.5,
    work: 10
});

// Local state
const selectedPerson = ref(null);
const person = ref(createDefaultPerson());

// Computed properties
const peopleTotalWork = computed(() => {
    return props.peopleList.reduce((sum, person) => sum + person.work, 0);
});

const peopleWorkDiff = computed(() => {
    return peopleTotalWork.value - props.totalWork;
});

const getDiffClass = computed(() => {
  return peopleWorkDiff.value === 0 ? 'cell-zero' : 'cell-nonzero';
});

// Watch for changes in selected_person and update form fields accordingly
const onRowSelect = (event) => {
    // Clone the selected person data to the form
    person.value = {
        name: event.data.name,
        rate: event.data.rate,
        fte: event.data.fte,
        work: event.data.work
    };
};

// Handle row deselection
const onRowUnselect = () => {
    // Reset form to default values when a row is unselected
    resetPersonForm();
};

// Function to reset the form after submission
const resetPersonForm = () => {
    person.value = createDefaultPerson();
    selectedPerson.value = null;
};

const resolver = ({ values }) => {
    const errors = {};

    if (!person.value.name) {
        errors.name = [{ message: 'name is required.' }];
    }

    if (person.value.fte == 0) {
        errors.fte = [{ message: 'fte must be greater than zero' }];
    }

    if (person.value.work == 0) {
        errors.work = [{ message: 'work must be greater than zero' }];
    }

    return {
        values: person.value,
        errors
    };
};

// Function to search users for AutoComplete
const searchUsers = (event) => {
    let filtered = [];
    let query = event.query.toLowerCase();
    
    filtered = props.users.filter(user => user.name.toLowerCase().includes(query));
    filteredUsers.value = filtered.map(u => u.name);
};

// Function to handle user selection and update rate
const onUserSelect = (event) => {
    const selectedUser = props.users.find(user => user.name === event.value);
    if (selectedUser) {
        person.value.rate = selectedUser.rate;
    }
};

const onFormSubmit = (e, action) => {
    const valid = !Object.keys(resolver({}).errors).length;
    
    if (action === 'save') {
        if (valid) {
            const person_name = person.value.name;
            const updatedList = [...props.peopleList];
            const ind = updatedList.findIndex(
                p => p.name.toLowerCase() === person_name.toLowerCase()
            );

            // Create a new object with the current values (deep copy)
            const newPerson = {
                name: person.value.name,
                rate: person.value.rate,
                fte: person.value.fte,
                work: person.value.work
            };
                
            if (ind >= 0) {
                updatedList[ind] = newPerson;
                
                toast.add({
                    severity: 'success',
                    summary: `Person ${person_name} updated`,
                    life: 3000
                });
            } else {
                // Add the new person to the list
                updatedList.push(newPerson);
                
                toast.add({
                    severity: 'success',
                    summary: `Person ${person_name} added to project`,
                    life: 3000
                });
            }
            
            // Emit updated list to parent
            emit('update:peopleList', updatedList);
            
            // Reset the form for the next entry
            resetPersonForm();
        }
    } else if (action === 'delete') {
        const person_name = person.value.name;
        const updatedList = [...props.peopleList];
        const ind = updatedList.findIndex(
            p => p.name.toLowerCase() === person_name.toLowerCase()
        );
        
        if (ind >= 0) {
            // Remove the person from the list
            updatedList.splice(ind, 1);
            
            // Emit updated list to parent
            emit('update:peopleList', updatedList);
            
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
    <Fieldset legend="people">
        <div class="card">
        <table>
            <tr>
                <th>quantity</th>
                <th>required</th>
                <th>actual</th>
                <th>difference</th>
            </tr>
            <tr>
                <td>work</td>
                <td>{{ totalWork }}</td>
                <td>{{ peopleTotalWork }}</td>
                <td :class="getDiffClass">{{ peopleWorkDiff }}</td>
            </tr>
        </table>
        </div>
        <div class="card">
            <DataTable 
                :value="peopleList" 
                selectionMode="single"
                dataKey="name"
                v-model:selection="selectedPerson"
                @row-select="onRowSelect"
                @row-unselect="onRowUnselect"
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
                            v-model="person.name" 
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
                        <InputNumber v-model="person.rate" name="rate" placeholder="rate" fluid id="person-rate" showButtons :step="10" />
                        <label for="person-rate">rate in czk per hour</label>
                    </IftaLabel>
                </div>
                <div class="flex flex-col gap-1">
                    <IftaLabel>
                        <InputNumber v-model="person.fte" name="fte" placeholder="fte" fluid id="person-fte" :minFractionDigits="1" :maxFractionDigits="3" showButtons :step="0.1" />
                        <label for="person-fte">full time equivalent</label>
                    </IftaLabel>
                    <Message v-if="$form.fte?.invalid" severity="error" size="small" variant="simple">{{ $form.fte.error?.message }}</Message>
                </div>
                <div class="flex flex-col gap-1">
                    <IftaLabel>
                        <InputNumber v-model="person.work" name="work" placeholder="work" fluid id="person-work" showButtons :step="1" />
                        <label for="person-work">work</label>
                    </IftaLabel>
                    <Message v-if="$form.work?.invalid" severity="error" size="small" variant="simple">{{ $form.work.error?.message }}</Message>
                </div>
                <div class="button-group flex gap-2">
                    <Button type="button" @click="e => onFormSubmit(e, 'save')" severity="primary" label="Add/Update" />
                    <Button type="button" @click="e => onFormSubmit(e, 'delete')" severity="secondary" label="Delete" />
                </div>
            </Form>
        </div>
    </Fieldset>
</template>
