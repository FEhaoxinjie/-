~function () {
    //声明变量
    var leftInBtn = document.getElementById('leftIn'),
        rightInBtn = document.getElementById('rightIn'),
        leftOutBtn = document.getElementById('leftOut'),
        rightOutBtn = document.getElementById('rightOut'),
        inputInfo = document.getElementById('info'),
        queueData = document.getElementById('queueData'),
        sortBtn = document.getElementById('sortBtn'),
        ary = [],
        n=0;
    
    //绑定按钮点击事件
    leftInBtn.onclick = rightInBtn.onclick = renderNum;
    leftOutBtn.onclick = rightOutBtn.onclick = deleNum;
    sortBtn.onclick = function () {
        if (n==1){
            return;
        }  //阻止重复点击行为
        sort();}


    
    //往队列中添加数字;
    function renderNum() {
          n=0;
        if (ary.length >= 60) {
            alert('队列数量已超过最大限制！')
            return;
        }
        if (!isNaN(inputInfo.value) && inputInfo.value !== '' && (inputInfo.value <= 100 && inputInfo.value >= 10)) {
            this === leftInBtn ? ary.unshift('<li' + ' style=' + '"' + 'height:' + inputInfo.value * 2 + 'px' +';'+'background-color: red '+'"' + '>' + '<span>' + inputInfo.value + '</span>' + '</li>') : ary.push('<li' + ' style=' + '"' + 'height:' + inputInfo.value * 2 + 'px' +';'+'background-color: red '+'"' + '>' + '<span>' + inputInfo.value + '</span>' + '</li>');
            queueData.innerHTML = ary.join('');
        }
        else {
            alert('必须输入有效的数字！');
        }

        inputInfo.value = null;
        liDele();
    }

    //删除队列中的数字；
    function deleNum() {

        if (ary.length === 0) {
            alert('没有要删除的数据！');
            return;
        }
        ;
        this === leftOutBtn ? alert('删除的左侧第一个数字：' + (/(\d+)/.exec(ary.shift())[1]) / 2) : alert('删除的右侧第一个数字：' + /(\d+)/.exec(ary.pop())[1] / 2);
        console.log(ary);
        queueData.innerHTML = ary.join('');
        liDele();
    }

    
    //点击队列中的li删除对应的li;
    function liDele() {
        var liList = queueData.getElementsByTagName('li');
        for (var i = 0; i < liList.length; i++) {
            var cur = liList[i];
            cur.nindex = i;

            cur.onclick = function () {
                ary.splice(this.nindex, 1);
                queueData.removeChild(this);
                for (var i = 0; i < liList.length; i++) {
                    var car = liList[i];
                    car.nindex = i;
                }
            }

        }
    }
    
    //对队列进行排序并将排序过程可视化；
    function sort() {

            var timer=null,dataAry=[],i=0,oldAry=null;
        ary= bubbleSort(ary);
        function bubbleSort(thisAry) {
            for (var i = 0; i < thisAry.length-1; i++) {
                
                for (var j = 0; j < thisAry.length - i - 1; j++) {
                    //因为数组中存储的是字符串，通过正则捕获出数字进行比较；
                    var cur = Number(/(\d+)/g.exec(thisAry[j])[1]),
                        next = Number(/(\d+)/g.exec(thisAry[j + 1])[1]);
                    
                    if (cur > next) {
                        //将当前此次比较中较大的值对应的li改变背景色；
                        thisAry[j]=thisAry[j].replace('background-color: red','background-color: green');
                        //冒泡交换
                        var temp = null;
                        temp = thisAry[j];
                        thisAry[j] = thisAry[j + 1];
                        thisAry[j + 1] = temp;
                    }
                    else if (cur <=next) {
                        //将当前此次比较中较小的值对应的li恢复默认背景色；
                        thisAry[j]=thisAry[j].replace('background-color: green','background-color: red')
                    }
                    //将每次排序的后数组的不同状态存储下来；
                    dataAry.push(thisAry.toString());
                    
                    //控制 当当前一轮比较结束后把所有的li恢复默认背景色，并存储到数组中；
                    if (j==thisAry.length - i - 2){
                        thisAry=thisAry.join(',').replace('background-color: green','background-color: red').split(',');
                        dataAry.push(thisAry.join());
                    }

                }

            }

            return dataAry;
        }
        
        //设置定时器将数组中存储的排序的状态变化每隔300ms渲染出来
        timer=setInterval(function () {
            if (i>ary.length-1){
                //当渲染完毕后清除定时器，并把原始数组赋值为排序过后的数组以便操作；
                clearInterval(timer);
                ary=ary[ary.length-1].split();
                  alert('排序完成！');

                i=0;
                return;
            }
            queueData.innerHTML=ary[i];
            liDele();
            i+=1;
        },300);

        n+=1;


    }
}();




