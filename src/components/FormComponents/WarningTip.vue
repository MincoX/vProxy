<template>
    <div class="mask" v-show="showMask">
        <div class="mask-container box box-primary">
            <div class="box-header with-border text-center">
                <h3 class="box-title">{{ para.title }}</h3>
            </div>

            <div class="box-body">
                <div class="box-footer">
                    {{ para.info }}
                    <div>
                        <p></p>
                    </div>
                    <div class="pull-right">
                        <button class="btn btn-warning" @click="cancelBtn">取消</button>
                        <button class="btn btn-danger" @click="submitBtn">确认</button>
                    </div>
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
        submitBtn() {
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

