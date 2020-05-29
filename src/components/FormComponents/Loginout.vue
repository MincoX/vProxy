<template>
    <div class="mask" v-show="showMask">
        <div class="mask-container box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">退出登录</h3>
            </div>

            <div class="box-body form-group">
                <label for="username">用户名</label>
                <input
                    type="text"
                    id="username"
                    autocomplete="off"
                    class="form-control"
                    placeholder="Admin.username"
                    v-model="username"
                />

                <label for="password">密码</label>
                <input
                    type="password"
                    id="password"
                    autocomplete="off"
                    class="form-control"
                    placeholder="Admin.password"
                    v-model="password"
                />

                <div class="box-footer pull-right">
                    <button class="btn btn-success" @click="submitBtn">提交</button>
                </div>
            </div>

            <div class="close-btn" @click="closeMask">
                <i class="fa fa-close text-primary"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        // v-model 的 showAddPermMask
        value: {}
    },
    data() {
        return {
            showMask: false,
            username: "",
            password: ""
        };
    },
    methods: {
        closeMask() {
            this.showMask = false;
        },
        closeBtn() {
            this.closeMask();
        },
        submitBtn() {
            if (this.username && this.password) {
                this.$http
                    .post("api/permission.add_admin/", {
                        username: this.username,
                        password: this.password
                    })
                    .then(
                        res => {
                            if (res.body.status) {
                                this.$notify({
                                    title: res.body.message,
                                    type: "success"
                                });
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
                this.$emit("getAdmins");
                this.username = "";
                this.password = "";
                this.closeMask();
            } else {
                if (res.body.status) {
                    this.$notify({
                        title: "数据不能为空",
                        type: "warning"
                    });
                }
            }
            this.closeMask();
        }
    },
    mounted() {
        this.showMask = this.value;
    },
    watch: {
        value(newVal, oldVal) {
            this.showMask = newVal;
        },
        showMask(val) {
            this.$emit("input", val);
        }
    }
};
</script>
<style lang="less" scoped>
.mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    .mask-container {
        width: 500px;
        background: #ffffff;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 8px;
        position: relative;
        .box-body input {
            border-radius: 5px;
            margin-bottom: 10px;
        }
        .close-btn {
            position: absolute;
            top: 6px;
            right: 20px;
            width: 30px;
            height: 30px;
            color: orange;
            text-align: right;
            font-size: 20px;
            opacity: 0.5;
            cursor: pointer;
            &:hover {
                opacity: 1;
            }
        }
        .box-body {
            padding-top: 0px;
        }
    }
}
</style>

