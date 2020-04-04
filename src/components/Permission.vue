<template>
    <div class="row">
        <div class="col-md-2">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">权限列表</h3>
                    <div class="box-tools pull-right">
                        <a href class="btn btn-xs btn-primary" @click.prevent="openAddPerm">
                            <i class="fa fa-plus-circle"></i>添加权限
                        </a>
                    </div>
                </div>

                <div class="box-footer no-padding">
                    <ul class="nav nav-pills nav-stacked">
                        <li v-for="(item, index) in perms" :key="index">
                            <a href="#">
                                <i class="fa fa-lock"></i>
                                <span class="product-title ng-binding">
                                    <strong>{{ item.name }}</strong>
                                </span>

                                <span class="pull-right text-red">
                                    <i
                                        class="fa fa-times-circle text-danger"
                                        @click.prevent="delPerm({ 'permId': item.id, 'permName': item.name })"
                                    ></i>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box box-warning">
                        <div class="box-header">
                            <h3 class="box-title">角色列表</h3>

                            <div class="box-tools pull-right">
                                <a href class="btn btn-xs btn-warning" @click.prevent="openAddRole">
                                    <i class="fa fa-plus-circle"></i>添加角色
                                </a>
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body table-responsive no-padding">
                            <table class="table table-hover text-center">
                                <tbody>
                                    <tr>
                                        <th>角色</th>
                                        <th>拥有权限</th>
                                        <th>操作</th>
                                    </tr>

                                    <tr v-for="(item, index) in roles" :key="index">
                                        <td>
                                            <a href @click.prevent>
                                                <i class="fa fa-lock"></i>
                                                <span class="ng-binding">
                                                    <strong>{{ item.name }}</strong>
                                                </span>
                                                <span class="text-red">
                                                    <i
                                                        class="fa fa-times-circle text-danger"
                                                        @click.prevent="delRole({ 'roleId': item.id, 'roleName': item.name })"
                                                    ></i>
                                                </span>
                                            </a>
                                        </td>

                                        <td>
                                            <li
                                                class="text-center"
                                                v-for="(perm, index) in item.perms"
                                                :key="index"
                                            >
                                                <i class="fa fa-check-circle-o text-success"></i>
                                                {{ perm.name }}
                                            </li>
                                        </td>

                                        <td>
                                            <span
                                                @click="openSetPerm({ name: item.name, slug: item.slug, roleId: item.id })"
                                                class="label label-warning btn btn-xs btn-default"
                                            >
                                                <i class="fa fa-plus-circle"></i>
                                                配置权限
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box box box-danger">
                        <div class="box-header">
                            <h3 class="box-title">管理员角色分配</h3>
                            <div class="box-tools pull-right">
                                <a href class="btn btn-xs btn-danger" @click.prevent="openAddAdmin">
                                    <i class="fa fa-user-plus"></i>添加管理员
                                </a>
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body table-responsive no-padding">
                            <table class="table table-hover text-center">
                                <tbody>
                                    <tr>
                                        <th>账户名</th>
                                        <th>拥有角色</th>
                                        <th>创建时间</th>
                                        <th>账户状态</th>
                                        <th>操作</th>
                                    </tr>

                                    <tr v-for="(item, index) in admins" :key="index">
                                        <td>
                                            <a href @click.prevent>
                                                <i class="fa fa-user-plus"></i>
                                                <span class="ng-binding">
                                                    <strong>{{ item.username }}</strong>
                                                </span>
                                            </a>
                                        </td>
                                        <td>
                                            <li
                                                class="text-center"
                                                v-for="(role, index) in item.roles"
                                                :key="index"
                                            >
                                                <i class="fa fa-check-circle-o text-success"></i>
                                                {{ role.name }}
                                            </li>
                                        </td>
                                        <td>{{ item.create_time }}</td>
                                        <td v-if="item.active" class="text-success">
                                            <strong>
                                                <i class="fa fa-check-circle-o text-success"></i> 已激活
                                            </strong>
                                        </td>
                                        <td v-if="item.active!=true" class="text-danger">
                                            <strong>
                                                <i class="fa fa-exclamation-circle text-danger"></i> 禁用中
                                            </strong>
                                        </td>

                                        <td>
                                            <div class="dropdown">
                                                <button
                                                    class="label label-danger btn-flat btn btn-xs"
                                                    id="dLabel"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    <i class="fa fa-gear"></i>&nbsp;操作
                                                    <span class="caret"></span>
                                                </button>
                                                <ul class="dropdown-menu" aria-labelledby="dLabel">
                                                    <li>
                                                        <a
                                                            href
                                                            @click.prevent="openSetRole({ name: item.username, roles: item.roles, userId: item.id })"
                                                        >
                                                            <i class="text-blue fa fa-user-secret"></i>&nbsp;配置角色
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href
                                                            @click.prevent="openTip({
                                                            'title': '重置密码',
                                                            'uid': item.id,
                                                            'object': item.username,
                                                            'callBack': 'resetPassword'
                                                        })"
                                                        >
                                                            <i class="text-green fa fa-edit"></i>&nbsp;重置密码
                                                        </a>
                                                    </li>
                                                    <li v-if="item.active">
                                                        <a
                                                            href
                                                            @click.prevent="openTip({ 
                                                            'title': '禁用账户',
                                                            'uid': item.id,
                                                            'active': item.active,
                                                            'object': item.username,
                                                            'callBack': 'toggleActive'
                                                            })"
                                                        >
                                                            <i
                                                                class="fa fa-times-circle text-danger"
                                                            ></i>&nbsp;禁用账户
                                                        </a>
                                                    </li>
                                                    <li v-if="item.active != true">
                                                        <a
                                                            href
                                                            @click.prevent="openTip({ 
                                                            'title': '激活账户',
                                                            'uid': item.id,
                                                            'active': item.active,
                                                            'object': item.username,
                                                            'callBack': 'toggleActive'
                                                            })"
                                                        >
                                                            <i
                                                                class="fa fa-check-circle-o text-success"
                                                            ></i>&nbsp;激活账户
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>
            </div>
        </div>

        <add-perm v-model="showAddPermMask" @getPerms="getPerms"></add-perm>
        <del-perm v-model="showDelPermMask" :para="delPermParameter" @getPerms="getPerms"></del-perm>

        <add-role v-model="showAddRoleMask" @getRoles="getRoles"></add-role>
        <del-role v-model="showDelRoleMask" :para="delRoleParameter" @getRoles="getRoles"></del-role>
        <set-perm v-model="showSetPermMask" :para="setPermParameter" @getRoles="getRoles"></set-perm>

        <add-admin v-model="showAddAdminMask" @getAdmins="getAdmins"></add-admin>
        <set-role v-model="showSetRoleMask" :para="setPermParameter" @getAdmins="getAdmins"></set-role>

        <tip-confirm
            v-model="showTipMask"
            :para="tipParameter"
            @resetPassword="resetPassword"
            @toggleActive="toggleActive"
        ></tip-confirm>
    </div>
