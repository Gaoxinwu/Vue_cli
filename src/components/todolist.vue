<template>
<main>
 <div class="main">
    <h1>{{ title }}</h1>
    <input class="inputbox" 
            type="text" 
            v-model.trim="content"
            ref="form"
            placeholder="添加待办项" 
            maxlength="30"
            @keyup.enter='saveData'>
    <p class="errtips" v-show="showtips">{{tips}}</p>
    <div class="main-title">
      <h2>正在进行</h2>
      <h3>数量：{{listData.length-doneNum}}</h3>
    </div>
    <ul>
      <li v-for="(item,idx) in listData"
          :key="idx"
           v-if="!item.done"
          :class={active:item.done}>
          <input type="checkbox" v-model.lazy='item.done' @click="setData()">
          <p>{{item.content}}</p>
          <p v-show='item.done'>✔</p>
          </li>
    </ul>
    <div class="main-title">
      <h2>已完成</h2>
      <h3>数量：{{doneNum}}</h3>
    </div>
    <ul>
      <li v-for="(item,idx) in listData"
          :key="idx"
          v-if="item.done"
          :class={active:item.done}>
          <input type="checkbox" v-model.lazy='item.done' @click="setData()">
          <p>{{item.content}}</p>
          <p v-show='item.done'>✔</p>
        </li>
    </ul>
  </div>
</main>
 
</template>

<script>
export default {
  name: 'todolist',
  data () {
    return {
      title: 'Todo List',
      content:'',
      listData:[],
      tips:'',
      showtips:false,
      doneNum:0,
    }
  },
  methods:{
      saveData(){
        if(!this.content){
            this.tips='请输入待办项';
            this.showtips=true;
            this.$refs['form'].focus();
            return;
        }
        this.listData.push({
          content:this.content,
          done:false,
        });
        this.setData();
        this.content='';
      },
      setData(){
        this.getDoneCount();
        localStorage.setItem('todo',JSON.stringify(this.listData));
      },
      getDoneCount(){
        let data=this.listData;
        let dnum=0;
        data.forEach((val,idx)=>{
            if(val.done){
              this.doneNum=dnum++;
            }
        });
      },
  },
  watch:{
    content(){
      this.content.length<0 ? this.showtips=true : this.showtips=false;
    },
    listData(){
      this.setData();
    },
  },
  mounted(){
    let data=localStorage.getItem('todo') || [];
    if(data.length>0){
      this.listData=JSON.parse(data);
    }
    this.getDoneCount();
  },
}
</script>

<style lang='less' scoped>
main{
  background-color:#cdcdcd;
}
p{
  margin:0;
}
input[type='checkbox']{
  cursor: pointer;
}
h2{
  text-align: left;
}
.main{
  width:500px;
  height:30px;
  margin:0 auto;
  
}
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
  font-size: 20px;
  text-align: left;
  display:flex;
  justify-content:flex-start;
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
.main-title{
  display:flex;
  justify-content: space-between;
}
</style>
