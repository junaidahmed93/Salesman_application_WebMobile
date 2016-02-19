var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    FirstName: String,
    LastName: String,
    Email: String,
    Password: String,
    CreatedOn: { type: Date, default: Date.now() },
    FirebaseToken: String,
    Admin: String
});
var orderSchema = new Schema({
    cookingOil: Number,
    banaspati: Number,
    rice: Number,
    sugar: Number,
    shop: String,
    locationLat: Number,
    locationLong: Number
});
var UserModel = mongoose.model('users', UserSchema);
var OrderModel = mongoose.model('orders', orderSchema);
function saveOrder(sOrder) {
    var deferred = q.defer();
    var order = new OrderModel(sOrder);
    order.save(function (err, data) {
        if (err) {
            console.log("Error in saving orders");
            deferred.reject("rror occured while saving orders");
        }
        else {
            console.log("Orders added successfullly");
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}
exports.saveOrder = saveOrder;
function saveUser(userProps) {
    var deferred = q.defer();
    var user = new UserModel(userProps);
    user.save(function (err, data) {
        if (err) {
            console.log("Error in saving user");
            console.log(err);
            deferred.reject("Error occured while saving");
        }
        else {
            console.log("User saved successfully");
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}
exports.saveUser = saveUser;
function findUser(query) {
    var deferred = q.defer();
    UserModel.findOne(query, function (err, data) {
        if (err) {
            console.log("Error in finding user");
            console.log(err);
            deferred.reject("Erro in finding user");
        }
        else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}
exports.findUser = findUser;
function findAll(query) {
    var deferred = q.defer();
    UserModel.find(query, function (err, data) {
        if (err) {
            console.log("Error in finding-All user");
            console.log(err);
            deferred.reject("Erro in finding-ALL, user");
        }
        else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}
exports.findAll = findAll;
