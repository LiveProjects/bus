/**
 * Created by Administrator on 2015/7/26 0026.
 */
window.onload=function(){
    var gl={
        manameinput:document.getElementById("maname").lastElementChild,
        manamespan:document.getElementById("maname").firstElementChild,
        upname:document.getElementById("maname").lastElementChild.value,
        mainShowul:document.getElementById("mainShow").lastElementChild,
        factoryval:document.getElementById("factory").firstElementChild,
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
            url:'checkBus.php',
            Type:'',
            dataType:'json',
            data:{'name':'lio'},
            success:function(data){
                console.log(data);
            },
            beforeSend:function(){
            	alert(1234);
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

    /*主动初始化数据*/
    (function(){
        //发送请求
        var http_request = createLink();//创建一个ajax对象
        if(http_request){
            var url='checkBus.php';
            var arr={'name':'lio','age':'123'};

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
            	console.log(http_request.readyState);
                console.log('还未返回正确结果');
                var load=setInterval(function(){
                    console.log("正在加载.....");
                },1000)

            }else if(http_request.readyState==4){
                //等于200表示成功
            	clearInterval("load");
                if(http_request.status==200){
                	
                	console.log(JSON.parse(http_request.responseText));
                	//deal(JSON.parse(http_request.responseText),function(){},function(){})

<<<<<<< HEAD
                	var resdata=JSON.parse(http_request.responseText);
                	var responselen=resdata['check'].length;
                	var rescpm=resdata['company'];
                	gl.factoryval.value=rescpm['name_com'];
                	gl.manameinput.value=rescpm['name_emp'];
                	
                	
                	(function(){
                		for(var i=0;i<responselen;i++){
                    		var li=
                                "<li>"+
        		                    "<div>"+
        		                        "<label for=''>下车地点  <input type='text' value='"+resdata['check'][i]['FStop']+"'" +" disabled/></label>"+"<span>"+resdata['check'][i]['book_name']+"</span>"+
        		                    "</div>"+
        		                    "<span>"+
        		                        "<div>"+
        		                            "<i>加班时间</i>"+
        		                            "<p>"+ resdata['check'][i]['FRTime'] +"</p>"+
        		                        "</div>"+
        		                        "<div>"+
        		                            "<i>加班日期</i>"+
        		                            "<p>"+resdata['check'][i]['FRDate']+"</p>"+
        		                        "</div>"+
        		                    "</span>"+
        		                    "<p>"+
        		                        "<b class='de'><button>删除</button></b>"+
        		                        "<b><button type='reset'>修改</button></b>"+
        		                    "</p>"+
        		                "</li>";
                    		$("#mainShow ul").append(li);
                    	}
                	})()
                	//console.log(gl.mainShowul.innerHTML);
=======
                    var doc=document.createDocumentFragment();

                	var li=
                        "<li>"+
		                    "<div>"+
		                        "<label for=''>下车地点  <input type='text' value='"+'黄岛路'+"'" +" disabled/></label>"+
		                    "</div>"+
		                    "<span>"+
		                        "<div>"+
		                            "<i>加班时间</i>"+
		                            "<p>"+ 123 +"</p>"+
		                        "</div>"+
		                        "<div>"+
		                            "<i>加班日期</i>"+
		                            "<p>"+2014-6-6+"</p>"+
		                        "</div>"+
		                    "</span>"+
		                    "<p>"+
		                        "<b class='de'><button>删除</button></b>"+
		                        "<b><button type='reset'>修改</button></b>"+
		                    "</p>"+
		                "</li>";
>>>>>>> ede4c4263cd7907e328be647c3bb01f3bdd1b59a

                    /*var res = eval("("+http_request.responseText+")");*/
                }
            }
        }
    })();

    /*删除数据*/
    $("#mainShow ul").delegate("li b.de button",'click',function(){
        var that=$(this);
        confirm_=confirm("确定删除此订单");
        if(confirm){
        	 $.ajax({
                 url:'delBus.php',
                 Type:'POST',
                 dataType:'text',
                 beforeSend:function(){
                     alert("要删除的日期是"+that.parent().parent().prev().find("div:last-child").find("p").text());
                 },
                 data:{
                 		//姓名+加班日期
                     'name':gl.manameinput.value,
                     'FRDate':that.parent().parent().prev().find("div:last-child").find("p").text()
                 },
                 success:function(data){
                 	/*that.parent().parent().parent().remove();*/
                     if(data==1){
                     	alert("删除成功");
                     	that.parent().parent().parent().remove();
                     }else {
                     	alert("删除失败，请联系技术支持");
                     }
                 },
                 error:function(err){
                     alert("删除不成功");
                 }
             })
        }
    });
    
    /*修改数据*/
    $("#mainShow ul").delegate("li b:last-child button",'click',function(){
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