</template>

<script>
import TipConfirm from "./formComponents/TipConfirm";
import AddPerm from "./formComponents/AddPerm";
import DelPerm from "./formComponents/DelPerm";
import SetPerm from "./formComponents/SetPerm";
import AddRole from "./formComponents/AddRole";
import DelRole from "./formComponents/DelRole";
import AddAdmin from "./formComponents/AddAdmin";
import SetRole from "./formComponents/SetRole";

export default {
    data() {
        return {
            perms: [],
            roles: [],
            admins: [],
            showTipMask: false,
            tipParameter: {},
            showAddPermMask: false,
            showDelPermMask: false,
            delPermParameter: {},
            showSetPermMask: false,
            setPermParameter: {},
            showAddRoleMask: false,
            showDelRoleMask: false,
            showSetRoleMask: false,
            setRoleParameter: {},
            delRoleParameter: {},
            showAddAdminMask: false
        };
    },
    mounted() {
        this.getPerms();
        this.getRoles();
        this.getAdmins();
    },
    components: {
        "tip-confirm": TipConfirm,
        "add-perm": AddPerm,
        "del-perm": DelPerm,
        "set-perm": SetPerm,
        "add-role": AddRole,
        "del-role": DelRole,
        "add-admin": AddAdmin,
        "set-role": SetRole
    },
    methods: {
        openTip(para) {
            this.showTipMask = true;
            this.tipParameter = para;
        },
        openAddPerm(val) {
            this.showAddPermMask = true;
        },
        delPerm(para) {
            this.showDelPermMask = true;
            this.delPermParameter = para;
        },
        openSetPerm(para) {
            this.showSetPermMask = true;
            this.$http
                .post("permission.role_perms/", { slug: para.slug })
                .then(res => {
                    if (res.body.status) {
                        let role_perms = res.body.perms;
                        this.perms.forEach(function(perm, i) {
                            role_perms.forEach(function(r_p, j) {
                                if (r_p.slug == perm.slug) {
                                    perm.selected = true;
                                }
                            });
                        });
                        this.setPermParameter = para;
                        this.setPermParameter["perms"] = this.perms;
                    } else {
                        this.$notify({
                            title: res.body.message,
                            type: "warning"
                        });
                    }
                });
        },
        openSetRole(para) {
            this.showSetRoleMask = true;
            this.$http
                .post("permission.user_roles/", { user_id: para.userId })
                .then(res => {
                    if (res.body.status) {
                        let userPoles = res.body.roles;
                        this.roles.forEach(function(role, i) {
                            userPoles.forEach(function(u_r, j) {
                                if (u_r.slug == role.slug) {
                                    role.selected = true;
                                }
                            });
                        });
                        this.setPermParameter = para;
                        this.setPermParameter["roles"] = this.roles;
                    } else {
                        this.$notify({
                            title: res.body.message,
                            type: "warning"
                        });
                    }
                });
        },
        openAddRole() {
            this.showAddRoleMask = true;
        },
        delRole(para) {
            this.showDelRoleMask = true;
            this.delRoleParameter = para;
        },
        openAddAdmin() {
            this.showAddAdminMask = true;
        },
        getPerms() {
            this.$http.get("permission.perms").then(res => {
                this.perms = res.body;
            });
        },
        getRoles() {
            this.$http.get("permission.roles").then(res => {
                this.roles = res.body;
            });
        },
        getAdmins() {
            this.$http.get("permission.admins").then(res => {
                this.admins = res.body;
            });
        },
        toggleActive(para) {
            this.$http
                .post("permission.toggle_active/", {
                    uid: para.uid,
                    active: para.active
                })
                .then(res => {
                    if (res.body.status) {
                        this.$notify({
                            title: res.body.message,
                            type: "success"
                        });
                        this.getAdmins();
                    } else {
                        this.$notify({
                            title: res.body.message,
                            type: "warning"
                        });
                    }
                });
        },
        resetPassword(para) {
            this.$http
                .post("permission.reset_password/", { uid: para.uid })
                .then(res => {
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
                });
        }
    }
};
</script>

<style>
ul,
li {
    padding: 0px;
    margin: 0px;
    list-style: none;
}
.dropdown ul {
    position: absolute;
    left: -80px;
}
</style>
