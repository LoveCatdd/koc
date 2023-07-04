<template>
    <ContentBase class="lightdark">
        <div class="row center-">
            <div class="col-1"></div>
            <div class="col-3">
                <nav class="flex-column align-items-stretch border- fixedDiv- scroll-container">
                    <nav class="nav nav-pills flex-column">
                        <a class="nav-link" href="#item-1">第一步，怎样设置一盘棋</a>
                        <a class="nav-link" data-bs-toggle="collapse" href="#collapse-1">第二步，棋子怎样移动</a>
                        <nav class="nav nav-pills flex-column ">
                            <a id="collapse-1" class="nav-link ms-3 my-1 collapse " href="#King">王 King</a>
                            <a id="collapse-1" class="nav-link ms-3 my-1 collapse " href="#Queen">后 Queen</a>
                            <a id="collapse-1" class="nav-link ms-3 my-1 collapse " href="#Rook">车 Rook</a>
                            <a id="collapse-1" class="nav-link ms-3 my-1 collapse " href="#Bishop">象 Bishop</a>
                            <a id="collapse-1" class="nav-link ms-3 my-1 collapse " href="#Knight">马 Knight</a>
                            <a id="collapse-1" class="nav-link ms-3 my-1 collapse " href="#Pawn">兵 Pawn</a>
                        </nav>

                        <a class="nav-link" data-bs-toggle="collapse" href="#collapse-2">第三步。发现棋的特殊规则</a>
                        <nav class="nav nav-pills flex-column">
                            <a id="collapse-2" class="nav-link ms-3 my-1 collapse" href="#升变">升变</a>
                            <a id="collapse-2" class="nav-link ms-3 my-1 collapse" href="#吃过路兵">吃过路兵</a>
                            <a id="collapse-2" class="nav-link ms-3 my-1 collapse" href="#车王易位">车王易位</a>
                        </nav>

                        <a class="nav-link" href="#item-4">第四步，找出谁走出了第一步</a>

                        <a class="nav-link" data-bs-toggle="collapse" href="#collapse-3">第五步，复习如何赢棋的规则</a>
                        <nav class="nav nav-pills flex-column">
                            <a id="collapse-3" class="nav-link ms-3 my-1 collapse" href="#将杀">将杀</a>
                            <a id="collapse-3" class="nav-link ms-3 my-1 collapse" href="#和棋">和棋</a>
                        </nav>

                        <a class="nav-link" data-bs-toggle="collapse" href="#collapse-4">第六步，学习国际象棋基础战略</a>
                        <nav class="nav nav-pills flex-column">
                            <a id="collapse-4" class="nav-link ms-3 my-1 collapse" href="#保护你的王">保护你的王</a>
                            <a id="collapse-4" class="nav-link ms-3 my-1 collapse" href="#不要随意丢子">不要随意丢子</a>
                            <a id="collapse-4" class="nav-link ms-3 my-1 collapse" href="#控制棋盘的中心">控制棋盘的中心</a>
                            <a id="collapse-4" class="nav-link ms-3 my-1 collapse" href="#使用你所有的棋子">使用你所有的棋子</a>
                        </nav>

                        <a class="nav-link" href="#item-7">第七步，大量的实战练习</a>
                    </nav>
                </nav>
            </div>

            <div class="col-7 border-">
                <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true"
                    class="scrollspy-example-2" tabindex="0">
                    <div id="item-1">
                        <h4>第一步，怎样设置一盘棋</h4>
                        <p>在对局开始前，棋盘应正确摆放。使得每位棋手的右手端的底线格为白色（浅色）。</p>
                        <img src="../../../public/images/rule/1.png" class="mx-auto center-">
                        <p>之后棋子按已有规则依次摆放。
                            倒数第二行横线（行）全部摆放兵。车放在底线两端的角落，然后两个马挨着车，然后是象挨着马，最后是后，后永远摆放在和自己棋子颜色一致的格子中（例如白后放在白格中，黑后放在黑格中），之后王放在最后剩下的那一个空格里。
                        </p>
                        <img src="../../../public/images/rule/2.gif" class="mx-auto center-">
                        <i>在游戏开始的时候设置棋子真的很容易。</i>
                    </div>
                    <hr>
                    <div id="item-2">
                        <h4>第二步，棋子怎样移动</h4>
                        <p>6种不同的棋子都有不同的走法。棋子不能穿过其他棋子（不过马可以跳过其他棋子），而且不能移动至己方棋子占据的格子。然而，它们却可以走过去占领对方棋子的位置，对方棋子就被吃掉。棋子一般被移动至这样的位置：它们可以吃掉其他棋子（走到对方棋子的格子并取而代之），保护己方棋子以防被吃，或控制棋局中重要的格子。
                        </p>
                    </div>
                    <div id="King">
                        <h5>王 King</h5>
                        <p>国王是最重要的棋子，但也是最弱的棋子。只能在自己360°范围移动一格。国王不会自己去照将（他被将军的格子）。当国王被其他棋子攻击时，被称为“将军”。
                        </p>
                        <img src="../../../public/images/rule/3.gif" class="mx-auto center-">
                    </div>
                    <div id="Queen">
                        <h5>后 Queen</h5>
                        <p>皇后是最强的棋子。她可以在任何直线方向尽可能地移动。上下左右斜线，相当于象加车的行棋范围。当然，和其它棋子一样，皇后吃子后她的回合就结束了。注意下图皇后的走法。注意白皇后是如何吃黑皇后并逼迫黑王移动的。
                        </p>
                        <img src="../../../public/images/rule/4.gif" class="mx-auto center-">
                    </div>
                    <div id="Rook">
                        <h5>车 Rook</h5>
                        <p>车像中国象棋的车一样可以前后左右沿直线无限行走。车是一个攻击力很强的棋子，尤其在两个车之间没有棋子使两个车能互相保护的时候。</p>
                        <img src="../../../public/images/rule/5.gif" class="mx-auto center-">
                    </div>
                    <div id="Bishop">
                        <h5>象 Bishop</h5>
                        <p>象可以尽情的移动，但只限于斜线。每个象的起始格子颜色决定了它所能活动的格子颜色。两个象协同作战威力巨大，因为它们的活动范围能覆盖到对手的弱点。</p>
                        <img src="../../../public/images/rule/6.gif" class="mx-auto center-">
                    </div>
                    <div id="Knight">
                        <h5>马 Knight</h5>
                        <p>马的着法与其他棋子非常不一样 —— 在一个方向上移两格，然后转90度角移一格，呈"L"字型。马也是唯一能够越子的棋子。</p>
                        <img src="../../../public/images/rule/7.gif" class="mx-auto center-">
                    </div>
                    <div id="Pawn">
                        <h5>兵 Pawn</h5>
                        <p>兵和其他棋子比较特殊，因为他吃子和走棋都和其他棋子不太一样：兵是向前走棋，但是却是斜着吃子。除了第一步可以一下最多走两步以外，兵只能一次向前走一步。兵只能吃他斜上方一格的棋子。兵只能向前不能后退。如果有棋子在兵的正前方，兵并不能越过这个棋子移动或者把这个棋子吃掉。
                        </p>
                        <img src="../../../public/images/rule/8.gif" class="mx-auto center-">
                    </div>
                    <hr>

                    <div id="item-3">
                        <h4>第 3 步。发现国际象棋的特殊规则</h4>
                        <p>国际象棋中有一些特殊的规则，乍一看似乎不合逻辑。它们的创建是为了使游戏更加有趣和有趣。</p>
                    </div>
                    <div id="升变">
                        <h5>升变</h5>
                        <p>兵还有一个特殊的能力就是当它挺近对方底线的时候便可以变为除王外的其他任何棋子（叫做升变）。</p>
                        <img src="../../../public/images/rule/9.jpeg" class="mx-auto center-">
                        <p>一个常见的偏见是，兵只能做兑子或被吃掉的牺牲品。但并不是那样。一个兵通常都会升变为后。而且只有兵可以被升变！</p>
                        <img src="../../../public/images/rule/10.gif" class="mx-auto center-">

                    </div>
                    <div id="吃过路兵">
                        <h5>吃过路兵</h5>
                        <p>最后一条关于兵的特殊走法叫吃过路兵，这一叫法来自法语。如果并从起始位置一下子走了两格，如果所到的格统一横线有对方的兵并列，那对方的兵就能立刻沿斜线跳到你的兵的正后方一个并把你的兵吃掉。</p>
                        <img src="../../../public/images/rule/11.jpeg" class="mx-auto center-">
                        <p>这条特殊行棋规则必须在对方兵走后该你下的这一回合马上吃这个兵，要是不吃的话下一回合就没法吃了。点击下面的例子以便更好的学习这一重要特殊走法。</p>
                        <img src="../../../public/images/rule/12.gif" class="mx-auto center-">
                    </div>
                    <div id="车王易位">
                        <h5>车王易位</h5>
                        <p>另一个特殊的规则叫车王易位。这一步可以帮你做到两件事：让你的王安全（但愿吧），让你的车离开角落投入战斗。当一名棋手将自己的王向右（左）移动两格，那么右（左）边的车将紧挨在王的左（右）侧，（参见下面的例子。）当然，为了完成车王易位，下面的条件必须满足：
                        </p>
                        <ul>
                            <li>这应该是国王的第一步</li>
                            <li>这应该是车的第一步</li>
                            <li>王车易位时王与车之间不能有任何棋子</li>
                            <li>王车易位时王与车之间不能有任何棋子</li>
                        </ul>
                        <p>注意，当你王车易位后国王离棋盘边缘更近的一侧易位叫王翼易位（短易位）。越过王后所在格一侧的易位叫后翼易位（长易位）。不管选择哪边易位，易位时王都是只移动两个格子。</p>
                        <img src="../../../public/images/rule/13.gif" class="mx-auto center-">

                    </div>
                    <hr>

                    <div id="item-4">
                        <h4>第四步，找出谁走出了第一步</h4>
                        <p>执白的玩家先行棋。因此，大多数人是靠运气来决定谁来执白。例如抛硬币和一个人猜另一个人手里棋子的颜色。白先行棋，然后是黑棋，然后又是白棋，黑棋，循环往复直到游戏结束。白棋先行的确是一个微小的优势，它让棋手可以率先发动攻势。
                        </p>
                    </div>
                    <hr>

                    <div id="item-5">
                        <h4>第五步，复习如何赢棋的规则</h4>
                        <p>有几种方法可以结束一场比赛: 通过将军、平局、投降、按时失利....</p>
                    </div>
                    <div id="将杀">
                        <h5>将杀</h5>
                        <p>如前所述，游戏的目的是把对方的王将死。如果无法避开将军，王即被将死。王有三种应将的方式: 一是移到另一格
                            (此时不能王车易位！)，二是用其他棋子挡住将军，三是把将军的棋子吃掉。如果王无法避开将军，棋局即告负。通常王不必被吃子或从棋盘上移走，仅宣告对局结束。</p>
                        <img src="../../../public/images/rule/14.gif" class="mx-auto center-">
                        <i>"傻瓜的命运" 的例子</i>
                    </div>
                    <div id="和棋">
                        <h5>和棋</h5>
                        <ul>
                            <li>当轮到一方棋手走棋时，他的王没有处在被将军状态，但是除了送将外没有任何其他合规步法时即为逼和。</li>
                        </ul>
                        <img src="../../../public/images/rule/15.png" class="mx-auto center-">
                        <i>随着 qc7 的这一步, 黑子没有受到威胁, 也不能动。比赛因僵局而宣布为平局。</i>
                        <ul>
                            <li>棋手可能同意和棋并停止比赛</li>
                            <li>棋手可能同意和棋并停止比赛</li>
                            <li>棋手可能同意和棋并停止比赛</li>
                            <li>棋手可能同意和棋并停止比赛</li>

                        </ul>
                    </div>
                    <hr>

                    <div id="item-6">
                        <h4>第六步，学习国际象棋基础战略</h4>
                        <p>每位棋手都应该知道的四个简单事情:</p>
                    </div>
                    <div id="保护你的王">
                        <h5>保护你的王</h5>
                        <p>让国王躲进棋盘角落通常会让他更安全。不要太晚王车易位，你应当尽可能早地进行王车易位。记住，即使你下一步就能把对方将死，但前一步已被对方将死也毫无用处。</p>
                    </div>
                    <div id="不要随意丢子">
                        <h5>不要随意丢子</h5>
                        <p>不要粗心大意丢子！每个棋子都是有用的，没有棋子无法完成将杀。有一个简单的系统，大多数棋手用它来记录每个棋子的相对价值。这些棋子值多少分呢？</p>
                        <ul>
                            <li>兵值1分</li>
                            <li>马值3分</li>
                            <li>马值3分</li>
                            <li>象值3分</li>
                            <li>车值5分</li>
                            <li>后值9分</li>
                            <li>王是无价的</li>
                        </ul>
                        <p>这套计分系统在对局结束后并没有什么实际意义，这只是在对局中为了帮助你更好的做出判断以便知道什么时候应当吃子，换子或者走其他步。</p>
                        <img src="../../../public/images/rule/16.gif" class="mx-auto center-">
                    </div>
                    <div id="控制棋盘的中心">
                        <h5>控制棋盘的中心</h5>
                        <p>你应当用兵和其他棋子配合努力控制棋盘中心。如果你能控制住中心，你可以有更多的空间调配你的子力，并让你的对手没有好的位置去移动调配他（她）的棋子。在上面的例子中，白棋为了控制中心走棋都是好棋，而黑棋的走棋都不是很好。
                        </p>
                    </div>
                    <div id="使用你所有的棋子">
                        <h5>使用你所有的棋子</h5>
                        <p>在上例中，白方在对局中投入了所有棋子！你的棋子还在第一排没有发挥作用。尝试使用所有的棋子布局，就有更多的选择攻击对方的王。仅仅使用一两个棋子无法对抗像样的对手。</p>
                    </div>
                    <hr>

                    <div id="item-7">
                        <h4>第七步，大量的实战练习</h4>
                        <p>大量的实战是让你的棋艺突飞猛进的黄金法则！无论你是在家里和朋友和家人在一起玩，还是在线上玩这都无所谓，但这都是以大量实战为基础的。你可以很容易在这开始一盘线上对局！</p>
                    </div>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
    </ContentBase>
