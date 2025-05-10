<script setup>
import { ref } from "vue";
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import { Form } from '@primevue/forms';
import IftaLabel from 'primevue/iftalabel';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import DatePicker from 'primevue/datepicker';
import AutoComplete from 'primevue/autocomplete';
import Button from "primevue/button";

const people = ref([
    'jiri.jelinek@datasentics.com',
    'filip.trojan@datasentics.com',
    'david.vopelka@datasentics.com',
    'tomas.bouma@datasentics.com',
    'ondrej.kral@datasentics.com',
    'ondrej.pleticha@datasentics.com',
])
const budget = ref({
    name: 'George',
    amount: 51408,
    start: new Date('2024-06-10'),
    end: new Date('2024-12-31'),
    owner: 'jiri.jelinek@datasentics.com',
});
const filteredPeople = ref([])
const searchPeople = (event) => {
    const query = event.query.toLowerCase();
    filteredPeople.value = people.value.filter(
        person => person.toLowerCase().includes(query)
    );
}
</script>

<template>
    <Splitter style="height: 600px" layout="vertical">
        <SplitterPanel class="flex items-center justify-center">
            <Splitter layout="horizontal">
                <SplitterPanel class="flex items-center justify-center" :size="50" :minSize="10">
                    <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
                        <div class="flex flex-col gap-1">
                            <IftaLabel>
                                <label for="name">name</label>
                                <InputText v-model="budget.name" name="name" type="text" placeholder="Name" />
                            </IftaLabel>
                            <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message>
                        </div>
                        <div class="flex flex-col gap-1">
                            <IftaLabel>
                                <InputNumber v-model="budget.amount" inputId="amount" mode="currency" currency="CZK" fluid />
                                <label for="amount">amount</label>
                            </IftaLabel>
                            <Message v-if="$form.amount?.invalid" severity="error" size="small" variant="simple">{{ $form.amount.error?.message }}</Message>
                        </div>
                        <div class="flex flex-col gap-1">
                            <IftaLabel>
                                <DatePicker v-model="budget.start" name="start" dateFormat="yy-mm-dd" fluid />
                                <label for="start">start date</label>
                            </IftaLabel>
                            <Message v-if="$form.date?.invalid" severity="error" size="small" variant="simple">{{ $form.date.error?.message }}</Message>
                        </div>
                        <div class="flex flex-col gap-1">
                            <IftaLabel>
                                <DatePicker v-model="budget.end" name="end" dateFormat="yy-mm-dd" fluid />
                                <label for="end">end date</label>
                            </IftaLabel>
                            <Message v-if="$form.date?.invalid" severity="error" size="small" variant="simple">{{ $form.date.error?.message }}</Message>
                        </div>
                        <div class="flex flex-col gap-1">
                            <IftaLabel>
                                <AutoComplete v-model="budget.owner" inputId="ac" dropdown :suggestions="filteredPeople" @complete="searchPeople" variant="filled" />
                                <label for="ac">Owner</label>
                            </IftaLabel>
                        </div>
                        <Button type="submit" severity="secondary" label="Update" />
                    </Form>
                </SplitterPanel>
                <SplitterPanel class="flex items-center justify-center" :size="30"> Panel 1.2 </SplitterPanel>
                <SplitterPanel class="flex items-center justify-center" :size="30"> Panel 1.3 </SplitterPanel>
            </Splitter>
        </SplitterPanel>
        <SplitterPanel class="flex items-center justify-center"> Panel 2 </SplitterPanel>
    </Splitter>
</template>