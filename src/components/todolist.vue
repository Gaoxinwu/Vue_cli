<template>
  <div >
    <h1>{{ msg }}</h1>
    <input class="inputbox" 
            type="text" 
            v-model.trim="content"
            ref="form" 
            maxlength="30"
            @keyup.enter='saveData'>
    <p class="errtips" v-show="showtips">{{tips}}</p>
    <ul>
      <li v-for="(item,idx) in listData"
          :key="idx"
          @click='item.finished=!item.finished'
          :class={active:item.finished}>
          <p>{{idx}}. {{item.content}}</p>
          <p v-show='item.finished'>&times;</p>
          </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'todolist',
  data () {
    return {
      msg: 'Todo List',
      content:'',
      listData:[],
      tips:'',
      showtips:false,
    }
  },
  methods:{
      saveData(){
        if(!this.content){
            this.tips='请输入内容';
            this.showtips=true;
            this.$refs['form'].focus();
            return;
        }
        this.listData.push({
          content:this.content,
          finished:false,
        });
        this.content='';
      },
  },
  watch:{
    content(){
      this.content.length<0 ? this.showtips=true : this.showtips=false;
    }
  },
}
</script>

<style lang='less' scoped>
h1, h2 {
  font-weight: normal;
}
.inputbox{
  width:500px;
  height:30px;
  margin:0 auto;
}
ul {
  list-style-type: none;
  padding: 0;
  width:500px;
  margin:0 auto;
}
li {
  cursor:pointer;
  font-size: 20px;
  text-align: left;
  padding:20px 0;
  display:flex;
  justify-content:space-between;
  &.active{
    color: #42b983;
  }
}
.errtips{
  width:500px;
  height:30px;
  margin:0 auto;
  color:red;
  text-align: left;
}

</style>
