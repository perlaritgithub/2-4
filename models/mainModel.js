var sqldb = require('../config/dbconnect');
var dbutil = require(appRoot + '/utils/dbutils');
var moment = require('moment');


// ************** Login Start ***************
exports.gettingusrLoggedIn = function (usr_nm, pwd, callback) {
	var cntxtDtls = "in gettingusrLoggedIn";
	var QRY_TO_EXEC = ` SELECT * from ff_usr_tbl where usr_phone ='${usr_nm}' and  usr_pswd ='${pwd}' and d_in <> 1;`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.getUsrloginCtrlMdl = function (usr, callback) {
	var cntxtDtls = "in getUsrloginCtrlMdl";
	var QRY_TO_EXEC = `SELECT * from ff_usr_menu_rel_tbl as r join ff_menu_lst_tbl as lst on r.menu_id=lst.carrer_menu_id join ff_menu_catgry_tbl as m on lst.menu_cat_id=m.menu_ctgry_id  where r.usr_id ='${usr}' and r.d_in <> 1 and lst.d_in=0  and m.d_in='0' order BY lst.menu_cat_id,lst.serial_no;
	`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
// ************** Login End ***************
// ************** Dashboard Start *********
exports.getMenuCatgrypermissionsMdl = function (usr_id, callback) {
	var cntxtDtls = "in getMenuCatgrypermissionsMdl";
	var QRY_TO_EXEC = `SELECT * from ff_menu_lst_tbl as lst join ff_menu_catgry_tbl as m on lst.menu_cat_id=m.menu_ctgry_id  
	where lst.d_in=0 and m.d_in='0' and  lst.carrer_menu_id not in  (select menu_id from ff_usr_menu_rel_tbl where usr_id='${usr_id}') order  BY lst.menu_cat_id,carrer_menu_id;`;
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.sendpermissionsmdl = function (data, usr, callback) {
	var QRY_TO_EXEC = '';
	var cntxtDtls = "in sendpermissionsmdl";
	var QRY_TO_EXEC = `insert into ff_usr_menu_rel_tbl (usr_id,menu_id,d_in)  values('${usr}','${data}',0); `;
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.ChckExitingusr = function (data, callback) {
	var cntxtDtls = "in ChckExitingusr";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `select * from  ff_usr_tbl where d_in='0' and usr_phone='${data.phone}'`;

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.addusrsMdl = function (data, callback) {
	var cntxtDtls = "in getMenuCatgrypermissionsMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var time = moment().utcOffset("+05:30").format("HH:mm:ss");
	var QRY_TO_EXEC = ` insert into ff_usr_tbl (usr_pswd,usr_nm,usr_phone,usr_email,e_time,d_in,e_by,e_dt) 
	values ('${data.pswd}','${data.usr}','${data.phone}','${data.mail}','${time}',0,'${data.usr_id}','${date}');`;
	//console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.deleteUsrMD1 = function (cls_id, callback) {
	var cntxtDtls = "in deleteUsrMD1";
	var QRY_TO_EXEC = `UPDATE ff_usr_tbl  SET d_in=1  where usr_id=${cls_id};`;

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.getusrsMdl = function (callback) {
	var cntxtDtls = "in getusrsMdl";
	var QRY_TO_EXEC = `SELECT * from ff_usr_tbl  where d_in <> 1 and usr_type='0' order by usr_id desc;`;

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.updateUserDetailsMdl = function (data, callback) {
	var cntxtDtls = "in updateUserDetailsMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `update ff_usr_tbl set usr_pswd ='${data.usr_pswd}',usr_nm='${data.usr_nm}',usr_phone='${data.usr_phone}',
	usr_email='${data.usr_email}',u_ts='${date}',e_by='${data.usr_ids}',e_dt='${date}',usr_phone='${data.usr_phone}'
	where usr_id='${data.usr_id}' ;`;

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.updateUserPhoneNumDuplicateCheckMdl = function (data, callback) {
	var cntxtDtls = "in updateUserPhoneNumDuplicateCheckMdl";
	var QRY_TO_EXEC = ` SELECT  count(*) as count from ff_usr_tbl where usr_phone= "${data.usr_phone}" and d_in=0;`;
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.deletepermMdl = function (usr_menu_rel_id, callback) {
	var cntxtDtls = "in deletepermMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `UPDATE ff_usr_menu_rel_tbl SET d_in='1' where usr_menu_rel_id='${usr_menu_rel_id}'`;

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.getpermissionMdl = function (callback) {
	var cntxtDtls = "in getpermissionMdl";
	var QRY_TO_EXEC = `SELECT count(r.usr_id) as usr_count,u.usr_nm,u.usr_phone,r.usr_id from ff_usr_menu_rel_tbl as r join ff_usr_tbl as u on u.usr_id = r.usr_id where r.d_in ='0' and u.usr_type='0'  group by r.usr_id order by r.usr_id desc;`;
	// 
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.permsListMdl = function (usr_id, callback) {
	var cntxtDtls = "in permsListMdl";
	var QRY_TO_EXEC = `SELECT r.usr_menu_rel_id,u.usr_nm,u.usr_phone,r.usr_id,l.menu_nm,f.menu_cat_nm from ff_usr_menu_rel_tbl as r join ff_usr_tbl as u on u.usr_id = r.usr_id join ff_menu_lst_tbl as l on l.carrer_menu_id = r.menu_id join ff_menu_catgry_tbl as f on f.menu_ctgry_id = l.menu_cat_id where r.d_in ='0' and r.usr_id='${usr_id}' AND l.d_in=0 and f.d_in='0' order by r.usr_id desc;`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//shops list
exports.getadnshoplistdataMdl = function (entryby, callback) {
	var cntxtDtls = "in getadnshoplistdataMdl";
	var QRY_TO_EXEC = `select * from ff_usr_tbl where d_in='0' and usr_type='2' and e_by = '${entryby}' order by serial_no desc;`;
	//
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.adnactivestatusshoplistMdl = function (data, callback) {
	var cntxtDtls = "in adnactivestatusshoplistMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `UPDATE ff_usr_tbl SET active_status='${data.active_status}' where usr_id='${data.id}'`;
	// console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
// ************** Dashboard End ***********


/////////////////////////////////////////shopping code start//////////////////////////////////////////////////////
//shopping start
//add category start
//post
exports.addshpcategoryMdl = function (data, callback) {
	var cntxtDtls = "in addshpcategoryMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `insert into ff_shp_add_category(category,edate,etime,entryby,d_in)  values('${data.category}',
	'${date}','${date}','${data.entryby}','0');`;

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.updateShopCatIconImagesMdl = function (imageupload, id, reviewImgArr, callback) {
	var img_url = '';
	if (reviewImgArr == 1) {
		img_url = ` icon = '${imageupload}'`;
	} else if (reviewImgArr == 2) {
		img_url = `	banner = '${imageupload}'`;
	}
	var cntxtDtls = "in updateShopCatIconImagesMdl";
	var QRY_TO_EXEC = `update ff_shp_add_category set ${img_url} where id='${id}' `;
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};
//check
exports.getshpcatCheckDataMdl = function (medcat, callback) {
	var cntxtDtls = "in getshpcatCheckDataMdl";
	var QRY_TO_EXEC = `select id from ff_shp_add_category where category = '${medcat}' and d_in='0';`

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//get
exports.getshpcategoryMdl = function (entryby, callback) {
	var cntxtDtls = "in getshpcategoryMdl";
	var QRY_TO_EXEC = `SELECT * from ff_shp_add_category where entryby='${entryby}' and d_in='0' order by id desc;`
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//update
exports.updateshpcategoryMdl = function (data, callback) {
	var cntxtDtls = "in updateshpcategoryMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `update ff_shp_add_category set category ='${data.category}' where id='${data.id}';`

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//delete
exports.dltshpcategoryMD1 = function (id, callback) {
	var cntxtDtls = "in dltshpcategoryMD1";
	var QRY_TO_EXEC = `UPDATE ff_shp_add_category SET d_in=1 where id = '${id}';`

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//add category end

//sub category start
//post
exports.subshpcategoryMdl = function (data, imageupload, callback) {
	var cntxtDtls = "in subshpcategoryMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `insert into ff_shp_add_sub_category(category_id,subcategory,productimage,edate,etime,entryby)  values('${data.category_id}','${data.subcategory}','${imageupload}','${date}','${date}','${data.entryby}');`

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//check
exports.subshpcatCheckDatamdl = function (shpsubcat, category_id, callback) {
	// console.log("modeldata");
	// console.log(shpsubcat);
	// console.log(category_id);
	var cntxtDtls = "in subshpcatCheckDatamdl";
	var QRY_TO_EXEC = `select id from ff_shp_add_sub_category where subcategory = '${shpsubcat}' and category_id='${category_id}' and d_in='0';`

	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//get
exports.getshpsubcategoryMdl = function (callback) {
	var cntxtDtls = "in getshpsubcategoryMdl";
	var QRY_TO_EXEC = `SELECT s.*,c.category from ff_shp_add_sub_category as s
	join ff_shp_add_category as c on c.id = s.category_id where s.d_in='0' order by s.id desc;`

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//update
exports.updateshpsubcategoryMdl = function (data, callback) {
	var cntxtDtls = "in updateshpsubcategoryMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `update ff_shp_add_sub_category set category_id='${data.category_id}',subcategory ='${data.subcategory}' where id='${data.id}';`

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//delete
exports.dltshpsubcategoryMD1 = function (id, callback) {
	var cntxtDtls = "in dltshpsubcategoryMD1";
	var QRY_TO_EXEC = `UPDATE ff_shp_add_sub_category SET d_in=1 where id = '${id}';`

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//sub category end

//add brand start
//post
exports.addshpbrandMdl = function (data, callback) {
	var cntxtDtls = "in addshpbrandMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `insert into ff_shp_add_sub_category(category,subcategory,edate,etime,entryby)  values('${data.category}','${data.subcategory}','${date}','${date}','${data.entryby}');`

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//check
exports.subshpcatCheckDataMdl = function (shpsubcat, callback) {
	var cntxtDtls = "in subshpcatCheckDataMdl";
	var QRY_TO_EXEC = `select id from ff_shp_add_sub_category where subcategory = '${shpsubcat}';`

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//add sub category end

//add brand start
//post
exports.addshpbrandMdl = function (data, callback) {
	var cntxtDtls = "in addshpbrandMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `insert into ff_shp_add_brands(brand,edate,etime,entryby)  
	values('${data.brand}','${date}','${date}','${data.entryby}');`

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//check
exports.getshpbrandCheckDataMdl = function (shpbrand, callback) {
	var cntxtDtls = "in getshpbrandCheckDataMdl";
	var QRY_TO_EXEC = `select id from ff_shp_add_brands where brand = '${shpbrand}' and d_in='0';`

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//get
exports.getshpbrandsdataMdl = function (callback) {
	var cntxtDtls = "in getshpbrandsdataMdl";
	var QRY_TO_EXEC = `SELECT * from ff_shp_add_brands where d_in='0' order by id desc;`

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//update
exports.updateshpbrandMdl = function (data, callback) {
	var cntxtDtls = "in updateshpbrandMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `update ff_shp_add_brands set brand ='${data.brand}' where id='${data.id}';`

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//delete
exports.dltshpbrandMD1 = function (id, callback) {
	var cntxtDtls = "in dltshpbrandMD1";
	var QRY_TO_EXEC = `UPDATE ff_shp_add_brands SET d_in=1 where id = '${id}';`

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//add brand end

//add items start

//automatic subcat from cat
exports.getshopSubCatdataMdl = function (subcat, callback) {
	var cntxtDtls = "in getshopSubCatdataMdl";
	var QRY_TO_EXEC = `select * from ff_shp_add_sub_category where category_id='${subcat}' and d_in=0 `;
	;
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//add items end

//post start

exports.shpadditmdataMdl = function (data, barcode_idi, callback) {

	var cntxtDtls = "in shpadditmdataMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var baridi = 0;
	baridi = barcode_idi + 1;
	var barnum = "000" + baridi;
	var QRY_TO_EXEC = '';

	var QRY_TO_EXEC = `insert into ff_shp_add_items(category_id,item_name,item_description,quan_per_mon,barcode,rating,ingredients,howtouse,qualitycheck,edate,etime,entryby,barcode_num,barcode_idi,d_in,s_item_name,reviews) 
	values('${data.category_id}','${data.item_name}','${data.item_description}','${data.quan_per_mon}','${data.barcode}','${data.rating}','${data.ingredients}','${data.howtouse}','${data.qualitycheck}','${date}','${date}','${data.entryby}','${barnum}','${baridi}','0','${data.s_item_name}','${data.reviews}') `;

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//image start
exports.shopadditmimageMdl = function (imageupload, img_ind, updtitem, callback) {
	var cntxtDtls = "in shopadditmimageMdl";
	var img_url = '';
	if (img_ind == 0) {
		img_url = `img_one = '${imageupload}'`;
	} else if (img_ind == 1) {
		img_url = `img_two = '${imageupload}'`;
	} else if (img_ind == 2) {
		img_url = `img_three = '${imageupload}'`;
	} else if (img_ind == 3) {
		img_url = `img_four = '${imageupload}'`;
	}
	var QRY_TO_EXEC = `UPDATE ff_shp_add_items SET ${img_url} WHERE id =${updtitem}`;
	;
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//image end

//addrow start
exports.submitsshopAddrowMdl = function (addrowitm, lastId, callback) {
	var cntxtDtls = "in submitsshopAddrowMdl";
	var mulqry = '';
	var QRY_TO_EXEC = '';
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	for (i = 0; i < addrowitm.length; i++) {
		var mulqry = `insert into ff_shp_add_items_t(item_id,measures_id,price,mrpprice,edate,etime,item_quan)
          values('${lastId}','${addrowitm[i].sizeid}','${addrowitm[i].price}','${addrowitm[i].mrpprice}','${date}','${date}','${addrowitm[i].item_quan}');`;
		QRY_TO_EXEC = QRY_TO_EXEC + mulqry;
	}
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//addrow end
exports.submitssubcatMdl = function (data, lastId, callback) {
	var addrowitm = data.subcatarray;
	var cntxtDtls = "in submitssubcatMdl";
	var mulqry = '';
	var QRY_TO_EXEC = '';
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	for (i = 0; i < addrowitm.length; i++) {
		var mulqry = `insert into ff_shp_add_items_subcat_t(item_id,subcat_id,sub_category)
          values('${lastId}','${addrowitm[i].id}','${addrowitm[i].cat_nm}');`;
		QRY_TO_EXEC = QRY_TO_EXEC + mulqry;
	}
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.submitkeywrdsMdl = function (data, lastId, callback) {
	var addrowitm = data.keywords;
	var cntxtDtls = "in submitkeywrdsMdl";
	var mulqry = '';
	var QRY_TO_EXEC = '';
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	for (i = 0; i < addrowitm.length; i++) {
		var mulqry = `insert into search_keywords_t(item_id,keywords)
          values('${lastId}','${addrowitm[i].keywords}');`;
		QRY_TO_EXEC = QRY_TO_EXEC + mulqry;
	}
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//keypoints submit start
exports.submitkeypointsMdl = function (data, lastId, callback) {
	var addrowitms = data.keypoints;
	var cntxtDtls = "in submitkeypointsMdl";
	var mulqry = '';
	var QRY_TO_EXEC = '';
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	for (i = 0; i < addrowitms.length; i++) {
		var mulqry = `insert into keypoints(item_id,keypoints)
          values('${lastId}','${addrowitms[i].keypoints}');`;
		QRY_TO_EXEC = QRY_TO_EXEC + mulqry;
	}
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//post end

//get
exports.getshopadditemdataMdl = function (entryby, callback) {
	var cntxtDtls = "in getshopadditemdataMdl";
	// console.log(entryby)
	//  var QRY_TO_EXEC = `SELECT sa.*,c.category,c.id as catid,group_concat( distinct sub_category separator ', ') as subcat from ff_shp_add_items as sa join ff_shp_add_category as c on c.id = sa.category_id JOIN ff_shp_add_items_subcat_t as ais on ais.item_id = sa.id where sa.entryby = '${entryby}' and sa.d_in='0' GROUP by sa.category_id order by sa.id desc;`


	var QRY_TO_EXEC = `SELECT sa.*,kw.keywords,kp.keypoints,c.category,aic.sub_category,m.mrpprice,m.price,c.id as catid from ff_shp_add_items as sa join ff_shp_add_category as c on c.id = sa.category_id join ff_shp_add_items_subcat_t as aic on aic.item_id = sa.id join  ff_shp_add_items_t as m on m.item_id = sa.id join  search_keywords_t as kw on kw.item_id=sa.id join keypoints as kp on kp.item_id=sa.id where sa.entryby = '${entryby}' and sa.d_in='0' order by sa.id desc;`


	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//kitchen & home start

exports.kitchenadditmdataMdl = function (data, callback) {
	var cntxtDtls = "in kitchenadditmdataMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	if (data.supsubcategory == undefined) {
		var p = '-------';
	}
	else {
		var p = data.supsubcategory;
	}
	var QRY_TO_EXEC = `insert into ff_shp_add_items(category_id,subcategory_id,supsubcatstatus,supsubcategory,item_name,item_description,brand,edate,etime,entryby,preference) 
	values('${data.category_id}','${data.subcategory_id}','${data.supsubcatstatus}','${p}','${data.item_name}','${data.item_description}','${data.brand}','${date}','${date}','${data.entryby}','${data.preference}') `;
	;
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//image start
exports.kitchenadditmimageMdl = function (imageupload, img_ind, updtitem, callback) {
	var cntxtDtls = "in kitchenadditmimageMdl";
	var img_url = '';
	if (img_ind == 0) {
		img_url = `img_one = '${imageupload}'`;
	} else if (img_ind == 1) {
		img_url = `img_two = '${imageupload}'`;
	} else if (img_ind == 2) {
		img_url = `img_three = '${imageupload}'`;
	} else if (img_ind == 3) {
		img_url = `img_four = '${imageupload}'`;
	}
	var QRY_TO_EXEC = `UPDATE ff_shp_add_items SET ${img_url} WHERE id =${updtitem}`;
	;
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//image end

//addrow start
exports.submitkitchenAddrowMdl = function (data, lastId, callback) {
	var cntxtDtls = "in submitkitchenAddrowMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");

	var QRY_TO_EXEC = `insert into ff_shp_add_items_t(item_id,measures_id,price,edate,etime)
          values('${lastId}','1','${data.price}','${date}','${date}');`

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//addrow end

//post end
//kitchen & home end

//view measures list data start
exports.getsizeAddrowTabaDataMdl = function (id, callback) {
	var cntxtDtls = "in getsizeAddrowTabaDataMdl";

	var QRY_TO_EXEC = `SELECT sa.*,s.sizes FROM ff_shp_add_items_t as sa 
  join ff_shp_add_sizes as s on s.id = sa.measures_id where sa.item_id ='${id}' and sa.d_in='0';`
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//end 

//delete
exports.dltshopadditmdataMD1 = function (id, callback) {
	var cntxtDtls = "in dltshopadditmdataMD1";
	var QRY_TO_EXEC = `UPDATE ff_shp_add_items SET d_in=1 where id = '${id}';`

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//edit item image start
exports.shopimageonlyeditMdl = function (imageupload1, img_ind1, callback) {
	var cntxtDtls = "in shopimageonlyeditMdl";

	var QRY_TO_EXEC = `UPDATE ${img_ind1.tablenm} SET ${img_ind1.imgcolumnname} = '${imageupload1}' WHERE id='${img_ind1.id}'`;

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//edit item image end
exports.updateshpadditemdataMdl = function (data, callback) {
	var cntxtDtls = "in updateshpadditemdataMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `update ff_shp_add_items set category_id='${data.category_id}',subcategory_id ='${data.subcategory_id}',item_name ='${data.item_name}',item_description ='${data.item_description}',brand='${data.brand}' where id='${data.id}';`
	// //   console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//update price  start
exports.shpngadditmpricedataMdl = function (upCat, callback) {
	var cntxtDtls = "in shpngadditmpricedataMdl";
	var mulqry = '';
	var QRY_TO_EXEC = '';
	for (i = 0; i < upCat.length; i++) {
		var mulqry = `UPDATE  ff_shp_add_items_t set price='${upCat[i].price}',item_quan ='${upCat[i].item_quan}',mrpprice='${upCat[i].mrpprice}'  where id='${upCat[i].id}';`
		QRY_TO_EXEC = QRY_TO_EXEC + mulqry;
		// console.log(QRY_TO_EXEC);
	}
	;
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//update price  end
//update addrow start
exports.shpngadditmnewdataMdl = function (addrowitm, callback) {
	var cntxtDtls = "in shpngadditmnewdataMdl";
	var mulqry = '';
	var QRY_TO_EXEC = '';
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	for (i = 0; i < addrowitm.length; i++) {
		var mulqry = `insert into ff_shp_add_items_t(item_id,measures_id,price,mrpprice,edate,etime,item_quan)
				  values('${addrowitm[i].item_id}','${addrowitm[i].sizeid}','${addrowitm[i].price}','${addrowitm[i].mrpprice}','${date}','${date}','${addrowitm[i].item_quan}');`
		QRY_TO_EXEC = QRY_TO_EXEC + mulqry;
	}
	// //   console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//update addrow end
//delete measures 
exports.deleteshpngadditmsmeasuresMD1 = function (id, callback) {
	var cntxtDtls = "in deleteshpngadditmsmeasuresMD1";
	var QRY_TO_EXEC = `UPDATE ff_shp_add_items_t SET d_in = 1 where id = '${id}';`
	// //   console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//shopping end

//add shpng shop start
//post
exports.shpngaddshopsubmitMdl = function (data, callback) {
	var cntxtDtls = "in shpngaddshopsubmitMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `insert into ff_shp_add_shops(shop_name,ph_no,email,latitude,longitude,percentage,minimumorder,address,franchise_id,location_id,edate,etime,entryby,owner_name)  values('${data.shop_name}','${data.ph_no}','${data.email}','${data.latitude}','${data.longitude}','${data.percentage}','${data.minimumorder}','${data.address}','${data.franchise_id}','${data.location_id}','${date}','${date}','${data.entryby}','${data.owner_name}');`;

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//check
exports.getshpngshopCheckDataMdl = function (shpngshop, callback) {
	var cntxtDtls = "in getshpngshopCheckDataMdl";
	var QRY_TO_EXEC = `select id from ff_shp_add_shops where ph_no = '${shpngshop}' and d_in='0';`

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//get
exports.getshpngshopsdataMdl = function (entryby, callback) {
	var cntxtDtls = "in getshpngshopsdataMdl";
	//var QRY_TO_EXEC = `SELECT * from ff_shp_add_shops where d_in='0' order by id desc;`

	var QRY_TO_EXEC = `SELECT gc.usr_id as id,gc.usr_nm as shop_name from ff_usr_shop_cat_t as gi 
	join ff_usr_tbl as gc on gc.usr_id=gi.shop_id  where gi.module_id='3' and gi.d_in='0' and gc.e_by='${entryby}' and gc.d_in='0' and gc.active_status='0' order by gi.id desc; `;

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//active status
exports.shoppingactivestatusDataMdl = function (data, callback) {
	var cntxtDtls = "in shoppingactivestatusDataMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");

	var QRY_TO_EXEC = `UPDATE ff_shp_add_shops SET active_status='${data.active_status}' where id='${data.id}'`;

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//delete
exports.dltshpngshopdataMD1 = function (id, callback) {
	var cntxtDtls = "in dltshpngshopdataMD1";
	var QRY_TO_EXEC = `UPDATE ff_shp_add_shops SET d_in = 1 where id = '${id}';`

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//update
exports.updateshpngshopdataMdl = function (id, callback) {
	var cntxtDtls = "in updateshpngshopdataMdl";
	var QRY_TO_EXEC = `update ff_shp_add_shops set shop_name='${id.shop_name}',ph_no='${id.ph_no}',email='${id.email}',latitude='${id.latitude}',longitude='${id.longitude}',percentage='${id.percentage}',minimumorder='${id.minimumorder}',address='${id.address}',owner_name='${id.owner_name}' where id ='${id.id}';`

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//add shopping shopitems start
//search
exports.getshopsearchcatdataMdl = function (id, shop_id, callback) {
	var cntxtDtls = "in getshopsearchcatdataMdl";
	var QRY_TO_EXEC = `SELECT sa.*,c.category,cs.subcategory,b.brand,cs.id as sc,b.id as br from ff_shp_add_items as sa
	join ff_shp_add_category as c on c.id = sa.category_id
	join ff_shp_add_sub_category as cs on cs.id = sa.subcategory_id
	join ff_shp_add_brands as b on b.id = sa.brand where sa.category_id='${id}' and sa.d_in=0 and sa.id not in (select si.item_id from ff_shp_shop_items as si where si.shop_id='${shop_id}' and si.d_in='0')`;
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//post
exports.assignshpngshopitemsdataMdl = function (data, array, callback) {
	var cntxtDtls = "in assignshpngshopitemsdataMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");

	var QRY_TO_EXEC = `insert into ff_shp_shop_items(shop_id,category_id,subcategory_id,supsubcatstatus,supsubcategory,item_name,item_description,img_one,img_two,img_three,img_four,edate,etime,entryby,brand,preference,location_id,item_id)  values('${data.shop_id}','${array.category_id}','${array.subcategory_id}','${array.supsubcatstatus}','${array.supsubcategory}','${array.item_name}','${array.item_description}','${array.img_one}','${array.img_two}','${array.img_three}','${array.img_four}','${date}','${date}','${data.entryby}','${array.brand}','${array.preference}','${data.location_id}','${array.id}');`

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.fetchaddrowshpitems = function (id, callback) {
	var cntxtDtls = "in fetchaddrowshpitems";
	var QRY_TO_EXEC = `SELECT * from ff_shp_add_items_t where item_id='${id}' and d_in='0';`;


	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.postshopaddrowitems = function (array, lastid, callback) {
	var cntxtDtls = "in postshopaddrowitems";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var mulqry = '';
	var QRY_TO_EXEC = '';
	for (var i = 0; i < array.length; i++) {
		var mulqry = `insert into ff_shp_shop_items_t(item_id,measures_id,price,edate,etime) 
		 values('${lastid}','${array[i].measures_id}','${array[i].price}','${date}','${date}');`;
		QRY_TO_EXEC = QRY_TO_EXEC + mulqry;
	}
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//shpng shop items report start
//search
exports.getshpngshopreportdataMdl = function (id, callback) {
	var cntxtDtls = "in getshpngshopreportdataMdl";
	var QRY_TO_EXEC = `SELECT sa.*,c.category,cs.subcategory,b.brand from ff_shp_shop_items as sa
	join ff_shp_add_category as c on c.id = sa.category_id 
	join ff_shp_add_sub_category as cs on cs.id = sa.subcategory_id
	join ff_shp_add_brands as b on b.id = sa.brand where sa.shop_id='${id}' and sa.d_in=0 order by sa.id desc`;

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//delete
exports.dltshpngshpitmrprtdataMD1 = function (id, callback) {
	var cntxtDtls = "in dltshpngshpitmrprtdataMD1";
	var QRY_TO_EXEC = `UPDATE ff_shp_shop_items SET d_in = 1 where id = '${id}';`

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//edit item image start
exports.shpngshpitmrprtupdateMdl = function (imageupload1, img_ind1, callback) {
	var cntxtDtls = "in shpngshpitmrprtupdateMdl";

	var QRY_TO_EXEC = `UPDATE ${img_ind1.tablenm} SET ${img_ind1.imgcolumnname} = '${imageupload1}' WHERE id='${img_ind1.id}'`;

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//edit item image end

//update
exports.updateshpngshpitemrprtdataMdl = function (data, callback) {
	var cntxtDtls = "in updateshpngshpitemrprtdataMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `update ff_shp_shop_items set item_name ='${data.item_name}',item_description ='${data.item_description}' where id='${data.id}';`

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//end

//view measures list data start
exports.getshpngshpitmsAddrowTabaDataMdl = function (id, callback) {
	var cntxtDtls = "in getshpngshpitmsAddrowTabaDataMdl";

	var QRY_TO_EXEC = `SELECT sa.*,s.sizes FROM ff_shp_shop_items_t as sa 
  join ff_shp_add_sizes as s on s.id = sa.measures_id where sa.item_id ='${id}' and sa.d_in='0'`

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//view measures list data end

//shpng shpitms rprt
//active status
exports.shpngshpitmsactstatDataMdl = function (data, callback) {
	var cntxtDtls = "in shpngshpitmsactstatDataMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");

	var QRY_TO_EXEC = `UPDATE ff_shp_shop_items SET active_status='${data.active_status}' where id='${data.id}'`;

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//update price  start
exports.shpngupdatepricedataMdl = function (upCat, callback) {
	var cntxtDtls = "in shpngupdatepricedataMdl";
	var mulqry = '';
	var QRY_TO_EXEC = '';
	for (i = 0; i < upCat.length; i++) {
		var mulqry = `UPDATE  ff_shp_shop_items_t set price='${upCat[i].price}' where id='${upCat[i].id}';`
		QRY_TO_EXEC = QRY_TO_EXEC + mulqry;
	}
	;
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//update price  end

// shpngupdatepriceAddrowMdl start
exports.shpngupdatepriceAddrowMdl = function (addt, callback) {
	var cntxtDtls = "in shpngupdatepriceAddrowMdl";
	var mulqry = '';
	var QRY_TO_EXEC = '';
	// var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	for (i = 0; i < addt.length; i++) {
		var mulqry = `insert into ff_shp_shop_items_t (item_id,measures_id,price)
	  values('${addt[i].item_id}','${addt[i].sizeid}','${addt[i].price}');`
		QRY_TO_EXEC = QRY_TO_EXEC + mulqry;
	}
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


//delete measures 
exports.deleteshpngshopmeasuresMD1 = function (id, callback) {
	var cntxtDtls = "in deleteshpngshopmeasuresMD1";
	var QRY_TO_EXEC = `UPDATE ff_shp_shop_items_t SET d_in = 1 where id = '${id}';`
	// //   console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.addshpsizesMdl = function (data, callback) {
	var cntxtDtls = "in addshpsizesMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `insert into ff_shp_add_sizes(sizes,edate,etime,entryby)  values('${data.sizes}','${date}','${date}','${data.entryby}');`;
	// //   console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//get
exports.getshpsizesMdl = function (entryby, callback) {
	var cntxtDtls = "in getshpsizesMdl";
	var QRY_TO_EXEC = `SELECT * from ff_shp_add_sizes where entryby = '${entryby}' and d_in='0' order by id desc;`
	// //   console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//update
exports.updateshpsizeMdl = function (data, callback) {
	var cntxtDtls = "in updateshpsizeMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `update ff_shp_add_sizes set sizes ='${data.sizes}' where id='${data.id}';`

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//delete
exports.deleteshpsizesMD1 = function (id, callback) {
	var cntxtDtls = "in deleteshpsizesMD1";
	var QRY_TO_EXEC = `UPDATE ff_shp_add_sizes SET d_in=1 where id = '${id}';`

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//shp measures 
exports.checkaddshpmsrsDataMdl = function (mscheck, item_id, callback) {
	var cntxtDtls = "in checkaddshpmsrsDataMdl";
	var QRY_TO_EXEC = `select count(id) as i from ff_shp_add_items_t where measures_id='${mscheck}' and item_id='${item_id}' and d_in='0'`;
	//   // console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.checkdshopshpitsDataMdl = function (mscheck, item_id, callback) {
	var cntxtDtls = "in checkdshopshpitsDataMdl";
	var QRY_TO_EXEC = `select count(id) as i from ff_shp_shop_items_t where measures_id='${mscheck}' and item_id='${item_id}' and d_in='0'`;
	//   // console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
// checkDuplicateshpsizesMdl
exports.checkDuplicateshpsizesMdl = function (data, callback) {
	var cntxtDtls = "in checkDuplicateshpsizesMdl";
	var QRY_TO_EXEC = `select count(id) as i from ff_shp_add_sizes 
	where sizes='${data.sizes}' and d_in='0'`;
	//   // console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
// checkDuplicateshpadditmdataMdl
exports.checkDuplicateshpadditmdataMdl = function (data, callback) {
	var cntxtDtls = "in checkDuplicateshpadditmdataMdl";
	var QRY_TO_EXEC = `select count(id) as i from ff_shp_add_items 
	where item_name='${data.item_name}' and d_in='0'`;
	//   console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/////////////////////////////////////////shopping code end///////////////////////////////////////////////////

exports.addusrs1Mdl = function (data, callback) {
	var cntxtDtls = "in addusrs1Mdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var time = moment().utcOffset("+05:30").format("HH:mm:ss");
	var QRY_TO_EXEC = ` insert into add_wholeseller (usr,phone,phone2,pswd,mail,e_time,d_in,entryby,e_dt,firmname,gst_num,address,state,city) 
	values ('${data.usr}','${data.phone}','${data.phone2}','${data.pswd}','${data.mail}','${time}',0,'${data.usr_id}','${date}','${data.firmname}','${data.gst_num}','${data.address}','${data.state}','${data.city}');`;
	//console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getusrs1Mdl = function (entryby, callback) {
	var cntxtDtls = "in getusrs1Mdl";
	var QRY_TO_EXEC = `SELECT * from add_wholeseller  where d_in = 0   order by id desc;`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.updateUserDetails1Mdl = function (data, callback) {
	var cntxtDtls = "in updateUserDetails1Mdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `update add_wholeseller set pswd ='${data.pswd}',usr='${data.usr}',phone='${data.phone}',
	mail='${data.mail}',entryby='${data.usr_ids}',e_dt='${date}',phone2='${data.phone2}',firmname='${data.firmname}',gst_num='${data.gst_num}', address='${data.address}',state='${data.state}',city='${data.city}'
	where id='${data.id}' ;`;

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.deleteUsr1Mdl = function (id, callback) {
	var cntxtDtls = "in deleteUsr1Mdl";
	var QRY_TO_EXEC = `UPDATE add_wholeseller SET d_in=1 where id = '${id}';`
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getLastbarcodeId = function (callback) {

	var cvrclrViewDtls = "in getLastbarcodeId";
	var QRY_TO_EXEC = `SELECT barcode_idi FROM ff_shp_add_items order by id desc limit 1;`;

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cvrclrViewDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cvrclrViewDtls);
};

exports.getuserfrommdl = function (userfrom, callback) {
	var cntxtDtls = "in getuserfrommdl";

	if (userfrom == '1') {
		var QRY_TO_EXEC = `SELECT * from userreport  where userfrom = '1';`;
	}
	else if (userfrom == '2') {
		var QRY_TO_EXEC = `SELECT * from userreport  where userfrom = '2';`;
	}
	else {
		var QRY_TO_EXEC = `SELECT * from userreport  where d_in = '0' ;`;
	}
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getuserreportmdl = function (callback) {
	var cntxtDtls = "in getuserreportmdl";
	var QRY_TO_EXEC = `SELECT * from userreport  where d_in = '0' ;`;

	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.updateaddressmdl = function (data, callback) {
	var cntxtDtls = "in updateaddressmdl";
	var QRY_TO_EXEC = `update userreport set address ='${data.address}' where id ='${data.id}' `;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


exports.getwebsitedatamdl = function (website, callback) {
	var cntxtDtls = "in getwebsitedatamdl";
	var QRY_TO_EXEC = `SELECT * from userreport  where userfrom = '${website.userform}' and d_in = 0`;

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

// change user start
exports.changeusermdl = function (id, callback) {
	var cntxtDtls = "in changeusermdl";
	var QRY_TO_EXEC = `SELECT * from userreport where id ='${id}' and d_in ='0'`;;

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//change user end
exports.updateusermdl = function (data, callback) {
	var cntxtDtls = "in updateusermdl";
	var QRY_TO_EXEC = `update userreport usertype ='${data.usertype}' where id = '${data.id}' `;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.postwholesellermdl = function (data, callback) {
	var cntxtDtls = "in postwholesellermdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `insert into add_wholeseller(usr,phone,pswd,mail,state,city,address) 
  
	values('${data.usr_nm}','${data.usr_phone}','${data.usr_pwd}','${data.usr_email}','${data.state}','${data.city}','${data.address}') ;`

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.updateuserdiscountmdl = function (data, callback) {
	var cntxtDtls = "in updateuserdiscountmdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `update userreport set discount ='${data.discount}' where id='${data.id}';`

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//add wallet start
exports.Updatewalletmdl = function (data, callback) {
	var cntxtDtls = "in Updatewalletmdl";
	var QRY_TO_EXEC = `update userreport set add_req_wal ='${data.add_req_wal}', add_trail_wal ='${data.add_trail_wal}',add_voc_code ='${data.add_voc_code}',	add_voc_amt ='${data.add_voc_amt}',add_cou_code ='${data.add_cou_code}',add_cou_amt ='${data.add_cou_amt}' where id ='${data.id}' `;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//add wallet end


//mounika start

exports.checkvouchernumbMdl = function (data, callback) {
	var cntxtDtls = "in checkvouchernumbMdl";
	var QRY_TO_EXEC = `select count(id) as i from vouchers where voucherno='${data.voucherno}' and d_in='0';`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.postvoucherMdl = function (data, callback) {
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var cntxtDtls = "in postvoucherMdl";
	var QRY_TO_EXEC = `insert into vouchers(voucherno,voucheramount,minimumamount,maximumamount)  values('${data.voucherno}','${data.voucheramount}','${data.minimumamount}','${data.maximumamount}') `;
	console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getvouchersMdl = function (callback) {
	var cntxtDtls = "in getvouchersMdl";
	var QRY_TO_EXEC = `select * from vouchers where d_in =0 order by id desc`;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.deletevoucherMdl = function (id, callback) {
	var cntxtDtls = "in deletevoucherMdl";
	var QRY_TO_EXEC = `update vouchers set d_in= '1' where id ='${id}'`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.updatevoucherMdl = function (data, callback) {
	var cntxtDtls = "in updatevoucherMdl";
	var QRY_TO_EXEC = `update vouchers set voucherno ='${data.voucherno}',voucheramount ='${data.voucheramount}',minimumamount ='${data.minimumamount}', maximumamount ='${data.maximumamount}'where id ='${data.id}'`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//coupon
exports.checkcouponnumbMdl = function (data, callback) {
	var cntxtDtls = "in checkcouponnumbMdl";
	var QRY_TO_EXEC = `select count(id) as i from coupons where couponno='${data.couponno}' and d_in='0';`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.postcouponMdl = function (data, callback) {
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var cntxtDtls = "in postcouponMdl";
	var QRY_TO_EXEC = `insert into coupons(couponno,couponamount,minimumamount,maximumamount,i_ts)  values('${data.couponno}','${data.couponamount}','${data.minimumamount}','${data.maximumamount}','${date}') `;
	console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getcouponsMdl = function (callback) {
	var cntxtDtls = "in getcouponsMdl";
	var QRY_TO_EXEC = `select * from coupons where d_in =0 order by id desc`;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.deletecouponMdl = function (id, callback) {
	var cntxtDtls = "in deletecouponMdl";
	var QRY_TO_EXEC = `update coupons set d_in= '1' where id ='${id}'`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.updatecouponMdl = function (data, callback) {
	var cntxtDtls = "in updatecouponMdl";
	var QRY_TO_EXEC = `update coupons set couponno ='${data.couponno}',couponamount ='${data.couponamount}',minimumamount ='${data.minimumamount}',maximumamount ='${data.maximumamount}' where id ='${data.id}'`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getproductnamesMdl = function (callback) {
	var cntxtDtls = "in getproductnamesMdl";
	var QRY_TO_EXEC = `select * from ff_shp_add_items where d_in =0 order by id desc`;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


exports.postofferprdctsMdl = function (data, callback) {
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var cntxtDtls = "in postofferprdctsMdl";
	var QRY_TO_EXEC = `insert into offer_products(item_id,item_name,fromdate,fromtime,todate,totime,offerprice,i_ts)  values('${data.item_id}','${data.item_name}','${data.fromdate}','${data.fromtime}','${data.todate}','${data.totime}','${data.offerprice}','${date}') `;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getofrprdctsMdl = function (callback) {
	var cntxtDtls = "in getofrprdctsMdl";
	var QRY_TO_EXEC = `select * from offer_products where d_in =0 order by id desc`;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//mounika end

exports.getshpcategorylistMdl = function (id, callback) {
	var cntxtDtls = "in getshpcategorylistMdl";
	var QRY_TO_EXEC = `SELECT * from ff_shp_add_category where id!='${id}' and d_in='0' order by id desc;`
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.updateassigneddataMdl = function (data, callback) {
	//console.log(data);
	var cntxtDtls = "in updateassigneddataMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var mulqry = '';
	var QRY_TO_EXEC = '';
	// for (i = 0; i < data.length; i++) {
	var mulqry = `insert into ff_shp_add_items(category_id,item_name,item_description,edate,etime,entryby,barcode_num,barcode_idi,img_one,img_two,img_three,img_four) 
		values('${data.id}','${data.item_name}','${data.item_description}','${date}','${date}','${data.entryby}','${data.barcode_num}','${data.barcode_idi}','${data.img_one}','${data.img_two}','${data.img_three}','${data.img_four}');`
	QRY_TO_EXEC = QRY_TO_EXEC + mulqry;
	// }

	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			results.data = data;
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getsubcatMdl = function (id, lastId, callback) {
	var cntxtDtls = "in getsubcatMdl";
	var QRY_TO_EXEC = `select * from ff_shp_add_sub_category where category_id='${id.id}' and d_in =0 order by id desc`;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			results.lastId = lastId;
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.insertintosubcatMdl = function (data, lastId, callback) {
	var cntxtDtls = "in insertintosubcatMdl";
	var mulqry = '';
	var QRY_TO_EXEC = '';
	console.log("model", data);
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	for (i = 0; i < data.length; i++) {
		var mulqry = `insert into ff_shp_add_items_subcat_t(item_id,subcat_id,sub_category)
          values('${lastId}','${data[i].id}','${data[i].subcategory}');`;
		QRY_TO_EXEC = QRY_TO_EXEC + mulqry;
	}
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//mounika end

exports.ChckExitingusrs = function (data, callback) {
	var cntxtDtls = "in ChckExitingusrs";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `select * from  userreport where d_in='0' and usr_phone='${data.usr_phone}'`;

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.postregistrationdataMdl = function (data, callback) {
	var cntxtDtls = "in postregistrationdataMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var time = moment().utcOffset("+05:30").format("HH:mm:ss");
	var QRY_TO_EXEC = ` insert into userreport (usr_nm,usr_phone,usr_pwd,usr_email,city,state,address,usertype,userfrom,gender) 
	values ('${data.usr_nm}','${data.usr_phone}','${data.usr_pwd}','${data.usr_email}','${data.city}','${data.state}','${data.address}','Consumer','${data.userfrom}','${data.gender}');`;
	//console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


exports.gethomepagecategoriesMdl = function (callback) {
	var cntxtDtls = "in gethomepagecategoriesMdl";
	var QRY_TO_EXEC = `select * from ff_shp_add_category where d_in =0 `;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getsubcategoriesMdl = function (data, callback) {
	console.log(data);
	var cntxtDtls = "in getsubcategoriesMdl";
	var QRY_TO_EXEC = `select * from ff_shp_add_sub_category where category_id = '${data.cat_id}' and d_in =0 `;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getsubitemslistMdl = function (data, callback) {
	console.log(data);
	var cntxtDtls = "in getsubitemslistMdl";
	var QRY_TO_EXEC = `SELECT * FROM ff_shp_add_items_subcat_t as s JOIN ff_shp_add_items as i ON s.item_id = i.id JOIN ff_shp_add_items_t as ai on ai.item_id=i.id where s.subcat_id = '${data.id}' and s.d_in =0 `;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.getmakeupitemsMdl = function (callback) {
	var cntxtDtls = "in getmakeupitemsMdl";
	var QRY_TO_EXEC = `select * from ff_shp_add_items as i JOIN ff_shp_add_items_t as t ON t.item_id = i.id 
	where i.category_id ='6' AND i.d_in =0; `;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.getskinitemsMdl = function (callback) {
	var cntxtDtls = "in getskinitemsMdl";
	var QRY_TO_EXEC = `select * from ff_shp_add_items as i JOIN ff_shp_add_items_t as t ON t.item_id = i.id 
	where i.category_id ='1' AND i.d_in =0; `;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.gethairitemsMdl = function (callback) {
	var cntxtDtls = "in gethairitemsMdl";
	var QRY_TO_EXEC = `select * from ff_shp_add_items as i JOIN ff_shp_add_items_t as t ON t.item_id = i.id 
	where i.category_id ='3' AND i.d_in =0; `;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.getbodyitemsMdl = function (callback) {
	var cntxtDtls = "in getbodyitemsMdl";
	var QRY_TO_EXEC = `select * from ff_shp_add_items as i JOIN ff_shp_add_items_t as t ON t.item_id = i.id 
	where i.category_id ='4' AND i.d_in =0; `;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.getsingitemdataMdl = function (item_id, callback) {
	var cntxtDtls = "in getsingitemdataMdl";
	// var QRY_TO_EXEC = `SELECT *,s.id AS m_m_id,a.id as main_id FROM ff_shp_add_items_t AS s 
	// JOIN ff_shp_add_items as a on s.item_id = a.id 
	// JOIN ff_shp_add_category as c ON c.id = a.category_id 
	// JOIN ff_shp_add_sizes as d on d.id = s.measures_id WHERE s.item_id = '${item_id}' and s.d_in = 0`;

	var QRY_TO_EXEC = `SELECT a.id as main_id, s.id as m_m_id,s.mrpprice,s.price,d.sizes,a.category_id,c.category,a.item_name,a.item_description,a.img_one,a.img_two,a.img_three,a.img_four FROM ff_shp_add_items_t AS s 
	JOIN ff_shp_add_items as a on s.item_id = a.id 
	JOIN ff_shp_add_category as c ON c.id = a.category_id 
	JOIN ff_shp_add_sizes as d on d.id = s.measures_id WHERE s.item_id = '${item_id}' and s.d_in = 0`
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.getallitemsdataMdl = function (callback) {
	var cntxtDtls = "in getallitemsdataMdl";
	var QRY_TO_EXEC = `SELECT * FROM ff_shp_add_items as i JOIN ff_shp_add_items_t as a ON a.item_id = i.id WHERE i.d_in = '0'; `;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//website start mounika

exports.getcategorylistMdl = function (callback) {
	var cntxtDtls = "in getcategorylistMdl";
	var QRY_TO_EXEC = `SELECT * from ff_shp_add_category where d_in='0';`
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getallcategorydataMdl = function (cat_id, callback) {
	var cntxtDtls = "in getallcategorydataMdl";
	var QRY_TO_EXEC = `SELECT * FROM ff_shp_add_items AS s JOIN ff_shp_add_items_t as a on a.item_id = s.id WHERE s.category_id = '${cat_id}' and s.d_in = 0`;
	//  console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//website end mounika


//get images in add items

exports.getimagesmdl = function (id, callback) {
	var cntxtDtls = "in getimagesmdl";
	var QRY_TO_EXEC = `select *  from  ff_shp_add_items where id='${id}'`;
	// // console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {

			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.categorydisplaymdl = function (id, callback) {
	var cntxtDtls = "in categorydisplaymdl";
	console.log(id);
	// var QRY_TO_EXEC = `select category from  ff_shp_add_category where id='${id}' and d_in=0 ;`
	var QRY_TO_EXEC = `SELECT c.category,sc.sub_category FROM ff_shp_add_items  as ai join ff_shp_add_category as c on c.id=ai.category_id join ff_shp_add_items_subcat_t as sc on ai.id = sc.item_id where ai.id ='${id}' and ai.d_in=0;`;
	console.log(QRY_TO_EXEC);
	console.log("executing");
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//add banner start
exports.addwebsitebannermdl = function (data, imageupload, callback) {
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var cntxtDtls = "in addwebsitebannermdl";
	var QRY_TO_EXEC = `insert into websitebanner(bannername,websitebannerimage)  values('${data.bannername}','${imageupload}') `;
	console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getwebsiteBannermdl = function (callback) {
	var cntxtDtls = "in getwebsiteBannermdl";
	var QRY_TO_EXEC = `select * from websitebanner where d_in =0 order by id desc`;
	console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.deletewebsiteBannermdl = function (id, callback) {
	var cntxtDtls = "in deletewebsiteBannermdl";
	var QRY_TO_EXEC = `update websitebanner set d_in= '1' where id ='${id}'`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.updatewebsiteBannermdl = function (data, callback) {
	var cntxtDtls = "in updatewebsiteBannermdl";
	var QRY_TO_EXEC = `update websitebanner set bannername ='${data.bannername}' where id ='${data.id}'`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



//add banner end
//add website banner start

exports.addbannermdl = function (data, imageupload, callback) {
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var cntxtDtls = "in addbannermdl";
	var QRY_TO_EXEC = `insert into banner(bannername,bannerimage)  values('${data.bannername}','${imageupload}') `;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getBannermdl = function (callback) {
	var cntxtDtls = "in getBannermdl";
	var QRY_TO_EXEC = `select * from banner where d_in =0 order by id desc`;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.deleteBannermdl = function (id, callback) {
	var cntxtDtls = "in deleteBannermdl";
	var QRY_TO_EXEC = `update banner set d_in= '1' where id ='${id}'`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.updateBannermdl = function (data, callback) {
	var cntxtDtls = "in updateBannermdl";
	var QRY_TO_EXEC = `update banner set bannername ='${data.bannername}' where id ='${data.id}'`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};




//add website banner end

//image code start 
exports.modelimageedit1Mdl = function (imageupload1, img_ind11, callback) {
	var cntxtDtls = "in modelimageedit1Mdl";
	var QRY_TO_EXEC = `UPDATE ${img_ind11.tablenm} SET ${img_ind11.imgcolumnname} = '${imageupload1}' WHERE id='${img_ind11.id}'`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//image code end
//website video code start

exports.addvideomdl = function (data, imageupload, callback) {
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var cntxtDtls = "in addvideomdl";
	var QRY_TO_EXEC = `insert into videoupload(video)  values('${imageupload}') `;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.getvideomdl = function (callback) {
	var cntxtDtls = "in getvideomdl";
	var QRY_TO_EXEC = `select * from videoupload where d_in =0 order by id desc`;
	// console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.deleteVideomdl = function (id, callback) {
	var cntxtDtls = "in deleteVideomdl";
	var QRY_TO_EXEC = `update videoupload set d_in= '1' where id ='${id}'`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//new code start
exports.deleteadditemsrecordmdl = function (id, callback) {
	var cntxtDtls = "in deleteadditemsrecordmdl";
	var QRY_TO_EXEC = `UPDATE ff_shp_add_items SET d_in = 1 where id = '${id}';`
	// //   console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//update product name and decription start
exports.updateproductdetmdl = function (data, callback) {
	var cntxtDtls = "in updateproductdetmdl";
	var QRY_TO_EXEC = `update  ff_shp_add_items set item_name ='${data.item_name}',item_description ='${data.item_description}',s_item_name ='${data.s_item_name}',ingredients ='${data.ingredients}', howtouse ='${data.howtouse}', qualitycheck ='${data.qualitycheck}',quan_per_mon='${data.quan_per_mon}',barcode ='${data.barcode}',rating='${data.rating}',reviews='${data.reviews}' where id ='${data.id}'`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//website video code end
//23-02-22 start
exports.postqualitycheckmdl = function (data, imageupload, callback) {
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var cntxtDtls = "in postqualitycheckmdl";
	var QRY_TO_EXEC = `insert into qualitycheck(qualitycheckimage)  values('${imageupload}') `;
	console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getqualitycheckmdl = function (callback) {
	var cntxtDtls = "in getqualitycheckmdl";
	var QRY_TO_EXEC = `select * from  qualitycheck where d_in =0 order by id desc`;
	console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.deletequalitycheckmdl = function (id, callback) {
	var cntxtDtls = "in deletequalitycheckmdl";
	var QRY_TO_EXEC = `update qualitycheck set d_in= '1' where id ='${id}'`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//edit keywords
exports.updatekeywordsmdl = function (data, callback) {
	var cntxtDtls = "in updatekeywordsmdl";
	console.log(data)
	var QRY_TO_EXEC = `update  search_keywords_t set keywords ='${data.keywords}'  where id ='${data.id}';`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


//edit keypoints
exports.updatekeypointsmdl = function (data, callback) {
	var cntxtDtls = "in updatekeypointsmdl";
	var QRY_TO_EXEC = `update  keypoints set keypoints ='${data.keypoints}' where id ='${data.id}'`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



//23-02-22 end
//mounika app code start

exports.getlogindetailsMdl = function (data, callback) {
	var cntxtDtls = "in getlogindetailsMdl";
	var QRY_TO_EXEC = `select count(id) as i from userreport where usr_phone='${data.phonenumber}' and d_in=0`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getlogindataMdl = function (data, callback) {
	var cntxtDtls = "in getlogindataMdl";
	// var QRY_TO_EXEC = `select * from ff_usr_tbl where usr_phone='${data.phonenumber}' and usr_pswd='${data.password}' and usr_type='1'`;
	var QRY_TO_EXEC = `select * from userreport where usr_phone='${data.phonenumber}'`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.postregisterdetailsMdl = function (data, callback) {
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var cntxtDtls = "in postregisterdetailsMdl";
	var QRY_TO_EXEC = `insert into userreport(usr_nm,usr_phone,usr_email,state,userfrom)  values('${data.usr_nm}','${data.usr_phone}','${data.usr_email}','${data.state}','2') `;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.NewDeleveryAddressMdl = function (newadd, callback) {
	var cntxtDtls = "in NewDeleveryAddressMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `insert into adding_customer_dtl_t (customer_id,mbl,customer_nm,f_h_b_c_a,a_c_s_s_v,landmark,town_city,state,address_status,pin,i_ts)  values('${newadd.customer_id}','${newadd.alt_mbl}','${newadd.customer_nm}','${newadd.f_h_b_c_a}','${newadd.a_c_s_s_v}','${newadd.landmark}','${newadd.town_city}','${newadd.state}','1','${newadd.pin}','${date}');`;

	console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			//(err);
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getnewDeleveryAddressMdl = function (cust_id_arr, callback) {
	var cntxtDtls = "getnewDeleveryAddressMdl";
	var QRY_TO_EXEC = `SELECT * FROM adding_customer_dtl_t WHERE customer_id='${cust_id_arr.customer_id}' AND d_in = 0`;
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.deleteaddressMdl = function (id, callback) {
	var cntxtDtls = "in deleteaddressMdl";

	var date = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');
	var QRY_TO_EXEC = `UPDATE adding_customer_dtl_t SET d_in = 1 WHERE id ='${id}'; `;
	////
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getofferproductsMdl = function (callback) {
	var cntxtDtls = "in getofferproductsMdl";
	var QRY_TO_EXEC = `SELECT * FROM ff_shp_add_items_subcat_t as s JOIN ff_shp_add_items as i ON s.item_id = i.id JOIN ff_shp_add_items_t as ai on ai.item_id=i.id JOIN offer_products as op on op.item_id=i.id`;
	console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getwalletMdl = function (data, callback) {
	var cntxtDtls = "in getwalletMdl";
	var QRY_TO_EXEC = `select * from userreport where usr_phone='${data.phonenumber}' and d_in=0`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//update product name and decription start
exports.updateproductdetmdl = function (data, callback) {
	var cntxtDtls = "in updateproductdetmdl";
	var QRY_TO_EXEC = `update  ff_shp_add_items set item_name ='${data.item_name}',item_description ='${data.item_description}'  where id ='${data.id}'`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


//mounika app code end

//book my show code start


//events/addevents start
exports.postaddeventmethodmdl = function (data, callback) {
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var cntxtDtls = "in postaddeventmethodmdl";
	var QRY_TO_EXEC = `insert into addevent(location,startingtime,endingtime)  values('${data.location}','${data.startingtime}','${data.endingtime}') `;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.geteventdatamdl = function (callback) {
	var cntxtDtls = "in geteventdatamdl";
	var QRY_TO_EXEC = `select * from addevent where d_in = 0`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.updateEventDatamdl = function (data, callback) {
	var cntxtDtls = "in updateEventDatamdl";
	var QRY_TO_EXEC = `update  addevent set location ='${data.location}',startingtime ='${data.startingtime}',endingtime ='${data.endingtime}'  where id ='${data.id}'`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.deleteeventmdl = function (id, callback) {
	var cntxtDtls = "in deleteeventmdl";

	var date = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');
	var QRY_TO_EXEC = `UPDATE addevent SET d_in = 1 WHERE id ='${id}'; `;
	////
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//events/addevents end



//permissions start
//create user start

exports.ChckExitingusr = function (data, callback) {
	var cntxtDtls = "in ChckExitingusr";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `select * from  ff_usr_tbl where d_in='0' and usr_phone='${data.phone}'`;

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};




exports.addusrsMdl = function (data, callback) {
	var cntxtDtls = "in getMenuCatgrypermissionsMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var time = moment().utcOffset("+05:30").format("HH:mm:ss");
	var QRY_TO_EXEC = ` insert into ff_usr_tbl (usr_pswd,usr_nm,usr_phone,usr_email,e_time,d_in,e_by,e_dt) 
	values ('${data.pswd}','${data.usr}','${data.phone}','${data.mail}','${time}',0,'${data.usr_id}','${date}');`;
	//console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.deleteUsrMD1 = function (cls_id, callback) {
	var cntxtDtls = "in deleteUsrMD1";
	var QRY_TO_EXEC = `UPDATE ff_usr_tbl  SET d_in=1  where usr_id=${cls_id};`;

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.getusrsMdl = function (callback) {
	var cntxtDtls = "in getusrsMdl";
	var QRY_TO_EXEC = `SELECT * from ff_usr_tbl  where d_in <> 1 and usr_type='0' order by usr_id desc;`;

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.updateUserDetailsMdl = function (data, callback) {
	var cntxtDtls = "in updateUserDetailsMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `update ff_usr_tbl set usr_pswd ='${data.usr_pswd}',usr_nm='${data.usr_nm}',usr_phone='${data.usr_phone}',
	usr_email='${data.usr_email}',u_ts='${date}',e_by='${data.usr_ids}',e_dt='${date}',usr_phone='${data.usr_phone}'
	where usr_id='${data.usr_id}' ;`;

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.updateUserPhoneNumDuplicateCheckMdl = function (data, callback) {
	var cntxtDtls = "in updateUserPhoneNumDuplicateCheckMdl";
	var QRY_TO_EXEC = ` SELECT  count(*) as count from ff_usr_tbl where usr_phone= "${data.usr_phone}" and d_in=0;`;
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.updateUserDetailsMdl = function (data, callback) {
	var cntxtDtls = "in updateUserDetailsMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `update ff_usr_tbl set usr_pswd ='${data.usr_pswd}',usr_nm='${data.usr_nm}',usr_phone='${data.usr_phone}',
	usr_email='${data.usr_email}',u_ts='${date}',e_by='${data.usr_ids}',e_dt='${date}',usr_phone='${data.usr_phone}'
	where usr_id='${data.usr_id}' ;`;

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//create user end
//add permissions start

exports.getMenuCatgrypermissionsMdl = function (usr_id, callback) {
	var cntxtDtls = "in getMenuCatgrypermissionsMdl";
	var QRY_TO_EXEC = `SELECT * from ff_menu_lst_tbl as lst join ff_menu_catgry_tbl as m on lst.menu_cat_id=m.menu_ctgry_id  
	where lst.d_in=0 and m.d_in='0' and  lst.carrer_menu_id not in  (select menu_id from ff_usr_menu_rel_tbl where usr_id='${usr_id}' and d_in=0)  order  BY lst.menu_cat_id,carrer_menu_id;`;
	console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.sendpermissionsmdl = function (data, usr, callback) {
	var QRY_TO_EXEC = '';
	var cntxtDtls = "in sendpermissionsmdl";
	var QRY_TO_EXEC = `insert into ff_usr_menu_rel_tbl (usr_id,menu_id,d_in)  values('${usr}','${data}',0); `;
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//add permissions end
//view permissions start
exports.getpermissionMdl = function (callback) {
	var cntxtDtls = "in getpermissionMdl";
	var QRY_TO_EXEC = `SELECT count(r.usr_id) as usr_count,u.usr_nm,u.usr_phone,r.usr_id from ff_usr_menu_rel_tbl as r join ff_usr_tbl as u on u.usr_id = r.usr_id where r.d_in ='0' and u.usr_type='0'  group by r.usr_id order by r.usr_id desc;`;
	// 
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.permsListMdl = function (usr_id, callback) {
	var cntxtDtls = "in permsListMdl";
	var QRY_TO_EXEC = `SELECT r.usr_menu_rel_id,u.usr_nm,u.usr_phone,r.usr_id,l.menu_nm,f.menu_cat_nm from ff_usr_menu_rel_tbl as r join ff_usr_tbl as u on u.usr_id = r.usr_id join ff_menu_lst_tbl as l on l.carrer_menu_id = r.menu_id join ff_menu_catgry_tbl as f on f.menu_ctgry_id = l.menu_cat_id where r.d_in ='0' and r.usr_id='${usr_id}' AND l.d_in=0 and f.d_in='0' order by r.usr_id desc;`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.deletepermMdl = function (usr_menu_rel_id, callback) {
	var cntxtDtls = "in deletepermMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var QRY_TO_EXEC = `UPDATE ff_usr_menu_rel_tbl SET d_in='1' where usr_menu_rel_id='${usr_menu_rel_id}'`;

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};




//view permissions end

//permissions end
//graphs start

exports.getcountmdl = function (callback) {
	var cntxtDtls = "in getcountmdl";
	var QRY_TO_EXEC = `select count(*) as eventcount from addevent where d_in='0';`;
	console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



exports.geteventdatamdl = function (callback) {
	var cntxtDtls = "in geteventdatamdl";
	var QRY_TO_EXEC = `select * from addevent where d_in='0';`;
	console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


//graphs end

//book my show code end
//r&r start
//district start



exports.adddistrictmdl = function (data, callback) {
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var cntxtDtls = "in adddistrictmdl";
	var QRY_TO_EXEC = `insert into district_table(district)  values('${data.district}') `;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;	
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getdistrictmdl = function (callback) {
	var cntxtDtls = "in getdistrictmdl";
	var QRY_TO_EXEC = `select * from district_table where d_in = 0 order by id desc;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.updatedistrictmdl = function (data, callback) {
	var cntxtDtls = "in updatedistrictmdl";
	var QRY_TO_EXEC = `update  district_table set district ='${data.district}' where id ='${data.id}'`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.deletedistrictmdl = function (id, callback) {
	var cntxtDtls = "in deletedistrictmdl";

	var date = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');
	var QRY_TO_EXEC = `UPDATE district_table SET d_in = 1 WHERE id ='${id}'; `;
	////
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//district end

//division start

exports.getdistrictdatamdl = function (callback) {
	var cntxtDtls = "in getdistrictdatamdl";
	var QRY_TO_EXEC = `select district from district_table where d_in = 0 order by id desc;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.adddivisionmdl = function (data, callback) {
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var cntxtDtls = "in adddivisionmdl";
	var QRY_TO_EXEC = `insert into division_table(district,division)  values('${data.district}','${data.division}') `;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getdivisionmdl = function (callback) {
	var cntxtDtls = "in getdivisionmdl";
	var QRY_TO_EXEC = `select * from division_table where d_in = 0 order by id desc`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.updatedivisionmdl = function (data, callback) {
	var cntxtDtls = "in updatedivisionmdl";
	var QRY_TO_EXEC = `update  division_table set district ='${data.district}',division ='${data.division}'  where id ='${data.id}'`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.deletedivisionmdl = function (id, callback) {
	var cntxtDtls = "in deletedivisionmdl";

	var date = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');
	var QRY_TO_EXEC = `UPDATE division_table SET d_in = 1 WHERE id ='${id}'; `;
	////
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//division end

//department start



exports.adddepartmentmdl = function (data, callback) {
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var cntxtDtls = "in adddepartmentmdl";
	var QRY_TO_EXEC = `insert into department_table(department)  values('${data.department}') `;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getdepartmentmdl = function (callback) {
	var cntxtDtls = "in getdepartmentmdl";
	var QRY_TO_EXEC = `select * from department_table where d_in = 0 order by id desc;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.updatedepartmentmdl = function (data, callback) {
	var cntxtDtls = "in updatedepartmentmdl";
	var QRY_TO_EXEC = `update  department_table set department ='${data.department}' where id ='${data.id}'`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.deletedepartmentmdl = function (id, callback) {
	var cntxtDtls = "in deletedepartmentmdl";

	var date = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');
	var QRY_TO_EXEC = `UPDATE department_table SET d_in = 1 WHERE id ='${id}'; `;
	////
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//department end

//colony details start

exports.getdivisiondatamdl = function (callback) {
	var cntxtDtls = "in getdivisiondatamdl";
	var QRY_TO_EXEC = `select division from division_table where d_in = 0 order by id desc;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

exports.addcolonydatamdl = function (data, callback) {
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var cntxtDtls = "in addcolonydatamdl";
	var QRY_TO_EXEC = `insert into randr_villages(district,division,department,colony_id,colony_name,habitation,no_pdf)  values('${data.district}','${data.division}','${data.department}','${data.colony_id}','${data.colony_name}','${data.habitation}','${data.no_pdf}') `;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


exports.getcolonydatamdl = function (callback) {
	var cntxtDtls = "in getcolonydatamdl";
	var QRY_TO_EXEC = `select * from randr_villages where d_in = 0 order by id desc;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

exports.updatecolonydatamdl = function (data, callback) {
	var cntxtDtls = "in updatecolonydatamdl";
	var QRY_TO_EXEC = `update  randr_villages set district ='${data.district}',division ='${data.division}',
	
	department='${data.department}',
	colony_id ='${data.colony_id}',colony_name='${data.colony_name}', habitation ='${data.habitation}',no_pdf ='${data.no_pdf}'  where id ='${data.id}'`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.deletecolonydatamdl = function (id,callback) {
	var cntxtDtls = "in deletecolonydatamdl";

	var date = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');
	var QRY_TO_EXEC = `UPDATE randr_villages SET d_in = 1 WHERE id ='${id}'; `;
	
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



exports.departmentmdl = function (callback) {
	var cntxtDtls = "in departmentmdl";
	var QRY_TO_EXEC = `select department from department_table where d_in = 0 order by id desc;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

exports.changehabitationmdl = function (division, callback) {
	console.log(division);
	var cntxtDtls = "in changehabitationmdl";
	var QRY_TO_EXEC = `SELECT habitation from randr_villages where division='${division}' group by habitation ORDER BY id ASC;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


exports.changedivisiondata1mdl = function (district, callback) {
	console.log(district);
	var cntxtDtls = "in changedivisiondata1mdl";
	var QRY_TO_EXEC = `SELECT division from randr_villages where district='${district}' group by division ORDER BY id ASC;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};





//colony details end


//habitation start

exports.getcolonynamemdl = function (callback) {
	var cntxtDtls = "in getcolonynamemdl";
	var QRY_TO_EXEC = `select colony_name from randr_villages where d_in = 0 group by colony_name;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

exports.addhabitationdatamdl = function (data, callback) {
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var cntxtDtls = "in addhabitationdatamdl";
	var QRY_TO_EXEC = `insert into habitation_table(district,division,colony_name,habitationname)  values('${data.district}','${data.division}','${data.colony_name}','${data.habitationname}') `;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


exports.gethabitationdatamdl = function (callback) {
	var cntxtDtls = "in gethabitationdatamdl";
	var QRY_TO_EXEC = `select * from habitation_table where d_in = 0 order by id desc;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

exports.updatehabitationdatamdl = function (data, callback) {
	var cntxtDtls = "in updatehabitationdatamdl";
	var QRY_TO_EXEC = `update  habitation_table set district ='${data.district}',division ='${data.division}',colonyname='${data.colonyname}',habitationname = '${data.habitationname}' where id ='${data.id}'`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.deletehabitationdatamdl = function (id,callback) {
	var cntxtDtls = "in deletehabitationdatamdl";

	var date = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');
	var QRY_TO_EXEC = `UPDATE habitation_table SET d_in = 1 WHERE id ='${id}'; `;
	
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



//habitation end

//stages start

exports.addstagedatamdl = function (data, callback) {
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var cntxtDtls = "in addstagedatamdl";
	var QRY_TO_EXEC = `insert into randr_house_stages(val,descd) values('${data.val}','${data.descd}') `;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


exports.getstagedatamdl = function (callback) {
	var cntxtDtls = "in getstagedatamdl";
	var QRY_TO_EXEC = `select * from randr_house_stages where d_in = '0' ;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

exports.updatestagedatamdl = function (data, callback) {
	var cntxtDtls = "in updatestagedatamdl";
	var QRY_TO_EXEC = `update  randr_house_stages set val ='${data.val}', descd ='${data.descd}' where id ='${data.id}'`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.deletestagedatamdl = function (id,callback) {
	var cntxtDtls = "in deletestagedatamdl";

	var date = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');
	var QRY_TO_EXEC = `UPDATE randr_house_stages SET d_in = 1 WHERE id ='${id}'; `;
	
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//stages end


//infrastructure start

exports.addinfradatamdl = function (data, callback) {
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var cntxtDtls = "in addinfradatamdl";
	var QRY_TO_EXEC = `insert into infra_table(infra_name) values('${data.infra_name}') `;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


exports.getinfradatamdl = function (callback) {
	var cntxtDtls = "in getinfradatamdl";
	var QRY_TO_EXEC = `select * from infra_table where d_in = 0 order by id asc;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

exports.updateinfradatamdl = function (data, callback) {
	var cntxtDtls = "in updateinfradatamdl";
	var QRY_TO_EXEC = `update  infra_table set infra_name ='${data.infra_name}' where id ='${data.id}'`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.deleteinfradatamdl = function (id,callback) {
	var cntxtDtls = "in deleteinfradatamdl";

	var date = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');
	var QRY_TO_EXEC = `UPDATE infra_table SET d_in = 1 WHERE id ='${id}'; `;
	
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//infrastructure end

//house start
exports.gethousedatamdl = function (callback) {
	var cntxtDtls = "in gethousedatamdl";
	var QRY_TO_EXEC = `select * from randr_geotagging where assetType='Houses';`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};
//house end

//toilet start
exports.gettoiletdatamdl = function (callback) {
	var cntxtDtls = "in gettoiletdatamdl";
	var QRY_TO_EXEC = `select * from randr_geotagging where assetType='Toilets';`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

//toilet end
//infra start
exports.getinfradatamdl = function (callback) {
	var cntxtDtls = "in getinfradatamdl";
	var QRY_TO_EXEC = `select * from randr_geotagging where assetType='infra';`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

//infra end


//report start

exports.getreportmdl = function (callback) {
	var cntxtDtls = "in getreportmdl";
	var QRY_TO_EXEC = `SELECT a.val,
	(SELECT COUNT(b.work_stage) FROM randr_geotagging b WHERE b.work_stage = a.val  AND b.assetType = 'Houses') as tot_houses,
	(SELECT COUNT(b.toilet_stage) FROM randr_geotagging b WHERE b.toilet_stage = a.val  AND b.assetType = 'Toilets') as tot_toilets,
	(SELECT COUNT(b.work_stage) FROM randr_geotagging b WHERE b.work_stage = a.val  AND b.assetType = 'infra') as tot_infra
	FROM randr_house_stages a where a.d_in = '0';`;
	// console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

exports.gethabitationdropdownmdl = function (callback) {
	var cntxtDtls = "in gethabitationdropdownmdl";
	var QRY_TO_EXEC = `select habitation_name from randr_geotagging group by habitation_name;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

exports.gethabitationreportmdl = function (callback) {
	var cntxtDtls = "in gethabitationreportmdl";
	var QRY_TO_EXEC = `select * from randr_geotagging where work_stage<>'' and toilet_stage<>''`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};
exports.searchhabitationmdl = function (habitation_name,callback) {
	var cntxtDtls = "in searchhabitationmdl";
	var QRY_TO_EXEC = `select * from randr_geotagging where habitation_name = '${habitation_name}'`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

//department wise analysis

exports.getdepartmentdropdownmdl = function (callback) {
	var cntxtDtls = "in getdepartmentdropdownmdl";
	var QRY_TO_EXEC = `select department from department_table group by department;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

exports.getdepartmentreportmdl = function (callback) {
	var cntxtDtls = "in getdepartmentreportmdl";
	var QRY_TO_EXEC = `select * from randr_geotagging`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};
exports.searchdepartmentmdl = function (department,callback) {
	var cntxtDtls = "in searchdepartmentmdl";
	var QRY_TO_EXEC = `select * from randr_geotagging where department = '${department}'`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

//report end
//onchange in report start
exports.changedivisiondatamdl = function (district, callback) {
	console.log(district);
	var cntxtDtls = "in changedivisiondatamdl";
	var QRY_TO_EXEC = `SELECT division from randr_geotagging where district='${district}' group by division ORDER BY id ASC;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.changecolonydatamdl = function (division, callback) {
	console.log(division);
	var cntxtDtls = "in changecolonydatamdl";
	var QRY_TO_EXEC = `SELECT colony_name from randr_geotagging where division='${division}' group by colony_name ORDER BY id ASC;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};





//onchange in report end



exports.districtdatamdl = function (callback) {
	var cntxtDtls = "in districtdatamdl";
	var QRY_TO_EXEC = `select district from randr_geotagging group by district;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.searchdatamdl = function (district,division,colony_name, callback) {
	var cntxtDtls = "in searchdatamdl";

	console.log(district);
	console.log(division);
	console.log(colony_name);

	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	if ( district != 'undefined' && division != 'undefined' && colony_name != 'undefined') {
	var QRY_TO_EXEC = ` SELECT a.val, (SELECT COUNT(b.work_stage) FROM randr_geotagging b WHERE b.work_stage = a.val AND b.assetType = 'Houses' and b.district ="${district}" and b.division ="${division}" and b.colony_name="${colony_name}") as tot_houses, (SELECT COUNT(b.toilet_stage) FROM randr_geotagging b WHERE b.toilet_stage = a.val AND b.assetType = 'Toilets' and b.district ="${district}" and b.division ="${division}" and b.colony_name="${colony_name}") as tot_toilets, (SELECT COUNT(b.work_stage) FROM randr_geotagging b WHERE b.work_stage = a.val AND b.assetType = 'infra' and b.district ="${district}" and b.division ="${division}" and b.colony_name="${colony_name}") as tot_infra FROM randr_house_stages a`;
	}
	else if(district != 'undefined' && division == 'undefined' && colony_name == 'undefined' ){
		var QRY_TO_EXEC = `SELECT a.val, (SELECT COUNT(b.work_stage) FROM randr_geotagging b WHERE b.work_stage = a.val AND b.assetType = 'Houses' and b.district ="${district}" ) as tot_houses, (SELECT COUNT(b.toilet_stage) FROM randr_geotagging b WHERE b.toilet_stage = a.val AND b.assetType = 'Toilets' and b.district ="${district}" ) as tot_toilets, (SELECT COUNT(b.work_stage) FROM randr_geotagging b WHERE b.work_stage = a.val AND b.assetType = 'infra' and b.district ="${district}") as tot_infra FROM randr_house_stages a`;
	}
	else if(district == 'undefined' && division != 'undefined' && colony_name == 'undefined' ){
		var QRY_TO_EXEC = `SELECT a.val, (SELECT COUNT(b.work_stage) FROM randr_geotagging b WHERE b.work_stage = a.val AND b.assetType = 'Houses' and b.division ="${division}" ) as tot_houses, (SELECT COUNT(b.toilet_stage) FROM randr_geotagging b WHERE b.toilet_stage = a.val AND b.assetType = 'Toilets' and b.division ="${division}" ) as tot_toilets, (SELECT COUNT(b.work_stage) FROM randr_geotagging b WHERE b.work_stage = a.val AND b.assetType = 'infra' and b.division ="${division}") as tot_infra FROM randr_house_stages a' `;
	}
	else if(district == 'undefined' && division == 'undefined' && colony_name != 'undefined' ){
		var QRY_TO_EXEC = `SELECT a.val, (SELECT COUNT(b.work_stage) FROM randr_geotagging b WHERE b.work_stage = a.val AND b.assetType = 'Houses' and b.colony_name ="${colony_name}" ) as tot_houses, (SELECT COUNT(b.toilet_stage) FROM randr_geotagging b WHERE b.toilet_stage = a.val AND b.assetType = 'Toilets' and b.colony_name ="${colony_name}" ) as tot_toilets, (SELECT COUNT(b.work_stage) FROM randr_geotagging b WHERE b.work_stage = a.val AND b.assetType = 'infra' and b.colony_name="${colony_name}") as tot_infra FROM randr_house_stages a`;
	}
	else{
		var QRY_TO_EXEC = `SELECT a.val,
		(SELECT COUNT(b.work_stage) FROM randr_geotagging b WHERE b.work_stage = a.val  AND b.assetType = 'Houses') as tot_houses,
		(SELECT COUNT(b.toilet_stage) FROM randr_geotagging b WHERE b.toilet_stage = a.val  AND b.assetType = 'Toilets') as tot_toilets,
		(SELECT COUNT(b.work_stage) FROM randr_geotagging b WHERE b.work_stage = a.val  AND b.assetType = 'infra') as tot_infra
		FROM randr_house_stages a;`;
	}
	console.log(QRY_TO_EXEC);
    
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


//r&r end
//dashboard start


exports.getcountsmdl = function (callback) {
	var cntxtDtls = "in getcountsmdl";
	var QRY_TO_EXEC = `select id from randr_geotagging where assetType="Houses" group by colony_id,habitation_id,plot_no;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};
exports.gettoiletscountsmdl = function (callback) {
	var cntxtDtls = "in gettoiletscountsmdl";
	var QRY_TO_EXEC = `select id from randr_geotagging where assetType="Toilets" group by colony_id,habitation_id,plot_no;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};
exports.getinfracountsmdl = function (callback) {
	var cntxtDtls = "in getinfracountsmdl";
	var QRY_TO_EXEC = `select id from randr_geotagging where assetType="Infra" group by colony_id,habitation_id,plot_no;`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

exports.gethouseanalysismdl = function (callback) {
	var cntxtDtls = "in gethouseanalysismdl";
	var QRY_TO_EXEC = `SELECT a.val,(SELECT COUNT(b.work_stage) FROM randr_geotagging b WHERE b.work_stage = a.val  AND b.assetType = 'Houses' ) as HouseCount FROM randr_house_stages a where a.d_in='0';`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};
exports.gettoiletanalysismdl = function (callback) {
	var cntxtDtls = "in gettoiletanalysismdl";
	var QRY_TO_EXEC = `SELECT a.val,(SELECT COUNT(b.toilet_stage) FROM randr_geotagging b WHERE b.toilet_stage = a.val  AND b.assetType = 'Toilets' ) as ToiletCount FROM randr_house_stages a where a.d_in='0';`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};
exports.getinfraanalysismdl = function (callback) {
	var cntxtDtls = "in getinfraanalysismdl";
	var QRY_TO_EXEC = `SELECT a.val,(SELECT COUNT(b.work_stage) FROM randr_geotagging b WHERE b.work_stage = a.val  AND b.assetType = 'infra') as InfraCount FROM randr_house_stages a where a.d_in='0';`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};
//dashboard end
//graphs start

exports.departmenthousecountmdl = function (callback) {
	var cntxtDtls = "in departmenthousecountmdl";
	var QRY_TO_EXEC = `SELECT count(*) as dhc,department FROM randr_geotagging where assetType='Houses' group by department`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};
exports.departmenttoiletcountmdl = function (callback) {
	var cntxtDtls = "in departmenttoiletcountmdl";
	var QRY_TO_EXEC = `SELECT count(*) as dtc,department FROM randr_geotagging where assetType='Toilets' group by department`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

exports.departmentinfracountmdl = function (callback) {
	
	var cntxtDtls = "in departmentinfracountmdl";
	var QRY_TO_EXEC = `SELECT count(*) as dic,department FROM randr_geotagging where assetType='Infra' group by department`;
	console.log(QRY_TO_EXEC);
	console.log('hi')
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

exports.westgodavaridatamdl = function (callback) {
	
	var cntxtDtls = "in westgodavaridatamdl";
	var QRY_TO_EXEC = `SELECT count(*) as total,(SELECT count(district) from randr_geotagging where district='West Godavari' and assetType='Houses')as wghousecount,(SELECT count(district) from randr_geotagging where district='West Godavari' and assetType='Toilets')as wgtoiletcount,(SELECT count(district) from randr_geotagging where district='West Godavari' and assetType='Infra')as wginfracount from randr_geotagging where district='West Godavari'`;
	console.log(QRY_TO_EXEC);
	
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};
exports.eastgodavaridatamdl = function (callback) {
	
	var cntxtDtls = "in eastgodavaridatamdl";
	var QRY_TO_EXEC = `SELECT count(*) as etotal,(SELECT count(district) from randr_geotagging where district='East Godavari' and assetType='Houses')as eghousecount,(SELECT count(district) from randr_geotagging where district='East Godavari' and assetType='Toilets')as egtoiletcount,(SELECT count(district) from randr_geotagging where district='East Godavari' and assetType='Infra')as eginfracount from randr_geotagging where district='East Godavari'`;
	console.log(QRY_TO_EXEC);
	
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};

exports.hwsanalysismdl = function (callback) {
	
	var cntxtDtls = "in hwsanalysismdl";
	var QRY_TO_EXEC = `SELECT count(division),division FROM randr_geotagging where division<>"null" group by division `;
	console.log(QRY_TO_EXEC);
	
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

};
//graphs end
//swathicode
exports.postingdataMdl = function (data, callback) {
	console.log(data);
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var cntxtDtls = "in postingdataMdl";
	var QRY_TO_EXEC = `insert into newdata(Firstname,Lastname,Dateofbirth,EmailId,MobileNumber,Gender,Address,City,PinCode,State,Country,Hobbies,Qualification,COURSESAPPLIEDFOR)  values('${data.Firstname}','${data.Lastname}','${data.Dateofbirth}','${data.EmailId}','${data.MobileNumber}','${data.Gender}','${data.Address}','${data.City}','${data.PinCode}','${data.State}','${data.Country}','${data.Hobbies}','${data.Qualification}','${data.COURSESAPPLIEDFOR}') `;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;	
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//get
exports.getsubmitdataMdl = function (callback) {
	var cntxtDtls = "in getsubmitdataMdl";
	var QRY_TO_EXEC = `select * from  newdata`;
	console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


// `UPDATE ff_usr_tbl  SET d_in=1  where usr_id=${cls_id}`

//delete
exports.deletedatactrl = function (indicator, callback) {
	var cntxtDtls = "in deleteMD1";
	var QRY_TO_EXEC = `UPDATE form  SET dele=1  where usr_id=${indicator};`;

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};