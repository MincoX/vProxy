<template>
    <div class="wrapper">
        <header class="main-header">
            <a href="index2.html" class="logo" @click.prevent>
                <b>Proxy Server</b>
            </a>

            <nav class="navbar navbar-static-top" role="navigation">

                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                        <li class="dropdown messages-menu">
                            <ul class="dropdown-menu">
                                <li>
                                    <ul class="menu">
                                    </ul>
                                </li>
                                <li class="footer">
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown user user-menu">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img
                                    :src="userInfo['header']?userInfo['header']:'static/img/user2-160x160.jpg'"
                                    class="user-image"
                                    alt="User Image"
                                />
                                <span class="hidden-xs">{{ userInfo['username'] }}</span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="user-header">
                                    <img
                                        :src="userInfo['header']?userInfo['header']:'static/img/user2-160x160.jpg'"
                                        class="img-circle"
                                        alt="User Image"
                                    />
                                    <p>
                                        <strong>{{ userInfo['username'] }}</strong>
                                        <small>{{ userInfo['identity'] }}</small>
                                        <small>账户创建于： {{ userInfo['create_time'] }}</small>
                                    </p>
                                </li>
                                <li class="user-footer">
                                    <div class="pull-left">
                                        <router-link to="userinfo">
                                            <a href="#" class="btn btn-default btn-flat">个人中心</a>
                                        </router-link>
                                    </div>
                                    <div class="pull-right">
                                        <a
                                            href="#"
                                            class="btn btn-default btn-flat"
                                            @click.prevent="loginOut"
                                        >退出登录</a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

        <aside class="main-sidebar">
            <section class="sidebar">
                <div class="user-panel">
                    <div class="pull-left image">
                        <router-link to="userinfo">
                            <img
                                :src="userInfo['header']?userInfo['header']:'static/img/user2-160x160.jpg'"
                                class="img-circle"
                                alt="User Image"
                                style="width: 30%;"
                            />
                        </router-link>
                    </div>

                    <div class="pull-left info" style="margin-left: 15px; margin-top: 2px;">
                        <router-link to="userinfo">
                            <strong style="font-size: 18px;">{{ userInfo['username'] }}</strong>
                        </router-link>
                        <div style="margin-top: 10px;">
                            <a href="#">
                                <i class="fa fa-circle text-success" @click.prevent></i> Online
                            </a>
                        </div>
                    </div>
                </div>

                <form method="get" class="sidebar-form" @click.prevent>
                    <div class="input-group">
                        <input type="text" name="q" class="form-control" placeholder="Search..." />
                        <span class="input-group-btn">
                            <button
                                type="submit"
                                name="search"
                                id="search-btn"
                                class="btn btn-flat"
                            >
                                <i class="fa fa-search"></i>
                            </button>
                        </span>
                    </div>
                </form>

                <ul class="sidebar-menu" data-widget="tree">
                    <li class="header">导航</li>

                    <li class v-for="(item, index) in navigates" :key="index">
                        <router-link :to="item.href">
                            <i class="fa fa-circle-thin"></i>
                            <span>{{ item.nav }}</span>
                        </router-link>
                    </li>
                </ul>
            </section>
        </aside>

        <div class="content-wrapper">
            <section class="content container-fluid">
                <router-view></router-view>
            </section>
        </div>
        <aside class="control-sidebar control-sidebar-dark">
            <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
                <li class="active">
                    <a href="#control-sidebar-home-tab" data-toggle="tab">
                        <i class="fa fa-home"></i>
                    </a>
                </li>
                <li>
                    <a href="#control-sidebar-settings-tab" data-toggle="tab">
                        <i class="fa fa-gears"></i>
                    </a>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="control-sidebar-home-tab">
                    <h3 class="control-sidebar-heading">Recent Activity</h3>
                    <ul class="control-sidebar-menu">
                        <li>
                            <a href="javascript:;">
                                <i class="menu-icon fa fa-birthday-cake bg-red"></i>

                                <div class="menu-info">
                                    <h4 class="control-sidebar-subheading">Langdon's Birthday</h4>

                                    <p>Will be 23 on April 24th</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <h3 class="control-sidebar-heading">Tasks Progress</h3>
                    <ul class="control-sidebar-menu">
                        <li>
                            <a href="javascript:;">
                                <h4 class="control-sidebar-subheading">
                                    Custom Template Design
                                    <span class="pull-right-container">
                                        <span class="label label-danger pull-right">70%</span>
                                    </span>
                                </h4>

                                <div class="progress progress-xxs">
                                    <div
                                        class="progress-bar progress-bar-danger"
                                        style="width: 70%"
                                    ></div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
                <div class="tab-pane" id="control-sidebar-settings-tab">
                    <form method="post">
                        <h3 class="control-sidebar-heading">General Settings</h3>

                        <div class="form-group">
                            <label class="control-sidebar-subheading">
                                Report panel usage
                                <input type="checkbox" class="pull-right" checked />
                            </label>
                            <p>Some information about this general settings option</p>
                        </div>
                    </form>
                </div>
            </div>
        </aside>
        <tip-form v-model="showLoginoutMask" :para="loginoutPara" @loginOut="loginOut"></tip-form>
    </div>
</template>

<script>
import TipConfirm from "./components/FormComponents/TipConfirm";
export default {
    name: "App",
    data() {
        return {
            navigates: [],
            userInfo: [],
            showLoginoutMask: false,
            loginoutPara: {}
            // identity: ""
        };
    },
    created() {
        this.getNavigate();
        this.getUserInfo();
    },
    components: {
        "tip-form": TipConfirm
    },
    methods: {
        openLoginoutMask(para) {
            this.showLoginoutMask = true;
            this.loginoutPara = para;
        },
        loginOut() {
            this.$http.get("login_out").then(res => {
                if (res.body.status) {
                    this.$notify({
                        title: "退出登录！",
                        type: "success"
                    });
                    location.href = "http://proxy.minco.club/login";
                }
            });
        },
        getNavigate() {
            this.$http.get("api/dashboard.navigate").then(res => {
                this.navigates = res.body;
            });
        },
        getUserInfo() {
            this.$http.get("api/userinfo.user_info").then(res => {
                this.userInfo = res.body.user_info[0];
                this.userInfo['identity'] = res.body.identity
                // this.identity = res.body.identity;
            });
        }
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
#calendar {
    z-index: 999;
}
</style>
