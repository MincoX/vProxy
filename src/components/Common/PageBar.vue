<template>
    <div class="row">
        <div class="col-sm-12">
            <table
                id="example2"
                class="table table-bordered table-hover dataTable text-center"
                role="grid"
                aria-describedby="example2_info"
            >
                <thead>
                    <tr role="row">
                        <th
                            class="sorting_asc"
                            tabindex="0"
                            aria-controls="example2"
                            rowspan="1"
                            colspan="1"
                            aria-sort="ascending"
                            aria-label="Rendering engine: activate to sort column descending"
                        >Ip</th>
                        <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="example2"
                            rowspan="1"
                            colspan="1"
                            aria-label="Browser: activate to sort column ascending"
                        >Port</th>
                        <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="example2"
                            rowspan="1"
                            colspan="1"
                            aria-label="Platform(s): activate to sort column ascending"
                        >速度</th>
                        <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="example2"
                            rowspan="1"
                            colspan="1"
                            aria-label="Engine version: activate to sort column ascending"
                        >地区</th>
                        <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="example2"
                            rowspan="1"
                            colspan="1"
                            aria-label="CSS grade: activate to sort column ascending"
                        >来源</th>
                        <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="example2"
                            rowspan="1"
                            colspan="1"
                            aria-label="CSS grade: activate to sort column ascending"
                        >协议类型</th>
                        <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="example2"
                            rowspan="1"
                            colspan="1"
                            aria-label="CSS grade: activate to sort column ascending"
                        >匿名程度</th>
                        <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="example2"
                            rowspan="1"
                            colspan="1"
                            aria-label="CSS grade: activate to sort column ascending"
                        >操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr role="row" class="odd" v-for="(item, index) in curData" :key="index">
                        <td class="sorting_1">{{ item.ip }}</td>
                        <td>{{ item.port }}</td>
                        <td>{{ item.speed }}</td>
                        <td>{{ item.area }}</td>
                        <td>{{ item.origin }}</td>
                        <td>{{ item.protocol }}</td>
                        <td>{{ item.nick_type }}</td>
                        <td>
                            <a href @click.prevent="proxyCheck(item.id)">
                                <button class="btn btn-warning">测试</button>
                            </a>
                            <!-- :disabled="send_check?'':'fal'"> -->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pull-right">
            <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                <ul class="pagination">
                    <li class="paginate_button previous disabled" id="example2_previous">
                        <a
                            href="#"
                            aria-controls="example2"
                            data-dt-idx="0"
                            tabindex="0"
                            @click.prevent="prePage"
                        >Previous</a>
                    </li>
                    <li class="paginate_button active">
                        <a href="#" aria-controls="example2" data-dt-idx="1" tabindex="0">1</a>
                    </li>
                    <li class="paginate_button">
                        <a href="#" aria-controls="example2" data-dt-idx="2" tabindex="0">2</a>
                    </li>
                    <li class="paginate_button next" id="example2_next">
                        <a
                            href="#"
                            aria-controls="example2"
                            data-dt-idx="7"
                            tabindex="0"
                            @click.prevent="nextPage"
                        >Next</a>
                    </li>
                </ul>
            </div>
            <el-button plain @click="open">可自动关闭</el-button>
            <el-button plain @click="open2">不会自动关闭</el-button>

            
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            proxies: [],
            totalPage: [],
            pageSize: 2,
            pageNum: 1,
            curData: [],
            curPage: 0,
            imgUrl: ""
        };
    },
    watch: {
        proxies: function() {
            this.pageNum = Math.ceil(this.proxies.length / this.pageSize) || 1;
            console.info(this.pageNum);
            for (let i = 0; i < this.pageNum; i++) {
                this.totalPage[i] = this.proxies.slice(
                    this.pageSize * i,
                    this.pageSize * (i + 1)
                );
            }
            this.curData = this.totalPage[this.curPage];
        }
    },
    created() {},
    methods: {
        nextPage() {
            if (this.curPage == this.pageNum - 1) return;
            this.curData = this.totalPage[++this.curPage];
        },
        prePage() {
            if (this.curPage == 0) return;
            this.curData = this.totalPage[--this.curPage];
        },
        // uploadHeader() {
        //     var files = this.$refs.avatarInput.files;
        //     console.info(files)
        // },
        // uploadHeader: function(e) {
        //     var file = e.target.files[0];
        //     // if(!/image/\w+/.test(file.type)) {
        //     //     alert("请确保文件为图像类型");
        //     //     return false;
        //     // }
        //     var reader = new FileReader();
        //     reader.readAsDataURL(file);
        //     var that = this;
        //     reader.onload = function(e) {
        //         that.imgUrl = e.target.result;
        //     };
        // },
        open() {
            const h = this.$createElement;
            this.$notify({
                title: "标题名称",
                message: h(
                    "i",
                    { style: "color: teal" },
                    "这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案"
                ),
                duration: 3000
            });
        },

        open2() {
            this.$notify({
                title: "提示",
                message: "这是一条不会自动关闭的消息",
                duration: 0
            });
        }
    }
};
</script>

<style>
</style>

