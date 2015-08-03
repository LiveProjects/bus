<?php
require '../non_get/dbaccess.php';
$db = new DB ();
/**
 * *****************预约删除******************
 */
$time = date ( 'H', time () );
// echo $time;die;
if ($time >= 17) {
	die ( '2' );
} else {
	
	$FName = $_GET ['name'];
	$BDate = $_GET ['FRDate'] . ' 00:00:00';
	
	/* $FID = $_GET ['FRDate']; */
	if ( isset($FName) && isset($BDate) ){
		$sql_id = "select FID from t_hs_employee where FName='{$FName}' ";
		$res_id = $db->getrow ( $sql_id );
		
		$sql_del = "delete From t_hs_overwork_reserv where FEmployeeID='{$res_id['FID']}' and FRDate='{$BDate}'";
		/* $sql_del = "delete t_hs_overwork_reserv where FID='{$FID}' "; */
		$res_del = $db->execsql ( $sql_del );
		$res = mysql_affected_rows ();
		if ($res) {
			echo 1; // 删除成功
		} else {
			echo mysql_error ();
			echo 0; // 删除失败，请联系技术支持
		}
	}else {
		echo 0;//删除失败，请联系技术支持
	}
	
}