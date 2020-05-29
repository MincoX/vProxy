<template>
    <div class="col-md-12">
        <div class="box box-widget widget-user">
            <div class="widget-user-header bg-aqua-active" style="height: 80px;">
                <h3 class="widget-user-username">{{ userInfo['username'] }}</h3>
                <h5
                    class="widget-user-desc"
                >{{ userInfo['identity'] }} &nbsp; {{ userInfo['create_time'] }}</h5>
            </div>

            <div class="widget-user-image">
                <upload-file :header="userInfo['header']" @uploadImg="getImg"></upload-file>
            </div>
            <div class="box-footer">
                <div class="row">
                    <div class="col-md-6">
                        <div class="box-body">
                            <div class="form-group">
                                <label>用户名：</label>
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                    <input
                                        type="text"
                                        class="form-control"
                                        data-mask
                                        :placeholder="userInfo['username']"
                                        v-model="username"
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label>密码：</label>
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                    <input
                                        type="password"
                                        class="form-control"
                                        placeholder="******"
                                        v-model="password"
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label>联系方式：</label>

                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-phone"></i>
                                    </div>
                                    <input
                                        type="text"
                                        class="form-control"
                                        data-inputmask="&quot;mask&quot;: &quot;(999) 999-9999&quot;"
                                        data-mask
                                        v-model="phone"
                                    />
                                </div>
                            </div>

                            <div class="form-group" v-if="userInfo['auth_key'] != ''">
                                <label>AuthKey</label>

                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-laptop"></i>
                                    </div>
                                    <input
                                        type="text"
                                        class="form-control"
                                        data-inputmask="'alias': 'ip'"
                                        data-mask
                                        disabled
                                        :placeholder="userInfo['auth_key']"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="box-body">
                            <div class="form-group">
                                <label>出生日期：</label>

                                <div class="input-group date">
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                    <input
                                        type="text"
                                        class="form-control pull-right"
                                        id="datepicker"
                                        :placeholder="userInfo['birthday']"
                                        v-model="birthday"
                                    />
                                </div>
                            </div>

                            <div class="form-group">
                                <label>居住地：</label>

                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-edit"></i>
                                    </div>
                                    <input
                                        type="text"
                                        class="form-control pull-right"
                                        id="reservation"
                                        :placeholder="userInfo['address']"
                                        v-model="address"
                                    />
                                </div>
                            </div>

                            <div class="form-group">
                                <label>邮箱：</label>

                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-envelope"></i>
                                    </div>
                                    <input
                                        type="text"
                                        class="form-control"
                                        data-inputmask="'mask': ['999-999-9999 [x99999]', '+099 99 99 9999[9]-9999']"
                                        data-mask
                                        v-model="email"
                                    />
                                </div>
                            </div>

                            <div class="form-group">
                                <label>个性签名</label>

                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-thumbs-o-up"></i>
                                    </div>
                                    <input
                                        type="text"
                                        class="form-control pull-right"
                                        id="reservationtime"
                                        :placeholder="userInfo['personality']"
                                        v-model="personality"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <button
                    class="btn btn-success pull-right"
                    @click="openWarnMask({
                    'title': '不可执行',
                    'info': '测试阶段不开通修改个人信息功能'
                })"
                >确定修改</button>-->
                <button class="btn btn-success pull-right" @click="submitUpdateInfo()">确定修改</button>
            </div>
        </div>
        <warn-tip v-model="showWarnMask" :para="warnInfo"></warn-tip>
    </div>
</template>

<script>
import WarningTip from "../FormComponents/WarningTip";
import UploadFile from "../Common/UploadFile";
export default {
    data() {
        return {
            userInfo: {},
            showWarnMask: false,
            imgBase64: null,
            username: "",
            password: "",
            phone: "",
            email: "",
            birthday: "",
            address: "",
            personality: "",
            warnInfo: {}
        };
    },
    components: {
        "warn-tip": WarningTip,
        "upload-file": UploadFile
    },
    created() {},
    methods: {
        getImg(imgBase64) {
            this.imgBase64 = imgBase64;
        },
        submitUpdateInfo() {
            this.$http
                .post("api/userinfo.update_user_info/", {
                    username: this.username,
                    password: this.password,
                    phone: this.phone,
                    birthday: this.birthday,
                    address: this.address,
                    email: this.email,
                    imgBase64: this.imgBase64
                })
                .then(
                    res => {
                        if (res.body.status) {
                            this.$notify({
                                title: res.body.message,
                                type: "warning"
                            });
                            this.getUserInfo();
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
        openWarnMask(pa) {
            this.showWarnMask = true;
            this.warnInfo = pa;
        },
        getUserInfo() {
            this.$http.get("api/userinfo.user_info").then(
                res => {
                    if (res.body.status) {
                        this.userInfo = res.body.user_info[0];
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



