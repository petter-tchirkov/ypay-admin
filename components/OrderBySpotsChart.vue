<template>
    <div class="h-full">
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-full" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart';
const url = useRuntimeConfig().public.baseUrl
const route = useRoute()
const { token } = storeToRefs(useAuthStore())

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chart = ref()
const chartData = ref();
const chartOptions = ref();


await useFetch(`${url}/Spots/statistic/requests-by-spots`, {
    headers: {
        'Authorization': `Bearer ${token.value}`
    },
    params: { id: route.params.id },
    onResponse({ response }) {
        chart.value = response._data
    }
})

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: chart.value.labels,
        datasets: [
            {
                label: 'Orders by Spot',
                backgroundColor: '#1d9e92',
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                data: chart.value.datasets[0].data
            },
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
        aspectRatio: 0.8,
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
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}
</script>
