const express = require('express');
const router = express.Router();
var db = require('./db.js');

router.route('/register').post((req, res) => {
    var hastaTC = req.body.tc;
    var hastaAd = req.body.name;
    var hastaParola = req.body.pass;
    var unvan = req.body.unvan;
    if (unvan == "doktor") {
        var sqlQuery = "INSERT INTO doktor(doktorTC,doktorAd,doktorParola) VALUES (?,?,?)";

        db.query(sqlQuery, [hastaTC, hastaAd, hastaParola], function (error, data, fields) {
            if (error) {
                res.send(JSON.stringify({ success: false, messsage: error }));
            }
            else {
                res.send(JSON.stringify({ success: true, messsage: 'register' }));
            }
        });
    } else {
        var sqlQuery = "INSERT INTO hasta(hastaTC,hastaAd,hastaParola) VALUES (?,?,?)";

        db.query(sqlQuery, [hastaTC, hastaAd, hastaParola], function (error, data, fields) {
            if (error) {
                res.send(JSON.stringify({ success: false, messsage: error }));
            }
            else {
                res.send(JSON.stringify({ success: true, messsage: 'register' }));
            }
        });
    }


});

router.route('/login').post((req, res) => {

    var hastaTC = req.body.hastaTC;
    var hastaParola = req.body.hastaParola;

    var sql = "SELECT * FROM hasta WHERE hastaTC =? AND hastaParola=?";

    db.query(sql, [hastaTC, hastaParola], function (err, data, fields) {
        if (err) {
            res.send(JSON.stringify({ success: false, messsage: err }));
        } else {
            if (data.length > 0) {
                res.send(JSON.stringify({ success: true, seviye: 'hasta', messsage: data }));
            } else {
                var sql = "SELECT * FROM doktor WHERE doktorTC =? AND doktorParola=?";

                db.query(sql, [hastaTC, hastaParola], function (err, data, fields) {
                    if (err) {
                        res.send(JSON.stringify({ success: false, messsage: err }));
                    } else {
                        if (data.length > 0) {
                            res.send(JSON.stringify({ success: true, seviye: 'doktor', messsage: data }));
                        } else {
                            res.send(JSON.stringify({ success: false, messsage: 'Empty Data' }));
                        }


                    }
                })
            }


        }
    })
});
router.route('/get-doktor').post((req, res) => {


    var sql = "SELECT doktorID,doktorAd,anabilim,doktorTC,doktorOzellik FROM doktor";

    db.query(sql, function (err, data, fields) {
        if (err) {
            res.send(JSON.stringify({ success: false, messsage: err }));
        } else {
                if (data.length > 0) {
                    res.send(JSON.stringify({ success: true, messsage:data }));
                } else {
                    res.send(JSON.stringify({ success: false, messsage: 'Empty Data' }));
                }
           


        }
    })
})
router.route('/get-uzmanlik').post((req, res) => {

    var sql = "SELECT doktorID,uzmanlikAd,uzmanlikID FROM uzmanlik";

    db.query(sql, function (err, data, fields) {
        if (err) {
            res.send(JSON.stringify({ success: false, messsage: err }));
        } else {
                if (data.length > 0) {

                    res.send(JSON.stringify({ success: true, messsage: data }));
                } else {
                    res.send(JSON.stringify({ success: false, messsage: 'Empty Data' }));
                }
    

        }
    })
})

module.exports = router;