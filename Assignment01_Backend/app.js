
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/userToken');
const movieRoutes = require('./routes/movie');
const cors = require('cors');

const app = express();////khoi tao express project

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());//// app dung bodyParser de lay thong tin request body

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// /api/movies/trending
// middleware co che xac thuc
app.use('/:API',cors(),(req,res,next)=>{
  const token = req.params.API;///nhan ve phan token API tu front end

  const Verify = User.getAll().filter(UserAcc => UserAcc.token===token);//tim xem co user nao trong data co token khop
  if(!Verify.length)
  {
    res.status(401).send(JSON.stringify({//tra ve ma loi message khong verify
      message: "Unauthorized"
    }))
  }
  else
  {
    // console.log('API hop le');
    next();//truyen xuong middleware ke bat dau xu ly du lieu
  }
});

app.use('/:API/movies',cors(),movieRoutes);//cac middleware chinh

app.use('/',cors(),(req,res,next)=>{//tra ve loi neu khong co route phu hop
  res.status(404).send(JSON.stringify({
    message: "Route not found"
  }))
})
 
app.listen(4000);///thiet lap server listen vao cong 4000