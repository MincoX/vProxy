<template>
    <div class="cal-calendar">
        <div class="controller-box">
            <p class="glyphicon glyphicon-backward controller" @click="nextMouth(-1)"></p>
            <p class="date-box">{{ controllerYear }}/{{ controllerMonth }}</p>
            <p class="glyphicon glyphicon-forward controller" @click="nextMouth(1)"></p>
        </div>
        <header class="week-box">
            <div v-for="(week, index) in weeks" :key="index">{{week}}</div>
        </header>
        <div v-for="(line, index) in calendarData" :key="index" class="cal-calendar-module">
            <div
                v-for="(day, index) in line"
                :key="index"
                :class="[clickDate==nowYear + '/' + nowMonth + '/' + day.day ? 'active': '', 'box', 'hp']"
                @click="getDay(day)"
            >{{day.name}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "calendar",
    data() {
        return {
            date: new Date(),
            controllerYear: new Date().getFullYear(),
            controllerMonth: new Date().getMonth() + 1,
            calendarData: [],
            nowYear: new Date().getFullYear(),
            nowMonth: new Date().getMonth() + 1,
            nowDay: new Date().getDate(),
            weeks: ["一", "二", "三", "四", "五", "六", "日"],
            clickDate: ""
        };
    },
    mounted() {
        this.setDate();
        this.initData(this.nowYear, this.nowMonth);
    },
    watch: {
        controllerMonth(val) {
            this.setDate();
            this.initData(this.controllerYear, this.controllerMonth);
        }
    },
    methods: {
        getDay(val) {
            if (!val.day) return;
            let clickDate =
                this.controllerYear +
                "/" +
                this.controllerMonth +
                "/" +
                val.day;
            this.clickDate = clickDate;
            this.$emit("clickCalendar", clickDate);
        },
        setDate() {
            this.nowYear = new Date(this.date).getFullYear();
            this.nowMonth = new Date(this.date).getMonth() + 1;
            this.nowDay = new Date(this.date).getDate();
        },
        initData(year, month) {
            // 当前月份天数
            const days = this.days(year, month);
            let arr = Array.from({ length: days }, (x, index) => index + 1).map(
                item => {
                    return {
                        day: item,
                        name: this.getDayName(year, month, item),
                        week: this.getDateWeek(year, month, item)
                    };
                }
            );
            let beforeDayNum = arr[0].week - 1;
            let afterDayNum = 7 - arr[days - 1].week;
            var beforeDayArr = this.completionDays(beforeDayNum);
            var afterDayArr = this.completionDays(afterDayNum);
            var allArr = [...beforeDayArr, ...arr, ...afterDayArr];
            this.calendarData = this.splitArray(allArr);
            this.clickDate = year + "/" + month + "/" + new Date().getDate();
        },
        splitArray(arr) {
            var result = [];
            for (var i = 0; i < arr.length; i += 7) {
                result.push(arr.slice(i, i + 7));
            }
            return result;
        },
        completionDays(num) {
            return Array.from({ length: num }, (x, index) => index + 1).map(
                item => {
                    return {
                        day: null,
                        week: null
                    };
                }
            );
        },
        // 一个月多少天
        days(year, month) {
            var dayCount;
            let now = new Date(year, month, 0);
            dayCount = now.getDate();
            return dayCount;
        },
        // 某一天星期几
        getDateWeek(year, month, day) {
            var tmpdate = new Date(year, month - 1, day).getDay();
            return tmpdate === 0 ? 7 : tmpdate;
        },
        getToday() {
            let nowYear = new Date().getFullYear();
            let nowMonth = new Date().getMonth() + 1;
            let nowDay = new Date().getDate();
            return {
                nowYear,
                nowMonth,
                nowDay
            };
        },
        getDayName(year, month, day) {
            return `${day}`;
        },
        nextMouth(type) {
            let mouth = this.controllerMonth + type;
            let year;
            if (mouth <= 0) {
                this.controllerMonth = 12;
                this.controllerYear = this.controllerYear - 1;
            } else if (mouth >= 13) {
                this.controllerMonth = 1;
                this.controllerYear = this.controllerYear + 1;
            } else {
                this.controllerMonth = mouth;
            }
            this.calendarDate = new Date(
                this.controllerYear,
                this.controllerMonth - 1
            );
        }
    }
};
</script>

<style scoped>
.hp:hover {
    border-radius: 15px;
    cursor: pointer;
    background-color: rgba(139, 171, 243, 0.3);
}
.active {
    border-radius: 15px;
    background-color: rgba(139, 171, 243, 0.3);
}
.controller-box {
    display: flex;
    justify-content: center;
}
.controller {
    width: 50px;
    border-radius: 5px;
    font-size: 25px;
    margin: 0 20px;
    color: #fe4d5c;
}
.controller:hover {
    cursor: pointer;
    background-color: rgba(139, 171, 243, 0.3);
}
.date-box {
    width: 100px;
    font-size: 16px;
    font-weight: 1000;
}
.cal-calendar {
    position: absolute;
    left: -245px;
    margin: 0 auto;
    width: 335px;
    padding: 0 15px;
    background: #ffffff;
    box-shadow: 0 3px 8px 0 rgba(139, 171, 243, 0.3);
    border-radius: 8px;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #555555;
    text-align: center;
    box-sizing: border-box;
}
.cal-calendar .week-box {
    display: flex;
    height: 55px;
    line-height: 55px;
}
.cal-calendar .week-box div {
    flex: 1;
}
.cal-calendar-module {
    position: relative;
    display: flex;
    /*border-bottom: 1px solid #d9d9d9;*/
    height: 55px;
    line-height: 55px;
}
.cal-calendar-module:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
        180deg,
        #f0f0f0,
        #f0f0f0 50%,
        transparent 0
    );
}
.cal-calendar-module:last-child {
    border-bottom: none;
}
.small-calendar .cal-calendar-module {
    height: 49px;
    line-height: 49px;
}
.box {
    height: 50px;
    width: 50px;
    margin: 0;
    border: 0;
    flex: 1;
    position: relative;
}
</style>
