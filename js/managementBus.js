/**
 * Created by Administrator on 2015/7/26 0026.
 */
window.onload=function(){
    var gl={
        manameinput:document.getElementById("maname").lastElementChild,
        manamespan:document.getElementById("maname").firstElementChild,
        upname:document.getElementById("maname").lastElementChild.value
    };
    console.log(gl.manameinput.nodeName);
    console.log(gl.manamespan.nodeName);
    /*gl.manameinput.onfocus=function(){
        alert(ad)
    };*/
    if(gl.manameinput.value!=""){
        gl.manamespan.style.cssText="top:-100%;font-size:1.2rem;color:white;left:2px;";
    }
    gl.manameinput.addEventListener('focus',function(){
        gl.manamespan.style.top="-100%";
        gl.manamespan.style.fontSize="1.2rem";
        gl.manamespan.style.color="white";
        gl.manamespan.style.left="2px";
    },false);

    gl.manameinput.addEventListener('blur',function(){
        //console.log(gl.manameinput.value);
        if(gl.manameinput.value==''){
            gl.manamespan.style.top="0";
            gl.manamespan.style.left="10px";
            gl.manamespan.style.fontSize="1.4em";
            gl.manamespan.style.color="#888888";
            console.log(123);
        }else if(gl.manameinput.value!=''){
            console.log("err");
        }

    },false);

    /*初始化数据ajax jquery备用*/
    /*(function(){
        $.ajax({
            url:'',
            Type:'POST',
            dataType:'json',
            success:function(data){
                console.log(data);
            },
            error:function(err){
                alert(err);
            }
        })
    })();*/

    function createLink(){//函数声明
        if(window.ActiveXObject){
            var newRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }else{
            var newRequest = new XMLHttpRequest();
        }
        return newRequest;
    };
    /*gl.submitbtn.onclick=function(e){
        e.stopPropagation();
        e.cancelBubble=true;
    };*/

    /*主动初始化数据*/
    (function(){
        //发送请求
        var http_request = createLink();//创建一个ajax对象
        if(http_request){
            var url='json.php';
            var arr={'name':'lio','age':'123'};

            var data=arr;
            http_request.open("post",url,true);
            http_request.setRequestHeader("content-type","application/x-www-form-urlencoded");


            //指定一个函数来处理从服务器返回的结果
            http_request.onreadystatechange = dealresult; //此函数不要括号,当状态发生变化时触发函数,相当于->
            /*http_request.onreadystatechange=function(){
                dealresult();
            };*/
            //发送请求
            http_request.send(data);
        };

        //处理返回结果
        function dealresult(){
            console.log(http_request.readyState);
            if (http_request.readyState!=4) {
                console.log('还未返回正确结果');
                var load=setInterval(function(){
                    console.log("正在加载.....");
                },1000)

            }else if(http_request.readyState==4){
                //等于200表示成功
                clearInterval("load");
                if(http_request.status==200){
                    if(http_request.responseText=="no"){
                        alert("删除成功");
                        return;
                    }
                    /*var res = eval("("+http_request.responseText+")");*/
                }
            }
        }
    })();

    /*删除数据*/

    $("#mainShow").find("b.de").find("button").click(function(){
        var that=$(this);
        $.ajax({
            url:'managementBus.php?act=DEL',
            Type:'POST',
            dataType:'json',
            beforeSend:function(){
                alert("要删除的日期是"+that.parent().parent().prev().find("div:last-child").find("p").text());
            },
            data:{
            		//姓名+加班日期
                'name':'lio',
                'FID':that.parent().parent().prev().find("div:last-child").find("p").text()
            },
            success:function(data){

                that.parent().parent().remove();
            },
            error:function(err){
                alert("删除不成功");
            }
        })
    });
    /*修改数据*/
    $("#mainShow").find("b.de").next().find('button').click(function(){
        /*确定用户数据*/
        //姓名+加班日期
        sessionStorage.setItem('name','lio');
        sessionStorage.setItem('date',$(this).parent().parent().prev().find("div:last-child").find("p").text());
        alert("临时数据为"+sessionStorage.getItem('name')+sessionStorage.getItem('date'));

        /*初始填充值*/
        sessionStorage.setItem('fixdate',$(this).parent().parent().prev().find("div:last-child").find("p").text());
        sessionStorage.setItem('fixtime',$(this).parent().parent().prev().find("div:first-child").find("p").text());
        sessionStorage.setItem('fixadd',$(this).parent().parent().parent().children("div").find("input").val());

        alert("初始化的数据为:"+sessionStorage.getItem('fixdate')+sessionStorage.getItem('fixtime')+sessionStorage.getItem('fixadd'));



        location.href="fixBus.html";

    });



    /*for layout*/
    document.getElementById("maname").lastElementChild.style.textIndent="10px";
};