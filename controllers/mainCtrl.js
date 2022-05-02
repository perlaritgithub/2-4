/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var moment = require('moment');
var http = require("https");
var fs = require('fs');
process.env.SECRET_KEY = "thisismysecretkey";
var appmdl = require('../models/mainModel');
var AWS = require('aws-sdk');
const { Console } = require('console');
var awsS3 = 'config/aws.config.json';
var request = require('request'); //for otp

// ************** Login Start ***************
exports.getUsrloginCtrls = function (req, res) {
    var usr_nm = req.body.usr_nm;
    var usr_pwd = req.body.usr_pwd;
    appmdl.gettingusrLoggedIn(usr_nm, usr_pwd, function (err, results) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        if (results && results.length > 0) {
            appmdl.getUsrloginCtrlMdl(results[0].usr_id, function (err, usrMenu) {
                if (err) {
                    res.send({ "status": 500, "msg": err });
                    return;
                }
                res.send({ 'status': 200, 'data': usrMenu, 'usr_data': results });
            });
        } else {
            res.send({ "status": 202, "message": 'invalid UserName or Password' });
        }
    });
}
// ************** Login End ******************
// // ************** Dashboard Start ************
// exports.getMenuCatgrypermissionsctrl = function (req, res) {
//     var usr_id = req.params.usr_id;
//     appmdl.getMenuCatgrypermissionsMdl(usr_id, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.sendpermissionsCtrl = function (req, res) {
//     var data = req.body;
//     var items = data.items;
//     var usr = data.usr_id;
//     var cnt = 0;
//     for (var i = 0; i < items.length; i++) {
//         (function (j) {
//             setTimeout(function () {
//                 appmdl.sendpermissionsmdl(items[j].carrer_menu_id, usr, function (err, resultsdata) {
//                     if (err) {
//                         res.send(500, "Server Error");
//                         return;
//                     }
//                     cnt++;
//                     if (cnt == items.length) {
//                         res.send({ "status": 200, 'data': resultsdata });
//                     }
//                 })
//             }, (j % items.length) * 200);
//         })(i);

//     }

// }
// exports.addusrsCtrl = function (req, res) {
//     var data = req.body;
//     appmdl.ChckExitingusr(data, function (err, results) {
//         if (results.length > 0) {
//             res.send({ 'status': 300, 'data': results })
//             if (err) {
//                 res.send(500, "Server Error");
//                 return;
//             }
//         } else {
//             appmdl.addusrsMdl(data, function (err, results) {
//                 if (err) {
//                     res.send(500, "Server Error");
//                     return;
//                 }
//                 res.send({ 'status': 200, 'data': results });
//             });
//         }
//     });
// }
// exports.deleteUsrCtrl = function (req, res) {
//     var data = req.params.id;
//     appmdl.deleteUsrMD1(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.getusrsCtrl = function (req, res) {
//     appmdl.getusrsMdl(function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.updateUserDetailsCtrl = function (req, res) {
//     var data = req.body;
//     if (data.oldPhoneNumber == data.usr_phone) {
//         appmdl.updateUserDetailsMdl(data, function (err, results) {
//             if (err) {
//                 res.send(500, "Server Error");
//                 return;
//             }
//             res.send({ 'status': 200, 'data': results });
//         });
//     }
//     // else condition 
//     if (data.oldPhoneNumber != data.usr_phone) {
//         appmdl.updateUserPhoneNumDuplicateCheckMdl(data, function (err, dresults) {
//             if (err) {
//                 res.send(500, "Server Error");
//                 return;
//             }
//             // res.send({ 'status': 200, 'data': results });
//             var countResult = dresults[0].count;
//             if (countResult == 0) {
//                 appmdl.updateUserDetailsMdl(data, function (err, results) {
//                     if (err) {
//                         res.send(500, "Server Error");
//                         return;
//                     }
//                     res.send({ 'status': 200, 'data': results });
//                 });
//             }
//             else {
//                 res.send({ 'status': 300, 'data': dresults });
//             }
//         });
//     }
// }
// exports.deletepermCtrl = function (req, res) {
//     var usr_menu_rel_id = req.params.usr_menu_rel_id;
//     appmdl.deletepermMdl(usr_menu_rel_id, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.getpermissionCtrl = function (req, res) {
//     appmdl.getpermissionMdl(function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.permsListCtrl = function (req, res) {
//     var usr_id = req.params.usr_id;
//     appmdl.permsListMdl(usr_id, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// //shops list
// exports.getadnshoplistdataCtrl = function (req, res) {
//     var entryby = req.params.entryby;
//     appmdl.getadnshoplistdataMdl(entryby, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.adnactivestatusshoplistCtrl = function (req, res) {
//     var reg = req.body;
//     appmdl.adnactivestatusshoplistMdl(reg, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// // ************** Dashboard End ************


// /////////////////////////////////////////shopping code start//////////////////////////////////////////////////////
// //shopping start
// //add category start

// //post
// exports.addshpcategoryCtrl = function (req, res) {
//     var data = req.body;
//     // var sudata = data.catArray;
//     var reviewImgArr = req.body.reviewImgArr;
//     appmdl.addshpcategoryMdl(data, function (err, postresults) {
//         if (err) {
//             res.send({ "status": 500, 'data': [] });
//             return;
//         }
//         var lastId = postresults.insertId;
//         if (postresults) {
//             var imgCnt = 0;
//             for (var j = 0; j < reviewImgArr.length; j++) {
//                 (function (i) {
//                     setTimeout(function () {
//                         var image_url = reviewImgArr[i].reviewimg;
//                         var array = image_url.split(',');
//                         var base64Data = array[1];
//                         var datetimestamp = Date.now();
//                         var random_number = Math.floor(100000 + Math.random() * 900000);
//                         var unicnumber = random_number + '' + datetimestamp;
//                         var filetype = reviewImgArr[0].filetype;

//                         fs.writeFile("../aromaapi/shopping_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) {
//                         });
//                         imageupload = "http://localhost/aromadashboard/aromaapi/shopping_images/" + unicnumber + '.' + filetype;
//                         appmdl.updateShopCatIconImagesMdl(imageupload, lastId, reviewImgArr[i].ind, function (err, upresults) {
//                             if (err) {
//                                 // res.send(500, "Server Error");
//                                 res.status(500).send("Server Error");
//                                 return;
//                             }
//                             imgCnt++;
//                             if (reviewImgArr.length == imgCnt) {
//                                 res.send({ 'status': 200, 'data': upresults });
//                             }
//                         });
//                     }, (i % reviewImgArr.length) * 800);
//                 })(j);

//             }
//         }

//     });
// }

// //check
// exports.getshpcatCheckDataCtrl = function (req, res) {
//     var medcat = req.params.medcat;
//     appmdl.getshpcatCheckDataMdl(medcat, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ "status": 200, "data": results, "msg": "submited" });
//     });
// }
// //get
// exports.getshpcategoryCtrl = function (req, res) {
//     var entryby = req.params.entryby
//     appmdl.getshpcategoryMdl(entryby, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //update
// exports.updateshpcategoryCtrl = function (req, res) {
//     var data = req.body;
//     appmdl.updateshpcategoryMdl(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //delete
// exports.dltshpcategoryCtrl = function (req, res) {
//     var data = req.params.id;
//     appmdl.dltshpcategoryMD1(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //add category end

// //sub category start
// //post
// exports.subshpcategoryCtrl = function (req, res) {
//     var data = req.body;

//     var reviewImg = data.reviewImg;
//     if (reviewImg.length != '0') {
//         var imageupload = '';

