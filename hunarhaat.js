var express=require('express');
var async = require("async");
var app=express();
var session = require('express-session');
var redirect = require("express-redirect");
var mongoose=require('mongoose');
//const MongoDBStore = require('connect-mongodb-session');
//var MongoDBStore = require('mongoose-session')(mongoose);
//const MongoStore = require('connect-mongo')(session);
var connect=mongoose.connect('mongodb://localhost/project');
var assert=require('assert');
var bodyParser=require('body-parser');
var params = require('express-params');
app.use(bodyParser.json());
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT","DELETE");
  next();
});
app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'sshh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var personSchema = mongoose.Schema({
   name: String,
   phoneNo: Number,
   email: String,
   username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    productId: [Number]
     //product : [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

var Person = mongoose.model("Person", personSchema);
var user=[];

app.post('/user/:username', function(req, res){
   var movies=req.body;
   console.log(movies[0].productId);

console.log(req.params.username);
   for(i=0;i<movies.length;i++){
   
    console.log(movies[i].productId);
   Person.findOneAndUpdate({username:req.params.username}, { $push: {productId:movies[i].productId}}, function(err,response){
      if (err) {
        console.log(err);
        res.json({message:"Error in updating id"})
      };
      
      res.json(response);
      console.log(response);

    }

    
   );
 }
});

app.get('/remove/:username',function(req,res){
  var arrayids=[];
   Person.findOne({username:req.params.username},function(err, response){
           arrayids = response.productId;
           console.log(response.productId);
           res.json(arrayids)
         });
});

app.get('/user/:username', function(req, res){
        var arrayids=[];
        var product = [];
        var p=1;
         Person.findOne({username:req.params.username},function(err, response){
           arrayids = response.productId;
           console.log(arrayids.length);
            for(i=0;i<arrayids.length;i++)
                  
                       { 
                        Product.findOne({productId:arrayids[i]},function(err, ress){
                        product.push(ress);
                        console.log(product);

           if(p==arrayids.length)
    {console.log("cool")

      res.json(product);
    }
    else{
      p++;
      //res.send("cool")
    }
                        });}
                  

      });
  });


app.get('/user', function(req, res){
   Person.find(function(err, response){
      res.json(response);

   });
});

app.get('/users/:username', function(req, res){
  //console.log(req.params);
   Person.findOne({username:req.params.username},function(err, response){
      res.json(response);

   });
});

app.post('/update/:username',function(req,res){
  console.log(req.body);
  Person.update({username:req.params.username},{productId:req.body},function(err, response){
      
      console.log(response)
      //doc.productId=req.body;
});
});



var sess;

app.post('/userlogin', function(req, res){
/*sess = req.session;
console.log(req.session);
sess.email=req.body[0].username;
console.log(sess.email);*/
 //res.end('done');

   var sky = req.body;
   console.log(req.body[0].username);
   Person.findOne({username: sky[0].username , password: sky[0].password}, function(err,response) {
    if (err) 
    	{
    		res.send("NOTcool");
	}
    if (response) {
    	console.log(response); 
    	
    //res.redirect('');
    res.json(response);
    //$window.location.href='C:/Users/SIMRAN PC/angular-phonecat/app/gallery.html';
   //res.redirect('C:/Users/SIMRAN PC/angular-phonecat/app/gallery.html');
        
    }
    else
{
	
	res.json({"cool":"NO data found"});
}
    
   // Person.findOne({password: sky[0].password}, function(err,response) {
    
});
});

app.post('/gallery',function(req,res){
  console.log("fucker");
  var array=[];
  sess = req.session;
  console.log(req.session.id);
  //console.log(req.body.data.username);
  sess.email=req.body.data.username;
  

if(sess.email) {
//res.write('Hello'+' ' +sess.email);
array.push(sess.email)
array.push(sess.id)
console.log(array);
res.send(array);
//console.log(sess.id);
//res.send(sess.id);
} else {
    res.write(
     '<h1>Please login first.</h1>'
    );
    res.end('<a href="+">Login</a>');
}
});

