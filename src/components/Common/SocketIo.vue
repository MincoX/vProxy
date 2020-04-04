<template>
    <div>
        <button class="btn btn-danger" @click="send">心跳检测</button>
        <ul class="todo-list ui-sortable" id="polling_logger"></ul>
    </div>
</template>
<script>
import $ from "jquery";
export default {
    name: "Index",
    data() {
        return {};
    },

    methods: {
        send() {
            this.$socket.emit(
                "recv",
                "！！！！！！！！！！！！客户端发送信息！！！！！！！！！！"
            );
        }
    },
    sockets: {
        connect: function() {
            this.$socket.emit(
                "recv",
                "！！！！！！！！！！！！客户端已成功连接！！！！！！！！！！"
            );
        },
        message: function(res) {
            let log = res.data.split("<<<");
            if (log[1] == undefined) {
                log[1] = "";
            }
            $("#polling_logger").prepend(
                "<li style='width: 100%;'><p>" +
                    log[0] +
                    "<span style='margin-top: 10px;' class='pull-right label label-danger'><i class='fa fa-clock-o'></i>" +
                    log[1].split(",")[0] +
                    "</span></p></li>"
            );
        }
    }
};
</script>

