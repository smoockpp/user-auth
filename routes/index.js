const express = require('express');
const router = express.Router();
const Register = require('../controllers/user/register');
const Login = require('../controllers/user/auth');
const Logout = require('../controllers/user/logout');
const Profile = require('../controllers/user/profile');
const Delete = require('../controllers/user/delete');
const User = require('../models/user');
const mid = require('../middleware');

// GET /
router.get('/', function(req, res, next) {
    return res.render('index', { title: 'Home' });
});

// GET /profile
router.get('/profile', mid.requiresLogin, function(req, res, next) {
    Profile.profileController(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
    Logout.logoutUser(req, res, next, '/')
});

// GET /login
router.get('/login', mid.loggedOut, function(req, res, next) {
  return res.render('login', { title: 'Log In'});
});

// POST /login
router.post('/login', function(req, res, next) {
  Login.loginUser(req, res, next, '/profile');
});

//GET /register
router.get('/register', mid.loggedOut, function(req, res, next) {
  return res.render('register', { title: 'Sign Up'});
});

// POST /register
router.post('/register', function(req, res, next) {
    Register.registerController(req, res, next, '/profile');
});

router.get('/profile/delete', mid.requiresLogin, function(req, res, next) {
    Delete.deleteController(req, res, next);
});




// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