app.get('/logout/:id',function(req,res){
  //sess=req.session;
  console.log(req.params.id);
  console.log(req.session);
  //sess.remove({ "_id": req.params.id },function(err,result) {
req.session.destroy(function(err,response) {
  if(err) {
    console.log("Error:"+err);
  } else {
    //res.redirect('http://localhost:8000//homepage.html');
  console.log('session destroyed')
    console.log("Destroyed:"+response);
    res.end('done');
//storedb.clear(function(ress)
//{
  //console.log(ress)
     // res.end('done')

//})
  }
});
});
app.get('/test/:id',function(req,res){
  //sess=req.session;
  console.log(req.params.id);
  console.log(req.session);
  //sess.remove({ "_id": req.params.id },function(err,result) {
storedb.get(req.params.id,function(err,response) {
  if(err) {
    console.log("Error:"+err);
  } else {
    //res.redirect('http://localhost:8000//homepage.html');
  //console.log('session destroyed'+sess.id)
    console.log("GET:"+response);
    res.end('done')
  }
});
});

//---------------------------------------------------------------------------------------------
/*app.post('/user', function(req, res){
   var user = req.body;
   var array=[];
   console.log(req.body);
   //Person.findOne({userName:user.userName},function(err, response){
     // res.json(response);

   //});
    
   //console.log(req.body.name);
  
var newPerson = new Person({
           username: user[0].username, name: user[0].name,phoneNo : user[0].phoneNo, email: user[0].email, password: user[0].password}
        );
      
      newPerson.save(function(err, Movie){
         if(err) 
          { console.log("error username print")
            res.send("username exists")
          }
          else
          {
sess = req.session;
  console.log(req.session.id);
  console.log(user[0].username);
  sess.email=user[0].username;
  

if(sess.email) {
//res.write('Hello'+' ' +sess.email);
array.push(sess.email)
array.push(sess.id)
console.log(array);
res.send(array);
//console.log(sess.id);
//res.send(sess.id);
} else {
    res.write(
     '<h1>Please login first.</h1>'
    );
    res.end('<a href="+">Login</a>');
}
          }
            
         });
          

   
   
});*/
//---------test signup-----------------------
app.post('/user', function(req, res){
   var user = req.body;
   var array=[];
   console.log(req.body);
   Person.findOne({username:user[0].username},function(err, response){
    if(response==null)
    {
var newPerson = new Person({
           username: user[0].username, name: user[0].name,phoneNo : user[0].phoneNo, email: user[0].email, password: user[0].password}
        );
      
      newPerson.save(function(err, Movie){
         if(err) 
          { console.log("error:   "+err)
            res.send("server error")
          }
          else{
            sess = req.session;
  console.log(req.session.id);
  console.log(user[0].username);
  sess.email=user[0].username;
  

if(sess.email) {
//res.write('Hello'+' ' +sess.email);
array.push(sess.email)
array.push(sess.id)
console.log(array);
res.send(array);
//console.log(sess.id);
//res.send(sess.id);
} else {
    res.write(
     '<h1>Please login first.</h1>'
    );
    res.end('<a href="+">Login</a>');
}
}
          

          


    });
    

   }else{res.send("username exists");}
     
     console.log(response);
 });
    
   
});
//-------------------------------------------
app.delete('/user/:name',function(req,res){
  console.log(req.params.name);
   Person.findOneAndRemove({name:req.params.name},function(err,res){
console.log(res);      
if (err) {res.json={message:"Error in updating id"}};
  
      res.json={'message':"Removed Successfully"};
   });
});

var productSchema= mongoose.Schema({
	name:String,
	productId:Number,
	price:Number,
	quantity:Number
	//image:
});


var Product = mongoose.model("Product", productSchema);


 app.get('/products', function(req, res){
   Product.find(function(err, response){
      res.json(response);

   });
});

 app.get('/product/:productId?', function(req, res){

   Product.findOne({productId:req.params.productId},function(err, response){
      res.json(response);

   });
});
app.delete('/products',function(req,res){
   Product.remove(function(err,res){
      if(err)
         //{res.json({message:"Unable to remove"});}
       throw err
      res.json({message:"Removed Successfully"});
   });
});
app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });
app.listen(3000,'192.168.0.103',function(req,res){
   console.log("Server started..");
});


