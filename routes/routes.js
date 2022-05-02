var express = require('express');
router = express.Router();
// var jwt = require('jsonwebtoken');
var sampleRoutes = require('../controllers/mainCtrl');
process.env.SECRET_KEY = "thisismysecretkey";

// ************** Login Start ***************
router.post('/getUsrloginCtrls', sampleRoutes.getUsrloginCtrls);
// ************** Login End *****************
// // ************** Dashboard Start *************
// router.get('/getMenuCatgrypermissions/:usr_id', sampleRoutes.getMenuCatgrypermissionsctrl);
// router.post('/sendpermissions', sampleRoutes.sendpermissionsCtrl);
// router.post('/addusrs', sampleRoutes.addusrsCtrl);
// router.get('/deleteUsr/:id', sampleRoutes.deleteUsrCtrl);
// router.get('/getusrs', sampleRoutes.getusrsCtrl);
// router.post('/updateUserDetails', sampleRoutes.updateUserDetailsCtrl);
// router.get('/deletepermDlts/:usr_menu_rel_id', sampleRoutes.deletepermCtrl);
// router.get('/getpermissionDlts', sampleRoutes.getpermissionCtrl);
// router.get('/permsListDlts/:usr_id', sampleRoutes.permsListCtrl);
// //shops list
// router.get('/getadnshoplistdata/:entryby', sampleRoutes.getadnshoplistdataCtrl); 
// router.post('/adnactivestatusshoplist', sampleRoutes.adnactivestatusshoplistCtrl); 
// // ************** Dashboard End *************

// /////////////////////////////////////////shopping code start//////////////////////////////////////////////////////
// //shopping start
// //category
// router.post('/addshpcategory', sampleRoutes.addshpcategoryCtrl); //add category post
// router.get('/getshpcatCheckData/:medcat', sampleRoutes.getshpcatCheckDataCtrl); //add category check
// router.get('/getshpcategory/:entryby', sampleRoutes.getshpcategoryCtrl); //add category get
// router.post('/updateshpcategory', sampleRoutes.updateshpcategoryCtrl);//update category
// router.get('/dltshpcategory/:id', sampleRoutes.dltshpcategoryCtrl);//delete category
// //add sub category
// router.post('/subshpcategory', sampleRoutes.subshpcategoryCtrl); //sub category post
// router.get('/subshpcatCheckData/:shpsubcat/:category_id', sampleRoutes.subshpcatCheckDataCtrl); //sub category check
// router.get('/getshpsubcategory', sampleRoutes.getshpsubcategoryCtrl); //sub category get
// router.post('/updateshpsubcategory', sampleRoutes.updateshpsubcategoryCtrl);//update subcategory
// router.get('/dltshpsubcategory/:id', sampleRoutes.dltshpsubcategoryCtrl);//delete subcategory
// //add brand
// router.post('/addshpbrand', sampleRoutes.addshpbrandCtrl); //add brand post
// router.get('/getshpbrandCheckData/:shpbrand', sampleRoutes.getshpbrandCheckDataCtrl); //add brand check
// router.get('/getshpbrandsdata', sampleRoutes.getshpbrandsdataCtrl); //add brand get
// router.post('/updateshpbrand', sampleRoutes.updateshpbrandCtrl);//update brand
// router.get('/dltshpbrand/:id', sampleRoutes.dltshpbrandCtrl);//delete brand
// //items
// router.get('/getshopSubCatdata/:subcat', sampleRoutes.getshopSubCatdataCtrl); //get subcat from category
// router.post('/shpadditmdata', sampleRoutes.shpadditmdataCtrl); //add item shopping post
// router.get('/getshopadditemdata/:entryby', sampleRoutes.getshopadditemdataCtrl); //add item get
// router.post('/kitchenadditmdata', sampleRoutes.kitchenadditmdataCtrl); //add item others post
// router.get('/getsizeAddrowTabaData/:id', sampleRoutes.getsizeAddrowTabaDataCtrl); //sizes list view
// router.get('/dltshopadditmdata/:id', sampleRoutes.dltshopadditmdataCtrl);//delete add item
// router.post('/shopimageonlyedit', sampleRoutes.shopimageonlyeditCtrl);//update single image
// router.post('/updateshpadditemdata', sampleRoutes.updateshpadditemdataCtrl);//update shp add item
// router.post('/shpngadditmpricedata', sampleRoutes.shpngadditmpricedataCtrl);//update price
// router.get('/deleteshpngadditmsmeasures/:id', sampleRoutes.deleteshpngadditmsmeasuresCtrl);//delete measures 
// router.get('/deleteadditemsrecord/:id', sampleRoutes.deleteadditemsrecordctrl);//delete add item @ new
// router.post('/updateproductdet', sampleRoutes.updateproductdetctrl);//update productname and description
// router.get('/categorydisplay/:id', sampleRoutes.categorydisplayctrl);

