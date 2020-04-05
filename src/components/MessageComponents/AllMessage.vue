<template>
    <!-- /.box-header -->
    <div class="box-body">
        <div class="col-md-12">
            <!-- Box Comment -->
            <div class="box box-widget">
                <div class="box-header with-border">
                    <div class="user-block">
                        <div class="row">
                            <div class="col-md-2">
                                <img
                                    v-if="adminHeader"
                                    class="img-circle"
                                    :src="adminHeader?adminHeader:'static/img/user2-160x160.jpg'"
                                    alt="User Image"
                                />
                                <span class="username">
                                    <a href="#">{{ adminName }}</a>
                                </span>
                                <span class="description">{{ announcemnet.create_time }}</span>
                            </div>
                            <div
                                class="col-md-8 text-center"
                                v-if="announcemnet.title"
                            >{{ sliceContent(delHtmlTag(announcemnet.title)) }}</div>
                        </div>
                    </div>

                    <!-- /.box-tools -->
                </div>
                <!-- /.box-header -->
                <div class="box-body" style="display: block;">
                    <p
                        v-if="announcemnet.content"
                    >公告信息：{{ sliceContent(delHtmlTag(announcemnet.content)) }}</p>

                    <!-- <button type="button" class="btn btn-default btn-xs">
                        <i class="fa fa-share"></i> 已读
                    </button>
                    <button type="button" class="btn btn-default btn-xs">
                        <i class="fa fa-thumbs-o-up"></i> 赞
                    </button>

                    <span class="pull-right text-muted">处理时间 | 管理员已处理</span>-->
                </div>

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
                            <p class="pull-right">发布人：{{ item.username }}</p>
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
                                >当前第 {{ curPage + 1 }} 页，共 {{ pageNum }}页</a>
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
            announcemnet: {},
            adminName: "",
            adminHeader: null,
            allMessageList: [],
            maxContentLimit: 50,

            everyPageDatas: [],
            curPageDatas: [],
            pageNum: 1,
            pageSize: 5,
            curPage: 0
        };
    },
    created() {
        this.getAnnouncement();
        this.getAllMessage();
    },
    methods: {
        delHtmlTag(str) {
            return str.replace(/<[^>]+>/g, "");
        },
        sliceContent(content) {
            return content.length > this.maxContentLimit
                ? content.slice(0, this.maxContentLimit) + "... ..."
                : content;
        },
        getAnnouncement() {
            this.$http.get("message.announcement_message").then(
                res => {
                    if (res.body.status) {
                        this.announcemnet = res.body.message;
                        this.adminName = res.body.username;
                        this.adminHeader = res.body.header;
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
        getAllMessage() {
            this.$http.get("message.all_message").then(
                res => {
                    if (res.body.status) {
                        this.allMessageList = res.body.all_message_list;
                    }
                    this.pageNum =
                        Math.ceil(this.allMessageList.length / this.pageSize) ||
                        1;
                    for (let i = 0; i < this.pageNum; i++) {
                        this.everyPageDatas[i] = this.allMessageList.slice(
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
