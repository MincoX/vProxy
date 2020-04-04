<template>
    <div class="dialog" v-show="showMask">
        <div class="dialog-container box box-warning">
            <div class="box-header with-border">
                <h3 class="box-title">{{ title }}</h3>
            </div>

            <div class="box-body form-group">
                <div class="form-group" v-html="content"></div>
            </div>
            <div class="box-footer pull-right">
                <button class="btn btn-success" @click="submitBtn">提交</button>
            </div>

            <div class="close-btn" @click="closeMask">
                <i class="fa fa-close"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        // v-model 中的 showMask 数据
        value: {},
        content: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        }
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
            this.$emit("cancel");
            this.closeMask();
        },
        resetBtn() {
            this.$emit("danger");
        },
        submitBtn() {
            this.$emit("addPerm");
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
.dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    .dialog-container {
        width: 500px;
        background: #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 8px;
        position: relative;
        .dialog-title {
            width: 100%;
            height: 60px;
            font-size: 18px;
            color: #696969;
            font-weight: 600;
            padding: 16px 50px 0 20px;
            box-sizing: border-box;
        }
        .content {
            color: #797979;
            line-height: 26px;
            padding: 0 20px;
            box-sizing: border-box;
        }
        .inp {
            margin: 10px 0 0 20px;
            width: 200px;
            height: 40px;
            padding-left: 4px;
            border-radius: 4px;
            border: none;
            background: #efefef;
            outline: none;
            &:focus {
                border: 1px solid #509ee3;
            }
        }
        .btns {
            width: 100%;
            height: 60px;
            // line-height: 60px;
            // position: absolute;
            bottom: 0;
            left: 0;
            text-align: right;
            padding: 0 16px;
            box-sizing: border-box;
            & > div {
                display: inline-block;
                height: 40px;
                line-height: 40px;
                padding: 0 14px;
                color: #ffffff;
                background: #f1f1f1;
                border-radius: 8px;
                margin-right: 12px;
                cursor: pointer;
            }
            .default-btn {
                color: #787878;
                &:hover {
                    color: #509ee3;
                }
            }
            .danger-btn {
                background: #ef8c8c;
                &:hover {
                    background: rgb(224, 135, 135);
                }
                &:active {
                    background: #ef8c8c;
                }
            }
            .confirm-btn {
                color: #ffffff;
                background: #509ee3;
                &:hover {
                    background: #6fb0eb;
                }
            }
        }
        .close-btn {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 18px;
            cursor: pointer;
            &:hover {
                font-weight: 600;
            }
        }
    }
}
</style>



