const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post('/login', handleLogin);
app.get('/private', sendPrivateInfo);
app.get('/public', sendPublicInfo);

app.listen(3000, err => {
   console.log('Server is running @ 3000');
});

const secretKey = 'IUakstp'

const user = {
   id : 'iu',
   password : '1234',
   name : '아이유'
}

function handleLogin(req, res) {
   const id = req.body.id;
   const pw = req.body.pw;

   // 로그인 성공
   if ( id === user.id && pw === user.password ) {
      // 토큰 생성
      const token = jwt.sign( { id:user.id, name:user.name }, secretKey );
      res.send({msg:'success', token:token});
   }
   else {
      res.sendStatus(401);
   }
}

function sendPublicInfo(req, res) {
   res.send({msg : 'This is public information'});
}

function sendPrivateInfo(req, res) {
   // 요청 헤더 중 token 필드로 토큰 얻기
   const token = req.headers['token'];
   console.log('token :', token);
   jwt.verify(token, secretKey, (err, decoded) => {
      if ( err ) {
         res.sendStatus(401);
         return;
      }
      res.send({msg:'This is private Information', name : decoded.name});
   }); 
}