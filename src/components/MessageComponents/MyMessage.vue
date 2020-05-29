<template>
    <!-- /.box-header -->
    <div class="box-body">
        <div class="col-md-12">
            <!-- Box Comment -->
            <div class="box box-widget">
                <!-- /.box-body -->
                <div class="box-footer box-comments" style="display: block;">
                    <div class="box-comment" v-for="(item, index) in curPageDatas" :key="index">
                        <!-- User image -->
                        <img
                            class="img-circle img-sm"
                            :src="item['header']?item['header']:'static/img/user2-160x160.jpg'"
                            alt="User Image"
                        />
                        <div class="comment-text" v-if="item.content">
                            <span class="username">
                                标题：
                                <span class="text-muted pull-right">{{ item.pub_time }}</span>
                                <span class="text-center">
                                    <router-link
                                        v-if="item.title"
                                        :to="'/messagedetail?messageId=' + item.message_id"
                                    >{{ sliceContent(delHtmlTag(item.title)) }}</router-link>
                                </span>
                            </span>
                            <strong>正文：</strong>
                            {{ sliceContent(delHtmlTag(item.content)) }}
                        </div>
                    </div>
                </div>
                <!-- /.box-footer -->
                <div class="pull-right">
                    <div class="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                        <ul class="pagination">
                            <li class="paginate_button previous" id="example1_previous">
                                <a
                                    href="#"
                                    aria-controls="example1"
                                    data-dt-idx="0"
                                    tabindex="0"
                                    @click.prevent="prePage"
                                >上一页</a>
                            </li>
                            <li class="paginate_button">
                                <a
                                    href="#"
                                    aria-controls="example1"
                                    data-dt-idx="1"
                                    tabindex="0"
                                    @click.prevent
                                >当前第 {{ curPage + 1 }} 页, 共 {{ pageNum }}页</a>
                            </li>
                            <li class="paginate_button next" id="example1_next">
                                <a
                                    href="#"
                                    aria-controls="example1"
                                    data-dt-idx="7"
                                    tabindex="0"
                                    @click.prevent="nextPage"
                                >下一页</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- /.box-footer -->
            </div>
            <!-- /.box -->
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            myMessageList: [],

            maxContentLimit: 50,

            everyPageDatas: [],
            curPageDatas: [],
            pageNum: 1,
            pageSize: 5,
            curPage: 0
        };
    },
    created() {
        this.getMyMessage();
    },
    methods: {
        delHtmlTag(str) {
            return str.replace(/<[^>]+>/g, "");
        },
        sliceContent(content) {
            return content.length > this.maxContentLimit
                ? content.slice(0, this.maxContentLimit) + "..."
                : content;
        },
        getMyMessage() {
            this.$http.get("api/message.my_message").then(
                res => {
                    if (res.body.status) {
                        this.myMessageList = res.body.message_list;
                    }
                    this.pageNum =
                        Math.ceil(this.myMessageList.length / this.pageSize) ||
                        1;
                    for (let i = 0; i < this.pageNum; i++) {
                        this.everyPageDatas[i] = this.myMessageList.slice(
                            this.pageSize * i,
                            this.pageSize * (i + 1)
                        );
                    }
                    this.curPageDatas = this.everyPageDatas[this.curPage];
                    if (this.pageNum > 1) {
                        this.nextPageDisable = false;
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
        nextPage() {
            if (this.curPage == this.pageNum - 1) {
                this.nextPageDisable = true;
                return;
            }
            this.curPageDatas = this.everyPageDatas[++this.curPage];
            this.prePageDisable = false;
            if (this.curPage == this.pageNum - 1) {
                this.nextPageDisable = true;
            }
        },
        prePage() {
            if (this.curPage <= 0) {
                this.prePageDisable = true;
                return;
            }
            this.curPageDatas = this.everyPageDatas[--this.curPage];
            if (this.curPage <= 0) {
                this.prePageDisable = true;
            }
        }
    }
};
</script>

<style scoped>
.box,
.box-widget > .box-header,
.box-footer,
.box-body {
    margin: 0px;
    padding: 0px;
    border: 0px;
}
</style>
