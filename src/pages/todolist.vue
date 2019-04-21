<template>
<main>
 <div class="main">
    <h1>{{ title }}</h1>
    <input class="inputbox"
            type="text"
            v-model.trim="content"
            ref="form"
            placeholder="添加待办项"
            maxlength="20"
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
           draggable="true"
          :class={active:item.done}>
          <div class="leftitem">
            <input type="checkbox" v-model.lazy='item.done' >
            <editinput :item='item'
                      class="editbox"
            ></editinput>
          </div>
          <p class="deletebtn" @click='remove(idx)' title="删除该项">删除&times;</p>
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
          class="donebox"
          :class={active:item.done}>
          <div class="leftitem">
              <input type="checkbox" v-model.lazy='item.done' >
              <p>{{item.content}}</p>
              <p v-show='item.done'>✔</p>
          </div>
          <p class="deletebtn" @click='remove(idx)' title="删除该项">删除&times;</p>
        </li>
    </ul>
    <appfoot></appfoot>
  </div>
</main>
</template>

<script>
import appfoot from '@/components/footer.vue';
import editinput from '@/packages/edit-input/src/editInput.vue'
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
  mounted(){
    let data=localStorage.getItem('todo') || [];
    data=JSON.parse(data);
    if(data.length>0){
      this.listData=data;
    }
    this.getDoneCount(data);
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
      remove(index){
        if(confirm('您确定要删除该项吗？')){
          this.listData.splice(index,1);
        }
      },
      setData(){
        localStorage.setItem('todo',JSON.stringify(this.listData));
      },
      getDoneCount(list){
        let dnum=0;
        list.forEach((val,idx)=>{
            if(val.done){
              this.doneNum=++dnum;
            }
        });
      },
  },
  watch:{
    content(){
      this.content.length<0 ? this.showtips=true : this.showtips=false;
    },
    listData:{
      handler:function(oldval,newval){
          this.setData();
          this.getDoneCount(newval);
      },
      deep:true
    }
  },
  components:{
    appfoot,
    editinput,
  },

}
</script>
<style lang='less'>
  .editbox{
    p,input{
      margin:0;
      font-size: 16px;
      width:350px;
    }
  }
</style>


<style lang='less' scoped>
main{
  background:#cdcdcd url(/static/img/bg-img.jpg);
  min-height:1000px;
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
  justify-content:space-between;
  &.active{
    color: #42b983;
  }
  &:hover{
    background-color: #f3f3f3;
  }
  .leftitem{
    display: flex;
    p{
      margin:0;
    }
  }
}
.donebox{
  display: flex;
  justify-content: space-between;
}
.deletebtn{
  color:red;
  width:15%;
  text-align: center;
  cursor:pointer;
  font-size:15px;
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
