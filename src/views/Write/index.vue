<template>
  <div class="write">
    <v-md-editor
      v-model="html"
      default-fullscreen
      @save="onSave"
      toc-nav-position-right
      v-if="!confirVisable"
    ></v-md-editor>
    <div class="confirDialog">
      <el-dialog title="编辑模式" v-model="confirVisable" :show-close="false" :close-on-click-modal="false">
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="onSelect(0)">创建文章</el-button>
            <el-button type="primary" @click="onSelect(1)">更新文章</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <!-- 创建弹框 -->
    <div class="createDialog">
      <el-dialog v-model="createVisable" :close-on-click-modal="false" >
        <div class="input-box">
          <el-input v-model="title" placeholder="输入标题"></el-input>
          <el-input v-model="tagNames" placeholder="输入标签"></el-input>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="createArticle">确定</el-button>
            <el-button type="primary" @click="createVisable = false">取消</el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <div class="updateDialog">
      <el-dialog v-model="updateVisable" :close-on-click-modal="false">
        <div class="input-box">
          <el-input v-model="id" placeholder="输入文章id"></el-input>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="getArticle">确定</el-button>
            <el-button
              type="primary"
              @click="
                updateVisable = false;
                confirVisable = true;
              "
              >取消</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="scss">
@import "./index.scss";
</style>