// //shopping end

// //add shopping shops start
// router.post('/shpngaddshopsubmit', sampleRoutes.shpngaddshopsubmitCtrl); //add shopping shop post
// router.get('/getshpngshopCheckData/:shpngshop', sampleRoutes.getshpngshopCheckDataCtrl); //add shop check
// router.get('/getshpngshopsdata/:entryby', sampleRoutes.getshpngshopsdataCtrl); //add shpng shop get
// router.post('/shoppingactivestatusData', sampleRoutes.shoppingactivestatusDataCtrl); // active status 
// router.get('/dltshpngshopdata/:id', sampleRoutes.dltshpngshopdataCtrl);//delete shop
// router.post('/updateshpngshopdata', sampleRoutes.updateshpngshopdataCtrl); //update shopping shop
// //add shopping shops end

// //add shopping shopitems start
// router.get('/getshopsearchcatdata/:shop_id/:cat_id', sampleRoutes.getshopsearchcatdataCtrl); //search
// router.post('/assignshpngshopitemsdata', sampleRoutes.assignshpngshopitemsdataCtrl); //assign shpng shopitems post
// //add shopping shopitems end

// //shpng shop items report start
// router.get('/getshpngshopreportdata/:shop_id', sampleRoutes.getshpngshopreportdataCtrl); //search
// router.get('/dltshpngshpitmrprtdata/:id', sampleRoutes.dltshpngshpitmrprtdataCtrl);//delete shop items
// router.post('/shpngshpitmrprtupdate', sampleRoutes.shpngshpitmrprtupdateCtrl);//update single image shop items
// router.post('/updateshpngshpitemrprtdata', sampleRoutes.updateshpngshpitemrprtdataCtrl);//update shop item
// router.get('/getshpngshpitmsAddrowTabaData/:id', sampleRoutes.getshpngshpitmsAddrowTabaDataCtrl); //sizes list view
// //14 april 21
// router.post('/shpngshpitmsactstatData', sampleRoutes.shpngshpitmsactstatDataCtrl); //active status
// router.post('/shpngupdatepricedata', sampleRoutes.shpngupdatepricedataCtrl);//update price
// router.get('/deleteshpngshopmeasures/:id', sampleRoutes.deleteshpngshopmeasuresCtrl);//delete measures 
// //shpng add sizes start
// router.post('/addshpsizes', sampleRoutes.addshpsizesCtrl); //add sizes post
// router.get('/getshpsizes/:entryby', sampleRoutes.getshpsizesCtrl); //add sizes get
// router.post('/updateshpsize', sampleRoutes.updateshpsizeCtrl);//update sizes
// router.get('/deleteshpsizes/:id', sampleRoutes.deleteshpsizesCtrl);//delete sizes

// //shp measures
// router.get('/checkaddshpmsrsData/:mscheck/:item_id', sampleRoutes.checkaddshpmsrsDataCtrl);
// router.get('/checkdshopshpitsData/:mscheck/:item_id', sampleRoutes.checkdshopshpitsDataCtrl);
// // checkDuplicateshpsizes
// router.post('/checkDuplicateshpsizes', sampleRoutes.checkDuplicateshpsizesCtrl);//check duplicate shopping  sizes
// // checkDuplicateshpadditmdata
// router.post('/checkDuplicateshpadditmdata', sampleRoutes.checkDuplicateshpadditmdataCtrl);//check duplicate shopping  add items
// //get images in add items
// router.get('/getimages/:id', sampleRoutes.getimagesctrl);

// //aroma dashboard start
// //user report start
// router.get('/getuserfrom/:userfrom', sampleRoutes.getuserfromctrl); 
// router.get('/getuserreport', sampleRoutes.getuserreportctrl); 
// router.post('/updateaddress/', sampleRoutes.updateaddressctrl);

// //user report end
// //change user start
// router.get('/changeuser/:id', sampleRoutes.changeuserctrl);
// router.post('/updateuser/', sampleRoutes.updateuserctrl);

