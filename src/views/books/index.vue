<template>
  <div class="books">
    <div class="books-item" v-for="(item, index) in books" :key="index">
      <div class="pic">
        <img :src="item.pic" alt="" />
      </div>
      <div>
        <div class="star">
          <el-rate v-model="value" disabled disabled-void-color="transparent"> </el-rate>
        </div>
        <div class="title">{{ item.title }}</div>
        <div class="author">{{ item.author }}</div>
        <div class="evaluation">{{ item.evaluation }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
