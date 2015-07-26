<?php
	require 'sqlconnect.php';
	require 'dbaccess.php';
	require 'bookbus.html';
	error_reporting(0);
	
	$DB=new DB();
	
	$link="select * from log";
	$re=$DB->execsql($link);
	
	$name=$_POST['username'];

	echo $_POST['name'];
	
	
	

