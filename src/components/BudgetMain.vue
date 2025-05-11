<script setup>
import axios from 'axios';
import { ref, onMounted } from "vue";
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import { Form } from '@primevue/forms';
import IftaLabel from 'primevue/iftalabel';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import DatePicker from 'primevue/datepicker';
import AutoComplete from 'primevue/autocomplete';
import Dropdown from 'primevue/dropdown';
import Button from "primevue/button";
import Chart from 'primevue/chart';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

const toast = useToast();

const manual_users = [
    'jiri.jelinek@datasentics.com',
    'filip.trojan@datasentics.com',
    'david.vopelka@datasentics.com',
    'tomas.bouma@datasentics.com',
    'ondrej.kral@datasentics.com',
    'ondrej.pleticha@datasentics.com',
];
const people = ref(manual_users)
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

// State variables
const emails = ref([]);
const selectedEmail = ref(null);
const loading = ref(false);
const error = ref(null);

// fetch user data from API
const fetchUsers = async () => {
    loading.value = true;
    error.value = null;
    try {
        // documentation: https://fakerapi.it/
        const response = await axios.get('https://fakerapi.it/api/v2/users?_quantity=10'); 
        // Extract email data and map to format expected by PrimeVue Dropdown
        emails.value = response.data.data.map(user => ({
            email: user.email,
            id: user.id
        }));
        loading.value = false;
    } catch (err) {
        console.error('Error fetching user data:', err);
        error.value = 'Failed to load user emails. Please try again later.';
        loading.value = false;
    }
};

onMounted(() => {
    fetchUsers();
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const months = ['2024-06', '2024-07', '2024-08', '2024-09'];
const remainingBudget = [51408, 32500, 27020, 16200]

const setChartData = () => {
    return {
        labels: months,
        datasets: [
            {
                label: 'Remaining budget',
                data: remainingBudget,
                backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246 0.2)'],
                borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
                borderWidth: 1
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}

// Form state
const submitted = ref(false);
const formLoading = ref(false);
const apiError = ref('');

// Form validation
const isFormValid = () => {
  return (
    budget.value.name &&
    budget.value.amount &&
    budget.value.start &&
    budget.value.end &&
    budget.value.owner
  );
};

// Handle form submission
const submitForm = async () => {
  submitted.value = true;
  apiError.value = '';
  
  if (!isFormValid()) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Please check the form for errors',
      life: 3000
    });
    return;
  }
  
  formLoading.value = true;
  
  try {
    // Replace with your actual API endpoint
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
      name: budget.value.name,
      amount: budget.value.amount,
      start: budget.value.start,
      end: budget.value.end,
      owner: budget.value.owner
    });
    
    console.log('Form submitted:', response.data);
    
    // Show success message
    toast.add({
      severity: 'success',
      summary: 'Registration Successful',
      detail: 'Your budget has been created',
      life: 3000
    });
    
    submitted.value = false;
    
  } catch (error) {
    console.error('Submission error:', error);
    apiError.value = error.response?.data?.message || 'An error occurred during submission. Please try again.';
    
    toast.add({
      severity: 'error',
      summary: 'Submission Error',
      detail: 'Failed to submit the form',
      life: 5000
    });
  } finally {
    formLoading.value = false;
  }
};
</script>

<template>
    <Splitter style="height: 800px" layout="vertical">
        <SplitterPanel class="flex items-center justify-center">
            <Splitter layout="horizontal">
                <SplitterPanel class="flex items-center justify-center" :size="50" :minSize="10">
                    <Form 
                        v-slot="$form" 
                        :resolver="resolver" 
                        :initialValues="initialValues" 
                        @submit="submitForm" 
                        class="flex flex-col gap-4 w-full sm:w-56">
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
                        <div class="flex flex-col gap-1">
                            <IftaLabel>
                                <Dropdown 
                                    id="email-select" 
                                    v-model="selectedEmail"
                                    :options="emails"
                                    optionLabel="email"
                                    optionValue="email"
                                    placeholder="Select an Email"
                                    :loading="loading" />
                                <label for="email-select">Select User Email</label>
                            </IftaLabel>
                        </div>
                        <Button type="submit" severity="secondary" label="Update" />
                        <div v-if="selectedEmail" class="mt-3">
                            <p>Selected email: {{ selectedEmail }}</p>
                        </div>
                    </Form>
                    <Toast />
                </SplitterPanel>
                <SplitterPanel class="flex items-center justify-center" :size="30"> Panel 1.2 </SplitterPanel>
                <SplitterPanel class="flex items-center justify-center" :size="30"> Panel 1.3 </SplitterPanel>
            </Splitter>
        </SplitterPanel>
        <SplitterPanel class="flex items-center justify-center">
            <div class="card">
                <Chart type="bar" :data="chartData" :options="chartOptions" />
            </div>            
        </SplitterPanel>
    </Splitter>
</template>