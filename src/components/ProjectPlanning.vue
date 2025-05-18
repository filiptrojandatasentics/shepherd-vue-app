<script setup>
import { ref, onMounted } from "vue";
import Fieldset from 'primevue/fieldset';
import { InputNumber } from "primevue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { Form } from '@primevue/forms';
import { reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import { Toast } from "primevue";
import { InputText } from "primevue";
import { Message } from "primevue";
import { Button } from "primevue";

const toast = useToast();

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

const initialValues = reactive({
    username: 'filip'
});

const resolver = ({ values }) => {
    const errors = {};

    if (!values.username) {
        errors.username = [{ message: 'Username is required.' }];
    }

    return {
        values, // (Optional) Used to pass current form values to submit event.
        errors
    };
};

const onFormSubmit = ({ valid }) => {
    if (valid) {
        toast.add({
            severity: 'success',
            summary: 'Form is submitted.',
            life: 3000
        });
    }
};
</script>

<template>
    <Fieldset legend="total">
            <InputNumber v-model="project.total.work" showButtons :step="project.config.work_step" />
            <InputNumber v-model="project.config.work_step" />
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
        <div class="card flex justify-center">
            <Toast />
            <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
                <div class="flex flex-col gap-1">
                    <InputText name="username" type="text" placeholder="Username" fluid />
                    <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message>
                </div>
                <Button type="submit" severity="secondary" label="Submit" />
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
