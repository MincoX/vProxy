<template>
    <div class="mask" v-show="showMask">
        <div class="mask-container box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">添加权限</h3>
            </div>

            <div class="box-body form-group">
                <label for="permSlug">权限</label>
                <input
                    type="text"
                    id="permSlug"
                    autocomplete="off"
                    class="form-control"
                    placeholder="Perm.slug"
                    v-model="permSlug"
                />

                <label for="permName">权限名字</label>
                <input
                    type="text"
                    id="permName"
                    autocomplete="off"
                    class="form-control"
                    placeholder="Perm.name"
                    v-model="permName"
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
            permName: "",
            permSlug: ""
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
            if (this.permName && this.permSlug) {
                this.$http
                    .post("api/permission.add_perm/", {
                        name: this.permName,
                        slug: this.permSlug
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
                this.$emit("getPerms");
                this.permName = "";
                this.permSlug = "";
                this.closeMask();
            } else {
                this.$notify({
                    title: "数据不能为空",
                    type: "warning"
                });
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

