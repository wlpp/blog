<template>
  <div class="calender">
    <div class="date-header">
      <div class="pre-month" @click="changeTime(0)"></div>
      <div class="show-date">{{ year }}年{{ month }}月{{ day }}日</div>
      <div class="next-month" @click="changeTime(1)"></div>
    </div>
    <div class="date-content">
      <div class="week-header">
        <div class="week-item" v-for="(item, index) in weeks" :key="index">
          {{ item }}
        </div>
      </div>
      <div class="week-day">
        <div class="every-day" v-for="(item2, index2) in dayArr" :key="index2">{{ item2 }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      year: 0,
      month: 0,
      day: 0,
      weeks: ["一", "二", "三", "四", "五", "六", "日"],
      dayNum: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      dayArr: <(number | string)[]>[]
    });
    const initTime = async () => {
      const date = new Date();
      state.year = date.getFullYear();
      state.month = date.getMonth() + 1;
      state.day = date.getDate();
      getTime();
    };
    const getTime = () => {
      let nowDay = new Date(state.year, state.month - 1, 1).getDay();
      console.log(nowDay, "nowDay");
      console.log(state.month, "state.month");
      state.dayArr = [];
      if (nowDay === 0) {
        nowDay = 7;
      }
      for (let i = 1; i < state.dayNum[state.month - 1]; i++) {
        state.dayArr.push(i);
      }
      for (let i = 0; i < nowDay - 1; i++) {
        state.dayArr.unshift("");
      }
    };
    const changeTime = (type: number) => {
      switch (type) {
        case 0:
          state.month--;
          if (state.month < 1) {
            state.year--;
            state.month = 12;
          }
          break;
        case 1:
          state.month++;
          if (state.month > 12) {
            state.year++;
            state.month = 1;
          }
          break;
      }
      getTime();
    };
    onMounted(() => {
      initTime();
    });
    return {
      ...toRefs(state),
      changeTime
    };
  }
});
</script>

<style lang="scss" scoped>
.calender {
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 380px;
  width: 420px;
  border: 1px solid #ccc; */
}
.date-header {
  margin-left: 10px;
  height: 40px;
  width: 350px;
  line-height: 40px;
  text-align: center;
}
.pre-month {
  position: absolute;
  display: inline-block;
  height: 0px;
  width: 0px;
  border: 20px solid;
  border-color: transparent rgb(35, 137, 206) transparent transparent;
  cursor: pointer;
}
.next-month {
  position: absolute;
  display: inline-block;
  height: 0px;
  width: 0px;
  border: 20px solid;
  border-color: transparent transparent transparent rgb(35, 137, 206);
  cursor: pointer;
}
.show-date {
  margin-left: 40px;
  margin-top: 0px;
  display: inline-block;
  line-height: 40px;
  text-align: center;
  width: 310px;
  color: rgb(35, 137, 206);
}
.week-header {
  color: #fff;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .week-item {
    color: #000;
    flex: 1;
    text-align: center;
  }
}
.week-day {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  .every-day {
    width: 14.28%;
    height: 50px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
}

.other-day {
  color: #ccc;
}
.now-day {
  background: rgb(35, 137, 206);
}
.active-day {
  /* padding: 2px */
  /* border-sizing:content-box; */
  border: 2px solid rgb(35, 137, 206);
}
</style>
