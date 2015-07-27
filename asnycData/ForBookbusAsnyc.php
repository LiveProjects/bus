<?php 
require '../dbaccess.php';
$DB=new DB();
/*********************用户名以及工厂模糊查询**************************************/
$firstname=$_GET['firstname'];
/* $name=$_GET['name']; */

if(isset($firstname)){
	$link="SELECT FCompanyID FROM t_hs_employee WHERE FName =  '".$firstname."'";
	$res=$DB->execsql($link);
    echo json_encode($res);
};

/* $arr=array(
		'a'=>'123'
);


if (isset($name)){
	echo json_encode($arr); 
} */
	
?>