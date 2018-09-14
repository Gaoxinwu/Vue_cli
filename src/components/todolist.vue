<template>
  <div >
    <h1>{{ msg }}</h1>
    <input class="inputbox" type="text" v-model="content" @keyup.enter='saveData'>
    <ul>
      <li v-for="(item,idx) in listData"
          :key="idx"
          @click='item.finished=!item.finished'
          :class={active:item.finished}
      >{{item.content}}</li>
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
    }
  },
  methods:{
      saveData(){
        this.listData.push({
          content:this.content,
          finished:false,
        });
        this.content='';
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
h1, h2 {
  font-weight: normal;
}
.inputbox{
  width:500px;
  height:24px;
  margin:0 auto;
}
ul {
  list-style-type: none;
  padding: 0;
  width:500px;
  margin:0 auto;
}
li {
  margin: 0 10px;
  cursor:pointer;
  font-size: 20px;
  text-align: left;
  padding:20px 10px;
  &.active{
    color: #42b983;
  }
}
a {
  color: #42b983;
}
</style>
