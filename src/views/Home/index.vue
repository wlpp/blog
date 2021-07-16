<template>
  <div class="home">
    <div class="home_auto">
      <div class="home_left">
        <div class="queryBar">
          <span>当前检索条件:</span>
        </div>
        <div class="home_article">
          <div class="home_article--item" v-for="(item, index) in allArticle" :key="index" @click="goArticle(item.id)">
            <div class="meta">
              <span v-for="(tagItem, tagIndex) in item.tagNames" :key="tagIndex">{{ tagItem }}</span>
            </div>
            <div class="title">{{ item.title }}</div>
            <div class="action">
              <div class="icon">
                <i class="iconfont iconzang"></i>
                <span>{{ item.likeNum }}</span>
              </div>
              <div class="icon">
                <i class="iconfont iconpinglun"></i>
                <span>{{ item.commentNum }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="page">
          <span
            >共<b>{{ queryTotal }}</b
            >页</span
          >
          <span
            >当前<b>{{ queryIndex }}</b></span
          >
          <span class="arrow" :class="queryIndex <= 1 && 'disable'" @click="onChangePage('prev')">
            <i class="iconfont iconleft"></i>上一页
          </span>
          <span class="arrow" :class="queryIndex >= queryTotal && 'disable'" @click="onChangePage('next')"
            >下一页<i class="iconfont iconright"></i
          ></span>
        </div>
        <div class="no_article" v-if="false">
          <i class="iconfont iconwushuju"></i>
          <span>暂无数据呦</span>
        </div>
      </div>
      <div class="home_right">
        <div class="search" :class="isChange && 'active'">
          <input
            type="text"
            v-model="queryTitle"
            placeholder="输入文章名进行检索..."
            @keyup.enter="getAllArticle"
            @focus="isChange = !isChange"
            @blur="isChange = !isChange"
          />
          <i class="iconfont iconsearch" @click="getAllArticle"></i>
        </div>
        <div class="ordme">
          <div class="ordme_avator">
            <img :src="blogger && blogger.avatar" alt="" />
          </div>
          <div class="ordme_name">{{ blogger &&blogger.name }}</div>
          <!-- <div class="ordme_info">
            <div>
              <span>{{ blogger && blogger.article }}</span>
              <span>博文</span>
            </div>
            <div>
              <span>{{ blogger && blogger.like }}</span>
              <span>点赞</span>
            </div>
            <div>
              <span>{{ blogger  && blogger.comment }}</span>
              <span>评论</span>
            </div>
          </div> -->
        </div>
        <div class="tags">
          <div class="tags_title">标签</div>
          <div class="tags_box">
            <span
              :class="item.status && 'active'"
              v-for="(item, index) in tagNames"
              :key="index"
              @click="onTags(index)"
              >{{ item.name }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