// //change user end

// //add wallet start
// router.post('/Updatewallet/', sampleRoutes.Updatewalletctrl);
// //add wallet end

// //aroma dashboard end
// /////////////////////////////////////////shopping code end//////////////////////////////////////////////////////

// //vandana code start

// //***************************** Users ****************************//
// router.post('/addusrs1', sampleRoutes.addusrs1Ctrl);
// router.get('/getusrs1/:entryby', sampleRoutes.getusrs1Ctrl);
// router.post('/updateUserDetails1', sampleRoutes.updateUserDetails1Ctrl);
// router.get('/deleteUsr1/:id', sampleRoutes.deleteUsr1Ctrl);//delete measures 
// router.post('/updateuserdiscount', sampleRoutes.updateuserdiscountCtrl);

// router.post('/postregistrationdata', sampleRoutes.postregistrationdataCtrl);

// router.get('/gethomepagecategories', sampleRoutes.gethomepagecategoriesctrl);
// router.post('/getsubcategories', sampleRoutes.getsubcategoriesctrl);
// router.post('/getsubitemslist', sampleRoutes.getsubitemslistctrl);
// //18/2/22
// router.get('/getmakeupitems', sampleRoutes.getmakeupitemsctrl);
// router.get('/getskinitems', sampleRoutes.getskinitemsctrl);
// router.get('/gethairitems', sampleRoutes.gethairitemsctrl);
// router.get('/getbodyitems', sampleRoutes.getbodyitemsctrl);
// //19/2/22
// router.get('/getsingitemdata/:item_id', sampleRoutes.getsingitemdataCtrl);
// //20/2/22
// router.get('/getallitemsdata', sampleRoutes.getallitemsdatactrl);
// //vandana code end


// //sravya code start
// router.post('/addbanner', sampleRoutes.addbannerctrl); //post banner
// router.get('/getBanner', sampleRoutes.getBannerctrl); 
// router.get('/deleteBanner/:id', sampleRoutes.deleteBannerctrl);
// router.post('/updateBanner', sampleRoutes.updateBannerctrl);
// //website banners start
// router.post('/addwebsitebanner', sampleRoutes.addwebsitebannerctrl); //post  website banner
// router.get('/getwebsiteBanner', sampleRoutes.getwebsiteBannerctrl); 
// router.get('/deletewebsiteBanner/:id', sampleRoutes.deletewebsiteBannerctrl);
// router.post('/updatewebsiteBanner', sampleRoutes.updatewebsiteBannerctrl);
// //website video code start
// router.post('/addvideo', sampleRoutes.addvideoctrl);
// router.get('/getvideo', sampleRoutes.getvideoctrl); 
// router.get('/deleteVideo/:id', sampleRoutes.deleteVideoctrl);

// //sravya code end
// //23-02-22 start

// //quality check start
// router.post('/postqualitycheck', sampleRoutes.postqualitycheckctrl); 
// router.get('/getqualitycheck', sampleRoutes.getqualitycheckctrl); 
// router.get('/deletequalitycheck/:id', sampleRoutes.deletequalitycheckctrl);
// // add items 
// //edit keywords
// router.post('/updatekeywords', sampleRoutes.updatekeywordsctrl);
// //edit keypoints
// router.post('/updatekeypoints', sampleRoutes.updatekeypointsctrl);

// //23-02-22 end

// //edit image code start

// router.post('/modelimageedit1', sampleRoutes.modelimageedit1Ctrl);

// //edit image code end

// //mounika code start

// //voucher start
// router.post('/checkvouchernumb', sampleRoutes.checkvouchernumbCtrl);//check voucher numb
// router.post('/postvoucher', sampleRoutes.postvoucherctrl); //post voucher
// router.get('/getvouchers', sampleRoutes.getvouchersctrl); 
// router.get('/deletevoucher/:id', sampleRoutes.deletevoucherctrl);
// router.post('/updatevoucher', sampleRoutes.updatevoucherctrl);
// //voucher end

// //coupon start
// router.post('/checkcouponnumb', sampleRoutes.checkcouponnumbCtrl);//check voucher numb
// router.post('/postcoupon', sampleRoutes.postcouponctrl); //post voucher
// router.get('/getcoupons', sampleRoutes.getcouponsctrl); 
// router.get('/deletecoupon/:id', sampleRoutes.deletecouponctrl);
// router.post('/updatecoupon', sampleRoutes.updatecouponctrl);
// //coupon end

