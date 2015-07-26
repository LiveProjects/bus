<?php
	require 'sqlconnect.php';
	require 'dbaccess.php';
	$DB=new DB();
	
	$link="select * from t_hs_busline";
	$re=$DB->execsql($link);
	
	//echo json_encode($re);
	
	$arr=array(
			'name'=>'asd',
			'age'=>123,
			'sex'=>'男'
	);
	$as=$_GET['name'];
	
	/* echo $as; */
	//echo json_encode($arr);
	echo json_encode($as);
	