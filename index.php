<?php
	require 'sqlconnect.php';
	require 'index.html';

  	function search(){
  		$sql='select * from log';
  		$res=mysql_fetch_assoc(mysql_query($sql));
  		setcookie("name",$res['name'],time()+60);
  		
  		$php_json=json_encode($res);
  		var_dump($php_json);
  		
  		$php_parse=json_decode($php_json);
  		var_dump($php_parse);
  		
  		print_r($res);
  	};
   /*  function a(){
    	search();
    }
    a(); */
  	
  	if (isset($_COOKIE['name'])){
  		echo $_COOKIE['name'];
  	}
  	else {
  		echo 'cookie 未设置成功';
  	}  	
?>