//         var array = reviewImg[0].reviewimg.split(',');
//         var datetimestamp = Date.now();
//         var random_number = Math.floor(100000 + Math.random() * 900000);
//         var unicnumber = random_number + '' + datetimestamp;
//         var base64Data = array[1];
//         var filetype = reviewImg[0].filetype;
//         fs.writeFile("../aromaapi/shopping_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) {
//         });
//         imageupload = "http://localhost/aromadashboard/aromaapi/shopping_images/" + unicnumber + '.' + filetype;
//     }

//     appmdl.subshpcategoryMdl(data, imageupload, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //check
// exports.subshpcatCheckDataCtrl = function (req, res) {
//     var shpsubcat = req.params.shpsubcat;
//     var category_id = req.params.category_id;
//     // console.log("mainctrl");
//     // console.log(shpsubcat);
//     // console.log(category_id);
//     appmdl.subshpcatCheckDatamdl(shpsubcat, category_id, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ "status": 200, "data": results, "msg": "submited" });
//     });
// }
// //get
// exports.getshpsubcategoryCtrl = function (req, res) {
//     appmdl.getshpsubcategoryMdl(function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //update
// exports.updateshpsubcategoryCtrl = function (req, res) {
//     var data = req.body;
//     appmdl.updateshpsubcategoryMdl(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //delete
// exports.dltshpsubcategoryCtrl = function (req, res) {
//     var data = req.params.id;
//     appmdl.dltshpsubcategoryMD1(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //add sub category end

// //add brand start
// //post
// exports.addshpbrandCtrl = function (req, res) {
//     var data = req.body;
//     appmdl.addshpbrandMdl(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //check
// exports.getshpbrandCheckDataCtrl = function (req, res) {
//     var shpbrand = req.params.shpbrand;
//     appmdl.getshpbrandCheckDataMdl(shpbrand, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ "status": 200, "data": results, "msg": "submited" });
//     });
// }
// //get
// exports.getshpbrandsdataCtrl = function (req, res) {
//     appmdl.getshpbrandsdataMdl(function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //update
// exports.updateshpbrandCtrl = function (req, res) {
//     var data = req.body;
//     appmdl.updateshpbrandMdl(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //delete
// exports.dltshpbrandCtrl = function (req, res) {
//     var data = req.params.id;
//     appmdl.dltshpbrandMD1(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //add brands end

// //add items start

// //automatic subcat from cat
// exports.getshopSubCatdataCtrl = function (req, res) {
//     var subcat = req.params.subcat;
//     appmdl.getshopSubCatdataMdl(subcat, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //sub category end

// //category data start

// exports.categorydisplayctrl = function (req, res) {
//     var data = req.params.id;
//     appmdl.categorydisplaymdl(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// //category data end

// //post
// exports.shpadditmdataCtrl = function (req, res) {
//     var reviewArr = req.body;
//     var reviewImgArr = reviewArr.reviewImgArr;
//     var imageupload = '';
//     var cart = reviewArr.addrowItems;
//     appmdl.getLastbarcodeId(function (err, lastrecId) {
//         if (err) {
//             console.log("err " + err);
//             res.send(500, "Server Error");
//             return;
//         }
//         var barcode_idi = 0;
//         if (lastrecId[0]) {
//             barcode_idi = lastrecId[0].barcode_idi;
//         } else {
//             barcode_idi = 0;
//         }
//         appmdl.shpadditmdataMdl(reviewArr, barcode_idi, function (err, results) {
//             if (err) {
//                 res.send(500, "Server Error");
//                 return;
//             }
//             if (results) {
//                 var imgcnt = 0;
//                 for (var i = 0; i < reviewImgArr.length; i++) {
//                     (function (r) {
//                         setTimeout(function () {
//                             var array = reviewImgArr[r].reviewimg.split(',');
//                             var datetimestamp = Date.now();
//                             var random_number = Math.floor(100000 + Math.random() * 900000);
//                             var unicnumber = random_number + '' + datetimestamp;
//                             var base64Data = array[1];
//                             var filetype = reviewImgArr[0].filetype;
//                             //mounika image code
//                             // fs.writeFile("../aroma_api/shopping_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) {
//                             // });
//                             //sravya image code

//                             fs.writeFile("../aromaapi/shopping_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) {
//                             });
//                             //live code
//                             // fs.writeFile("../aroma_api/shopping_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) { });
//                             // //mounika image code
//                             // imageupload = "http://localhost/GitProjects/Aroma/aroma_api/shopping_images/" + unicnumber + '.' + filetype;

//                             //sravya code
//                             imageupload = "http://localhost/aromadashboard/aromaapi/shopping_images/" + unicnumber + '.' + filetype;

//                             //live code
//                             // imageupload = "http://localhost/GitProjects/Aroma/aroma_api/shopping_images/" + unicnumber + '.' + filetype;
//                             appmdl.shopadditmimageMdl(imageupload, imgcnt, results.insertId, function (err, imgresults) {
//                                 if (err) {

//                                     res.send({ "status": 500, "msg": 'Data Submitted Failed' });
//                                     return;
//                                 }
//                                 imgcnt++;
//                                 var shopres = imgresults;
//                             });
//                         }, (r % reviewImgArr.length) * 800);
//                     })(i)
//                 }

//                 var lastId = results.insertId;
//                 appmdl.submitssubcatMdl(reviewArr, lastId, function (err, Itemresults) {
//                     if (err) {
//                         res.send(500, "Server Error");
//                         return;
//                     }
//                     appmdl.submitkeywrdsMdl(reviewArr, lastId, function (err, Itemresults) {
//                         if (err) {
//                             res.send(500, "Server Error");
//                             return;
//                         }
//                         appmdl.submitkeypointsMdl(reviewArr, lastId, function (err, Itemresults) {
//                             if (err) {
//                                 res.send(500, "Server Error");
//                                 return;
//                             }

//                             appmdl.submitsshopAddrowMdl(cart, lastId, function (err, Itemresults) {
//                                 if (err) {
//                                     res.send(500, "Server Error");
//                                     return;
//                                 }
//                                 res.send({ 'status': 200, 'data': Itemresults });
//                             });
//                         })
//                     })
//                 })
//             }
//         });
//     });
// }

// //get
// exports.getshopadditemdataCtrl = function (req, res) {
//     var entryby = req.params.entryby
//     // console.log('mainctrl');
//     // console.log(entryby);

//     appmdl.getshopadditemdataMdl(entryby, function (err, results) {
//         // console.log(entryby)
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// //home & kitchen post

// exports.kitchenadditmdataCtrl = function (req, res) {
//     var reviewArr = req.body;
//     var reviewImgArr = reviewArr.reviewImgArr;
//     var imageupload = '';
//     appmdl.kitchenadditmdataMdl(reviewArr, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         if (results) {
//             var imgcnt = 0;
//             for (var i = 0; i < reviewImgArr.length; i++) {
//                 (function (r) {
//                     setTimeout(function () {
//                         var array = reviewImgArr[r].reviewimg.split(',');
//                         var datetimestamp = Date.now();
//                         var random_number = Math.floor(100000 + Math.random() * 900000);
//                         var unicnumber = random_number + '' + datetimestamp;
//                         var base64Data = array[1];
//                         var filetype = reviewImgArr[0].filetype;
//                         //mounika image code
//                         //fs.writeFile("../fastflyApi/kitchen_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) {});
//                         //live code