</template>
  
<script>
import ContentBase from '@/components/ContentBase.vue';
export default {
    name: 'RuleView',
    components: {
        ContentBase,
    }
}
</script>
  
<style scoped>
.lightdark {
    background-color: #312E2B;
    border-radius: 0%;
}


.center- {
    display: flex;
    justify-content: center;
    align-content: center;
}

.border- {
    border-right-width: 0px;
    background-color: #272522;
    padding: 25px;
}

.fixedDiv- {
    position: sticky;
    top: 100px;
}


div {
    color: azure;
}

a {
    color: rgb(57, 195, 254);
}

img {
    max-width: 100%;
    /* 图片的最大宽度不超过容器的宽度 */
    max-height: 400px;
    /* 图片高度保持和容器一致 */
    display: block;
    /* 让图片以块级元素显示，使宽度属性生效 */
    margin: 15px auto;
    /* 水平居中图片 */
}

.scroll-container {
    max-height: 800px;
    /* 设置最大高度为视窗高度 */
    overflow: auto;
    /* 或 overflow: scroll; */
}

i {
    display: flex;
    justify-content: center;
    align-content: center;
}

h4 {
    font-weight: bold;
    font-size: 20px;
    margin: 18px;
    margin-left: 5px;
}

h5 {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 15px;
}

p {
    margin: 15px 15px;
    color: azure;
}

a:hover {

    color: azure;
}
</style>