var express = require('express');
var router = express.Router();
const dataModel = require('../models/model')

/* GET home page. */
router.get('/api', async (req, res) => {
  const data = await dataModel.find({})
  try {
    await res.send(data);
  } catch (error) {
    res.status(400).send({msg:"tidak bisa diakses"})
  }
});

/* GET home page. */
router.get('/api/:nama', async (req, res) => {
 const ada = await dataModel.find({nama : req.params.nama})
 try {
   if(!ada){
     res.send({msg:"nama tidak ada"})
   }else{
     res.send(ada);
   }
 } catch (error) {
  res.status(400).send({msg:"error"}) 
 }
});
module.exports = router;
