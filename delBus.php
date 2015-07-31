<?php
/**
* *****************预约删除******************
*/
/*
 * ajax({
 * url:busmanage.php?act='DEL',
 * dataType:,
 * Type:,
 * data:{//"FNAME":fname,//职工姓名
 * //"BDATE":bdate
 * "FID":fid},//预约班车日期
 *
 * });
 */
/*
 * $FName = $_GET ['FNAME'];
 * $BDate = $_GET ['BDATE'];
 */
$FID = $_GET ['FID'];
/*
 * $sql_id = "select FID from t_hs_employee where FName='{$FName}' ";
 * $res_id = $db->getrow ( $sql_name );
 */
// $sql_del = "delete t_hs_overwork_reserv where FEmployeeID='{$res_id['FID']}' and FRDate='{$BDate}'";
$sql_del = "delete t_hs_overwork_reserv where FID='{$FID}' ";
$res_del = $db->execsql ( $sql_del );
$res=mysql_affected_rows($res_del);
if ($res) {
	echo 1; // 删除成功
} else {
	echo mysql_error ();
	echo 0; // 删除失败
}
}