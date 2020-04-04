<template>
    <div>
        <!-- nav info -->
        <nav-info></nav-info>
        <hr />

        <!-- spider chart -->
        <spider-chart></spider-chart>
        <hr />

        <!-- proxy table -->
        <proxy-table></proxy-table>
    </div>
</template>

<script>
import NavInfo from "./NavInfo.vue";
import SpiderChart from "./SpiderChart.vue";
import ProxyTable from "./ProxyTable.vue";

export default {
    components: {
        "nav-info": NavInfo,
        "spider-chart": SpiderChart,
        "proxy-table": ProxyTable
    },
    mounted() {}
};
</script>

<style scoped>
</style>
