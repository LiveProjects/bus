/**
 * Created by Administrator on 2015/7/24 0024.
 */
window.onload=function(){
    var parkList=document.getElementById("parkList");
    var parkListul=document.getElementById("parkListul");

    var gl={
        height:window.innerHeight,
        showParklist:document.getElementById("showParklist"),
        submitbtn:document.getElementById("submitBtn"),
        manameinput:document.getElementById("name").lastElementChild,
        manamespan:document.getElementById("name").firstElementChild
    };


    console.log(gl.manameinput.nodeName);
    console.log(gl.manamespan.nodeName);
    /*gl.manameinput.onfocus=function(){
     alert(ad)
     };*/
    gl.manameinput.addEventListener('focus',function(){
        gl.manamespan.style.top="-100%";
        gl.manamespan.style.fontSize="1.2rem";
        gl.manamespan.style.color="black";
        gl.manamespan.style.left="0px";
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
            console.log(13);
        }

    },false);



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
    var as=1234;
    gl.submitbtn.onclick=function(e){
    	e.stopPropagation();
        e.cancelBubble=true;
//        alert('098098');
        $.ajax({
        	url:'json.php',
        	dataType:'json',
        	Type:'POST',
        	data:{
        		"name":"123",
        		"age":"qwe"
        	},
        	beforeSend:function(){
    			//console.log(13);
    		},
        	success:function(data){
//        		alert(data.name);
        		alert(data);
        	},
        	complete:function(){
        		console.log("OK");
        	}
        })
        
    };
    
/*    
    
    	$.ajax({
    		url:'bookbus.php',
    		data:{'name':123},
    		dataType:'json',
    		Type:'get', 
    		beforeSend:function(){
    			alert(13);
    		},
    		success:function(data){
    			alert(data);
    		},
    		error:function(err){
    			console.log(err)
    		}
    	})
    });*/

    /*//创建ajax对象函数
    function createLink(){//函数声明
        if(window.ActiveXObject){
            var newRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }else{
            var newRequest = new XMLHttpRequest();
        }
        return newRequest;
    };
    gl.submitbtn.onclick=function(e){
        e.stopPropagation();
        e.cancelBubble=true;

        //发送请求
        var http_request = createLink();//创建一个ajax对象
        if(http_request){
            var url='bookbus.php';
            var arr=[{qwe:'asd',asd:'123'}];
            var data=arr;
            http_request.open("post",url,true);
            http_request.setRequestHeader("content-type","application/x-www-form-urlencoded");
            

            //指定一个函数来处理从服务器返回的结果
            http_request.onreadystatechange = dealresult; //此函数不要括号,当状态发生变化时触发函数,相当于->
	        http_request.onreadystatechange=function(){
	            dealresult();
	        };
            //发送请求
            http_request.send(data);
        };

        //处理返回结果
        function dealresult(){
            console.log(http_request.readyState);
            if (http_request.readyState!=4) {
                console.log('还未返回正确结果');

            }else if(http_request.readyState==4){
                //等于200表示成功
                clearInterval("load");
                if(http_request.status==200){
                    if(http_request.responseText=="no"){
                        $("#suggest_ul").hide(0);
                        return;
                    }
                    var res = eval("("+http_request.responseText+")");

                }
            }
        }

    };
*/




};