//                         // fs.writeFile("../aroma_api/shopping_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) { });
//                         //mounika image code
//                         //imageupload = "http://localhost/fastfly/fastflyApi/kitchen_images/" + unicnumber + '.' + filetype;
//                         //live code
//                         // imageupload = "http://localhost/GitProjects/Aroma/aroma_api/shopping_images/" + unicnumber + '.' + filetype;
//                         fs.writeFile("../aromaapi/shopping_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) {
//                         });
//                         imageupload = "http://localhost/aromadashboard/aromaapi/shopping_images/" + unicnumber + '.' + filetype;


//                         appmdl.kitchenadditmimageMdl(imageupload, imgcnt, results.insertId, function (err, imgresults) {
//                             if (err) {

//                                 res.send({ "status": 500, "msg": 'Data Submitted Failed' });
//                                 return;
//                             }
//                             imgcnt++;
//                             var shopres = imgresults;
//                         });
//                     }, (r % reviewImgArr.length) * 800);
//                 })(i)
//             }
//             var lastId = results.insertId;
//             appmdl.submitkitchenAddrowMdl(reviewArr, lastId, function (err, Itemresults) {
//                 if (err) {
//                     res.send(500, "Server Error");
//                     return;
//                 }
//                 res.send({ 'status': 200, 'data': Itemresults });

//             });
//         }
//     });
// }
// //sizes list view start
// exports.getsizeAddrowTabaDataCtrl = function (req, res) {
//     var id = req.params.id;
//     appmdl.getsizeAddrowTabaDataMdl(id, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ "status": 200, "data": results });
//     });
// }
// //end

// //delete
// exports.dltshopadditmdataCtrl = function (req, res) {
//     var data = req.params.id;
//     appmdl.dltshopadditmdataMD1(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// //update image start
// exports.shopimageonlyeditCtrl = function (req, res) {
//     var reviewArr = req.body;
//     var reviewImgArr1 = reviewArr.reviewImgArr1;
//     var imageupload1 = '';
//     var array = reviewImgArr1[0].reviewimg1.split(',');
//     var datetimestamp = Date.now();
//     var random_number = Math.floor(100000 + Math.random() * 900000);
//     var unicnumber = random_number + '' + datetimestamp;
//     var base64Data = array[1];
//     var filetype = reviewImgArr1[0].filetype;
//     //mounika image code
//     // fs.writeFile("../fastflyApi/edited_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) {

//     // });
//     //live code



//     // fs.writeFile("../aroma_api/shopping_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) {
//     // });




//     //mounika image code
//     // imageupload1 = "http://localhost/fastfly/fastflyApi/edited_images/" + unicnumber + '.' + filetype;
//     //live code


//     // imageupload1 = "http://localhost/GitProjects/Aroma/aroma_api/shopping_images/" + unicnumber + '.' + filetype;
//     fs.writeFile("../aromaapi/shopping_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) {
//     });
//     imageupload1 = "http://localhost/aromadashboard/aromaapi/shopping_images/" + unicnumber + '.' + filetype;






//     appmdl.shopimageonlyeditMdl(imageupload1, reviewArr, function (err, imgresults) {
//         if (err) {
//             res.send({ "status": 500, "msg": 'Data Submitted Failed' });
//             return;
//         }

//         res.send({ 'status': 200, 'data': imgresults });

//     });

// }
// //update image end
// //update item start
// exports.updateshpadditemdataCtrl = function (req, res) {
//     var reviewArr = req.body;
//     appmdl.updateshpadditemdataMdl(reviewArr, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //update item end

// //update price  start
// exports.shpngadditmpricedataCtrl = function (req, res) {
//     var upCat = req.body;
//     var priceupdate = upCat.addrowItems;
//     var cart = upCat.newaddrowItems;
//     appmdl.shpngadditmpricedataMdl(priceupdate, function (err, results) {
//         if (err) {
//             res.send({ "status": 500, "msg": 'Data Submitted Failed' });
//             return;
//         }
//         //res.send({ "status": 200, "data": results, "msg": "submited" });
//         if (cart.length != '0') {
//             appmdl.shpngadditmnewdataMdl(cart, function (err, upresults) {
//                 if (err) {
//                     res.send({ "status": 500, "msg": 'Data Submitted Failed' });
//                     return;
//                 }
//             })
//         }
//         res.send({ "status": 200, "data": results, "msg": "submited" });

//     });

// };
// //update price  end
// //delete measures
// exports.deleteshpngadditmsmeasuresCtrl = function (req, res) {
//     var data = req.params.id;
//     appmdl.deleteshpngadditmsmeasuresMD1(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //add items end


// //add shopping shop start
// //post
// exports.shpngaddshopsubmitCtrl = function (req, res) {
//     var data = req.body;
//     appmdl.shpngaddshopsubmitMdl(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //check
// exports.getshpngshopCheckDataCtrl = function (req, res) {
//     var shpngshop = req.params.shpngshop;
//     appmdl.getshpngshopCheckDataMdl(shpngshop, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ "status": 200, "data": results, "msg": "submited" });
//     });
// }
// //get
// exports.getshpngshopsdataCtrl = function (req, res) {
//     var entryby = req.params.entryby;
//     appmdl.getshpngshopsdataMdl(entryby, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //active status Start
// exports.shoppingactivestatusDataCtrl = function (req, res) {
//     var data = req.body;
//     appmdl.shoppingactivestatusDataMdl(data, function (err, results) {
//         if (err) {

//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ "status": 200, "data": results });
//     });
// };
// //delete
// exports.dltshpngshopdataCtrl = function (req, res) {
//     var data = req.params.id;
//     appmdl.dltshpngshopdataMD1(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //update
// exports.updateshpngshopdataCtrl = function (req, res) {
//     var id = req.body;
//     appmdl.updateshpngshopdataMdl(id, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// //add shopping shopitems start
// //search
// exports.getshopsearchcatdataCtrl = function (req, res) {
//     var id = req.params.cat_id;
//     var shop_id = req.params.shop_id;
//     appmdl.getshopsearchcatdataMdl(id, shop_id, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //post
// exports.assignshpngshopitemsdataCtrl = function (req, res) {
//     var data = req.body;
//     var array = data.addmedshopitems;
//     var cnt = 0;
//     for (var i = 0; i < array.length; i++) {
//         (function (r) {
//             setTimeout(function () {
//                 appmdl.assignshpngshopitemsdataMdl(data, array[r], function (err, results) {
//                     if (err) {
//                         res.send(500, "Server Error");
//                         return;
//                     }
//                     var lastid = results.insertId;
//                     appmdl.fetchaddrowshpitems(array[r].id, function (err, aresults) {
//                         if (err) {
//                             res.send(500, "Server Error");
//                             return;
//                         }
//                         if (aresults.length != 0) {
//                             appmdl.postshopaddrowitems(aresults, lastid, function (err, aresults) {
//                                 if (err) {
//                                     res.send(500, "Server Error");
//                                     return;
//                                 }
//                                 cnt++;
//                                 if (array.length == cnt)
//                                     res.send({ 'status': 200, 'data': aresults });
//                             });
//                         } else {
//                             cnt++;
//                             if (array.length == cnt)
//                                 res.send({ 'status': 200, 'data': aresults });
//                         }
//                     });

//                 });
//             }, (r % array.length) * 800);
//         })(i)
//     }
// }

