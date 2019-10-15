<template>
  <div class="page-container">
    <mu-container class="body-head">
      <mu-row gutter>
        <mu-col class="center" span="12" sm="12" md="8" lg="8" xl="8">
          <div class="grid-cell">
            <h3 style="color:white">我的技术栈</h3>
            <mu-chip
              v-for="data,index in mine"
              :key="index"
              style="margin-right:10px;color:white;"
              :color="'rgb'+data.color"
            >
              <mu-avatar text-color="white" :color="'rgb'+data.color" :size="26">{{data.level}}</mu-avatar>
              {{data.name}}
            </mu-chip>
          </div>
        </mu-col>
      </mu-row>
      <mu-divider style="margin-top:20px;"></mu-divider>
      <mu-row gutter>
        <mu-col class="center" span="12" sm="12" md="8" lg="8" xl="8">
          <div class="grid-cell">
            <div v-for="stack,index in stacks" :key="index">
              <h3 style="color:white">{{stack.class_name}}</h3>
              <mu-chip
                v-for="data in stack.stacks"
                :key="data.id"
                style="margin-right:10px;color:white;"
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
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      mine: [],
      stacks: [],
      openDialog: false,
      stack_name: "",
      stack_class_name: "",
      stack_level: 0,
      stack_color: ""
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
            console.log(that.stacks);
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
      let my_stack = {
        name: this.stack_name,
        class: this.stack_class_name,
        level: this.stack_level,
        color: this.stack_color
      };
      this.mine.push(my_stack);
      console.log(this.mine);
      this.openDialog = false;
      this.stack_name = "";
      this.stack_level = 0;
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-container {
  padding: 30px 30px;
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
