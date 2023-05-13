<template>
    <van-picker
        show-toolbar
        :columns="columns"
        @cancel="cancel"
        @confirm="onConfirm"
    />
    <!--@change="onChange"-->
</template>

<script>
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
// 获取一年的周次列表
const weelys = y => {
    const oneDay = moment(y + "/01/01");
    let oneWeely = null;
    if (oneDay.format("wo") == "1周") {
        oneWeely = oneDay.startOf("week").format("YYYY/MM/DD");
    } else {
        oneDay.add(1, "weeks");
        oneWeely = oneDay.startOf("week").format("YYYY/MM/DD");
    }
    const arr = [];
    let weelyStr = "1周";
    do {
        const d = {};
        let time = moment(oneWeely);
        d.value = time.format("YYYY/MM/DD")
        d.text =
            time.format("第wo") +
            "(" +
            getDateDayStr(time.startOf("week").format("YYYY/MM/DD"), -1) +
            "-" +
            getDateDayStr(time.endOf("week").format("YYYY/MM/DD"), -1) +
            ")";
        arr.push(d);
        oneDay.add(1, "weeks");
        oneWeely = oneDay.startOf("week").format("YYYY/MM/DD");
        weelyStr = oneDay.format("wo");
    } while (weelyStr != "1周" && oneWeely.indexOf(y) > -1);
    return arr;
};
//获取某个日期 前后N天的时间
const getDateDay2 = (time, AddDayCount) => {
    if (time) {
        let dd = new Date(time)
        dd.setDate(dd.getDate() + AddDayCount)
        let y = dd.getFullYear()
        let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1) //获取当前月份的日期，不足10补0
        let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() //获取当前几号，不足10补0
        return y + '/' + m + '/' + d
    } else {
        return ''
    }
}
//获取 当前的前一天 返回值 01/02
const getDateDayStr = (time, AddDayCount) => {
    if (time) {
        let dd = new Date(time)
        dd.setDate(dd.getDate() + AddDayCount)
        // let y = dd.getFullYear()
        let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1) //获取当前月份的日期，不足10补0
        let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() //获取当前几号，不足10补0
        return m + '/' + d
    } else {
        return ''
    }
}
const getweekStartTime = (week, year) => {
    //获取周开始日期
    const date1 = new Date(year, 0, 4);
    date1.setDate(date1.getDate() - date1.getDay());
    date1.setTime(date1.getTime() + 7 * 86400000 * (week - 1));
    let year1 = date1.getFullYear();
    let month1 = date1.getMonth() + 1;
    if (month1 >= 1 && month1 <= 9) {
        month1 = "0" + month1;
    }
    let dates1 = date1.getDate();
    if (dates1 >= 1 && dates1 <= 9) {
        dates1 = "0" + dates1;
    }
    let startDate = year1 + '-' + month1 + '-' + dates1;

    // //获取周结束日期
    // const date = new Date(year, 0, 4);
    // date.setDate(date.getDate() - date.getDay());
    // date.setTime(date.getTime() + (7 * 86400000 * week) - 1);
    // let year2 = date.getFullYear();
    // let month2 = date.getMonth() + 1;
    // if (month2 >= 1 && month2 <= 9) {
    //     month2 = "0" + month2;
    // }
    // let dates2 = date.getDate();
    // if (dates2 >= 1 && dates2 <= 9) {
    //     dates2 = "0" + dates2;
    // }
    // let endDate = year2 + '-' + month2 + '-' + dates2;
    // return startDate + '~' + endDate
    return startDate
}
export default {
    props: {
        weekType: {
            type: String,
            default: 'time'
        },
        // 默认值 可以为 2023-01-01 也可以为 周数 27
        defaultsVal: {
            type: [String],
            default: () => {
                return '';
            }
        },
        // weekType为 week 时 必须传
        weekYear: {
            type: String,
            default: ''
        }
    },
    computed: {
        defaults: function(){
            let value = '';
            if(this.weekType == 'time'){
                if(this.defaultsVal){
                    // 考虑到ios的兼容问题 将时间格式为 2021/12/21
                    value = this.defaultsVal.replace(/-/g,"/")
                }
            }else if(this.weekType == 'week'){
                if(this.defaultsVal){
                    value = getweekStartTime(this.defaultsVal, this.weekYear)
                }
            }
            return value;
        }
    },
    data() {
        return {
            columns: [
                {
                    values: [],
                    className: "column1"
                },
                {
                    values: [],
                    className: "column2"
                }
            ]
        };
    },
    created() {
        this.setData();
    },
    methods: {
        setData() {
            // let defaults = getWeekdayTime(this.defaults) ? getDateDay2(this.defaults, +1);
            let defaults = getDateDay2(this.defaults, +1);
            const defaultData = moment(defaults);
            let year = moment().format("YYYY");
            this.columns[0].values = [];
            for (let i = year - 10; i < year - 0 + 10; i++) {
                this.columns[0].values.unshift(i);
            }
            for (let i = 0; i < this.columns[0].values.length; i++) {
                if (this.columns[0].values[i] == year) {
                    this.columns[0].defaultIndex = i;
                    this.columns[0].valueKey = i;
                    break;
                }
            }
            console.log(this.columns);
            this.columns[1].values = weelys(year);
            for (let i = 0; i < this.columns[1].values.length; i++) {
                if (
                    moment(this.columns[1].values[i].value).format("wo") ==
                    defaultData.format("wo")
                ) {
                    this.columns[1].defaultIndex = i;
                    this.columns[1].valueKey = i;
                    break;
                }
            }
        },
        onConfirm(value) {
            console.log(value);
            let text = value[1].text
            let list = text.split('(')
            let timeArr = list[1].split('-');
            let year = value[0]
            let startTime = year + '-' + timeArr[0].replace(/\//g,"-");
            let endTime = year + '-' + timeArr[1].replace(')', '').replace(/\//g,"-");
            let startTimeIos = year + '/' + timeArr[0];
            let endTimeIos = year + '/' + timeArr[1].replace(')', '')
            let obg = {};
            obg.week = list[0];
            obg.weekNum = list[0].slice(1, list[0].length - 1);
            obg.startTime = startTime
            obg.endTime = endTime
            obg.startTimeIos = startTimeIos
            obg.endTimeIos = endTimeIos
            this.$emit("onConfirm", obg);
        },
        // onChange(picker, values) {
        //     picker.setColumnValues(1, weelys(values[0]));
        //     this.$emit("onChange", values);
        // },
        cancel() {
            this.$emit("cancel");
        }
    }
};
</script>
