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
	// 联合查询出职员编码$res_com['id_emp']和其所在公司名称$res_com['name_com']
	$sql_com = "select  a.FID as id_emp,b.FName as name_com from t_hs_employee a inner join t_hs_company b on a.FCompanyID=b.FID where a.FName='{$name_emp}'";
	$res_com = $db->getrow ( $sql_com );
	// 查找当天之后的预约记录
	$sql_check = "select FStopID as FStop,FRDate,FRTime from t_hs_overwork_reserv where FEmployeeID='{$res_com['id_emp']}' and FRDate>='{$from}'";
	$res_check = $db->execsql ( $sql_check );
	$num = count ( $res_check );
	if ($num) {
		for($i = 0; $i < $num; $i ++) {
			$sql_state = "select FName as name_stop from  t_hs_stop where FID='{$res_check[$i]['FStop']}'";
			$res_state = $db->getrow ( $sql_state );
			// print_r($res_state);
			$data = explode ( ' ', $res_check [$i] ['FRDate'] );
			// var_dump($data);
			$res_check [$i] ['FRDate'] = $data [0];
			$res_check [$i] ['FStop'] = $res_state ['name_stop'];
		}
	} else {
		echo "无预约记录";
	}
	// 将查到的公司信息与职员的预约记录以JSON格式输出
	var_dump ( $res_com );
	var_dump ( $res_check );
	$check_data=array('company'=>$res_com,'check'=>$res_check);
	$checkjson=json_encode($check_data);
	
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
	 * "BDATE":bdate,//修改后的预约班车日期
	 * "FRDate":frdate},//修改前的预约班车日期
	 * });
	 *
	 */
	$BTime = $_GET ['BTIME'];
	$BDate = $_GET ['BDATE'];
	$FStop = $_GET ['FSTOP'];
	$FRDate = $_GET['FRDate'];
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
	$sql_mod = "update  t_hs_overwork_reserv set FStopID='{$res_stop['FID']}' , FRTime='{$FStop}' , FRDate='{$BDate}' , FDate='{$time}' , FType='{$FType}' where FEmployeeID='{$res_com['FID']}' and FRDate='{$FRDate}'";
	$reslut_mod = $db->execsql ( $sql_mod );
	if ($reslut_mod) {
		echo 1; // 修改成功
	} else {
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
	$res_id = $db->getrow ( $sql_name );
	$sql_del = "delete t_hs_overwork_reserv where FEmployeeID='{$res_id['FID']}' and FRDate='{$BDate}'";
	$res_del = $db->execsql ( $sql_del );
	if ($res_del) {
		echo 1; // 删除成功
	} else {
		echo mysql_error ();
		echo 0; // 删除失败
	}
}
?>
