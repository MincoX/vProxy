<template>
    <div class="box">
        <div class="box-header with-border">
            <h3 class="box-title">报告图</h3>
            <div class="box-tools pull-right">
                <button
                    class="label label-danger btn-flat btn btn-xs"
                    id="dLabel"
                    @click="showCalendar"
                    :disabled="disDate"
                >
                    {{ curdate }}&nbsp; | &nbsp;
                    <i class="fa fa-gear"></i>
                </button>
                <calendar
                    id="calendar"
                    @clickCalendar="choseDay"
                    :style="{ display: ( showCalendarModal ? '': 'none' ) }"
                ></calendar>
            </div>
        </div>
        <div class="box-body">
            <div class="row">
                <div class="col-md-8">
                    <div class="chart">
                        <!-- Sales Chart Canvas -->
                        <canvas
                            id="salesChart"
                            style="height: 180px; width: 816px;"
                            height="280"
                            width="1020"
                        ></canvas>
                    </div>
                    <!-- /.chart-responsive -->
                </div>
                <!-- /.col -->

                <div class="col-md-4">
                    <p class="text-center">
                        <strong>Active / Expire</strong>
                    </p>

                    <div class="progress-group">
                        <span class="progress-text">66Ip</span>
                        <span class="progress-number">
                            <b>{{ scale['66ip'] }}</b>
                        </span>

                        <div class="progress sm">
                            <div
                                class="progress-bar progress-bar-red"
                                :style="{ width: scale['66ip_scale'] }"
                            ></div>
                        </div>
                    </div>

                    <div class="progress-group">
                        <span class="progress-text">快代理</span>
                        <span class="progress-number">
                            <b>{{ scale['kuaidaili'] }}</b>
                        </span>

                        <div class="progress sm">
                            <div
                                class="progress-bar progress-bar-green"
                                :style="{ width: scale['kuaidaili_scale'] }"
                            ></div>
                        </div>
                    </div>

                    <div class="progress-group">
                        <span class="progress-text">Ip3366</span>
                        <span class="progress-number">
                            <b>{{ scale['ip3366'] }}</b>
                        </span>

                        <div class="progress sm">
                            <div
                                class="progress-bar progress-bar-yellow"
                                :style="{ width: scale['ip3366_scale'] }"
                            ></div>
                        </div>
                    </div>

                    <div class="progress-group">
                        <span class="progress-text">西刺代理</span>
                        <span class="progress-number">
                            <b>{{ scale['xici'] }}</b>
                        </span>

                        <div class="progress sm">
                            <div
                                class="progress-bar progress-bar-aqua"
                                :style="{ width: scale['xici_scale'] }"
                            ></div>
                        </div>
                    </div>
                </div>

                <!-- /.col -->
            </div>
            <!-- /.row -->
        </div>
    </div>
</template>


