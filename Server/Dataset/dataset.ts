import mongoose = require("mongoose");
import q        = require("q");

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    FirstName : String,
    LastName : String,
    Email : String,
    Password : String,
    CreatedOn: {type :Date , default : Date.now()},
    FirebaseToken :String,
    Admin : String
});

let orderSchema = new Schema({
   cookingOil : Number,
   banaspati : Number,
   rice : Number,
   sugar : Number,
   shop : String,
   locationLat : Number,
   locationLong : Number
    
});

let UserModel = mongoose.model('users', UserSchema);
let OrderModel = mongoose.model('orders' ,orderSchema);

function saveOrder(sOrder) {
    let deferred = q.defer();
    let order = new OrderModel(sOrder);
    
    order.save((err,data)=>{
        if(err){
            console.log("Error in saving orders");
            deferred.reject("rror occured while saving orders")
        }
        else{
            console.log("Orders added successfullly");
            deferred.resolve(data);
        }
    });
    return deferred.promise;
    
}

function saveUser(userProps){
    let deferred = q.defer();
    let user = new  UserModel(userProps);
    
    user.save((err,data)=>{
        if(err){
            console.log("Error in saving user");
            console.log(err);
            deferred.reject("Error occured while saving");
        }
        else{
            console.log("User saved successfully");
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

function findUser(query){
    let deferred = q.defer();
    UserModel.findOne(query,function(err,data){
        if(err){
            console.log("Error in finding user");
            console.log(err);
            deferred.reject("Erro in finding user");
            
        } else{
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

function findAll(query){
    let deferred = q.defer();
    UserModel.find(query,function(err,data){
        if(err){
            console.log("Error in finding-All user");
            console.log(err);
            deferred.reject("Erro in finding-ALL, user");
            
        } else{
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}
export {saveUser,findUser,findAll,saveOrder};