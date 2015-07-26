<?php
	require 'sqlconnect.php';
	require 'dbaccess.php';
	//error_reporting(0);
	$DB=new DB();
	/*********************用户名以及工厂模糊查询**************************************/
	$firstname=$_GET['firstname'];
	$link="SELECT FCompanyID FROM t_hs_employee WHERE FName =  '".$firstname."'";
	$res=$DB->execsql($link);
	
	echo json_encode($res);
	
	
	
	
	
	
	
	
	
	
	
	
	/***********************测试数据模块 ************************************************/
	/* $arr=array(
			'name'=>'asd',
			'age'=>123,
			'sex'=>'男'
	); */
	//$as=$_GET['name'];
	/* echo $as; */
	//echo json_encode($arr);
	//echo json_encode($as);
	