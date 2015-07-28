<?php
require 'dbaccess.php';
header ( 'content-type:text/html;charset=utf-8' );
$openid = "1";
$db = new DB ();
$currentdate = date ( 'Y-m-d', time () );
$from = $currentdate . " 00:00:00";

$act = $_GET ['act'];
if ($act == 'check') {
	/**
	 * ****************预约查看*********************
	 */
	
	/*
	 * ajax({
	 * url:busmanage.php?act='check',
	 * dataType:,
	 * Type:,
	 * data:{"ENAME":ename},//职员姓名
	 *
	 * });
	 *
	 */
	$name_emp = $_GET ['ENAME'];
	// $name_emp='lio';
	// 联合查询出职员编码$result_com['id_emp']和其所在公司名称$result_com['name_com']
	$sql_com = "select  a.FID as id_emp,b.FName as name_com from t_hs_employee a inner join t_hs_company b on a.FCompanyID=b.FID where a.FName='{$name_emp}'";
	$result_com = $db->getrow ( $sql_com );
	// 查找当天之后的预约记录
	$sql_check = "select FStopID as FStop,FRDate,FRTime from t_hs_overwork_reserv where FEmployeeID='{$result_com['id_emp']}' and FRDate>='{$from}'";
	$result_check = $db->execsql ( $sql_check );
	$num = count ( $result_check );
	if ($num) {
		for($i = 0; $i < $num; $i ++) {
			$sql_state = "select FName as name_stop from  t_hs_stop where FID='{$result_check[$i]['FStop']}'";
			$result_state = $db->getrow ( $sql_state );
			// print_r($result_state);
			$data = explode ( ' ', $result_check [$i] ['FRDate'] );
			// var_dump($data);
			$result_check [$i] ['FRDate'] = $data [0];
			$result_check [$i] ['FStop'] = $result_state ['name_stop'];
		}
	} else {
		echo "无预约记录";
	}
	// 将查到的公司信息以JSON格式输出
	var_dump ( $result_com );
	$comjson = json_encode ( $result_com );
	echo $comjson;
	// 将查到的该职员的预约记录以JSON格式输出
	var_dump ( $result_check );
	$checkjson = json_encode ( $result_check );
	echo $checkjson;
} elseif ($act == 'modify') {
	/**
	 * *****************预约修改******************
	 */
	
	/*
	 * ajax({
	 * url:busmanage.php?act='modify',
	 * dataType:,
	 * Type:,
	 * data:{"FSTOP":fstop,//下车站点
	 * "BTIME":btime,//预约班车时间
	 * "BDATE":bdate},//预约班车日期
	 *
	 * });
	 *
	 */
	$BTime = $_GET ['BTIME'];
	$BDate = $_GET ['BDATE'];
	$FStop = $_GET ['FSTOP'];
	$sql_stop = "select FID from t_hs_stop where FName='{$FStop}' ";
	$result_stop = $db->getrow ( $sql_stop );
	$time = date ( 'Y-m-d H:i:s', time () );
	// echo $time;
	$sql_mod = "update into t_hs_overwork_reserv set FStopID='{$result_stop['FID']}' and FRTime='{$FStop}' and FRDate='{$BDate}' and FDate='{$time}' and FType='{}' where FEmployeeID='{}' and FRDate='{}'";
	$reslut_mod = $db->execsql ( $sql_mod );
	if ($reslut_mod) {
		echo 1; // 修改成功
	} else {
		echo mysql_error();
		echo 0; // 修改失败
	}
} else {
	/**
	 * *****************预约删除******************
	 */
	/*
	 * ajax({
	 * url:busmanage.php?act='delete',
	 * dataType:,
	 * Type:,
	 * data:{"FNAME":fname,//职工姓名
	 * "BDATE":bdate},//预约班车日期
	 *
	 * });
	 */
	$FName = $_GET ['FNAME'];
	$BDate = $_GET ['BDATE'];
	$sql_id = "select FID from t_hs_employee where FName='{$FName}' ";
	$result_id = $db->getrow ( $sql_name );
	$sql_del = "delete t_hs_overwork_reserv where FEmployeeID='{$result_id['FID']}' and FRDate='{$BDate}'";
	$result_del = $db->execsql ( $sql_del );
	if ($result_del) {
		echo 1; // 删除成功
	} else {
		echo mysql_error();
		echo 0; // 删除失败
	}
}
?>
