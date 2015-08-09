/**
 * Created by Administrator on 2015/8/5 0005.
 */
$(document).ready(function(){


    var tables=$("#searchBusin >div").find("table");
    $("#searchBusin >div").delegate('span','click',function(){
        if($(this).next().css('display')=='table'){
            $(this).next().css('display','none');
        }else{
            $(this).next().css('display','table');
            $("#searchBus >div").css('margin-top','10px');
        }
        if(tables.eq(0).css('display')=='none'&&tables.eq(1).css('display')=='none'&&tables.eq(2).css('display')=='none'){
            $("#searchBus >div").css('margin-top','200px');
        }
    });


});
