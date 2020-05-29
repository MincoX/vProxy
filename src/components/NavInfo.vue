<template>
    <div>
        <div class="row">
            <div class="col-lg-3 col-xs-6">
                <!-- small box -->
                <div class="small-box bg-green">
                    <div class="inner">
                        <h3>爬取程序</h3>
                        <strong style="border: 1px solid #00A65A">
                            <countdown
                                class="pull-left countdown"
                                :fhours="spiderCountdown[0]"
                                :fminutes="spiderCountdown[1]"
                                :fseconds="spiderCountdown[2]"
                            ></countdown>
                        </strong>
                        <p>&nbsp;</p>
                    </div>
                    <div class="icon">
                        <i class="fa fa-hourglass-2"></i>
                    </div>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-xs-6">
                <!-- small box -->
                <div class="small-box bg-aqua">
                    <div class="inner">
                        <h3>&nbsp;{{ storeInfo['active_count'] }}</h3>
                        <p>活跃量</p>
                    </div>
                    <div class="icon">
                        <i class="fa fa-certificate"></i>
                    </div>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-xs-6">
                <!-- small box -->
                <div class="small-box bg-yellow">
                    <div class="inner">
                        <h3>&nbsp;{{ storeInfo['total_count'] }}</h3>
                        <p>库存量</p>
                    </div>
                    <div class="icon">
                        <i class="fa fa-bank"></i>
                    </div>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-xs-6">
                <!-- small box -->
                <div class="small-box bg-red">
                    <div class="inner">
                        <h3>检测程序</h3>
                        <strong style="border: 1px solid #DD4B39">
                            <countdown
                                class="pull-left"
                                :fhours="checkCountdown[0]"
                                :fminutes="checkCountdown[1]"
                                :fseconds="checkCountdown[2]"
                            ></countdown>
                        </strong>
                        <p>&nbsp;</p>
                    </div>
                    <div class="icon">
                        <i class="fa fa-plus-circle"></i>
                    </div>
                </div>
            </div>
            <!-- ./col -->
        </div>
    </div>
</template>

<script>
import Countdown from "./Common/Countdown";
export default {
    data() {
        return {
            storeInfo: {},
            spiderCountdown: "",
            checkCountdown: ""
        };
    },
    created() {
        this.getStoreInfo();
    },
    components: {
        countdown: Countdown
    },
    methods: {
        getStoreInfo() {
            this.$http.get("api/dashboard.store_info").then(
                res => {
                    if (res.body.status) {
                        this.storeInfo = res.body.store_info;
                        this.spiderCountdown = res.body.spider_countdown;
                        this.checkCountdown = res.body.check_countdown;
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
        }
    }
};
</script>

<style>
</style>