// //shpng shop items report start
// //search
// exports.getshpngshopreportdataCtrl = function (req, res) {
//     var shop_id = req.params.shop_id;
//     appmdl.getshpngshopreportdataMdl(shop_id, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //delete
// exports.dltshpngshpitmrprtdataCtrl = function (req, res) {
//     var data = req.params.id;
//     appmdl.dltshpngshpitmrprtdataMD1(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //update shop item image start
// exports.shpngshpitmrprtupdateCtrl = function (req, res) {
//     var reviewArr = req.body;
//     var reviewImgArr1 = reviewArr.reviewImgArr1;
//     var imageupload1 = '';
//     var array = reviewImgArr1[0].reviewimg1.split(',');
//     var datetimestamp = Date.now();
//     var random_number = Math.floor(100000 + Math.random() * 900000);
//     var unicnumber = random_number + '' + datetimestamp;
//     var base64Data = array[1];
//     var filetype = reviewImgArr1[0].filetype;
//     //mounika image code
//     // fs.writeFile("../fastflyApi/shopping_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) {

//     // });
//     //live code

//     //commented code
//     // fs.writeFile("../aroma_api/shopping_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) {

//     // });


//     //mounika image code
//     // imageupload1 = "http://localhost/fastfly/fastflyApi/shopping_images/" + unicnumber + '.' + filetype;

//     //live code
//     //commented code
//     // imageupload1 = "http://localhost/GitProjects/Aroma/aroma_api/shopping_images/" + unicnumber + '.' + filetype;
//     //sravya path for images
//     fs.writeFile("../aromaapi/shopping_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) {

//     });
//     imageupload1 = "http://localhost/aromadashboard/aromaapi/shopping_images/" + unicnumber + '.' + filetype;


//     appmdl.shpngshpitmrprtupdateMdl(imageupload1, reviewArr, function (err, imgresults) {
//         if (err) {
//             res.send({ "status": 500, "msg": 'Data Submitted Failed' });
//             return;
//         }

//         res.send({ 'status': 200, 'data': imgresults });

//     });

// }
// //update shop item image end

// //update shop item start
// exports.updateshpngshpitemrprtdataCtrl = function (req, res) {
//     var data = req.body;
//     appmdl.updateshpngshpitemrprtdataMdl(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //update shop item end

// //sizes list view start
// exports.getshpngshpitmsAddrowTabaDataCtrl = function (req, res) {
//     var id = req.params.id;
//     appmdl.getshpngshpitmsAddrowTabaDataMdl(id, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ "status": 200, "data": results });
//     });
// }
// //end
// //end
// //shpng shp itms
// //active status Start
// exports.shpngshpitmsactstatDataCtrl = function (req, res) {
//     var data = req.body;
//     appmdl.shpngshpitmsactstatDataMdl(data, function (err, results) {
//         if (err) {

//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ "status": 200, "data": results });
//     });
// };
// // active status End

// //update price  start
// exports.shpngupdatepricedataCtrl = function (req, res) {
//     var addt = req.body.added;
//     var upCat = req.body.cnt;
//     appmdl.shpngupdatepricedataMdl(upCat, function (err, results) {
//         if (err) {
//             res.send({ "status": 500, "msg": 'Data Submitted Failed' });
//             return;
//         }
//         // res.send({ "status": 200, "data": results, "msg": "submited" });
//         if (addt.length != '0') {
//             appmdl.shpngupdatepriceAddrowMdl(addt, function (err, upresults) {
//                 if (err) {
//                     res.send({ "status": 500, "msg": 'Data Submitted Failed' });
//                     return;
//                 }
//             })
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// };
// //update price  end
// //delete measures
// exports.deleteshpngshopmeasuresCtrl = function (req, res) {
//     var data = req.params.id;
//     appmdl.deleteshpngshopmeasuresMD1(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //post
// exports.addshpsizesCtrl = function (req, res) {
//     var data = req.body;
//     appmdl.addshpsizesMdl(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //get
// exports.getshpsizesCtrl = function (req, res) {
//     var entryby = req.params.entryby
//     appmdl.getshpsizesMdl(entryby, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //update
// exports.updateshpsizeCtrl = function (req, res) {
//     var data = req.body;
//     appmdl.updateshpsizeMdl(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// //delete
// exports.deleteshpsizesCtrl = function (req, res) {
//     var data = req.params.id;
//     appmdl.deleteshpsizesMD1(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //shp measures
// exports.checkaddshpmsrsDataCtrl = function (req, res) {
//     var mscheck = req.params.mscheck;
//     var item_id = req.params.item_id;
//     appmdl.checkaddshpmsrsDataMdl(mscheck, item_id, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.checkdshopshpitsDataCtrl = function (req, res) {
//     var mscheck = req.params.mscheck;
//     var item_id = req.params.item_id;
//     appmdl.checkdshopshpitsDataMdl(mscheck, item_id, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// // checkDuplicateshpsizesCtrl
// exports.checkDuplicateshpsizesCtrl = function (req, res) {
//     var data = req.body;
//     appmdl.checkDuplicateshpsizesMdl(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// // checkDuplicateshpadditmdataCtrl
// exports.checkDuplicateshpadditmdataCtrl = function (req, res) {
//     var data = req.body;
//     appmdl.checkDuplicateshpadditmdataMdl(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// /////////////////////////////////////////shopping code end//////////////////////////////////////////////////////

// exports.addusrs1Ctrl = function (req, res) {
//     var data = req.body;
//     appmdl.ChckExitingusr(data, function (err, results) {
//         if (results.length > 0) {
//             res.send({ 'status': 300, 'data': results })
//             if (err) {
//                 res.send(500, "Server Error");
//                 return;
//             }
//         } else {
//             appmdl.addusrs1Mdl(data, function (err, results) {
//                 if (err) {
//                     res.send(500, "Server Error");
//                     return;
//                 }
//                 res.send({ 'status': 200, 'data': results });
//             });
//         }
//     });
// }
// exports.getusrs1Ctrl = function (req, res) {
//     var entryby = req.params.entryby;
//     appmdl.getusrs1Mdl(entryby, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.updateUserDetails1Ctrl = function (req, res) {
//     var data = req.body;
//     if (data.oldPhoneNumber == data.usr_phone) {
//         appmdl.updateUserDetails1Mdl(data, function (err, results) {
//             if (err) {
//                 res.send(500, "Server Error");
//                 return;
//             }
//             res.send({ 'status': 200, 'data': results });
//         });
//     }
//     // else condition 
//     if (data.oldPhoneNumber != data.usr_phone) {
//         appmdl.updateUserPhoneNumDuplicateCheckMdl(data, function (err, dresults) {
//             if (err) {
//                 res.send(500, "Server Error");
//                 return;
//             }
//             // res.send({ 'status': 200, 'data': results });
//             var countResult = dresults[0].count;
//             if (countResult == 0) {
//                 appmdl.updateUserDetails1Mdl(data, function (err, results) {
//                     if (err) {
//                         res.send(500, "Server Error");
//                         return;
//                     }
//                     res.send({ 'status': 200, 'data': results });
//                 });
//             }
//             else {
//                 res.send({ 'status': 300, 'data': dresults });
//             }
//         });
//     }
// }

// exports.deleteUsr1Ctrl = function (req, res) {
//     var id = req.params.id;
//     appmdl.deleteUsr1Mdl(id, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.getuserfromctrl = function (req, res) {
//     var userfrom = req.params.userfrom;
//     appmdl.getuserfrommdl(userfrom, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.getuserreportctrl = function (req, res) {

//     appmdl.getuserreportmdl(function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.updateaddressctrl = function (req, res) {
//     var data = req.body;
//     appmdl.updateaddressmdl(data, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });

// }
// // change user start
// exports.changeuserctrl = function (req, res) {
//     var id = req.params.id;
//     // var usr_nm = req.params.usr_nm;
//     // var usr_phone = req.params.usr_phone;

