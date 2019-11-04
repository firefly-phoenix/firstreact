let express = require('express');
let router = express.Router();

let database = require('../database.js');
let RemindersModel = require('../schema/reminders.js')
// const app = express()
//   const port = 3000

router.get('/', function(req, res, next) {
  console.log("doing a get")
  RemindersModel
    .find({

    })
    .then(doc => {
      let sendingtasks = [];
      for(let i=0; i < doc.length; i++) {
        sendingtasks.push(doc[i].task)
      }
      console.log('sending:', sendingtasks)
      res.send(sendingtasks)

    })
    .catch(err => {
      console.error(err)
    })
})

router.put('/', function(req, res, next) {
  console.log("doing a put")
  let newItem = new RemindersModel ({
    task: req.body.itemName,

  })

  newItem.save()
    .then(doc => {
      res.send("Item added")
      console.log(doc)
    })
    .catch(err => {
      console.error(err)
    })

})

/*
router.delete('/', function(req, res, next) {
  console.log("doing a delete")

  // let deleteItem = new RemindersModel ({
  //   //task: req.body.itemName,
  //   task: req.body.items,
  // })

  newItem.save()
    .then(doc => {
      res.send("Item deleted")
      console.log(doc)
    })
    .catch(err => {
      console.error(err)
    })

})
*/

router.delete('/', function(req, res, next) {
  console.log("doing a delete")

      RemindersModel

        .findOneAndRemove({
          //task: req.body.itemName,

          task: req.body.items,
          //console.log("deleting the item")
        })
        .then(response => {
          console.log(response)

          // let sendingtasks = [];
          // for(let i=0; i < response.length; i++) {
          //   sendingtasks.push(doc[i].task)
          // }
          // res.send(sendingtasks)

          res.send(response)

        })
        .catch(err => {
          console.error(err)
        })




})

/*

router.delete('/', function(req, res, next) {
  console.log("doing a delete")
  RemindersModel

    .findOneAndRemove({
      //task: req.body.itemName

      task: req.body.items,
      //console.log("deleting the item")
    })
    .then(response => {
      console.log(response)
      //let sendingtasks = [];
      // for(let i=0; i < response.length; i++) {
      //   sendingtasks.push(doc[i].task)
      // }
      //res.send(sendingtasks)
      res.send(response)

    })
    .catch(err => {
      console.error(err)
    })
})

*/


//______________________________________________________________________________

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// let db = {
//   //come back to this later if code isnt working
//   items: ["thing1", "thing2"],
//   squares: Array(9).fill(null),
// }

// router.get('/', function (req, res, next) {
//     console.log('get happened')
//     res.send(db);
//
// });
//
// router.post('/', function(req, res, next){
//   db = req.body;
//   res.send(db)
// })

module.exports = router;
