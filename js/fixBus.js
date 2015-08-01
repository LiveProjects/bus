/**
 * Created by Administrator on 2015/7/27 0027.
 */
window.onload=function(){

    gl={
        adddate:document.getElementById("fixdate").lastElementChild,
        addtimeUl:document.getElementById("fixtime").lastElementChild,
        parkOl:document.getElementById("fixname").lastElementChild,
        parkListul:document.getElementById("parkListul"),
        needname:sessionStorage.getItem('name'),
        downadddate:document.getElementById("adddateval"),
        downaddtime:document.getElementById("addtimeval"),
        downaddpark:document.getElementById("parkval"),
        subfixbtn:document.getElementById("submitBtn"),
        randomcolor:function(){
            var arr=['#843534','#66512c','#FF8F00','#c1e2b3'];
            return arr;
        },
        whichDay:new Date(),
        makeday:function(num){
            var datefra=document.createDocumentFragment();

            for(;num<=7;num++){
                var colorSE=Math.floor(Math.random()*4);
                var li=document.createElement("li");
                var txt=document.createTextNode('2015-8-1');
                li.appendChild(txt);
                li.style.backgroundColor=gl.randomcolor()[colorSE];
                datefra.appendChild(li);
            }
            gl.adddate.appendChild(datefra);

        },
        addtimefragment:document.createDocumentFragment()
    };
    /*全局属性设置*/
    (function(){
        parkListul.style.height=gl.height+'px';
    })();
    /*********初始化个人数据********************************/
    (function(){
        gl.downadddate.innerHTML=sessionStorage.getItem('fixdate');
        gl.downaddtime.innerText=sessionStorage.getItem('fixtime');
        gl.downaddpark.innerText=sessionStorage.getItem('fixadd');
    })();


    /********加载初始化的数据*******************************/
    $.ajax({
        url:'json.php',
        dataType:'json',
        Type:'POST',
        success:function(data){
            console.log(data);

            /* 添加加班时间*/
            var arr=data['addtime'];
            console.log("------time------");
            console.log(arr);
            arr.forEach(function(item,index,arr){
                console.log(arr[index]['FTime'].substr(0,6));
                var colorSE=Math.floor(Math.random()*4);
                //console.log(gl.randomcolor()[colorSE]);
                //gl.randomcolor()[colorSE]
                //var li="<li style='background-color: " + gl.randomcolor()[colorSE] + "'>6:00</li>";
                //gl.addtimefragment.appendChild(li);
                /* 添加加班时间*/
                var li = document.createElement("li");
                var text = document.createTextNode(arr[index]['FTime'].substr(0,6));
                li.appendChild(text);
                li.style.backgroundColor=gl.randomcolor()[colorSE];
                gl.addtimefragment.appendChild(li);
            });
            gl.addtimeUl.appendChild(gl.addtimefragment);
            /* 添加班车下车地点 */
            var spot=data['addBS'];
            var parkListulfrag=document.createDocumentFragment();
            spot.forEach(function(item,index){
                //console.log(item['FName']);
                var li=document.createElement("li");
                var txt=document.createTextNode(item['FName']);
                li.appendChild(txt);
                parkListulfrag.appendChild(li);
            });
            gl.parkListul.appendChild(parkListulfrag);

            /* 设置用户常用下车地点*/
            //alert(spot[0]['FName']);
            //测试
            function tr(){
                for(var i=0;i<3;i++){
                    localStorage.removeItem('usually'+i);
                }
            }
            (function () {
                if(!localStorage.getItem('usually0')){
                    localStorage.setItem('usually0',spot[0]['FName']);
                    localStorage.setItem('usually1',spot[1]['FName']);
                    localStorage.setItem('usually2',spot[2]['FName']);
                }
                //console.log(localStorage.getItem('usually'));
                var parkfrag=document.createDocumentFragment();
                for(var i=0;i<4;i++){
                    var li=document.createElement("li");
                    if(i==3){
                        var txt=document.createTextNode("其他");
                    }else{
                        var txt=document.createTextNode(localStorage.getItem("usually"+i));
                    };
                    li.appendChild(txt);
                    parkfrag.appendChild(li);
                }
                gl.parkOl.appendChild(parkfrag);
                gl.parkOl.lastElementChild.setAttribute('id','showParklist');
                //gl.parkOl.lastElementChild.setAttribute('onclick','addclass()')
            }())
        }
    });

    (function(){
        /* 添加加班日期*/
        var whichDay=gl.whichDay.toString().substr(0,2);
        var whichDayrel;
        switch (whichDay){
            case 'Mo':gl.makeday(1);break;
            case 'Tu':gl.makeday(2);break;
            case 'We':gl.makeday(3);break;
            case 'Th':gl.makeday(4);break;
            case 'Fr':gl.makeday(5);break;
            case 'Sa':gl.makeday(6);break;
            case 'Su':gl.makeday(7);break;
            default :break;
        }

    })();

    /*设置离线下车地点,更人性化是放到预订成功之后*/
    $("#parkListul").delegate('li','click',function(){
        var parkval=$(this).text();
        if(parkval!=localStorage.getItem('usually0')&&parkval!=localStorage.getItem('usually1')&&parkval!=localStorage.getItem('usually2')){
            localStorage.setItem('usually2',localStorage.getItem('usually1'));
            localStorage.setItem('usually1',localStorage.getItem('usually0'));
            localStorage.setItem('usually0',parkval);
        }
        console.log(localStorage.getItem('usually0'));
    });


    /*用户删除数据对应值*/
//    $.ajax({
//        url:'',
//        Typs:'POST',
//        data:{
//            needname:gl.needname
//        },
//        success:function(data){
//            alert(data);
//        }
//    });

    /*时间委托部分以后用原生js代替*/
    $("#fixdate ul").delegate('li','click',function(){
        var valdate=$(this).text();
        //alert(valdate);
        $(this).parent().prev().find("b").text(valdate);
    });
    $("#fixtime ul").delegate('li','click',function(){
        var valtime=$(this).text();
        //alert(valdate);
        $(this).parent().prev().find("b").text(valtime);
    });
    $("#fixname ol").delegate('li','click',function(){
        if($(this).text()!='其他'){
            var valpark=$(this).text();
            $(this).parent().prev().find("b").text(valpark);
        }
    });
    $("#parkList ul").delegate('li','click',function(){
        var valparkList=$(this).text();
        //alert(valdate);
        $("#parkval").text(valparkList);
    });

    $("#fixname ol").delegate('li#showParklist','click',function(e){
        //alert(13);
        e.stopPropagation();
        e.cancelBubble=true;
        $("#parkList").addClass("showlist");
    });
    /*隐藏边栏*/
    document.onclick=function(){
        parkList.removeAttribute('class','showlist');
    };

    /**********提交修改数据************************/

    gl.subfixbtn.onclick=function(){
        $.ajax({
            url:'fixBus.php',
            dataType:'',
            Type:'POST',
            data:{
                //四个值:姓名，加班日期、时间、下车地点+修改前的预约日期
            	'FRDate':sessionStorage.getItem('fixdate'),
                'fixname':sessionStorage.getItem('name'),
                'fixdate':gl.downadddate.innerText,
                'fixtime':gl.downaddtime.innerText,
                'fixpark':gl.downaddpark.innerText
            },
            beforeSend:function(){
                alert("---提交的数据为------"+gl.downadddate.innerText+gl.downaddtime.innerText+gl.downaddpark.innerText)
            },
            success:function(data){
//                alert(data);
                console.log(data);
                if(data==1){
                	alert("修改成功");
                	window.location.href='managementBus.html';
                }else if(data==0){
                	alert("修改失败，请联系技术支持");
                }else{
                	alert("请检查空项");
                }
            },
            error:function(err){
                alert("请检查网络是否连接");
            }
        })
    };




/* 发送修改值*/
/*    !function(){
        $.ajax({
            url:'',
            dataType:'json',
            Type:'POST',
            //三个值
            success:function(data){
                alert(data);
            },
            error:function(err){
                alert("请检查网络是否连接");
            }
        })
    }()*/


};