//     appmdl.changeusermdl(id, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //change user end

// exports.updateuserctrl = function (req, res) {
//     var data = req.body;

//     appmdl.updateusermdl(data, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         console.log(data);

//         var req_data = data.usertype;
//         if (req_data == "WholeSeller") {
//             appmdl.postwholesellermdl(data, function (err, results) {
//                 if (err) {
//                     res.send({ 'status': 500, 'data': results });
//                     return;
//                 }
//                 res.send({ 'status': 200, 'data': results });

//             });
//         }

//     });

// }

// exports.updateuserdiscountCtrl = function (req, res) {
//     var data = req.body;
//     appmdl.updateuserdiscountmdl(data, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });

//     });
// }
// //add wallet start
// exports.Updatewalletctrl = function (req, res) {
//     var data = req.body;
//     appmdl.Updatewalletmdl(data, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });

// }

// //add wallet end



// //mounika code start

// exports.checkvouchernumbCtrl = function (req, res) {
//     var std = req.body;
//     appmdl.checkvouchernumbMdl(std, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.postvoucherctrl = function (req, res) {
//     var data = req.body;
//     appmdl.postvoucherMdl(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.getvouchersctrl = function (req, res) {

//     appmdl.getvouchersMdl(function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.deletevoucherctrl = function (req, res) {
//     var id = req.params.id;
//     appmdl.deletevoucherMdl(id, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.updatevoucherctrl = function (req, res) {
//     var data = req.body;
//     appmdl.updatevoucherMdl(data, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }


// //coupons

// exports.checkcouponnumbCtrl = function (req, res) {
//     var std = req.body;
//     appmdl.checkcouponnumbMdl(std, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.postcouponctrl = function (req, res) {
//     var data = req.body;
//     appmdl.postcouponMdl(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.getcouponsctrl = function (req, res) {

//     appmdl.getcouponsMdl(function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.deletecouponctrl = function (req, res) {
//     var id = req.params.id;
//     appmdl.deletecouponMdl(id, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.updatecouponctrl = function (req, res) {
//     var data = req.body;
//     appmdl.updatecouponMdl(data, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.getproductnamesctrl = function (req, res) {

//     appmdl.getproductnamesMdl(function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.postofferprdctsctrl = function (req, res) {
//     var data = req.body;
//     appmdl.postofferprdctsMdl(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.getofrprdctsctrl = function (req, res) {

//     appmdl.getofrprdctsMdl(function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.getshpcategorylistCtrl = function (req, res) {
//     var id = req.params.id
//     appmdl.getshpcategorylistMdl(id, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.updateassigneddataCtrl = function (req, res) {
//     var data = req.body;
//     for (i = 0; i < data.length; i++) {
//         appmdl.updateassigneddataMdl(data[i], function (err, results) {
//             if (err) {
//                 res.send(500, "Server Error");
//                 return;
//             }
//             //res.send({ 'status': 200, 'data': results });
//             var lastId = results.insertId;
//             // console.log("1340", lastId);
//             var dataa = results.data;
//             // console.log(dataa);

//             appmdl.getsubcatMdl(dataa, lastId, function (err, aresults) {
//                 if (err) {
//                     res.send({ 'status': 500, 'data': aresults });
//                     return;
//                 }
//                 // console.log(aresults);
//                 //res.send({ 'status': 200, 'data': aresults });
//                 if (aresults) {
//                     // console.log(aresults);
//                     var lastid = aresults.lastId;
//                     var array = [];
//                     for (j = 0; j < aresults.length; j++) {
//                         array.push({ 'id': aresults[j].id, 'subcategory': aresults[j].subcategory });
//                     }
//                     // console.log('array', array);
//                     appmdl.insertintosubcatMdl(array, lastid, function (err, sresults) {
//                         if (err) {
//                             res.send(500, "Server Error");
//                             return;
//                         }
//                         res.send({ 'status': 200, 'data': sresults });

//                     });
//                 }

//             });



//         });
//     }
// }
// //add wholeseller end


// exports.postregistrationdataCtrl = function (req, res) {
//     var data = req.body;
//     appmdl.ChckExitingusrs(data, function (err, results) {
//         if (results.length > 0) {
//             res.send({ 'status': 300, 'data': results })
//             if (err) {
//                 res.send(500, "Server Error");
//                 return;
//             }
//         }
//         else {
//             appmdl.postregistrationdataMdl(data, function (err, results) {
//                 if (err) {
//                     res.send(500, "Server Error");
//                     return;
//                 }
//                 res.send({ 'status': 200, 'data': results });
//             });
//         }
//     });
// }
// //mounika code end


// exports.gethomepagecategoriesctrl = function (req, res) {

//     appmdl.gethomepagecategoriesMdl(function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.getsubcategoriesctrl = function (req, res) {
//     var data = req.body;
//     // console.log(data);
//     appmdl.getsubcategoriesMdl(data, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.getsubitemslistctrl = function (req, res) {
//     var data = req.body;
//     // console.log(data);
//     appmdl.getsubitemslistMdl(data, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.getmakeupitemsctrl = function (req, res) {

//     appmdl.getmakeupitemsMdl(function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.getskinitemsctrl = function (req, res) {

//     appmdl.getskinitemsMdl(function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.gethairitemsctrl = function (req, res) {

//     appmdl.gethairitemsMdl(function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.getbodyitemsctrl = function (req, res) {

//     appmdl.getbodyitemsMdl(function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.getsingitemdataCtrl = function (req, res) {
//     var item_id = req.params.item_id;
//     appmdl.getsingitemdataMdl(item_id, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.getallitemsdatactrl = function (req, res) {

//     appmdl.getallitemsdataMdl(function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //website start mounika

// exports.getcategorylistCtrl = function (req, res) {
//     appmdl.getcategorylistMdl(function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.getallcategorydataCtrl = function (req, res) {
//     var cat_id = req.params.cat_id;
//     appmdl.getallcategorydataMdl(cat_id, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// //webiste end mounika

// //get images in add items 

// exports.getimagesctrl = function (req, res) {
//     var id = req.params.id
//     // console.log(id);
//     appmdl.getimagesmdl(id, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// //sravya code start
// exports.addbannerctrl = function (req, res) {
//     var data = req.body;
//     var reviewImg = data.reviewImg;
//     if (reviewImg.length != '0') {
//         var imageupload = '';

//         var array = reviewImg[0].reviewimg.split(',');
//         var datetimestamp = Date.now();
//         var random_number = Math.floor(100000 + Math.random() * 900000);
//         var unicnumber = random_number + '' + datetimestamp;
//         var base64Data = array[1];
//         var filetype = reviewImg[0].filetype;
//         fs.writeFile("../aromaapi/shopping_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) {
//         });
//         imageupload = "http://localhost/aromadashboard/aromaapi/shopping_images/" + unicnumber + '.' + filetype;

//     }
//     appmdl.addbannermdl(data, imageupload, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.getBannerctrl = function (req, res) {

//     appmdl.getBannermdl(function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.deleteBannerctrl = function (req, res) {
//     var id = req.params.id;
//     appmdl.deleteBannermdl(id, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.updateBannerctrl = function (req, res) {
//     var data = req.body;
//     appmdl.updateBannermdl(data, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// //website banners start
// exports.addwebsitebannerctrl = function (req, res) {
//     var data = req.body;
//     var reviewImg = data.reviewImg;
//     if (reviewImg.length != '0') {
//         var imageupload = '';

