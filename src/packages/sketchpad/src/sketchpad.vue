<template>
    <div class="sketchpad">
        <div class="canvas-contaiter" ref="canvas-contaiter">
            <canvas
                :width="width"
                :height="height"
                @mousedown="beginMove"
                @mouseup="endMove"
                @mousemove="canvasMove"
                ref="canvas"
                id="canvas">您的浏览器不支持 HTML5 canvas 标签。</canvas>
            <div class="toolbar"
                ref="toolbar"
                @mousedown="toolbarBeginMove"
                @mouseup="toolbarEndMove"
                @mousemove="toolbarMove"
                :style="toolbarStyle">
                <div class="movebutton"></div>
                <button>直线</button>
                <button>矩形</button>
                <button @click="upload">上传</button>
            </div>
          <!--<input type="file" id="input" style="display:none;" @change="uploadChange(this)">-->
          <input type="file" id="input" style="display:none;" accept=".jpg,.jpeg,.png,.gif" >
        </div>
    </div>
</template>

<script>
export default {
    name: "sketchpad",
    props: {

    },
    data() {
        return {
            // imgUrl: '../../../../static/img/bg-img.jpg',
            imgUrl: '../../../../static/img/example_03.jpg',
            width: '600',
            height: '400',
            context: {},
            isToolBarMove: false,
            toolbarTop: 0,
            toolbarLeft:0,
            toolbarDisX: 0,
            toolbarDisY: 0,
        }
    },
    components: {

    },
    computed: {
        toolbarStyle () {
            return {
                top: this.toolbarTop,
                left: this.toolbarLeft
            }
        }
    },
    mounted() {
        const that = this
        const ctx = this.context = document.getElementById('canvas').getContext('2d')
        const img = new Image()
        img.src = this.imgUrl
        img.onload = function () {
            that.width = img.width
            that.height = img.height
            that.$nextTick(()=>{
                ctx.drawImage(img, 0, 0)
            })
        }
        this.$nextTick(() => {
            this.initPad()
        })
    },
    watch: {

    },
    methods: {
        upload () {
          var inputElement = document.getElementById("input");
          inputElement.click()
          inputElement.addEventListener('click', function() {
            this.value = '';
          }, false);
          inputElement.addEventListener("change",function(){
            var reader = new FileReader();
            reader.readAsDataURL(inputElement.files[0]);//发起异步请求
            reader.onload = function(res){
              //读取完成后，数据保存在对象的result属性中
              console.log(this.result)
            }
          })
        },
      uploadChange (){
        var inputElement = document.getElementById("input");
          console.log(inputElement.files)

      },
        // 初始化画板
        initPad () {
            this.toolbarTop = `${this.$refs['canvas-contaiter'].clientHeight - this.$refs.toolbar.clientHeight}px`
            this.toolbarLeft = `${(this.$refs['canvas-contaiter'].clientWidth - this.$refs.toolbar.clientWidth)/2}px`
        },
        beginMove (e) {
            // console.log('beginMove',e)
        },
        endMove (e) {
            // console.log('endMove',e)
        },
        canvasMove (e) {
            // console.log('canvasMove',e)

        },
        toolbarBeginMove (e) {
            this.isToolBarMove = true
            this.toolbarDisX = e.clientX - this.$refs.toolbar.offsetLeft
            this.toolbarDisY = e.clientY - this.$refs.toolbar.offsetTop
            // console.log('beginMove',e)
            // console.log(this.$refs.toolbar.offsetLeft)
            // console.log(this.$refs.toolbar.offsetTop)
        },
        toolbarEndMove (e) {
            this.isToolBarMove = false

        },
        toolbarMove (e) {
            if (!this.isToolBarMove) return
            // console.log(this.$refs.toolbar.offsetLeft)
            // console.log(e)
            this.toolbarTop = `${e.clientY - this.toolbarDisY }px`
            // this.toolbarLeft = `${e.clientX - this.toolbarDisY}px`
        }

    },
};
</script>

<style scoped lang="less">
    .sketchpad{
        background:rgba(0,0,0,.7);
        .canvas-contaiter{
            width: 90%;
            height: calc(100vh - 20px);
            margin: 0 auto;
            overflow: auto;
            position: relative;
        }
        canvas {

        }
        .toolbar{
            box-sizing: border-box;
            position:absolute;
            width: 800px;
            height: 30px;
            background-color: #f5f5f5;
            display: flex;
            .movebutton{
                width: 10px;
                height: 30px;
                cursor: move;
                background-color: red;
            }
        }
    }
    /*定义滚动条高宽及背景
    高宽分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar {
        width: .5rem;
        height: .5rem;
        background-color:#F5F5F5;
    }
    /*定义滚动条轨道
    内阴影+圆角*/
    ::-webkit-scrollbar-track {
        border-radius: 0;
    }
    /*定义滑块
    内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 0;
        background-color: rgba(95,95,95,.4);
        transition: all .2s;
        border-radius: .5rem;
        &:hover {
            background-color: rgba(95,95,95, .7);
        }
    }





</style>
