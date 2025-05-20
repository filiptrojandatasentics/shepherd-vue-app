<script setup>
import { ref, computed } from "vue";
import Fieldset from 'primevue/fieldset';
import { InputNumber } from "primevue";
import RadioButton from 'primevue/radiobutton';
import FloatLabel from 'primevue/floatlabel';
import { useToast } from 'primevue/usetoast';

const props = defineProps({
  totalWork: Number,
  peopleList: {
    type: Array,
    default: () => []
  },
  projectPlan: Array,
});

const emit = defineEmits(['update:projectPlan']);
const toast = useToast();
const timeUnit = ref('month');
const totalTime = ref(0);

const timeHeaders = computed(() => {
  return [...Array(totalTime.value)].map((_, i) => `${timeUnit.value}_${i+1}`);
});

const workSplits = computed(() => {
  const result = {};
  if (props.peopleList && props.peopleList.length > 0) {
    props.peopleList.forEach(person => {
      const value = person.work / (totalTime.value > 0 ? totalTime.value : 1);
      result[person.name] = [...Array(totalTime.value)].map(() => value);
    });
  }
  return result;
});
</script>

<template>
  <Fieldset legend="time">
    <div class="card flex justify-center">
      <div class="flex flex-wrap gap-4">
        <div class="flex items-center gap-2">
          <RadioButton v-model="timeUnit" inputId="ingredient1" name="pizza" value="quarter" />
          <label for="ingredient1">quarter</label>
        </div>
        <div class="flex items-center gap-2">
          <RadioButton v-model="timeUnit" inputId="ingredient2" name="pizza" value="month" />
          <label for="ingredient2">month</label>
        </div>
        <div class="flex items-center gap-2">
          <RadioButton v-model="timeUnit" inputId="ingredient3" name="pizza" value="week" />
          <label for="ingredient3">week</label>
        </div>
        <div class="flex items-center gap-2">
          <RadioButton v-model="timeUnit" inputId="ingredient4" name="pizza" value="day" />
          <label for="ingredient4">day</label>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <FloatLabel>
        <InputNumber v-model="totalTime" name="totalTime" placeholder="total time" fluid id="total-time" showButtons :step="1" />
        <label for="total-time">total time</label>
      </FloatLabel>
    </div>
    <table>
      <tr>
        <th>person</th>
        <th v-for="header in timeHeaders" :key="header">{{ header }}</th>
      </tr>
      <tr v-for="person in props.peopleList" :key="person.name">
        <th>{{ person.name }}</th>
        <td v-for="(value, index) in workSplits[person.name]" :key="index">
          {{ value }}
        </td>
      </tr>
    </table>
  </Fieldset>
</template>
