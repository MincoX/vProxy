<template>
    <div>
        <p v-if="hours != null">
            <span>{{ hour }}:{{ minute }}:{{ second }}</span>
        </p>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            hours: null,
            minutes: null,
            seconds: null
        };
    },
    props: {
        fhours: {},
        fminutes: {},
        fseconds: {}
    },
    mounted() {
        this.add();
    },
    methods: {
        num: function(n) {
            return n < 10 ? "0" + n : "" + n;
        },
        add: function() {
            var _this = this;
            var time = window.setInterval(function() {
                if (
                    _this.seconds === 0 &&
                    _this.minutes === 0 &&
                    _this.hours !== 0
                ) {
                    _this.seconds = 59;
                    _this.minutes = 59;
                    _this.hours -= 1;
                } else if (_this.seconds === 0 && _this.minutes !== 0) {
                    _this.seconds = 59;
                    _this.minutes -= 1;
                } else if (
                    _this.hours === 0 &&
                    _this.minutes === 0 &&
                    _this.seconds === 0
                ) {
                    _this.seconds = 0;
                    window.clearInterval(time);
                } else {
                    _this.seconds -= 1;
                }
            }, 1000);
        }
    },
    watch: {
        fhours(newVal, oldVal) {
            if (typeof newVal == "number") {
                this.hours = newVal;
            }
        },
        fminutes(newVal, oldVal) {
            if (typeof newVal == "number") {
                this.minutes = newVal;
            }
        },
        fseconds(newVal, oldVal) {
            if (typeof newVal == "number") {
                this.seconds = newVal;
            }
        }
        // second: {
        //     handler(newVal) {
        //         this.num(newVal);
        //     }
        // },
        // minute: {
        //     handler(newVal) {
        //         this.num(newVal);
        //     }
        // }
    },
    computed: {
        hour: function() {
            return this.num(this.hours);
        },
        second: function() {
            return this.num(this.seconds);
        },
        minute: function() {
            return this.num(this.minutes);
        }
    }
};
</script>

<style></style>