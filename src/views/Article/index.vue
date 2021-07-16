<template>
  <div class="article">
    <div class="article_title">{{ article.title }}</div>
    <div class="article_meta">
      <span><i class="iconfont iconhuabanfuben"></i>发表时间:{{ article.createTime }}</span>
      <span><i class="iconfont icongengxin"></i>更新时间:{{ article.updateTime }}</span>
    </div>
    <div class="article_body">
      <v-md-editor v-model="article.content" mode="preview" ref="preview"></v-md-editor>
    </div>
    <div class="article_comment" ref="commentRef">
      <div class="article_comment--action">
        <transition name="flipX">
          <div class="replybar" v-show="isreply">
            <span>回复 @{{ replyGuest }}</span
            ><i class="iconfont iconclose"></i>
          </div>
        </transition>
        <textarea
          placeholder="写下你的评论..."
          type="text"
          maxlength="150"
          v-model="commentText"
          ref="textarea"
          :class="commentText !== '' && 'focus'"
        ></textarea>
        <div class="submit" @click="addComment">提交</div>
      </div>
      <div class="article_comment--content">
        <div class="comment_item" v-for="(item, index) in commentList" :key="index">
          <div class="comment_item--img">{{ item.guestName }}</div>
          <div class="comment_item--content">
            <p class="name">
              <span>{{ item.guestName }} </span>
              <span> {{ index + 1 }} 楼</span>
            </p>
            <p class="time">{{ item.createTime }}</p>
            <div class="replyto" v-if="item.replyGuest !== ''">
              @{{ item.replyGuest }}: <span>{{ item.replyText }}</span>
            </div>
            <div class="detail">{{ item.commentText }}</div>
            <div class="control" @click="onReply(item.guestName)">
              <i class="iconfont iconpinglun"></i>
              <span>回复</span>
            </div>
          </div>
        </div>
        <div class="article_comment--page">
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
    </div>
    <!-- 悬浮 -->
    <div class="article_suspended">
      <div class="article_suspended--item" :badge="article.likeNum" :class="isLike && 'act_suspended'" @click="onLike">
        <i class="iconfont iconzang"></i>
      </div>
      <div class="article_suspended--item" :badge="commentList.length" :class="commentList.length>0 && 'act_suspended'" @click="toComment">
        <i class="iconfont iconpinglun"></i>
      </div>
      <!-- <div class="article_suspended--item up">
        <i class="iconfont iconupload"></i>
      </div> -->
    </div>
    <go-top />
    <load v-if="isLoad" />
    <login :isLogin="loginPopup" @close="onClose" />
  </div>
</template>
<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import "./index.scss";
</style>
