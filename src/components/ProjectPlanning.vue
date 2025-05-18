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
    name: '',
    fte: 0,
    work: 0,
});

const resolver = ({ values }) => {
    const errors = {};

    if (!values.name) {
        errors.name = [{ message: 'name is required.' }];
    }

    if (values.fte == 0) {
        errors.fte = [{ message: 'fte must be greater than zero' }];
    }

    if (values.work == 0) {
        errors.work = [{ message: 'work must be greater than zero' }];
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
            <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
                <div class="flex flex-col gap-1">
                    <IftaLabel>
                        <InputText name="name" type="text" placeholder="name" fluid id="person-name" />
                        <label for="person-name">name</label>
                    </IftaLabel>
                    <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{ $form.name.error?.message }}</Message>
                </div>
                <div class="flex flex-col gap-1">
                    <IftaLabel>
                        <InputNumber name="rate" placeholder="rate" fluid id="person-rate" />
                        <label for="person-rate">rate in czk per hour</label>
                    </IftaLabel>
                </div>
                <div class="flex flex-col gap-1">
                    <IftaLabel>
                        <InputNumber name="fte" placeholder="fte" fluid id="person-fte" />
                        <label for="person-fte">full time equivalent</label>
                    </IftaLabel>
                    <Message v-if="$form.fte?.invalid" severity="error" size="small" variant="simple">{{ $form.fte.error?.message }}</Message>
                </div>
                <div class="flex flex-col gap-1">
                    <IftaLabel>
                        <InputNumber name="work" placeholder="work" fluid id="person-work" />
                        <label for="person-work">work</label>
                    </IftaLabel>
                    <Message v-if="$form.work?.invalid" severity="error" size="small" variant="simple">{{ $form.work.error?.message }}</Message>
                </div>
                <Button type="submit" severity="secondary" label="Add" />
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
