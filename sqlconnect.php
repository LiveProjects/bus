<?php
$link=mysql_connect('localhost','root','') or die('连接失败'.mysql.error());

function showMes(){
	echo mysql_get_client_info()."<br/>";//数据库版本信息
	echo mysql_get_host_info()."<br/>";//服务器连接类型
	echo mysql_get_proto_info()."<br/>";//通信协议版本信息
	echo mysql_get_server_info()."<br/>";//mysql服务器版本

	echo mysql_client_encoding()."<br/>";//客户端使用的默认字符集
	echo mysql_stat()."<br/>";//mysql服务器当前工作状态

	/* mysql_close(); */
}

mysql_select_db('log',$link)or die("数据库选择失败".mysql_error());

