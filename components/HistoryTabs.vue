<script setup lang="ts">
const { tabs, activeTabIndex } = storeToRefs(useGlobalStore())
const router = useRouter()

const changeTab = (tabIndex: number) => {
    activeTabIndex.value = tabIndex

    tabs.value.forEach((el, index) => {
        if (index == tabIndex) {
            router.push(el.path)
        }
    })
}

const deleteTab = (tabPath: string) => {
    tabs.value.forEach((el, index) => {
        if (el.path == tabPath) {
            tabs.value.splice(index, 1)
            activeTabIndex.value = null
        }
    })

}
</script>

<template>
    <div class="tabs bg-red-100">
        <TabView @tab-click="changeTab($event.index)" v-model:active-index="activeTabIndex">
            <TabPanel v-for="tab in tabs" :key="tab.title" :header="tab.title.slice(1, tab.title.length)">
                <template #header>
                    <Button icon="pi pi-times mx-1" text rounded @click.stop="deleteTab(tab.path)" />
                </template>
            </TabPanel>
        </TabView>
    </div>
</template>

<style>
div[data-pc-section="panelcontainer"] {
    display: none !important;
}
</style>