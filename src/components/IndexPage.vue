<template>
  <div class="page-container">
    <div
      style="width: 100%; max-width: 350px; margin: 0 auto;background-color:white;"
      ref="imageWrapper"
    >
      <mu-card>
        <mu-card-header :title="nickname" :sub-title="sex">
          <!-- <mu-avatar slot="avatar">
              <img src="../../assets/images/uicon.jpg" />
          </mu-avatar>-->
        </mu-card-header>
        <mu-card-media>
          <img src="../assets/logo.png" />
        </mu-card-media>
        <mu-card-title :title="company" :sub-title="email"></mu-card-title>
        <mu-card-text>
          <div v-for="d,index in newArr" :key="index">
            <!-- <caption>123</caption> -->
            <mu-divider></mu-divider>
            <div style="margin-top:20px;">
              <div style="display:flex;" v-for="dd,index2 in d" :key="index2">
                <div
                  style="margin-right:10px;margin-bottom:10px;width:40%;font-size:12px"
                >{{dd.name}}</div>
                <mu-linear-progress
                  mode="determinate"
                  :value="dd.level"
                  :size="15"
                  :min="0"
                  :max="10"
                  color="gray"
                ></mu-linear-progress>
              </div>
            </div>
          </div>
        </mu-card-text>
      </mu-card>
    </div>
    <mu-container class="body-head">
      <mu-row gutter>
        <mu-col class="center" span="12" sm="12" md="8" lg="8" xl="8">
          <div class="grid-cell">
            <h3 style="color:white">我的技术栈</h3>
            <mu-chip
              v-for="data,index in mine"
              :key="index"
              style="margin:0 10px 10px 0;color:white;"
              :color="'rgb'+data.color"
              @click="removeStack(index)"
            >
              <mu-avatar text-color="white" :color="'rgb'+data.color" :size="26">{{data.level}}</mu-avatar>
              {{data.name}}
            </mu-chip>
          </div>
        </mu-col>
      </mu-row>
      <mu-row v-if="mine.length>0" gutter>
        <mu-button
          style="margin-top:20px;"
          slot="actions"
          color="white"
          text-color="black"
          @click="gen()"
        >生成</mu-button>
      </mu-row>
      <mu-divider style="margin-top:20px;"></mu-divider>
      <mu-row gutter>
        <mu-col span="12" sm="12" md="8" lg="8" xl="8">
          <div class="grid-cell">
            <div v-for="stack,index in stacks" :key="index">
              <h3 style="color:white">{{stack.class_name}}</h3>
              <mu-chip
                v-for="data in stack.stacks"
                :key="data.id"
                style="margin:0 10px 10px 0;color:white;"
                :color="'rgb'+data.color"
                @click="pickStack(data,stack)"
              >{{data.name}}</mu-chip>
            </div>
          </div>
        </mu-col>
      </mu-row>
    </mu-container>
    <mu-dialog :title="'您对于 '+stack_name+' 的熟练程度：'" width="400" :open.sync="openDialog">
      <mu-slider :step="1" :min="0" :max="10" v-model="stack_level"></mu-slider>
      <mu-button slot="actions" flat color="primary" @click="confirm()">我确定选择 {{stack_level}}</mu-button>
    </mu-dialog>
    <mu-dialog title="可选：" width="400" :open.sync="openGen">
      <mu-container>
        <mu-row>
          <mu-col span="12" sm="12">
            <mu-text-field v-model="nickname" label="昵称" label-float full-width></mu-text-field>
          </mu-col>
          <mu-col span="12" sm="12">
            <mu-text-field v-model="company" label="公司/组织" label-float full-width></mu-text-field>
          </mu-col>
          <mu-col span="12" sm="12">
            <mu-text-field v-model="email" label="邮箱" label-float full-width></mu-text-field>
          </mu-col>
          <mu-col span="12" sm="12">
            <mu-select label="性别" v-model="sex" full-width>
              <mu-option
                v-for="option,index in options"
                :key="option"
                :label="option"
                :value="option"
              ></mu-option>
            </mu-select>
          </mu-col>
          <mu-col span="12" sm="12" style="text-align:center">
            <mu-button flat color="primary" @click="go()">好的，Go！</mu-button>
          </mu-col>
        </mu-row>
      </mu-container>
    </mu-dialog>
    <mu-dialog title="您的技能卡" :open.sync="openImage">
      <img :src="dataURL" style="width: 100%; max-width: 350px; margin: 0 auto;" />
    </mu-dialog>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import { async } from "q";