//----------------------------------------session------------------------------------------
/*var store = new MongoDBStore(
      {
        uri: 'mongodb://localhost/project',
        collection: 'mySessions'
      });
*/
 /*var storedb = new MongoStore({ url: 'mongodb://localhost/test-app' }) 
app.use(require('express-session')({
    store: storedb,
    key: 'session',
    secret: 'ssshhhhh'
}));*/

 /*app.use(require('express-session')({
    key: 'session',
    secret: 'SUPER SECRET SECRET',
    store: require('mongoose-session')(mongoose),
    resave: true,
      saveUninitialized: true
}));
/*store.on('error', function(error) {
      assert.ifError(error);
      assert.ok(false);
    });*/

 /*app.use(require('express-session')({
      secret: 'This is a secret',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      },
      //store: store,
      resave: true,
      saveUninitialized: true
    }));*/
    

//


//--------------------------------waterfall---------
/*function test(array, callback)
{
   var result=[];
   for(i=0;i<=array.length;i++)
        {
          Product.findOne({productId:array[i]},function(err, res){
            callback(res);
            });
        }
}
app.get('/user/:username', function(req, res){
        var arrayids=[]
        var product = [];
        var i=1;
        Person.findOne({username:req.params.username},function(err, response){
           arrayids = response.productId;
           test(arrayids, function(user) 
  { 
    product.push(user);
    console.log(i);
    if(i==arrayids.length)
    {console.log("cool")

      res.json(product)
    }
    else{
      i++;
    }

}); 
     })

    console.log(product); 



//console.log(req.params.username);
 /*
    async.waterfall([
         function(next){
           console.log("gand marale");
  console.log(req.params.username); 
  
          Person.findOne({username:req.params.username},function(err, response){
            
     }).exec(next);
        },
      function(array, next){
       console.log("cool")
       console.log(array.productId);

      
        for(i=0;i<=2;i++)
        {
          Product.findOne({productId:array.productId[i]},function(err, res){
              test(res);                            
            });
        }
next(null,"cool");

          },
          function(err, response)
          {
            console.log(444);
          }
  ]);*/

    //});  
   
//--------------------------------//---------------------------------|^-----------------------------------------
/*app.get('/logout/:id',function(req,res){
  //sess=req.session;
  console.log(req.params.id);

  //sess.remove({ "_id": req.params.id },function(err,result) {
req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
    //res.redirect('http://localhost:8000//homepage.html');
  console.log('session destroyed'+sess.id)
    res.end('done');
  }
});
});*/
//---------------------------------------------------session testing---------------------------------
//--------product database-------------
/*var products=[
   {productId: 101, name: "World Wonders", price: 1999,quantity:6},
  {productId: 102, name: "Paradise Falls", price: 2999,quantity:6},
  {productId: 103, name: "Cloudy Tree", price: 1699,quantity:6},
  {productId: 104, name: "The Abstract", price: 1799,quantity:6},
  {productId: 105, name: "Magic", price: 1899,quantity:6},
  {productId: 106, name: "Dreamy Tree", price: 1999,quantity:6},
  {productId: 107, name: "The Autumn", price: 2599,quantity:6},

];


for(i=0;i<products.length;i++){
var newProduct = new Product({
           productId: products[i].productId, name: products[i].name, price: products[i].price,quantity:products[i].quantity}
        );
      
      newProduct.save(function(err, Product){
         if(err) throw err
            
         });
   }*/
/*storedb.set(req.session.id,sess,function(err,response) {
  if(err) {
    console.log("Error:"+err);
  } else {
    //res.redirect('http://localhost:8000//homepage.html');
  //console.log('session destroyed'+sess.id)
    console.log("Created:"+response);
  }
});*/