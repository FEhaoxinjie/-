~function () {
    /*声明变量*/
    var leftInBtn = document.getElementById('leftIn'),
    rightInBtn = document.getElementById('rightIn'),
    leftOutBtn = document.getElementById('leftOut'),
    rightOutBtn = document.getElementById('rightOut'),
    inputInfo = document.getElementById('info'),
    queueData = document.getElementById('queueData'),
    ary = [];
    
    /*实现点击左侧入和右侧入和验证数据合法性功能*/
leftInBtn.onclick =rightInBtn.onclick=renderNum;
    function renderNum() {
    if (!isNaN(inputInfo.value) && inputInfo.value !== '') {
        this===leftInBtn?ary.unshift('<li>'+inputInfo.value+'</li>'):ary.push('<li>'+inputInfo.value+'</li>')
        queueData.innerHTML = ary.join('');
        }
    else {
        alert('必须输入有效的数字！');
    }
    inputInfo.value = null;
    liDele();
}
    /*实现左侧出和右侧出功能*/
leftOutBtn.onclick = rightOutBtn.onclick = deleNum;
    function deleNum() {
    if (queueData.innerHTML == '') {
        alert('没有要删除的数据！');
        return;
    } ;
   this===leftOutBtn? alert('删除的左侧第一个数字：'+/(\d+)/.exec(ary.shift())[1]):alert('删除的右侧第一个数字：'+/(\d+)/.exec(ary.pop())[1]);
    queueData.innerHTML = ary.join('');
    liDele();
}
    
    /*实现点击每一项数据删除此项*/
function liDele() {
    var liList=queueData.getElementsByTagName('li');
    for (var i = 0; i < liList.length; i++) {
        var cur = liList[i];
         cur.index=i;
        cur.onclick=function () {
            ary.splice(this.index,1);
               this.style.display='none';
        }
        }
    }
}();




