const express = require ('express');
//const { updateOne } = require('../models/model.js');
const router = express.Router ();
const dataModel = require ('../models/model.js');

/* GET users listing. */
router.get ('/users', async (req, res, next) => {
  // membuat objek dari variable dataModel yang diisi dari schema model
  //lalu lemparkan response pada saat client mengakses get /users
  const data = await dataModel.find ({});
  try {
    res.send (data);
  } catch (error) {
    res.status (400).send ({msg: 'error internal'});
  }
});

/* GET one users listing. */
//mengecek kondisi ketersediaan id lalu dibalas response dengan field yang
//dimiliki oleh id
router.get ('/users/:id', async (req, res, next) => {
  const ada = await dataModel.findOne ({_id: req.params.id});
  try {
    if (!ada) {
      res.send ({msg: 'id tidak ada'});
    } else {
      res.send (ada);
    }
  } catch (error) {
    res.status (500).send ({msg: 'error internal'});
  }
});

// insert data pada api
router.post ('/users', async (req, res, next) => {
  const data = await new dataModel (req.body);
  try {
    await data.save ();
    //res.send(data);
    res.redirect ('/');
  } catch (error) {
    res.status (400).send ({msg: 'error post'});
  }
  console.log (data);
});

//update data berdasarkan ID sebagai parameter request
router.put ('/users/:id', async function (req, res, next) {
  const ada = await dataModel.find ({});
  try {
    if (!ada) {
      await res.send ({msg: 'id tidak ada'});
    } else {
      await ada.updateOne (
        {},
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            asalKota: req.body.asalKota,
            nomerHp: req.body.nomerHp,
          },
          multi: true,
        },
        function (err, result) {
          if (err) {
            res.send ({msg: 'gagal update karena id tidak ada'});
          } else {
            res.send({msg:"updated"})
            //res.redirect ('/');
          }
        }
      );
    }
  } catch (error) {
    res.status (400).send({msg: 'gagal update'});
  }
});

//delete satu berdasarkan ID sebagai parameter
//mengecek terlebih dahulu apakah id yang digunakan sebagai
//parameter ada atau tidaknya
router.delete ('/users/:id', async (req, res) => {
  const ada = await dataModel.findOne ({_id: req.params.id});
  try {
    if (!ada) {
      res.send ({msg: 'id tidak ada'});
      res.redirect ('/');
    } else {
      await ada.remove ({_id: req.params.id});
      //res.status(200).send({msg:"deleted"})
      res.redirect ('/');
    }
  } catch (error) {
    res.status (400).send ({msg: 'bingung slurr'});
  }
});

module.exports = router;
