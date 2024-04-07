<template>
    <div v-if="id" class="p-4 flex items-center w-full">
        <Chart type="line" :data="chartData" :options="chartOptions" class="w-full" />
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

const chart = ref()
const chartData = ref()
const chartOptions = ref()


await useFetch(`${url}/Spots/${id}/statistic/requests-sum-by-date`, {
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
                label: 'Sold Sum',
                data: chart.value.datasets[0].data,
                fill: false,
                borderColor: '#1d9e92',
                tension: 0.4
            },
            {
                label: 'Rejected Sum',
                data: chart.value.datasets[1].data,
                fill: false,
                borderColor: '#f0c225',
                tension: 0.4
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
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
</script>
