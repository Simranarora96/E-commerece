//---------module--------
	var app=angular.module('Login',['ngStorage']);
	app.config(['$httpProvider', function($httpProvider) {
  
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }]);
//---------------first controller--------
	app.controller('signin', function($http,$scope, $window){
		$scope.user=[];
		//console.log($scope.user);
//--------------------------------------------------login----------------------------------------------------
		$scope.submit=function(){

		//$localStorage.pass=$scope.pass;
			var data=$scope.user;
			
			//$localStorage.simran=data.username;
			//console.log(data.username);
			var final=JSON.stringify([{username:data.username, password:data.password}]);
			//var final=JSON.stringify([{username:'abc', password:'hey'}]);
			//console.log(final)
			
		$http({
			method:'POST',
			url: 'http://192.168.0.103:3000/userlogin',
			data: final,
			headers:{'Content-Type':'application/json'}
		}).then(function (response) { 
			    	//console.log(response.data.cool); 

			if (angular.equals(response.data.cool,"NO data found")) {

	alert("Check credentials");
    	
    //res.redirect('');
    
   //res.redirect('C:/Users/SIMRAN PC/angular-phonecat/app/gallery.html');
        
    }
    else
		{//console.log(response.data);

	    //$window.location.href='http://localhost:8000//gallery.html';
	   // $http.get("http://192.168.0.104:3000/gallery");
	    $http({
			method:'POST',
			url: "http://192.168.0.103:3000/gallery",
			data: response,
			headers:{'Content-Type':'application/json'}
		}).then(function (response) { 
			console.log(response);
			//console.log(response.data[1]);
			//$scope.wow=response.data;
			//console.log($scope.wow[0]);
			$window.localStorage.setItem('username',response.data[0])
			$window.localStorage.setItem('id',response.data[1])
			///$localStorage.simran=response.data[0];

			//$localStorage.ids=response.data[1];
			
			
			//console.log($localStorage.simran);
			$window.location.href='http://192.168.0.103:3000/views/category.html';
		});
	}
			//localhost---->127.0.0.1:8000
			//localhost---->127.0.0.1:3000
		
	
});

	};
	
});
	

