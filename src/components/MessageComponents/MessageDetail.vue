<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="turnMessage">&nbsp;</span>
            </button>
            <div class="row">
                <div class="col-md-2">
                    <img
                        style="height: 30px; width: 30px; border-radius: 50%;"
                        :src="userInfo['header']?userInfo['header']:'static/img/user2-160x160.jpg'"
                    />
                    {{ userInfo.username }}
                </div>
                <p class="pull-right">发布于：{{ message.create_time }}</p>
                <div class="col-md-8" v-if="message.title">
                    <h4 class="modal-title text-center">{{ delHtmlTag(message.title) }}</h4>
                </div>
            </div>
        </div>
        <div class="modal-body" v-if="message.content">
            <p>{{ delHtmlTag(message.content) }}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="turnMessage">确定</button>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            messageId: this.$route.params.id,
            message: {},
            userInfo: {},
            maxContentLimit: 1
        };
    },
    created() {
        this.messageId = this.$route.query.messageId;
        this.getMessageDetail();
    },
    methods: {
        delHtmlTag(str) {
            return str.replace(/<[^>]+>/g, "");
        },
        getMessageDetail() {
            this.$http
                .post("api/message.message_detail/", { message_id: this.messageId })
                .then(
                    res => {
                        if (res.body.status) {
                            this.message = res.body.message;
                            this.userInfo = res.body.user_info;
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
        turnMessage() {
            this.$router.push({
                //核心语句
                path: "/message" //跳转的路径
            });
        }
    }
};
</script>

<style>
</style>


