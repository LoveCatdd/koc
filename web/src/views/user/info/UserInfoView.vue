<template>
  <ContentField v-if="!$store.state.user.pulling_info">
  <div class="container yuanjiao">
    <div class="row yuanjiao">
      <div class="col-3 yuanjiao">
        <!-- 可以存放头像位置 -->
        <div  id="myDivHead" class="card yuanjiao" style="margin-top: 50px;
            background-color: rgb(234, 218, 119); 
            width: 200px;height: 200px;"> 

           <div style="position: relative;top:210px;background-color: rgb(232, 223, 116);
           width: auto;height: auto;max-width: 200;
           border-radius: 30px;">
           <h4 style="position: relative;left: 13%;top:15%;">爱的深沉</h4></div>
          <div class="card-body yuanjiao">
            <!-- <img :src="$store.state.user.photo" alt="" style="width: 100%;"/> -->
          </div>
        </div>
      </div>
      <div class="col-9 yuanjiao">
        <div class="card yuanjiao" style="margin-top: 20px;">
          <!-- 个人中心 顶部标题栏 -->
          <div class="yuanjiao card-header "  style="background-color: rgb(124, 106, 228);position: relative;top:-2px;" >
            <span style="font-size: 130%;font-weight: 500; color: aliceblue;">个人中心</span>
          </div>
          <div class="card-body">
            <table class="table table-striped table-hover">
            <div style="height: 50px;">
              <!-- 表头 -->
                <thead>
              <tr>
                <td style="font-weight: 500;font-size: 20px;">用户名:</td>
                <td style="font-weight: 500;font-size: 20px;">XXXXX</td>
                
              </tr>
              <tr>
                <td style="font-weight: 500;font-size: 20px;">称号:</td>
                <td style="font-weight: 500;font-size: 20px;"> YYYYY</td>
              </tr>
              </thead>
              <!-- 积分区域 -->
             <div style="position: relative;top:-50px;left:600px;width: auto;height: auto;max-width: 200px;
              ">
              <h3 style="position: relative;left: -45px;background-color: rgb(124, 106, 228);border-radius: 30px;">
                    <font style="color: rgb(255, 255, 255);">积分:{{}}</font></h3>
              </div>
            </div>
            <!-- 换行 分界 -->
            <br>
            <hr >
            <!-- 以下为分界 -->
            <!-- <div style="position: relative;left:0;top:0px;width:auto;height:100px;"> -->
                  <a  class="setBar " href="#3" @click="insert_web_match()">匹配场</a>
                  <a class="setBar" href="#3">排位场</a>
                  <a class="setBar" href="#3">友人场</a>
                  
                  <br>
            <!-- 统计图的形式展示  统计结果  进度条 -->
            <br><br>
                  <a id="setBar" href="#3">胜场数：</a><a id="setBar" href="#3">{{allwincount}}</a><br><br>
                  <a id="setBar" href="#3">总场数：</a><a id="setBar" href="#3">{{allcount}}</a><br><br>
                  <a id="setBar" href="#3">获胜率：</a><a id="setBar" href="#3">{{winpercent}}</a>
                  <!-- 进度条实现 -->
                  <div style="position: relative;left: 400px;top:-40px;">
                    <progress style="color: rgb(24, 244, 244);" id="progress-success" value="50" max="100" ></progress>
                  </div>
                  
                  <hr>
            <!-- 以上为导航栏 -->
            <!-- </div> -->
              <nav>
                <ul style="border-radius: 30px;">
                  <h3 style="position: relative;left: -45px;background-color: rgb(124, 106, 228)">
                    <font style="color: rgb(255, 255, 255);">当前排名</font></h3>
                  <li>1432 名</li>
                 <hr>
                  <h3 style="position: relative;left: -45px;background-color: rgb(124, 106, 228)">
                    <font style="color: rgb(255, 255, 255);">个性名言</font></h3>
                  <li>我开始了在决定性的对局中获胜。可能是因为我认识到一个非常简单的事实：不仅我会紧张，我的对手也会。 --塔尔</li>
                  <hr>
                </ul>
              </nav>
            </table>
          </div>

        </div>

      </div>
    </div>
    <!-- 以下为白色背景的div -->
  </div>  
</ContentField>
</template>
  
  <script>
  // import ContentBase from '@/components/ContentBase.vue';
// 以下为新增导入
import ContentField from "@/components/ContentField.vue";

  export default {
      name: 'UserInfoView',
      components: {
          // ContentBase,
          ContentField,
      },


      // 所用数据
      data() {
        return {
          count: 0 ,   //默认为0 
          allwincount :100+"%",  //默认百分百
          allcount:100,
          winpercent:100+"%",
        }
      },

      // 包含所有方法的对象
      methods: {
        increment() {
          this.count++
        },
        // 后端数据插入web中  分别为  匹配场  排位场  友人场
        insert_web_match()
        {
          this.allwincount = 97
          this.allcount = 100
          this.winpercent =(this.allwincount/this.allcount)*100+"%"
        },
        //排位场
        insert_web_rank()
        {

        },
        //友人场
        insert_web_friend()
        {

        },

      },

      // 扩大范围  对本文件内使用不影响
      mounted() {
        // 在其他方法或是生命周期中也可以调用方法
        this.increment()
      }
    

} // end export

  </script>
  


<style>
  /* 设置圆角 */
  .yuanjiao
{

  border-radius: 30px;
}

.yuanjiao-all
{

  border-radius: 30px;
}

/* 设置行线 */
#setline
{
  color: blue; 
  height: 10px;/* 设置横线的高度 */
  margin: 2px 0; /* 设置横线的上下间距 */ 
}


/* 填充div中的  背景头像 */
#myDivHead {
  background-image: url("https://img.ixintu.com/download/jpg/201912/b77c9a117ddeadd5eeedb522b5ff377e.jpg!ys");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
}

/* 鼠标浏览点击事件处理 */
.setBar{
		/*祛除连接下划线*/
		text-decoration: blink;
		background-color: rgb(124, 106, 228);
		margin: 0px;
		padding: 15px;
		font-size:30px;
    font-weight: 500;
    /* border-radius: 30px; */
	}

  /* 超链接实现 场的切换 */
  .setBar:link{
		/*未点击之前为黄色*/
		color: rgb(244, 222, 116);
	}.setBar:visited{
		/*点击为白色*/
		color: rgb(255, 255, 255);
   }
   .setBar:hover{
		/*鼠标置于链接上时 字体颜色为黑色，背景为白色*/
		background-color: rgb(236, 195, 89);  /*标题 颜色设置*/
		font-style: black;
    color: black;  /*链接里面字体颜色*/
	}
/* 胜率的相关样式 */
  #setBar
  {
    color: white;
    text-decoration: blink;
		background-color: rgb(124, 106, 228);
		margin: 0px;
		padding: 10px;
		font-size:30px;
    font-weight: 500;
    border-radius: 30px;
  }


/* 进度条 */

#progress-success{
  /* top:200px;
            left: 100px; */
            width: 200px;
            height: 34px;
            background: lightseagreen;
            color: lightpink;/*表示已完成进度的颜色*/
            background-color: rgb(169, 170, 170);
            border-radius: 1em;
            overflow: hidden;
}
  </style>