export default defineNuxtRouteMiddleware((to, from) => {
    const { tabs, activeTabIndex } = storeToRefs(useGlobalStore())
    const arr = ['/auth/login', '/auth/register', '/']

    if (!tabs.value.find(el => el.path === to.path) && !arr.includes(to.path)) {
        tabs.value.push({ path: to.path, title: to.path })
    }
    tabs.value.forEach((el, index) => {
        if (el.path == to.path) {
            activeTabIndex.value = index
        }
    })
})