<script>
import Calendar from "../components/Common/Calendar";
export default {
    data() {
        return {
            flag: false,
            labels: [],
            ip66: [],
            kuaiDaili: [],
            ip3366: [],
            xiCi: [],
            filterDate: null,
            scale: {},
            disDate: false,
            showCalendarModal: false,
            curdate: ""
        };
    },
    mounted() {
        var date = new Date();
        this.curdate = date.toLocaleDateString();
        this.getChartDatas(this.curdate);
        this.getScale(this.curdate);
    },
    watch: {
        flag() {
            this.drawChart();
        }
    },
    components: {
        Calendar
    },
    methods: {
        getScale(dt) {
            this.disDate = true;
            this.$http
                .post("dashboard.total_active_scale/", { filter_date: dt })
                .then(
                    res => {
                        if (res.body.status) {
                            this.scale = res.body.scale;
                        } else {
                            this.$notify({
                                title: res.body.message,
                                type: "warning"
                            });
                        }
                    },
                    function() {
                        this.$notify({
                            title: "网络阻塞，请重新刷新页面！",
                            type: "warning"
                        });
                    }
                );
        },
        showCalendar() {
            this.showCalendarModal = !this.showCalendarModal;
        },
        getChartDatas(dt) {
            this.disDate = true;
            this.$http.post("dashboard.line_chart/", { filter_date: dt }).then(
                res => {
                    if (res.body.status) {
                        this.labels = res.body.label;
                        this.ip66 = res.body.ip66;
                        this.kuaiDaili = res.body.kuaidaili;
                        this.ip3366 = res.body.ip3366;
                        this.xiCi = res.body.xicidaili;
                        this.flag = !this.flag;
                    } else {
                        this.$notify({
                            title: res.body.message,
                            type: "warning"
                        });
                    }
                    this.disDate = false;
                },
                function() {
                    this.$notify({
                        title: "网络阻塞，请重新刷新页面！",
                        type: "warning"
                    });
                }
            );
        },
        choseDay(dt) {
            this.curdate = dt;
            this.showCalendar();
            this.getChartDatas(dt);
            this.getScale(dt);
        },
        changeMonth(dt) {},
        drawChart() {
            var salesChartCanvas = $("#salesChart")
                .get(0)
                .getContext("2d");

            var salesChartData = {
                labels: this.labels,
                datasets: [
                    {
                        label: "66Ip",
                        borderColor: "#DD4B39",
                        pointBackgroundColor: "#DD4B39",
                        pointBorderColor: "#DD4B39",
                        // backgroundColor: '#DD4B39',
                        data: this.ip66
                    },
                    {
                        label: "kuaiDaili",
                        borderColor: "#00A65A",
                        pointBackgroundColor: "#00A65A",
                        pointBorderColor: "#00A65A",
                        // backgroundColor: '#00A65A',
                        data: this.kuaiDaili
                    },
                    {
                        label: "Ip3366",
                        borderColor: "#F39C12",
                        pointBackgroundColor: "#F39C12",
                        pointBorderColor: "#F39C12",
                        // backgroundColor: '#F39C12',
                        data: this.ip3366
                    },
                    {
                        label: "西刺代理",
                        borderColor: "#00C0EF",
                        pointBackgroundColor: "#00C0EF",
                        pointBorderColor: "#00C0EF",
                        // backgroundColor: '#00C0EF',
                        data: this.xiCi
                    }
                ]
            };

            var salesChartOptions = {
                // Boolean - If we should show the scale at all
                showScale: true,
                // Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines: false,
                // String - Colour of the grid lines
                scaleGridLineColor: "rgba(0,0,0,.05)",
                // Number - Width of the grid lines
                scaleGridLineWidth: 1,
                // Boolean - Whether to show horizontal lines (except X axis)
                scaleShowHorizontalLines: true,
                // Boolean - Whether to show vertical lines (except Y axis)
                scaleShowVerticalLines: true,
                // Boolean - Whether the line is curved between points
                bezierCurve: true,
                // Number - Tension of the bezier curve between points
                bezierCurveTension: 0.3,
                // Boolean - Whether to show a dot for each point
                pointDot: false,
                // Number - Radius of each point dot in pixels
                pointDotRadius: 4,
                // Number - Pixel width of point dot stroke
                pointDotStrokeWidth: 1,
                // Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                pointHitDetectionRadius: 20,
                // Boolean - Whether to show a stroke for datasets
                datasetStroke: true,
                // Number - Pixel width of dataset stroke
                datasetStrokeWidth: 2,
                // Boolean - Whether to fill the dataset with a color
                datasetFill: true,
                // String - A legend template
                legendTemplate:
                    "<ul class='<%=name.toLowerCase()%>-legend'><% for (var i=0; i<datasets.length; i++){%><li><span style='background-color:<%=datasets[i].lineColor%>'></span><%=datasets[i].label%></li><%}%></ul>",
                // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
                maintainAspectRatio: true,
                // Boolean - whether to make the chart responsive to window resizing
                responsive: true
            };

            var salesChart = new Chart(salesChartCanvas, {
                type: "line",
                data: salesChartData,
                options: salesChartOptions
            });
        }
    }
};
</script>

<style>
</style>