//--------------------second controller----------------------------------------------------------


	app.controller('gallery', function($http,$scope,$window){
		console.log(checking());
		if(angular.equals(checking(),true))
		{
		$scope.value=0//show
		$scope.yellow=$window.localStorage.getItem('username');
		var hello=  "http://192.168.0.103:3000/user/"+$window.localStorage.getItem('username');//"jkl";//$localStorage.simran;
			console.log(hello);
			$scope.netprice=0;
			$http({
			method:'GET',
			url: hello,
			//headers:{'Content-Type':'application/json'}
		}).then(function(response){
			console.log(response);
			$scope.naina=response.data;
			for(var i=0;i<$scope.naina.length;i++)
		{
				$scope.netprice+=$scope.naina[i].price;

				
				//console.log($scope.netprice);

		}
		$window.localStorage.setItem("item",i);
		$scope.items = $window.localStorage.getItem("item");
		//console.log($scope.netprice);		
		});
			
		}
		else
		{
			$scope.value=1//hide
			console.log("nhi aya")//$scope.value=false
		}
		$scope.jsonarray=[];
		$scope.pink=[];
		$scope.blue=[];
		$scope.naina;
		console.log($window.localStorage.getItem('username'));
		console.log($window.localStorage.getItem('id'));
//-------------------------------------------gallery products load--------------------------
		$http.get("http://192.168.0.103:3000/products")
		.then(function(response){
			console.log(response);
			$scope.products=response.data;
			//console.log($scope.products[0].id);
			
		});

$scope.test=function(){
	if(angular.equals($window.localStorage.getItem('username'), null))
	{
		$window.location.href="http://192.168.0.103:3000/views/register.html"
	}
	else{
	$window.location.href="http://192.168.0.103:3000/views/category.html"	
	}
	//console.log("chala bc")
}
//------------------------------------------user profile--------------------------------
	$scope.profiles=function(){
		var hello=  "http://192.168.0.103:3000/users/"+$window.localStorage.getItem('username');
			console.log(hello);
			$http({
			method:'GET',
			url: hello,
			//headers:{'Content-Type':'application/json'}
		}).then(function(response){
			console.log(response);
			$scope.profileuser=response.data;
			console.log($scope.profileuser.name);
			
		});
	};

//------------------------------------------check/uncheck boxes of products-------------------------	
	$scope.select = function(id,status){
       console.log('checkbox clicked');
       $scope.check="0"
       console.log(id);
       console.log(status);
       //cope.idstring=$scope.idstring+","+id.toString();
        if(status=="1")
        	{
        		console.log("item pushed")
        		$scope.jsonarray.push({'productId':id})
   }
   else{
   	console.log("item deleted")
var index = $scope.jsonarray.findIndex(x=>x.productId === id)
console.log(index)   
$scope.jsonarray.splice(index,1)
console.log($scope.jsonarray)
}
		
		};

//---------------------------------------------Add to cart----------------------------------------
		$scope.update=function(id){
			//var hey=$scope.movies;
			if(angular.equals(checking(),true)){
			var joey=[]
			var username = $window.localStorage.getItem('username')
			//nsole.log($scope.idstring);
			var hello=  "http://192.168.0.103:3000/user/"+username;//"jkl";/////------------------add session storage
			console.log(hello);
			joey.push({'productId':id});
			//var joey=$scope.movies[$scope.id];
			console.log(joey);
			var ross=JSON.stringify(joey);
			console.log(ross);
			$http({
			method:'POST',
			url: hello,
			data: ross,
			headers:{'Content-Type':'application/json'}
		}).then(function (response) { 
			console.log("gandu"+response); 
			//$http.get("http://localhost:3000/movies")
		//.then(function(response){
			//console.log(response);
			//$scope.m
			//$scope.items= $window.localStorage.setItem("items",i+1)
			//console.log("cool"+$scope.items);
	$window.location.href="http://192.168.0.103:3000/views/category.html"		
			
			});
	}
	else{$window.location.href="http://192.168.0.103:3000/views/register.html"}
		//});
		};
//---------------------------------------------Show cart---------------------------------------------
		$scope.cart=function(){
			var hello=  "http://192.168.0.103:3000/user/"+$window.localStorage.getItem('username');//"jkl";//$localStorage.simran;
			console.log(hello);
			$http({
			method:'GET',
			url: hello,
			//headers:{'Content-Type':'application/json'}
		}).then(function(response){
			//console.log("nainaresponse");
			$scope.naina=response.data;
			
		});
	}
//-----------------------------------------Logout-----------------------------------------------------
		$scope.logout=function(){
		//console.log($localStorage.ids);
		var id = $window.localStorage.getItem('id')
			var hello=  "http://192.168.0.103:3000/logout/"+id;
			console.log(hello);
			$http({
			method:'GET',
			url: hello,})
		.then(function(response){
			/*if(data==='done')           
            {
                window.location.href="http://localhost:8000//homepage.html";
            }*/
            console.log(response);
            if (angular.equals(response.data,"done"))
            	{
            		//$localStorage.setItem('username', 'null');\
            	$window.localStorage.removeItem('username')
            	$window.localStorage.removeItem('id')

            		window.location.href="http://192.168.0.103:3000";
            	}
		});
	};
//----------------------------------------checkbox of cart------------------------------------
	$scope.selection = function(lullu){

       console.log('checkbox clicked');
       console.log(lullu);
       $scope.id=lullu;
   };
//----------------------------------------Remove from cart-----------------------------------
		$scope.delete=function(id){
			var hello=  "http://192.168.0.103:3000/remove/"+$window.localStorage.getItem('username');//"jkl";//$localStorage.simran;
			console.log(hello);
			$http({
			method:'GET',
			url: hello,
			//headers:{'Content-Type':'application/json'}
		}).then(function(response){
			console.log(response);
			$scope.pink=response.data;
			console.log($scope.pink);
			//console.log($scope.id);
			var index = $scope.pink.findIndex(x=>x===id)
				console.log(index)   
				$scope.pink.splice(index,1)
			console.log($scope.pink);
				final=$scope.pink;
				console.log(final);
		$http({
			method:'POST',
			url: 'http://192.168.0.103:3000/update/'+$window.localStorage.getItem('username'),//;"jkl",//$localStorage.simran,
			data: final,
			headers:{'Content-Type':'application/json'}
		}).then(function (response) { 

			console.log(response);
			$scope.naina=response.data;
			for(var i=0;i<$scope.naina.length;i++)
		{
				$scope.netprice+=$scope.naina[i].price;
				//console.log($scope.netprice);

		}
		//console.log($scope.netprice);		
		});
		$window.location.href="http://192.168.0.103:3000/views/basket.html"

		});}

function checking()
{

	if(angular.equals($window.localStorage.getItem('username'), null))	
	{
	return false;
	}
else{
	return true;
}
}; 


//------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------


	});


app.controller('basket', function($http,$scope,$window){
	var hello=  "http://192.168.0.103:3000/user/"+$window.localStorage.getItem('username');//"jkl";//$localStorage.simran;
			console.log(hello);
			$scope.netprice=0;
			$http({
			method:'GET',
			url: hello,
			//headers:{'Content-Type':'application/json'}
		}).then(function(response){
			console.log(response);
			$scope.naina=response.data;
			for(var i=0;i<$scope.naina.length;i++)
		{
				$scope.netprice+=$scope.naina[i].price;
				//console.log($scope.netprice);

		}
		//console.log($scope.netprice);		
		});
});

app.controller('signUp', function($http,$scope, $window){
		$scope.user=[];
		$scope.onSubmit = false;
   		$scope.msg=1;
		$scope.assign=function(){
			if($scope.theForm.$valid)
			{
  			console.log($scope.user);
			var data=$scope.user;
			//console.log(data)
			var final=JSON.stringify([{name:data.name,username:data.username,phoneNo:data.phoneNo,email:data.email,password:data.password}]);
			//console.log(final)
			
		$http({
			method:'POST',
			url: 'http://192.168.0.103:3000/user',
			data: final,
			headers:{'Content-Type':'application/json'}
		}).then(function (response){
			//alert("Login Now");
			console.log(response.data)
			
			if(angular.equals(response.data,"username exists"))
			{
				$scope.msg=0;
			}
			else
			{
			console.log(response.data)
			$window.localStorage.setItem('username',response.data[0])
			$window.localStorage.setItem('id',response.data[1])
			console.log($window.localStorage.getItem('username'));
			///$localStorage.simran=response.data[0];

			//$localStorage.ids=response.data[1];
			
			
			//console.log($localStorage.simran);
			$window.location.href='http://192.168.0.103:3000/views/category.html';
		}
		});

	}
	else{
	$scope.onSubmit = true;

}
}      

});
/*app.directive("required", function() {
    return {
        restrict: 'A', // only for attributes
        compile: function(element) {
            // insert asterisk after elment 
            element.after("<span class='required'>*</span>");
        }
    };
});
*/