// //offer products start
// router.get('/getproductnames', sampleRoutes.getproductnamesctrl);
// router.post('/postofferprdcts', sampleRoutes.postofferprdctsctrl);
// router.get('/getofrprdcts', sampleRoutes.getofrprdctsctrl);
// //offer products end
// router.get('/getshpcategorylist/:id', sampleRoutes.getshpcategorylistCtrl);
// router.post('/updateassigneddata', sampleRoutes.updateassigneddataCtrl); 
// //mounika code end



//book my show code start
//events/addevent start
router.post('/postaddeventmethod', sampleRoutes.postaddeventmethodctrl); 
router.get('/geteventdata', sampleRoutes.geteventdatactrl);
router.post('/updateEventData', sampleRoutes.updateEventDatactrl);
router.get('/deleteevent/:id', sampleRoutes.deleteeventctrl);
//events/addevent end


//permissions start


//create user start
router.post('/addusrs', sampleRoutes.addusrsCtrl);
router.get('/getusrs', sampleRoutes.getusrsCtrl);
router.post('/updateUserDetails', sampleRoutes.updateUserDetailsCtrl);
router.get('/deleteUsr/:id', sampleRoutes.deleteUsrCtrl);
//create user end



//add permissions start
router.get('/getusrs', sampleRoutes.getusrsCtrl);
router.get('/getMenuCatgrypermissions/:usr_id', sampleRoutes.getMenuCatgrypermissionsctrl);
router.post('/sendpermissions', sampleRoutes.sendpermissionsCtrl);
//add permissions end


//view permissions start
router.get('/getpermissionDlts', sampleRoutes.getpermissionCtrl);
router.get('/permsListDlts/:usr_id', sampleRoutes.permsListCtrl);
router.get('/deletepermDlts/:usr_menu_rel_id', sampleRoutes.deletepermCtrl);
//view permissions end


//permissions end


//graphs start

router.get('/getcount', sampleRoutes.getcountctrl);

router.get('/geteventdata', sampleRoutes.geteventdatactrl);


//graphs end

//book my show code end
//r&r start


//district start
router.post('/adddistrict', sampleRoutes.adddistrictCtrl);
router.get('/getdistrict', sampleRoutes.getdistrictCtrl);
router.post('/updatedistrict', sampleRoutes.updatedistrictCtrl);
router.get('/deletedistrict/:id', sampleRoutes.deletedistrictCtrl);
//district end

//division start
router.get('/getdistrictdata', sampleRoutes.getdistrictdataCtrl);
router.post('/adddivision', sampleRoutes.adddivisionCtrl);
router.get('/getdivision', sampleRoutes.getdivisionCtrl);
router.post('/updatedivision', sampleRoutes.updatedivisionCtrl);
router.get('/deletedivision/:id', sampleRoutes.deletedivisionCtrl);
//division end

//department start

router.post('/adddepartment', sampleRoutes.adddepartmentCtrl);
router.get('/getdepartment', sampleRoutes.getdepartmentCtrl);
router.post('/updatedepartment', sampleRoutes.updatedepartmentCtrl);
router.get('/deletedepartment/:id', sampleRoutes.deletedepartmentCtrl);
router.get('/changedivisiondata1/:district', sampleRoutes.changedivisiondata1ctrl);

//department end

//colony details start
router.get('/getdivisiondata', sampleRoutes.getdivisondatactrl);
router.post('/addcolonydata', sampleRoutes.addcolonydatactrl);
router.get('/getcolonydata', sampleRoutes.getcolonydatactrl);
router.post('/updatecolonydata', sampleRoutes.updatecolonydatactrl);
router.get('/deletecolonydata/:id', sampleRoutes.deletecolonydatactrl);
router.get('/department', sampleRoutes.departmentctrl);
router.get('/changehabitation/:division', sampleRoutes.changehabitationctrl);
//colony details end

//habitation start

router.get('/getcolonyname', sampleRoutes.getcolonynamectrl);
router.post('/addhabitationdata', sampleRoutes.addhabitationdatactrl);
router.get('/gethabitationdata', sampleRoutes.gethabitationdatactrl);
router.post('/updatehabitationdata', sampleRoutes.updatehabitationdatactrl);
router.get('/deletehabitationdata/:id', sampleRoutes.deletehabitationdatactrl);

//habitation end


//stages start

