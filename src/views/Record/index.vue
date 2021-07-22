<template>
  <div class="record">
    <div class="record_item" v-for="(item, index) in record" :key="index">
      <div class="time">
        <div class="time_circle">
          <span class="month">{{ item.month }}月</span>
          <span class="day">{{ item.day }}</span>
        </div>
        <div class="time_year">{{ item.year }}</div>
      </div>
      <div class="content">
        <div class="content_text">{{ item.content }}</div>
        <!-- <div class="content_oper">
          <i class="iconfont iconzang"></i>
          <span>点赞({{ item.like }})</span>
        </div> -->
      </div>
    </div>
    <div class="record_page">
      <span
        >共<b>{{ pageTotal }}</b
        >页</span
      >
      <span
        >当前页:<b>{{ pageIndex }}</b></span
      >
      <span class="arrow" :class="pageIndex === 1 && 'disable'" @click="onChangePage('prev')">
        <i class="iconfont iconleft"></i>上一页</span
      >
      <span class="arrow" :class="pageIndex === pageTotal && 'disable'" @click="onChangePage('next')">
        下一页 <i class="iconfont iconright"></i
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import recordApi from "@/service/recordApi";
interface recordType {
  content: string;
  created: string;
  year: string;
  month: string;
  day: string;
  like: number;
}
export default defineComponent({
  setup() {
    const state = reactive({
      record: <recordType[]>[],
      pageIndex: 1,
      pageSize: 5,
      pageTotal: 1
    });
    const onChangePage = (type: string) => {
      switch (type) {
        case "prev":
          if (state.pageIndex <= 1) return;
          state.pageIndex--;
          break;
        case "next":
          if (state.pageIndex >= state.pageTotal) return;
          state.pageIndex++;
          break;
      }
      getRecord;
    };
    const getRecord = () => {
      const params = {
        pageIndex: state.pageIndex,
        pageSize: state.pageSize
      };
      recordApi.getRecord(params).then((res: any) => {
        state.record = res.data.map((item: any) => {
          return {
            ...item,
            year: new Date(item.createTime).getFullYear(),
            month: new Date(item.createTime).getMonth() + 1,
            day: new Date(item.createTime).getDate()
          };
        });
      });
    };
    onMounted(() => {
      getRecord();
    });
    return {
      ...toRefs(state),
      onChangePage
    };
  }
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
