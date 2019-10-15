<template>
  <div>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic"
    />
    <link
      rel="stylesheet"
      href="https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css"
    />
    <div>
      <mu-appbar
        style="width: 100%; text-align:center; background: linear-gradient(to right, rgb(105,144,246), rgb(128,70,180));"
        color="#fafafa"
        z-depth="4"
        textColor="white"
      >
        <mu-button icon slot="left" @click="showAbout()">
          <mu-icon value="info" color="white"></mu-icon>
        </mu-button>
        <mu-button icon slot="right" href="https://github.com/FamioGit/UniVision-Blog">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 36 36"
            enable-background="new 0 0 36 36"
            xml:space="preserve"
            class="mdui-icon"
            style="width: 24px;height:24px;"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#ffffff"
              d="M18,1.4C9,1.4,1.7,8.7,1.7,17.7c0,7.2,4.7,13.3,11.1,15.5
      c0.8,0.1,1.1-0.4,1.1-0.8c0-0.4,0-1.4,0-2.8c-4.5,1-5.5-2.2-5.5-2.2c-0.7-1.9-1.8-2.4-1.8-2.4c-1.5-1,0.1-1,0.1-1
      c1.6,0.1,2.5,1.7,2.5,1.7c1.5,2.5,3.8,1.8,4.7,1.4c0.1-1.1,0.6-1.8,1-2.2c-3.6-0.4-7.4-1.8-7.4-8.1c0-1.8,0.6-3.2,1.7-4.4
      c-0.2-0.4-0.7-2.1,0.2-4.3c0,0,1.4-0.4,4.5,1.7c1.3-0.4,2.7-0.5,4.1-0.5c1.4,0,2.8,0.2,4.1,0.5c3.1-2.1,4.5-1.7,4.5-1.7
      c0.9,2.2,0.3,3.9,0.2,4.3c1,1.1,1.7,2.6,1.7,4.4c0,6.3-3.8,7.6-7.4,8c0.6,0.5,1.1,1.5,1.1,3c0,2.2,0,3.9,0,4.5
      c0,0.4,0.3,0.9,1.1,0.8c6.5-2.2,11.1-8.3,11.1-15.5C34.3,8.7,27,1.4,18,1.4z"
            />
          </svg>
        </mu-button>
        <span class="color">
          <a class="site_title" href="/">What Can I Do</a>
          <a class="site_github" target="_blank"></a>
        </span>
      </mu-appbar>
    </div>
    <div>
      <router-view />
    </div>
    <div class="beian" @click="openBotttomSheet">
      <div>苏ICP备15006533号-4</div>
      <div>苏公网安备 32058102001468号</div>
    </div>

    <mu-bottom-sheet :open.sync="open" :lock-scroll="true">
      <mu-list @item-click="closeBottomSheet">
        <mu-sub-header>选择一种方式来联系我</mu-sub-header>
        <mu-list-item button href="mailto:famio@qq.com">
          <mu-list-item-action>
            <mu-icon value="email" color="blue"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>E-mail</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button href="tencent://message/?uin=690938288&Site=liujunyang.com&Menu=yes">
          <mu-list-item-action>
            <mu-icon value="chat" color="blue"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>QQ</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      open: false
    };
  },
  mounted() {
    this.$router.afterEach(() => {
      window.scrollTo(0, 0);
    });
  },
  methods: {
    closeBottomSheet() {
      this.open = false;
    },
    openBotttomSheet() {
      this.open = true;
    },
    showAbout() {
      this.$alert(
        "目前文章不够多，所以我不能保证您的关键字搜索一定有结果。但是，我会尽力长期的完善它！",
        "搜索结果说明"
      );
    }
  }
};
</script>

<style scoped>
.site_title {
  color: white;
  text-decoration: none;
  text-shadow: 5px 1px 10px rgba(0, 0, 0, 0.2);
}
.beian {
  display: flex;
  position: fixed;
  cursor: pointer;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  padding: 10px 0;
  left: 0;
  right: 0;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #f8f8f8;
}
.beian >>> div {
  margin: auto auto;
}
</style>