router.post('/addstagedata', sampleRoutes.addstagedatactrl);
router.get('/getstagedata', sampleRoutes.getstagedatactrl);
router.post('/updatestagedata', sampleRoutes.updatestagedatactrl);
router.get('/deletestagedata/:id', sampleRoutes.deletestagedatactrl);


//stages end

//infrastructure start

router.post('/addinfradata', sampleRoutes.addinfradatactrl);
router.get('/getinfradata', sampleRoutes.getinfradatactrl);
router.post('/updateinfradata', sampleRoutes.updateinfradatactrl);
router.get('/deleteinfradata/:id', sampleRoutes.deleteinfradatactrl);

//infrastructure end
//assets start

//houses start
router.get('/gethousedata', sampleRoutes.gethousedatactrl);
//houses end
//toilet module start
router.get('/gettoiletdata', sampleRoutes.gettoiletdatactrl);
//toilet module end
//infra module start

router.get('/getinfradata', sampleRoutes.getinfradatactrl);
//infra module end

//assetss end
//report start

router.get('/getreport', sampleRoutes.getreportctrl);
//change in division data.........
router.get('/changedivisiondata/:district', sampleRoutes.changedivisiondatactrl);
router.get('/changecolonydata/:division', sampleRoutes.changecolonydatactrl);
router.get('/districtdata', sampleRoutes.districtdatactrl);
router.get('/searchdata/:district/:division/:colony_name', sampleRoutes.searchdatactrl);
// gethabitationdropdown
router.get('/gethabitationdropdown', sampleRoutes.gethabitationdropdownctrl);
router.get('/gethabitationreport', sampleRoutes.gethabitationreportctrl);
router.get('/searchhabitation/:habitation_name', sampleRoutes.searchhabitationctrl);


//department wise analysis

router.get('/getdepartmentdropdown', sampleRoutes.getdepartmentdropdownctrl);
router.get('/getdepartmentreport', sampleRoutes.getdepartmentreportctrl);
router.get('/searchdepartment/:department', sampleRoutes.searchdepartmentctrl);



//report end
//dashboard start

router.get('/getcounts', sampleRoutes.getcountsctrl);
router.get('/gettoilets', sampleRoutes.gettoiletscountsctrl);
router.get('/getinfracounts', sampleRoutes.getinfracountsctrl);

router.get('/gethouseanalysis', sampleRoutes.gethouseanalysisctrl);
router.get('/gettoiletanalysis', sampleRoutes.gettoiletanalysisctrl);
router.get('/getinfraanalysis', sampleRoutes.getinfraanalysisctrl);



//dashboard end
//graphs start


router.get('/departmenthousecount', sampleRoutes.departmenthousecountctrl);

router.get('/departmenttoiletcount', sampleRoutes.departmenttoiletcountctrl);
router.get('/departmentinfracount', sampleRoutes.departmentinfracountctrl);
router.get('/westgodavaridata', sampleRoutes.westgodavaridatactrl);
router.get('/eastgodavaridata', sampleRoutes.eastgodavaridatactrl);

 router.get('/hwsanalysis', sampleRoutes.hwsanalysisctrl);

//graphs end

//r&r end
//swathi code
router.post('/postingdata', sampleRoutes.postingdatactrl);
router.get('/getsubmitdata', sampleRoutes.getsubmitdatactrl);
//router.get('/deletedata/:id', sampleRoutes.deletedatactrl);










































// //mounika website & app start
// router.get('/getcategorylist', sampleRoutes.getcategorylistCtrl);
// router.get('/getallcategorydata/:cat_id', sampleRoutes.getallcategorydataCtrl);

// router.post('/getlogindata', sampleRoutes.getlogindataCtrls);
// router.post('/getuserloginotp', sampleRoutes.getuserloginotpCtrl);
// router.post('/getlogindetails', sampleRoutes.getlogindetailsCtrls);
// router.post('/postregisterdetails', sampleRoutes.postregisterdetailsctrl);

// //delivery address
// router.post('/NewDeleveryAddress', sampleRoutes.NewDeleveryAddressCtrl);
// router.post('/getnewDeleveryAddress', sampleRoutes.getnewDeleveryAddressCtrl);
// router.get('/deleteaddress/:id', sampleRoutes.deleteaddressCtrl);

// router.get('/getofferproducts', sampleRoutes.getofferproductsctrl);

// router.post('/getwallet', sampleRoutes.getwalletCtrls);
// //mounika website & app end
module.exports = router;