export default {
  name: "IndexPage",
  data() {
    return {
      hide: true,
      mine: [],
      stacks: [],
      openDialog: false,
      openGen: false,
      openImage: false,
      stack_name: "",
      stack_class_name: "",
      stack_level: 0,
      stack_color: "",
      nickname: "菜虚坤",
      company: "阿里巴巴",
      email: "test@qq.com",
      sex: "男",
      options: ["男", "女"],
      dataURL: "",
      newArr: []
    };
  },
  mounted() {
    this.getAllStacks();
  },
  methods: {
    getAllStacks() {
      let that = this;
      this.$axios
        .get("https://unicore.liujunyang.com/wcid/stacks")
        .then(function(res) {
          if (res.status == 200) {
            that.stacks = res.data;
          }
        });
    },
    pickStack(data, stack) {
      this.stack_name = data.name;
      this.stack_color = data.color;
      this.stack_class_name = stack.class_name;
      this.openDialog = true;
    },
    confirm() {
      let exist = false;
      for (let i = 0; i < this.mine.length; i++) {
        if (this.mine[i].name == this.stack_name) {
          exist = true;
        }
      }
      if (exist) {
        this.openDialog = false;
        this.$toast.error("已经选过这个技术栈了");
      } else {
        let my_stack = {
          name: this.stack_name,
          class: this.stack_class_name,
          level: this.stack_level,
          color: this.stack_color
        };
        this.mine.push(my_stack);
        this.openDialog = false;
        this.stack_name = "";
        this.stack_level = 0;
      }
      let map = new Map();
      let newArr = [];
      this.mine.forEach(item => {
        map.has(item.class)
          ? map.get(item.class).push(item)
          : map.set(item.class, [item]);
      });
      newArr = [...map.values()];
      this.newArr = newArr;
      this.openGen = false;
    },
    removeStack(index) {
      this.mine.splice(index, 1);
      let map = new Map();
      let newArr = [];
      this.mine.forEach(item => {
        map.has(item.class)
          ? map.get(item.class).push(item)
          : map.set(item.class, [item]);
      });
      newArr = [...map.values()];
      this.newArr = newArr;
      this.openGen = false;
    },
    gen() {
      this.openGen = true;
    },
    go: async function() {
      this.dataURL = "";
      this.openGen = false;
      this.toImage();
    },
    toImage: function() {
      window.scrollTo(0, 0);
      let that = this;
      let ele = that.$refs.imageWrapper;
      let width = ele.offsetWidth;
      let height = ele.offsetHeight;
      let scale = 2; //放大倍数
      setTimeout(function() {
        //添加延迟，防止图片没有加载完成，就生成canvas，导致页面图片空白
        html2canvas(ele, {
          dpi: window.devicePixelRatio * 2,
          scale: scale,
          backgroundColor: null,
          width: width,
          height: height
        }).then(canvas => {
          let dataURL = canvas.toDataURL("image/jpeg");
          that.dataURL = dataURL;
        });
      }, 1000);
      this.openImage = true;
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-container {
  padding: 30px 30px 100px 30px;
  margin-top: 30px;
}
/* .index-logo {
  height: 300px;
  background-image: url("../assets/index-logo.png");
  background-repeat: no-repeat;
  background-size: auto 150px;
  background-position: center;
} */
</style>
