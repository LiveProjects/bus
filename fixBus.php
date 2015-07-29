<?php
/**
 * *****************预约修改******************
 */

/*
 * ajax({
 * url:fixBus.php,
 * dataType:,
 * Type:,
 * data:{"FSTOP":fstop,//下车站点
 * "BTIME":btime,//预约班车时间
 * "BDATE":bdate,//修改后的预约班车日期
 * "FRDate":frdate,
 * "FID":fid},//修改前的预约班车日期
 * });
 *
 */
$BTime = $_GET ['BTIME'];
$BDate = $_GET ['BDATE'];
$FStop = $_GET ['FSTOP'];
$FRDate = $_GET['FRDate'];
$FID=$_GET['FID'];
$week=date('w',$BDate);
switch ($week){
	case 1:
	case 2:
	case 3:
	case 4:
	case 5:
		$FType=1;
		break;
	case 6:
	case 7:
		$FType=2;
		break;
	default:
		break;
}
$sql_stop = "select FID from t_hs_stop where FName='{$FStop}' ";
$res_stop = $db->getrow ( $sql_stop );
$time = date ( 'Y-m-d H:i:s', time () );
// echo $time;
$sql_mod = "update  t_hs_overwork_reserv set FStopID='{$res_stop['FID']}' , FRTime='{$FStop}' , FRDate='{$BDate}' , FDate='{$time}' , FType='{$FType}' where FID='{$FID}'";
$reslut_mod = $db->execsql ( $sql_mod );
if ($reslut_mod) {
	echo 1; // 修改成功
} else {
	echo 0; // 修改失败
}