//         var array = reviewImg[0].reviewimg.split(',');
//         var datetimestamp = Date.now();
//         var random_number = Math.floor(100000 + Math.random() * 900000);
//         var unicnumber = random_number + '' + datetimestamp;
//         var base64Data = array[1];
//         var filetype = reviewImg[0].filetype;
//         fs.writeFile("../aromaapi/shopping_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) {
//         });
//         imageupload = "http://localhost/aromadashboard/aromaapi/shopping_images/" + unicnumber + '.' + filetype;

//     }
//     appmdl.addwebsitebannermdl(data, imageupload, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.getwebsiteBannerctrl = function (req, res) {

//     appmdl.getwebsiteBannermdl(function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.deletewebsiteBannerctrl = function (req, res) {
//     var id = req.params.id;
//     appmdl.deletewebsiteBannermdl(id, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.updatewebsiteBannerctrl = function (req, res) {
//     var data = req.body;
//     appmdl.updatewebsiteBannermdl(data, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //website banners end
// //edit image code start
// exports.modelimageedit1Ctrl = function (req, res) {
//     var reviewArr = req.body;
//     var reviewImgArr1 = reviewArr.reviewImgArr1;
//     // console.log(reviewImgArr1[0]);
//     var imageupload1 = '';
//     var array = reviewImgArr1[0].reviewimg1.split(',');
//     var datetimestamp = Date.now();
//     var random_number = Math.floor(100000 + Math.random() * 900000);
//     var unicnumber = random_number + '' + datetimestamp;
//     var base64Data = array[1];
//     var filetype = reviewImgArr1[0].filetype;
//     fs.writeFile("../aromaapi/shopping_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) {
//     });
//     imageupload1 = "http://localhost/aromadashboard/aromaapi/shopping_images/" + unicnumber + '.' + filetype;

//     appmdl.modelimageedit1Mdl(imageupload1, reviewArr, function (err, imgresults) {
//         if (err) {
//             res.send({ "status": 500, "msg": 'Data Submitted Failed' });
//             return;
//         }

//         res.send({ 'status': 200, 'data': imgresults });

//     });

// }
// //website video code start
// exports.addvideoctrl = function (req, res) {
//     var data = req.body;
//     var reviewImg = data.reviewImg;
//     if (reviewImg.length != '0') {
//         var imageupload = '';

//         var array = reviewImg[0].reviewimg.split(',');
//         var datetimestamp = Date.now();
//         var random_number = Math.floor(100000 + Math.random() * 900000);
//         var unicnumber = random_number + '' + datetimestamp;
//         var base64Data = array[1];
//         var filetype = reviewImg[0].filetype;
//         fs.writeFile("../aromaapi/videos/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) {
//         });
//         imageupload = "http://localhost/aromadashboard/aromaapi/videos/" + unicnumber + '.' + filetype;

//     }
//     appmdl.addvideomdl(data, imageupload, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.getvideoctrl = function (req, res) {

//     appmdl.getvideomdl(function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.deleteVideoctrl = function (req, res) {
//     var id = req.params.id;
//     appmdl.deleteVideomdl(id, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// //video code end
// //new code
// exports.deleteadditemsrecordctrl = function (req, res) {
//     var data = req.params.id;
//     appmdl.deleteadditemsrecordmdl(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //update product name and description start
// exports.updateproductdetctrl = function (req, res) {
//     var data = req.body;
//     appmdl.updateproductdetmdl(data, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //update product name and description end
// //23-02-22 start
// exports.postqualitycheckctrl = function (req, res) {
//     var data = req.body;
//     var reviewImg = data.reviewImg;
//     if (reviewImg.length != '0') {
//         var imageupload = '';

//         var array = reviewImg[0].reviewimg.split(',');
//         var datetimestamp = Date.now();
//         var random_number = Math.floor(100000 + Math.random() * 900000);
//         var unicnumber = random_number + '' + datetimestamp;
//         var base64Data = array[1];
//         var filetype = reviewImg[0].filetype;
//         fs.writeFile("../aromaapi/shopping_images/" + unicnumber + "." + filetype, base64Data, 'base64', function (err) {
//         });
//         imageupload = "http://localhost/aromadashboard/aromaapi/shopping_images/" + unicnumber + '.' + filetype;

//     }
//     appmdl.postqualitycheckmdl(data, imageupload, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.getqualitycheckctrl = function (req, res) {

//     appmdl.getqualitycheckmdl(function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// exports.deletequalitycheckctrl = function (req, res) {
//     var id = req.params.id;
//     appmdl.deletequalitycheckmdl(id, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }
// //edit keywords
// exports.updatekeywordsctrl = function (req, res) {
//     var data = req.body;

//     appmdl.updatekeywordsmdl(data, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }



// //edit keypoints
// exports.updatekeypointsctrl = function (req, res) {
//     var data = req.body;
//     console.log(data.id)
//     console.log("keypoints id")
//     appmdl.updatekeypointsmdl(data, function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }


// //23-02-22 end
// //sravya code end

// //mounika app code start
// exports.getlogindataCtrls = function (req, res) {
//     var data = req.body;
//     appmdl.getlogindetailsMdl(data, function (err, results) {
//         if (results && results.length > 0) {
//             res.send({ 'status': 200, 'data': results });
//         }
//         else {
//             res.send({ "status": 500, "msg": "Server Error" });
//             return;
//         }
//     });
// }

// exports.getuserloginotpCtrl = function (req, res) {
//     var cntxtDtls = "in getuserloginotpCtrl";
//     var loginotp = Math.floor(1001 + Math.random() * 9000);
//     var dataarr = req.body;

//     var message = 'Dear Your One Time Password Is -' + loginotp;

//     request(`http://sms.sunstechit.com/app/smsapi/index.php?key=55C4941BC46BE5&campaign=0&routeid=13&type=text&contacts=${dataarr.phonenumber}&senderid=AMVTIT&msg=${message}&template_id=1207161822564645201`, function (error, response, body) {

//         res.send({ "status": 200, "loginotp": loginotp });

//     });

// }

// exports.getlogindetailsCtrls = function (req, res) {
//     var data = req.body;
//     appmdl.getlogindataMdl(data, function (err, results) {
//         if (results && results.length > 0) {
//             res.send({ 'status': 200, 'data': results });
//         }
//         else {
//             res.send({ "status": 500, "msg": "Server Error" });
//             return;
//         }
//     });
// }

// exports.postregisterdetailsctrl = function (req, res) {
//     var data = req.body;
//     appmdl.postregisterdetailsMdl(data, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.NewDeleveryAddressCtrl = function (req, res) {
//     var newadd = req.body;
//     appmdl.NewDeleveryAddressMdl(newadd, function (err, results) {
//         if (err) {
//             res.send(serverStatus = '1');
//             return;
//         }
//         res.send(results);
//     });
// }

// exports.getnewDeleveryAddressCtrl = function (req, res) {
//     var cust_id_arr = req.body;
//     appmdl.getnewDeleveryAddressMdl(cust_id_arr, function (err, results) {
//         if (err) {
//             res.send(500, "Server Error");
//             return;
//         }
//         res.send(results);
//     });
// }
// exports.deleteaddressCtrl = function (req, res) {
//     var id = req.params.id;
//     appmdl.deleteaddressMdl(id, function (err, results) {
//         if (err) {

//             res.send(500, "Server Error");
//             return;
//         }
//         res.send({ "status": 200, "data": results });
//     });
// }

// exports.getofferproductsctrl = function (req, res) {

