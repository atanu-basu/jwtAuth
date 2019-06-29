const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const db = 'mongodb://localhost:27017/angularAuth';
mongoose.connect(db, {useNewUrlParser: true}, (err) => {
    if(err) {
        console.error('Error'+err);
    } else{
        console.log('Connected to Mongodb database');
    }
})
function verifyToken(req, res, next) {
  let payload;
  if(!req.headers.authorization){
    res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1];
  if(token === 'null') {
    res.status(401).send('Unathorized request')
  } else {
    payload = jwt.verify(token, 'acergu')
    if(!payload){
      res.status(401).send('Unathorized request')
    }
  }
  req.userId = payload.subject;
  next()
}
router.get('/', (req, res)=> {
    res.send('hello from api router')    
})
router.post('/register', (req, res)=> {
    let userData = req.body;
    let user = new User(userData);
    user.save().then(
        registeredUser => {
          let payload = { subject: user._id}
          let token = jwt.sign(payload,'acergu')
          res.status(200).send({token});
        },
        err => console.error(`Error ${err}`)
    );
})
router.post('/login', (req,res) => {
    let userdata = req.body;
    User.findOne({email: userdata.email}).then(
        user => {
            if(!user) {
                res.status(401).send('Invalid Email');
            } else{
                if( user.password !== userdata.password){
                    res.status(401).send('Invalid Password');
                } else{
                    let payload = { subject: user._id}
                    let token = jwt.sign(payload, 'acergu')
                    res.status(200).send({token});
                }
            }
        },
        err => {
            if (err) {
                console.error(`Error ${err}`)
            }
        }
    )
})
router.get('/events', (req,res) => {
    let events = [{
        "id": {
          "$oid": "5d1270fffc13ae40d3000000"
        },
        "name": "Defenders of Riga",
        "description": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
        "date": "8/30/2018"
      }, {
        "id": {
          "$oid": "5d1270fffc13ae40d3000001"
        },
        "name": "Exploding Girl, The",
        "description": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
        "date": "7/22/2018"
      }, {
        "id": {
          "$oid": "5d1270fffc13ae40d3000002"
        },
        "name": "Excision",
        "description": "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
        "date": "12/8/2018"
      }, {
        "id": {
          "$oid": "5d1270fffc13ae40d3000003"
        },
        "name": "Adventurer: The Curse of the Midas Box, The",
        "description": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
        "date": "2/17/2019"
      }, {
        "id": {
          "$oid": "5d1270fffc13ae40d3000004"
        },
        "name": "Clubland (a.k.a. Introducing the Dwights)",
        "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        "date": "11/30/2018"
      }, {
        "id": {
          "$oid": "5d1270fffc13ae40d3000005"
        },
        "name": "This Is England",
        "description": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
        "date": "12/2/2018"
      }, {
        "id": {
          "$oid": "5d1270fffc13ae40d3000006"
        },
        "name": "Season of the Witch",
        "description": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
        "date": "8/8/2018"
      }, {
        "id": {
          "$oid": "5d1270fffc13ae40d3000007"
        },
        "name": "Bullhead (Rundskop)",
        "description": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
        "date": "5/23/2019"
      }, {
        "id": {
          "$oid": "5d1270fffc13ae40d3000008"
        },
        "name": "Murphy's Romance",
        "description": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
        "date": "7/31/2018"
      }, {
        "id": {
          "$oid": "5d1270fffc13ae40d3000009"
        },
        "name": "The Fox and the Hound 2",
        "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
        "date": "4/29/2019"
      }]
      res.send(events);
})
router.get('/special', verifyToken, (req,res) => {
    let special = [{
        "id": {
          "$oid": "5d1271f9fc13ae280e000000"
        },
        "name": "Hammes-Hegmann",
        "description": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
        "date": "10/28/2018"
      }, {
        "id": {
          "$oid": "5d1271f9fc13ae280e000001"
        },
        "name": "Ankunding and Sons",
        "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
        "date": "10/2/2018"
      }, {
        "id": {
          "$oid": "5d1271f9fc13ae280e000002"
        },
        "name": "Schiller-Cartwright",
        "description": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
        "date": "11/27/2018"
      }, {
        "id": {
          "$oid": "5d1271f9fc13ae280e000003"
        },
        "name": "Ryan, Greenholt and Runolfsdottir",
        "description": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
        "date": "1/30/2019"
      }, {
        "id": {
          "$oid": "5d1271f9fc13ae280e000004"
        },
        "name": "Hauck-Bernhard",
        "description": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
        "date": "10/4/2018"
      }, {
        "id": {
          "$oid": "5d1271f9fc13ae280e000005"
        },
        "name": "Lynch-Dare",
        "description": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
        "date": "9/8/2018"
      }, {
        "id": {
          "$oid": "5d1271f9fc13ae280e000006"
        },
        "name": "Windler, Hammes and Hills",
        "description": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
        "date": "1/4/2019"
      }, {
        "id": {
          "$oid": "5d1271f9fc13ae280e000007"
        },
        "name": "Abshire-Stanton",
        "description": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
        "date": "3/12/2019"
      }, {
        "id": {
          "$oid": "5d1271f9fc13ae280e000008"
        },
        "name": "Hickle, Zieme and Barton",
        "description": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
        "date": "2/24/2019"
      }, {
        "id": {
          "$oid": "5d1271f9fc13ae280e000009"
        },
        "name": "Ritchie, Krajcik and Rodriguez",
        "description": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
        "date": "5/8/2019"
      }]
      res.send(special);
})

module.exports = router;