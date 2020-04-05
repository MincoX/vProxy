<template>
    <div>
        <div class="row">
            <div class="col-md-8">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">代理列表</h3>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                        <div
                            id="example2_wrapper"
                            class="dataTables_wrapper form-inline dt-bootstrap"
                        >
                            <div class="row">
                                <div class="col-sm-12">
                                    <table
                                        id="example2"
                                        class="table table-bordered table-hover dataTable text-center"
                                        role="grid"
                                        aria-describedby="example2_info"
                                    >
                                        <thead>
                                            <tr role="row">
                                                <th
                                                    class="sorting_asc"
                                                    tabindex="0"
                                                    aria-controls="example2"
                                                    rowspan="1"
                                                    colspan="1"
                                                    aria-sort="ascending"
                                                    aria-label="Rendering engine: activate to sort column descending"
                                                >Ip</th>
                                                <th
                                                    class="sorting"
                                                    tabindex="0"
                                                    aria-controls="example2"
                                                    rowspan="1"
                                                    colspan="1"
                                                    aria-label="Browser: activate to sort column ascending"
                                                >Port</th>
                                                <th
                                                    class="sorting"
                                                    tabindex="0"
                                                    aria-controls="example2"
                                                    rowspan="1"
                                                    colspan="1"
                                                    aria-label="Platform(s): activate to sort column ascending"
                                                >速度</th>
                                                <th
                                                    class="sorting"
                                                    tabindex="0"
                                                    aria-controls="example2"
                                                    rowspan="1"
                                                    colspan="1"
                                                    aria-label="Engine version: activate to sort column ascending"
                                                >地区</th>
                                                <th
                                                    class="sorting"
                                                    tabindex="0"
                                                    aria-controls="example2"
                                                    rowspan="1"
                                                    colspan="1"
                                                    aria-label="CSS grade: activate to sort column ascending"
                                                >来源</th>
                                                <th
                                                    class="sorting"
                                                    tabindex="0"
                                                    aria-controls="example2"
                                                    rowspan="1"
                                                    colspan="1"
                                                    aria-label="CSS grade: activate to sort column ascending"
                                                >协议类型</th>
                                                <th
                                                    class="sorting"
                                                    tabindex="0"
                                                    aria-controls="example2"
                                                    rowspan="1"
                                                    colspan="1"
                                                    aria-label="CSS grade: activate to sort column ascending"
                                                >匿名程度</th>
                                                <th
                                                    class="sorting"
                                                    tabindex="0"
                                                    aria-controls="example2"
                                                    rowspan="1"
                                                    colspan="1"
                                                    aria-label="CSS grade: activate to sort column ascending"
                                                >操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                role="row"
                                                class="odd"
                                                v-for="(item, index) in curPageDatas"
                                                :key="index"
                                            >
                                                <td class="sorting_1">{{ item.ip }}</td>
                                                <td>{{ item.port }}</td>
                                                <td>{{ item.speed }}</td>
                                                <td>{{ item.area }}</td>
                                                <td>{{ item.origin }}</td>
                                                <td>{{ item.protocol }}</td>
                                                <td>{{ item.nick_type }}</td>
                                                <td>
                                                    <a href @click.prevent="proxyCheck(item.id)">
                                                        <button
                                                            class="btn btn-warning"
                                                            :disabled="disabled_check"
                                                        >测试</button>
                                                    </a>
                                                    <!-- :disabled="send_check?'':'fal'"> -->
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="pull-right" style="margin-top: -30px;">
                                <div
                                    class="dataTables_paginate paging_simple_numbers"
                                    id="example2_paginate"
                                >
                                    <ul class="pagination">
                                        <li
                                            id="example2_previous"
                                            :class="['paginate_button', 'previous', prePageDisable?'disabled':'']"
                                        >
                                            <a
                                                href="#"
                                                aria-controls="example2"
                                                data-dt-idx="0"
                                                tabindex="0"
                                                @click.prevent="prePage"
                                            >上一页</a>
                                        </li>
                                        <li class="paginate_button">
                                            <a
                                                href="#"
                                                aria-controls="example1"
                                                data-dt-idx="1"
                                                tabindex="0"
                                                @click.prevent
                                            >当前第 {{ curPage + 1 }} 页，共 {{ pageNum }}页</a>
                                        </li>

                                        <li
                                            id="example2_next"
                                            :class="['paginate_button', 'next', nextPageDisable?'disabled':'']"
                                        >
                                            <a
                                                href="#"
                                                aria-controls="example2"
                                                data-dt-idx="7"
                                                tabindex="0"
                                                @click.prevent="nextPage"
                                            >下一页</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /.box-body -->
                </div>
            </div>

            <div class="col-md-4">
                <div class="box box-default" :style="{display:(sended_check?'none':'')}">
                    <div class="box-header with-border">
                        <h3 class="box-title">库存占比</h3>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="chart-responsive">
                                    <canvas
                                        id="pieChart"
                                        height="202"
                                        width="303"
                                        style="width: 243px; height: 162px;"
                                    ></canvas>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div style="height: 35px;"></div>
                                <ul class="chart-legend clearfix">
                                    <li>
                                        <i class="fa fa-circle-o text-red"></i> 66Ip
                                    </li>
                                    <li>
                                        <i class="fa fa-circle-o text-green"></i> 快代理
                                    </li>
                                    <li>
                                        <i class="fa fa-circle-o text-yellow"></i> Ip3366
                                    </li>
                                    <li>
                                        <i class="fa fa-circle-o text-aqua"></i> 西刺代理
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- /.box-body -->
                    <div class="box-footer no-padding">
                        <ul class="nav nav-pills nav-stacked">
                            <li>
                                <a href="#" @click.prevent>
                                    66Ip
                                    <span class="pull-right text-red">{{ scale[0] }}%</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" @click.prevent>
                                    快代理
                                    <span class="pull-right text-green">{{ scale[1] }}%</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" @click.prevent>
                                    Ip3366
                                    <span class="pull-right text-yellow">{{ scale[2] }}%</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" @click.prevent>
                                    西刺代理
                                    <span class="pull-right text-yellow">{{ scale[3] }}%</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- /.footer -->
                </div>

                <div class="box box-danger" :style="{display:(sended_check?'':'none')}">
                    <div class="box-header text-center">
                        <h3 class="box-title text-success">测试结果</h3>
                    </div>

                    <div class="box-body table-responsive no-padding">
                        <table class="table table-hover text-center">
                            <tbody>
                                <tr>
                                    <th>Property</th>
                                    <th>Status</th>
                                </tr>
                                <tr>
                                    <td>Ip</td>
                                    <td>
                                        <span class="label label-primary">{{ checked.ip }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>端口</td>
                                    <td>
                                        <span class="label label-primary">{{ checked.port }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>速度</td>
                                    <td>
                                        <span class="label label-primary">{{ checked.speed }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>地区</td>
                                    <td>
                                        <span class="label label-primary">{{ checked.area }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>来源</td>
                                    <td>
                                        <span class="label label-primary">{{ checked.origin }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>协议类型</td>
                                    <td>
                                        <span class="label label-primary">{{ checked.protocol }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>匿名程度</td>
                                    <td>
                                        <span class="label label-primary">{{ checked.nick_type }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="overlay" :style="{display:(loading_label?'':'none')}">
                        <i class="fa fa-refresh fa-spin"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            flag: false,
            proxies: [],
            labels: [],
            data: [],
            sended_check: false,
            loading: true,
            checked: {},
            disabled_check: false,
            scale: [],

            everyPageDatas: [],
            curPageDatas: [],
            pageNum: 1,
            pageSize: 5,
            curPage: 0,

            nextPageDisable: true,
            prePageDisable: true
        };
    },
    created() {
        this.getProxies();
        this.getChartDatas();
    },
    watch: {
        flag() {
            this.drawChart();
        },
        proxies() {
            this.pageNum = Math.ceil(this.proxies.length / this.pageSize) || 1;
            for (let i = 0; i < this.pageNum; i++) {
                this.everyPageDatas[i] = this.proxies.slice(
                    this.pageSize * i,
                    this.pageSize * (i + 1)
                );
            }
            this.curPageDatas = this.everyPageDatas[this.curPage];
            if (this.pageNum > 1) {
                this.nextPageDisable = false;
            }
        }
    },
    computed: {
        loading_label: function() {
            return this.loading;
        }
    },
    methods: {
        getChartDatas() {
            this.$http.get("dashboard.pie_chart").then(
                res => {
                    this.labels = res.body.label;
                    this.data = res.body.data;
                    this.scale = res.body.scale;
                    this.flag = true;
                },
                function() {
                    this.$notify({
                        title: "网络阻塞，请重新刷新页面！",
                        type: "warning"
                    });
                }
            );
        },
        getProxies() {
            this.$http.get("proxy.proxies").then(
                res => {
                    this.proxies = res.body.proxies;
                },
                function() {
                    this.$notify({
                        title: "网络阻塞，请重新刷新页面！",
                        type: "warning"
                    });
                }
            );
        },
        nextPage() {
            if (this.curPage == this.pageNum - 1) {
                this.nextPageDisable = true;
                return;
            }
            this.curPageDatas = this.everyPageDatas[++this.curPage];
            this.prePageDisable = false;
            if (this.curPage == this.pageNum - 1) {
                this.nextPageDisable = true;
            }
        },
        prePage() {
            if (this.curPage <= 0) {
                this.prePageDisable = true;
                return;
            }
            this.curPageDatas = this.everyPageDatas[--this.curPage];
            if (this.curPage <= 0) {
                this.prePageDisable = true;
            }
        },
        proxyCheck(proxyId) {
            this.$notify({
                title: "请求已发送，请耐心等候！",
                type: "success"
            });

            // toggle check result
            this.sended_check = true;
            // disable send check
            this.disabled_check = true;

            this.$http.post("proxy.check/", { proxyId: proxyId }).then(
                res => {
                    if (res.body.status) {
                        this.$notify({
                            title: "结果返回成功",
                            type: "success"
                        });
                        // cancel loading label
                        this.loading = false;
                        // cancel disabled check
                        this.disabled_check = false;

                        this.checked = res.body;
                        this.getProxies();
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
        drawChart() {
            var pieChartCanvas = $("#pieChart")
                .get(0)
                .getContext("2d");

            new Chart(pieChartCanvas, {
                type: "doughnut", // or 'pie'
                data: {
                    labels: this.labels,
                    datasets: [
                        {
                            borderWidth: 1,
                            backgroundColor: [
                                "#F39C12",
                                "#DD4B39",
                                "#00A65A",
                                "#00C0EF"
                            ],
                            data: this.data
                        }
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        position: "right",
                        display: false
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    }
                }
            });
        }
    }
};
</script>

<style>
</style>



