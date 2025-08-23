"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleProvider = exports.EmailAuthProvider = exports.auth = exports.db = exports.Firebase = void 0;
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
var auth_1 = require("firebase/auth");
Object.defineProperty(exports, "EmailAuthProvider", { enumerable: true, get: function () { return auth_1.EmailAuthProvider; } });
var web_extension_1 = require("firebase/auth/web-extension");
var firestore_2 = require("firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyAK4cD639TmAWOKlMXtdNdE5mRxN9-5Gq8",
    authDomain: "test-1ec55.firebaseapp.com",
    projectId: "test-1ec55",
    storageBucket: "test-1ec55.firebasestorage.app",
    messagingSenderId: "710680506961",
    appId: "1:710680506961:web:1d66facba9ccd21484be70",
    measurementId: "G-PCNGHSCGJT"
};
var app = (0, app_1.initializeApp)(firebaseConfig);
var auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
var db = (0, firestore_1.getFirestore)(app);
exports.db = db;
var Firebase = /** @class */ (function () {
    function Firebase() {
        var _this = this;
        this.doCreateUserWithEmailAndPassword = function (email, password) {
            return (0, auth_1.createUserWithEmailAndPassword)(_this.auth, email, password);
        };
        this.doSignInWithEmailAndPassword = function (email, password) {
            return (0, auth_1.signInWithEmailAndPassword)(_this.auth, email, password);
        };
        this.doSignOut = function () { return (0, auth_1.signOut)(_this.auth); };
        this.auth = auth;
        this.db = db;
    }
    return Firebase;
}());
exports.Firebase = Firebase;
exports.default = Firebase;
exports.googleProvider = new web_extension_1.GoogleAuthProvider();
try {
    var docRef = await (0, firestore_2.addDoc)((0, firestore_2.collection)(db, 'users'), {
        first: "ada",
        last: "Lovelace",
        born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
}
catch (e) {
    console.error("Error adding document: ", e);
}
