<template>
    <div>
        <div class="box box-primary">
            <div class="box-header with-border">
                <i class="fa fa-smile-o"></i>
                <h3 class="box-title">Service</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <div class="alert alert-danger alert-dismissible">
                    <!-- <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> -->
                    <h4>
                        <div>
                            <!-- <i class="icon fa fa-warning"></i> -->
                            <i class="icon fa fa-check"></i>
                            系统服务
                            <span
                                v-if="server_error_count"
                                class="pull-right"
                            >Error: {{ server_error_count }}</span>
                        </div>
                    </h4>

                    <div v-if="server_error_count!=0">
                        {{ server_error_info }}
                        <span class="pull-right">{{ server_error_time }}</span>
                    </div>
                    <div v-if="server_error_count==0">The system is running safely.</div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="alert alert-success alert-dismissible">
                            <h4>
                                <div>
                                    <i class="icon fa fa-check"></i>
                                    爬虫任务
                                    <span
                                        v-if="spider_status == 1"
                                    >(执行中)</span>
                                    <span class="pull-right">
                                        <i
                                            v-if="spiderCountdown.length != 0"
                                            class="icon fa fa-hourglass-2"
                                        ></i>
                                        <countdown
                                            class="pull-right"
                                            :fhours="spiderCountdown[0]"
                                            :fminutes="spiderCountdown[1]"
                                            :fseconds="spiderCountdown[2]"
                                        ></countdown>
                                    </span>
                                </div>
                            </h4>
                            <div
                                v-if="spider_task_active"
                                class="text-center"
                            >今日任务: {{ spider_task_active }} &nbsp; 今日收获: {{ spider_harvest }}</div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="alert alert-warning alert-dismissible">
                            <h4>
                                <div>
                                    <i class="icon fa fa-check"></i>
                                    检测任务
                                    <span
                                        v-if="check_status == 1"
                                    >(执行中)</span>
                                    <span class="pull-right">
                                        <i
                                            v-if="checkCountdown.length != 0"
                                            class="icon fa fa-hourglass-2"
                                        ></i>
                                        <countdown
                                            class="pull-right"
                                            :fhours="checkCountdown[0]"
                                            :fminutes="checkCountdown[1]"
                                            :fseconds="checkCountdown[2]"
                                        ></countdown>
                                    </span>
                                </div>
                            </h4>
                            <div
                                v-if="check_task_active"
                                class="text-center"
                            >今日任务: {{ check_task_active }} &nbsp; 今日收获: {{ check_harvest }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.box-body -->
        </div>
        <!-- Custom Tabs -->
        <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
                <li class="active">
                    <a href="#tab_1" data-toggle="tab">登录日志</a>
                </li>
                <li>
                    <a href="#tab_2" data-toggle="tab" @click.prevent="getServerLog">服务日志</a>
                </li>
                <li>
                    <a href="#tab_3" data-toggle="tab">轮询日志</a>
                </li>
                <li>
                    <a
                        href="#tab_4"
                        data-toggle="tab"
                        @click.prevent="getCeleryTask(curdate)"
                    >Celery 任务列表</a>
                </li>

                <li class="pull-right box-tools" style="margin-top: 6px; margin-right: 16px;">
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
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="tab_1">
                    <div class="box-body table-responsive no-padding">
                        <table class="table table-hover text-center">
                            <tbody>
                                <tr>
                                    <th>用户ID</th>
                                    <th>用户名</th>
                                    <th>登录日期</th>
                                    <th>登录Ip</th>
                                    <th>账户创建日期</th>
                                    <th>账户状态</th>
                                </tr>
                                <tr v-for="(item, index) in loginLogs" :key="index">
                                    <td>{{ item.id }}</td>
                                    <td>
                                        <span class="label label-success">{{ item.username }}</span>
                                    </td>
                                    <td>{{ item.log_create_time }}</td>
                                    <td>{{ item.ip }}</td>
                                    <td>{{ item.account_create_time }}</td>
                                    <td v-if="item.active" class="text-success">
                                        <strong>
                                            <i class="fa fa-check-circle-o text-success"></i> 激活中
                                        </strong>
                                    </td>
                                    <td v-if="item.active!=true" class="text-danger">
                                        <strong>
                                            <i class="fa fa-exclamation-circle text-danger"></i> 禁用中
                                        </strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- /.box -->
                    </div>
                </div>
                <!-- /.tab-pane -->
                <div class="tab-pane" id="tab_2">
                    <!-- /.box-header -->
                    <div class="box-body">
                        <ul class="todo-list ui-sortable">
                            <li
                                v-for="(item, index) in serverLog"
                                :key="index"
                                style="width: 100%;"
                            >
                                <p>
                                    {{ item[0] }}
                                    <span
                                        style="margin-top: 10px;"
                                        class="pull-right label label-danger"
                                    >
                                        <i class="fa fa-clock-o"></i>
                                        {{ item[1] }}
                                    </span>
                                </p>
                            </li>
                        </ul>
                    </div>
                    <!-- /.box-body -->
                </div>
                <!-- /.tab-pane -->
                <div class="tab-pane" id="tab_3">
                    <socket-io></socket-io>
                </div>
                <div class="tab-pane" id="tab_4">
                    <div class="box-body table-responsive no-padding">
                        <table class="table table-hover text-center">
                            <tbody>
                                <tr>
                                    <!-- <th>任务ID</th> -->
                                    <th>任务名字</th>
                                    <th>开始时间</th>
                                    <th>结束时间</th>
                                    <th>收获</th>
                                    <th>耗时</th>
                                    <th>状态</th>
                                </tr>
                                <tr v-for="(item, index) in celeryTasks" :key="index">
                                    <!-- <td>{{ item.task_id }}</td> -->
                                    <td>{{ item.task_name }}</td>
                                    <td>{{ item.start_time }}</td>
                                    <td>
                                        <span v-if="item.task_status!=1">{{ item.end_time }}</span>
                                    </td>
                                    <td
                                        class="text-success"
                                        v-if="item.task_status!=1 && item.harvest > 0"
                                    >
                                        <strong>
                                            <i class="fa fa-check-circle-o text-success"></i>
                                            {{ item.harvest }}
                                        </strong>
                                    </td>
                                    <td
                                        class="text-danger"
                                        v-if="item.task_status!=1 && item.harvest < 0"
                                    >
                                        <strong>
                                            <i class="fa fa-check-circle-o text-danger"></i>
                                            {{ item.harvest * -1 }}
                                        </strong>
                                    </td>
                                    <td v-if="item.task_status==1"></td>
                                    <td>
                                        <span v-if="item.task_status!=1">{{ item.times }}</span>
                                    </td>
                                    <td>
                                        <span
                                            v-if="item.task_status==0"
                                            class="label label-success"
                                        >Finished</span>
                                        <span
                                            v-if="item.task_status==1"
                                            class="label label-warning"
                                        >Running</span>
                                        <span
                                            v-if="item.task_status==-1"
                                            class="label label-danger"
                                        >Failed</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- /.box -->
                    </div>
                </div>
                <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
        </div>
        <!-- nav-tabs-custom -->

        <warn-tip v-model="showWarnMask" :para="warnInfo"></warn-tip>
    </div>
</template>

<script>
import WarningTip from "./FormComponents/WarningTip";
import SocketIo from "./Common/SocketIo";
import Countdown from "./Common/Countdown";
import Calendar from "../components/Common/Calendar";
export default {
    data() {
        return {
            loginLogs: [],
            celeryTasks: [],
            spiderCountdown: [],
            checkCountdown: [],
            showWarnMask: false,
            disDate: false,
            curdate: "",
            warnInfo: {},
            serverLog: "",
            showCalendarModal: false,
            server_error_count: null,
            server_error_info: null,
            server_error_time: null,
            spider_status: null,
            spider_countdown: null,
            spider_task_active: null,
            spider_harvest: null,
            check_status: null,
            check_countdown: null,
            check_task_active: null,
            check_harvest: null
        };
    },
    mounted() {
        var date = new Date();
        this.curdate = date.toLocaleDateString();
        this.getLogDashboard();
        this.getLoginLog(this.curdate);
    },
    components: {
        "warn-tip": WarningTip,
        "socket-io": SocketIo,
        countdown: Countdown,
        Calendar
    },
    methods: {
        getLogDashboard() {
            this.$http.get("api/log.log_dashboard").then(
                res => {
                    if (res.body.status) {
                        this.dashboard = res.body;
                        this.server_error_count = res.body.server.error_count;
                        this.server_error_info = res.body.server.error_info[0];
                        this.server_error_time = res.body.server.error_info[1];
                        this.spider_status = res.body.spider.status;
                        this.spider_task_active = res.body.spider.task_active;
                        this.spider_harvest = res.body.spider.harvest;
                        this.check_status = res.body.check.status;
                        this.check_task_active = res.body.check.task_active;
                        this.check_harvest = res.body.check.harvest * -1;
                        this.spiderCountdown = res.body.spider.countdown;
                        this.checkCountdown = res.body.check.countdown;
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
        getServerLog() {
            this.$http.get("api/log.server_log").then(
                res => {
                    if (res.body.status) {
                        this.serverLog = res.body.error_list;
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
        getCeleryTask(dt) {
            this.disDate = true;
            this.$http.post("api/log.celery_task/", { filter_date: dt }).then(
                res => {
                    if (res.body.status) {
                        this.celeryTasks = res.body.task_list;
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
        getLoginLog(dt) {
            this.disDate = true;
            this.$http.post("api/log.login_log/", { filter_date: dt }).then(
                res => {
                    if (res.body.status) {
                        this.loginLogs = res.body.login_info;
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
        showCalendar() {
            this.showCalendarModal = !this.showCalendarModal;
        },
        choseDay(dt) {
            this.curdate = dt;
            this.showCalendar();
            this.getLoginLog(dt);
            this.getCeleryTask(dt);
        },
        changeMonth(dt) {},
        warning() {
            this.showWarnMask = true;
            this.warnInfo["title"] = "没有权限";
            this.warnInfo["info"] =
                "Sorry, you are not authorized to read the system log information.";
        }
    }
};
</script>

<style>
</style>
