<?php
require '../non_get/dbaccess.php';
$DB = new DB ();
/**
 * *******************用户名以及工厂模糊查询*************************************
 */
$firstname = $_GET ['firstname']; // 获取失去焦点后的姓名全拼
$res = array ();
/* $name = $_GET ['name']; // 获取用户输入的部分姓名
$res_name = array (); */

if (isset ( $firstname )) {
	$sql_name_com = "SELECT b.FName FROM t_hs_employee as a inner join t_hs_company as b on a.FCompanyID=b.FID WHERE a.FName =  '" . $firstname . "'";
	$res_name_com = $DB->execsql ( $sql_name_com );
	echo json_encode($res_name_com);
}


/* // 模糊查询人名
if (isset ( $name )) {
	$sql_name_emp = "select FName from t_hs_employee where FName like '%" . $name . "%' limit 10";
	$res_name_emp = $db->execsql ( $sql_name_emp );
}

// 将两个数组存放到一个数组中
$name_com_emp=array("com"=>$res_name_com,"emp"=>$res_name_emp);
echo json_encode($name_com_emp); */
?>