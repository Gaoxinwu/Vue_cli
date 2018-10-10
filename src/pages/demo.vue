
<template>
  <div id="test" class="test">
    <h1>Hello {{person.name}}!</h1>
    介绍：<input type="text" v-model="person.introduce"/><br/>
    年龄：<input type="text" v-model="person.age"/><br/>
    TODO:<br/>
    <li 
    :key='todo.id'
    v-for="todo in person.todos">
      {{todo.id}}{{todo.text}}
    </li>
    <Item text="todo"/>
    <Item text="测试组件"/>
    <button v-on:click="buttonClick">点我</button>
  </div>
</template>

<script>
  import Item from '@/components/ItemTemplate.vue'
  export default {
    name: 'test',
    components: { Item },
    data() {
      return {
        person: {
          name: 'VUE',
          introduce: null,
          age: null,
          todos:[
            {id:1, text:'任务1'},
            {id:2, text:'任务2'},
            {id:3, text:'任务3'},
          ]
        }
      };
    },
    methods: {
      buttonClick() {
        this.person.introduce = 'i am sure';
        this.person.age = 20;
      }
    }
  }
</script>
<style>
  .test {
    text-align: left;
    width: 300px;
    margin-left:auto;
    margin-right:auto;
  }
</style>