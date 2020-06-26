<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo center">艾瑞 i</div>
      <a-menu theme="dark" :default-selected-keys="['2']" mode="inline">
        <a-sub-menu key="blog">
          <span slot="title"><a-icon type="profile" /><span>博客</span></span>
          <a-menu-item key="1">
            <router-link to="/blog/addBlog">增加博客</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link to="/blog/blogList">博客列表</router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link to="/blog/stickBlog">置顶管理</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="diary">
          <span slot="title"><a-icon type="cluster" /><span>日志</span></span>
          <a-menu-item key="4">
            <router-link to="/diary/diaryList">日志列表</router-link>
          </a-menu-item>
          <a-menu-item key="5">
            <router-link to="/diary/addDiary">增加日志</router-link>
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="wallpaper">
          <span slot="title"
            ><a-icon type="paper-clip" /><span>壁纸</span></span
          >
          <a-menu-item key="6">
            <router-link to="/wallpaper/wallpaperList">壁纸列表</router-link>
          </a-menu-item>
          <a-menu-item key="7">
            <router-link to="/wallpaper/uploadWallpaper">上传壁纸</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="music">
          <span slot="title"
            ><a-icon type="play-circle" /><span>音乐</span></span
          >
          <a-menu-item key="8">
            <router-link to="/music/musicList">音乐列表</router-link>
          </a-menu-item>
          <a-menu-item key="9">
            <router-link to="/music/uploadMusic">上传音乐</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="tag">
          <span slot="title"><a-icon type="tags" /><span>标签</span></span>
          <a-menu-item key="10">
            <router-link to="/tags/tagsList">标签列表</router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!--            <a-layout-header style="background: #fff; padding: 0"/>-->
      <a-layout-content style="margin: 0 16px">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  /*background: rgba(255, 255, 255, 0.2);*/
  margin: 16px;
  color: white;
}
</style>