//     appmdl.getofferproductsMdl(function (err, results) {
//         if (err) {
//             res.send({ 'status': 500, 'data': results });
//             return;
//         }
//         res.send({ 'status': 200, 'data': results });
//     });
// }

// exports.getwalletCtrls = function (req, res) {
//     var data = req.body;
//     appmdl.getwalletMdl(data, function (err, results) {
//         if (results && results.length > 0) {
//             res.send({ 'status': 200, 'data': results });
//         }
//         else {
//             res.send({ "status": 500, "msg": "Server Error" });
//             return;
//         }
//     });
// }
// //mounika app code end


//book my show code start


//events/addevents start
exports.postaddeventmethodctrl = function (req, res) {
    var data = req.body;
    appmdl.postaddeventmethodmdl(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.geteventdatactrl = function (req, res) {
    // var data = req.body;
    appmdl.geteventdatamdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.updateEventDatactrl = function (req, res) {
    var data = req.body;

    appmdl.updateEventDatamdl(data, function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.deleteeventctrl = function (req, res) {
    var id = req.params.id;
    appmdl.deleteeventmdl(id, function (err, results) {
        if (err) {

            res.send(500, "Server Error");
            return;
        }
        res.send({ "status": 200, "data": results });
    });
}

//events/addevents end


//permissions start

//create user start
exports.addusrsCtrl = function (req, res) {
    var data = req.body;
    appmdl.ChckExitingusr(data, function (err, results) {
        if (results.length > 0) {
            res.send({ 'status': 300, 'data': results })
            if (err) {
                res.send(500, "Server Error");
                return;
            }
        } else {
            appmdl.addusrsMdl(data, function (err, results) {
                if (err) {
                    res.send(500, "Server Error");
                    return;
                }
                res.send({ 'status': 200, 'data': results });
            });
        }
    });
}
exports.deleteUsrCtrl = function (req, res) {
    var data = req.params.id;
    appmdl.deleteUsrMD1(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.getusrsCtrl = function (req, res) {
    appmdl.getusrsMdl(function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}
exports.updateUserDetailsCtrl = function (req, res) {
    var data = req.body;
    if (data.oldPhoneNumber == data.usr_phone) {
        appmdl.updateUserDetailsMdl(data, function (err, results) {
            if (err) {
                res.send(500, "Server Error");
                return;
            }
            res.send({ 'status': 200, 'data': results });
        });
    }
    // else condition 
    if (data.oldPhoneNumber != data.usr_phone) {
        appmdl.updateUserPhoneNumDuplicateCheckMdl(data, function (err, dresults) {
            if (err) {
                res.send(500, "Server Error");
                return;
            }
            // res.send({ 'status': 200, 'data': results });
            var countResult = dresults[0].count;
            if (countResult == 0) {
                appmdl.updateUserDetailsMdl(data, function (err, results) {
                    if (err) {
                        res.send(500, "Server Error");
                        return;
                    }
                    res.send({ 'status': 200, 'data': results });
                });
            }
            else {
                res.send({ 'status': 300, 'data': dresults });
            }
        });
    }
}
//create user end

//add permissions start

exports.addusrsCtrl = function (req, res) {
    var data = req.body;
    appmdl.ChckExitingusr(data, function (err, results) {
        if (results.length > 0) {
            res.send({ 'status': 300, 'data': results })
            if (err) {
                res.send(500, "Server Error");
                return;
            }
        } else {
            appmdl.addusrsMdl(data, function (err, results) {
                if (err) {
                    res.send(500, "Server Error");
                    return;
                }
                res.send({ 'status': 200, 'data': results });
            });
        }
    });
}

exports.getMenuCatgrypermissionsctrl = function (req, res) {
    var usr_id = req.params.usr_id;
    appmdl.getMenuCatgrypermissionsMdl(usr_id, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}
exports.sendpermissionsCtrl = function (req, res) {
    var data = req.body;
    var items = data.items;
    var usr = data.usr_id;
    var cnt = 0;
    for (var i = 0; i < items.length; i++) {
        (function (j) {
            setTimeout(function () {
                appmdl.sendpermissionsmdl(items[j].carrer_menu_id, usr, function (err, resultsdata) {
                    if (err) {
                        res.send(500, "Server Error");
                        return;
                    }
                    cnt++;
                    if (cnt == items.length) {
                        res.send({ "status": 200, 'data': resultsdata });
                    }
                })
            }, (j % items.length) * 200);
        })(i);

    }

}

//add permissions end


//view permissions start

exports.getpermissionCtrl = function (req, res) {
    appmdl.getpermissionMdl(function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.permsListCtrl = function (req, res) {
    var usr_id = req.params.usr_id;
    appmdl.permsListMdl(usr_id, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.deletepermCtrl = function (req, res) {
    var usr_menu_rel_id = req.params.usr_menu_rel_id;
    appmdl.deletepermMdl(usr_menu_rel_id, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

//view permissions end




//permissions end


//graphs start

exports.getcountctrl = function (req, res) {
    appmdl.getcountmdl(function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}


exports.geteventdatactrl = function (req, res) {
    appmdl.geteventdatamdl(function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

//graphs end


//book my show code end

//r&r start

//district start
exports.adddistrictCtrl = function (req, res) {
    var data = req.body;
    appmdl.adddistrictmdl(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.getdistrictCtrl = function (req, res) {
    // var data = req.body;
    appmdl.getdistrictmdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.updatedistrictCtrl = function (req, res) {
    var data = req.body;

    appmdl.updatedistrictmdl(data, function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.deletedistrictCtrl = function (req, res) {
    var id = req.params.id;
    appmdl.deletedistrictmdl(id, function (err, results) {
        if (err) {

            res.send(500, "Server Error");
            return;
        }
        res.send({ "status": 200, "data": results });
    });
}


//district end

//division start

exports.getdistrictdataCtrl = function (req, res) {
    // var data = req.body;
    appmdl.getdistrictdatamdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.adddivisionCtrl = function (req, res) {
    var data = req.body;
    appmdl.adddivisionmdl(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.getdivisionCtrl = function (req, res) {
    // var data = req.body;
    appmdl.getdivisionmdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.updatedivisionCtrl = function (req, res) {
    var data = req.body;

    appmdl.updatedivisionmdl(data, function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.deletedivisionCtrl = function (req, res) {
    var id = req.params.id;
    appmdl.deletedivisionmdl(id, function (err, results) {
        if (err) {

            res.send(500, "Server Error");
            return;
        }
        res.send({ "status": 200, "data": results });
    });
}

//division end

//department start

exports.adddepartmentCtrl = function (req, res) {
    var data = req.body;
    appmdl.adddepartmentmdl(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.getdepartmentCtrl = function (req, res) {
    // var data = req.body;
    appmdl.getdepartmentmdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.updatedepartmentCtrl = function (req, res) {
    var data = req.body;

    appmdl.updatedepartmentmdl(data, function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.deletedepartmentCtrl = function (req, res) {
    var id = req.params.id;
    appmdl.deletedepartmentmdl(id, function (err, results) {
        if (err) {

            res.send(500, "Server Error");
            return;
        }
        res.send({ "status": 200, "data": results });
    });
}

//department end

//colony details start

exports.getdivisondatactrl = function (req, res) {
    // var data = req.body;
    appmdl.getdivisiondatamdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}


exports.addcolonydatactrl = function (req, res) {
    var data = req.body;
    appmdl.addcolonydatamdl(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.getcolonydatactrl = function (req, res) {
    // var data = req.body;
    appmdl.getcolonydatamdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.updatecolonydatactrl = function (req, res) {
    var data = req.body;
    appmdl.updatecolonydatamdl(data, function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.deletecolonydatactrl = function (req, res) {
    var id = req.params.id;
    appmdl.deletecolonydatamdl(id, function (err, results) {
        if (err) {

            res.send(500, "Server Error");
            return;
        }
        res.send({ "status": 200, "data": results });
    });
}


exports.departmentctrl = function (req, res) {
    // var data = req.body;
    appmdl.departmentmdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.changehabitationctrl = function (req, res) {
    var division = req.params.division;
    console.log(division);
    appmdl.changehabitationmdl(division, function (err, results) {
        console.log(division);
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.changedivisiondata1ctrl = function (req, res) {
    var district = req.params.district;
    console.log(district);
    appmdl.changedivisiondata1mdl(district, function (err, results) {
        console.log(district);
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

//colony details end


//habitation start

exports.getcolonynamectrl = function (req, res) {
    // var data = req.body;
    appmdl.getcolonynamemdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.addhabitationdatactrl = function (req, res) {
    var data = req.body;
    appmdl.addhabitationdatamdl(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.gethabitationdatactrl = function (req, res) {
    // var data = req.body;
    appmdl.gethabitationdatamdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.updatehabitationdatactrl = function (req, res) {
    var data = req.body;
    appmdl.updatehabitationdatamdl(data, function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.deletehabitationdatactrl = function (req, res) {
    var id = req.params.id;
    appmdl.deletehabitationdatamdl(id, function (err, results) {
        if (err) {

            res.send(500, "Server Error");
            return;
        }
        res.send({ "status": 200, "data": results });
    });
}



//habitation end

//stages start

exports.addstagedatactrl = function (req, res) {
    var data = req.body;
    appmdl.addstagedatamdl(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.getstagedatactrl = function (req, res) {
    // var data = req.body;
    appmdl.getstagedatamdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.updatestagedatactrl = function (req, res) {
    var data = req.body;
    appmdl.updatestagedatamdl(data, function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.deletestagedatactrl = function (req, res) {
    var id = req.params.id;
    appmdl.deletestagedatamdl(id, function (err, results) {
        if (err) {

            res.send(500, "Server Error");
            return;
        }
        res.send({ "status": 200, "data": results });
    });
}

//stages end

//infrastructure start

exports.addinfradatactrl = function (req, res) {
    var data = req.body;
    appmdl.addinfradatamdl(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.getinfradatactrl = function (req, res) {
    // var data = req.body;
    appmdl.getinfradatamdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.updateinfradatactrl = function (req, res) {
    var data = req.body;
    appmdl.updateinfradatamdl(data, function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.deleteinfradatactrl = function (req, res) {
    var id = req.params.id;
    appmdl.deleteinfradatamdl(id, function (err, results) {
        if (err) {

            res.send(500, "Server Error");
            return;
        }
        res.send({ "status": 200, "data": results });
    });
}

//infrastructure end

//house start
exports.gethousedatactrl = function (req, res) {
    // var data = req.body;
    appmdl.gethousedatamdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

//house end


//toilet start

exports.gettoiletdatactrl = function (req, res) {
    // var data = req.body;
    appmdl.gettoiletdatamdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

//toilet end

//infra start
exports.getinfradatactrl = function (req, res) {
    // var data = req.body;
    appmdl.getinfradatamdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}


//infra end


//report start
exports.getreportctrl = function (req, res) {
    // var data = req.body;
    appmdl.getreportmdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}
exports.gethabitationdropdownctrl = function (req, res) {
    // var data = req.body;
    appmdl.gethabitationdropdownmdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}
exports.gethabitationreportctrl = function (req, res) {
    // var data = req.body;
    appmdl.gethabitationreportmdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.searchhabitationctrl = function (req, res) {
    // var data = req.body;
    var habitation_name = req.params.habitation_name;
    appmdl.searchhabitationmdl(habitation_name, function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}


//department wise analysis

exports.getdepartmentdropdownctrl = function (req, res) {
    // var data = req.body;
    appmdl.getdepartmentdropdownmdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}
exports.getdepartmentreportctrl = function (req, res) {
    // var data = req.body;
    appmdl.getdepartmentreportmdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.searchdepartmentctrl = function (req, res) {
    // var data = req.body;
    var department = req.params.department;
    appmdl.searchdepartmentmdl(department, function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

//report end
//onchange events..

exports.changedivisiondatactrl = function (req, res) {
    var district = req.params.district;
    console.log(district);
    appmdl.changedivisiondatamdl(district, function (err, results) {
        console.log(district);
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}



exports.changecolonydatactrl = function (req, res) {
    var division = req.params.division;
    console.log(division);
    appmdl.changecolonydatamdl(division, function (err, results) {
        console.log(division);
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.districtdatactrl = function (req, res) {
    // var data = req.body;
    appmdl.districtdatamdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.searchdatactrl = function (req, res) {
    var district = req.params.district;
    var division = req.params.division;
    var colony_name = req.params.colony_name;

    appmdl.searchdatamdl(district, division, colony_name, function (err, results) {

        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}


//r&r end
//dashboard start

exports.getcountsctrl = function (req, res) {
    // var data = req.body;
    appmdl.getcountsmdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}
exports.gettoiletscountsctrl = function (req, res) {
    // var data = req.body;
    appmdl.gettoiletscountsmdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}
exports.getinfracountsctrl = function (req, res) {
    // var data = req.body;
    appmdl.getinfracountsmdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.gethouseanalysisctrl = function (req, res) {
    // var data = req.body;
    appmdl.gethouseanalysismdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.gettoiletanalysisctrl = function (req, res) {
    // var data = req.body;
    appmdl.gettoiletanalysismdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.getinfraanalysisctrl = function (req, res) {
    // var data = req.body;
    appmdl.getinfraanalysismdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}




//dashboard end
//graphs start

exports.departmenthousecountctrl = function (req, res) {
    // var data = req.body;
    appmdl.departmenthousecountmdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.departmenttoiletcountctrl = function (req, res) {
    // var data = req.body;
    appmdl.departmenttoiletcountmdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.departmentinfracountctrl = function (req, res) {
    // var data = req.body;
    appmdl.departmentinfracountmdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.westgodavaridatactrl = function (req, res) {
    // var data = req.body;
    appmdl.westgodavaridatamdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}
exports.eastgodavaridatactrl = function (req, res) {
    // var data = req.body;
    appmdl.eastgodavaridatamdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.hwsanalysisctrl = function (req, res) {
    // var data = req.body;
    appmdl.hwsanalysismdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

//graphs end

exports.adddistrictCtrl = function (req, res) {
    var data = req.body;
    appmdl.postingdatmdl(data, function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}


exports.postingdatactrl = function (req, res) {
    console.log(req)
    var data = req.body;
    appmdl.postingdataMdl(data, function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': 'Amvt' });
            return;
        }
        res.send({ 'status': 800, 'data': results, 'msg': 'String' });
    });
}


//get
exports.getsubmitdatactrl = function (req, res) {
    // var data = req.body;
    appmdl.getsubmitdataMdl(function (err, results) {
        if (err) {
            res.send({ 'status': 500, 'data': results });
            return;
        }
        res.send({ 'status': 200, 'data': results,'msg':'string','1':'12456' });
    });
}


//delete

/*exports.deletedatactrl = function (req, res) {
         var indicator = req.params.id;
        appmdl.deleteMD1(, function (err, results) {
             if (err) {
                res.send(500, "Server Error");
               return;
           }
           res.send({ 'status': 200, 'data': results });
         });
     }*/
