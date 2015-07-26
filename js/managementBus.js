/**
 * Created by Administrator on 2015/7/26 0026.
 */
window.onload=function(){
    var gl={
        manameinput:document.getElementById("maname").lastElementChild,
        manamespan:document.getElementById("maname").firstElementChild
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







};