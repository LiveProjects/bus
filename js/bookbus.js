/**
 * Created by Administrator on 2015/7/24 0024.
 */
window.onload=function(){
    var parkList=document.getElementById("parkList");
    var parkListul=document.getElementById("parkListul");

    var gl={
        height:window.innerHeight,
        showParklist:document.getElementById("showParklist"),
        submitbtn:document.getElementById("submitBtn")
    };

    parkListul.style.height=gl.height+'px';

    /*gl.showParklist.addEventListener('click',function(){
        parkList.setAttribute('class','showlist');
    },false);*/

    gl.showParklist.onclick=function(e){
        e.stopPropagation();
        parkList.setAttribute('class','showlist');
    };

    document.onclick=function(){
        parkList.removeAttribute('class','showlist');
    };
    gl.submitbtn.onclick=function(e){
        e.stopPropagation();
        e.cancelBubble=true;

    };
    //创建ajax对象函数
    function createLink(){//函数声明
        if(window.ActiveXObject){
            var newRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }else{
            var newRequest = new XMLHttpRequest();
        }
        return newRequest;
    };

    //发送请求
    var http_request = createLink();//创建一个ajax对象
    if(http_request){
        var url;
        http_request.open("post",url,true);
        http_request.setRequestHeader("content-type","application/x-www-form-urlencoded");

        //指定一个函数来处理从服务器返回的结果
        http_request.onreadystatechange = dealresult; //此函数不要括号,当状态发生变化时触发函数,相当于->
//        http_request.onreadystatechange=function(){
//            dealresult();
//        };
        //发送请求
        http_request.send(data);
        http_request.timeout(2000);
        http_request.ontimeout=function(){
            alert("请检查网络,重新提交");
        }
    };

    //处理返回结果
    function dealresult(){
        console.log(http_request.readyState);
        if (http_request.readyState!=4) {
            console.log('还未返回正确结果');

        }else if(http_request.readyState==4){
            //等于200表示成功
            $("#ajax").hide();
            clearInterval("load");
            if(http_request.status==200){
                if(http_request.responseText=="no"){
                    $("#suggest_ul").hide(0);
                    return;

                }
                $("#suggest_ul").show(0);
                //alert(http_request.responseText);
                var res = eval("("+http_request.responseText+")");
                //alert(http_request.responseText);
                var contents="";
                for(var i=0;i<res.length;i++){
                    var keywords = res[i].keywords;
                    //alert(skey);
                    contents=contents+"<li class='suggest_li"+(i+1)+"'>"+keywords+"</li>";
                }
                //alert(contents);
                $("#suggest_ul").html(contents);
                //$("#suggest_ulk").empty();
                //$("#suggest_ulk").append(contents);
            }
        }
    }





};