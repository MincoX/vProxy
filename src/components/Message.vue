<template>
    <div class="message">
        <div class="box box-primary">
            <div class="box-header">
                <ul class="nav nav-tabs">
                    <li class="active">
                        <a
                            href="#tab_1"
                            data-toggle="tab"
                            aria-expanded="false"
                            @click="componentName='all-message'"
                        >全部留言</a>
                    </li>
                    <li class>
                        <a
                            href="#tab_2"
                            data-toggle="tab"
                            aria-expanded="false"
                            @click="componentName='my-message'"
                        >我的留言</a>
                    </li>
                </ul>
            </div>

            <component :is="componentName"></component>
        </div>

        <hr />
        <div class="box box-default">
            <div class="box-header">
                <h3 class="box-title">
                    <img
                        style="height: 30px; width: 30px; border-radius: 50%;"
                        :src="userInfo['header']?userInfo['header']:'static/img/user2-160x160.jpg'"
                    />
                    {{ userInfo['username'] }}
                    <small>非常感谢您的反馈</small>
                </h3>
            </div>
            <div class="box-body pad">
                <wang-edit :isClear="isClear" @publishMessage="publishMessage"></wang-edit>
            </div>
        </div>
    </div>
</template>

<script>
import AllMessage from "./MessageComponents/AllMessage";
import MyMessage from "./MessageComponents/MyMessage";
import WangEdit from "./MessageComponents/WangEdit";

export default {
    data() {
        return {
            userInfo: {},
            isClear: false,
            componentName: "all-message"
        };
    },
    created() {
        this.getUserInfo();
    },
    components: {
        "all-message": AllMessage,
        "my-message": MyMessage,
        "wang-edit": WangEdit
    },
    methods: {
        getContent(content) {
            return content;
        },
        getUserInfo() {
            this.$http.get("userinfo.user_info").then(res => {
                this.userInfo = res.body.user_info[0];
            });
        },
        publishMessage(data) {
            if (data.messageContent == "" || data.messageTitle == "") {
                this.$notify({
                    title: "留言不能空哦",
                    type: "warning"
                });
                return;
            }
            this.$http
                .post("message.publish/", {
                    title: data.messageTitle,
                    content: data.messageContent
                })
                .then(res => {
                    if (res.body.status) {
                        this.$notify({
                            title: res.body.message,
                            type: "success"
                        });
                        this.$router.push({
                            //核心语句
                            path: "/messagedetail", //跳转的路径
                            query: {
                                messageId: res.body.message_id
                            }
                        });
                    } else {
                        this.$notify({
                            title: res.body.message,
                            type: "warning"
                        });
                    }
                });
        }
    }
};
</script>

<style>
.message {
    z-index: 0;
}
</style>

