<template>
    <div class="mask" v-show="showMask">
        <div class="mask-container box box-primary">
            <div class="box-header with-border text-center">
                <h3 class="box-title">配置角色 -- {{ para.name }}</h3>
            </div>

            <div class="box-body">
                <!-- Widget: user widget style 1 -->
                <div class="box-footer no-padding">
                    <ul class="nav nav-stacked">
                        <li v-for="(item, index) in para.roles" :key="index">
                            <a href @click.prevent="item.selected = !item.selected">
                                <i class="fa fa-lock text-red" v-show="item.selected!=true"></i>
                                <i
                                    class="fa fa-check-square text-green"
                                    v-show="item.selected==true"
                                ></i>
                                {{ item.name }}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="pull-right">
                    <button class="btn btn-warning" @click="cancelBtn">取消</button>
                    <button
                        class="btn btn-danger"
                        @click="submitBtn({'userId': para.userId, 'newRoles': para.roles })"
                    >确认</button>
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
        value: {},
        para: {}
    },
    data() {
        return {
            showMask: false
        };
    },
    methods: {
        closeMask() {
            this.showMask = false;
        },
        closeBtn() {
            this.closeMask();
        },
        cancelBtn() {
            this.closeMask();
        },
        submitBtn(para) {
            this.$http
                .post("permission.set_role/", {
                    user_id: para.userId,
                    new_roles: JSON.stringify(para.newRoles)
                })
                .then(res => {
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
                    this.$emit("getAdmins");
                });
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
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 8px;
        position: relative;
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

