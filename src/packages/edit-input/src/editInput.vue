<template>
    <div v-if='item'>
          <template v-if="!edit">
            <p @dblclick="edit=!edit" title='双击可以编辑'>{{item.content}}</p>
          </template>
          <template v-else>
            <input type="text" v-model="item.content" maxlength="20" @blur='edit=!edit'>
          </template>
    </div>
</template>
<script>
    export default{
        props:['item'],
        data(){
            return{
                edit:false,
            }
        },
    }
</script>
<style lang="less" scoped>

</style>
