<template>
  <div class="p-4 flex justify-content-center">
    <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart';
const url = useRuntimeConfig().public.baseUrl
const route = useRoute()
const { token } = storeToRefs(useAuthStore())

const { id = null } = defineProps<{ id: number | null }>()

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chart = ref();
const chartData = ref();
const chartOptions = ref(null);

await useFetch(`${url}/Spots/${id}/statistic/requests-count-statuses`, {
  headers: {
    'Authorization': `Bearer ${token.value}`
  },
  params: { id: route.params.id },
  onResponse({ response }) {
    chart.value = response._data
  }
})

const setChartData = () => {

  return {
    labels: chart.value.labels,
    datasets: [
      {
        label: 'Orders by Status',
        data: chart.value.datasets[0].data,
        backgroundColor: ['#1d9e92', '#92da81', '#f9f871'],
      }
    ]
  };
};

const setChartOptions = () => {

  return {
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
        }
      }
    }
  };
};
</script>
