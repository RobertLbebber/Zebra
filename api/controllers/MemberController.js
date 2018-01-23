/**
 * MemberController
 *
 * @description :: Server-side logic for managing Members
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'signup': function (req, res) {
        res.view();
    },

    create: function (req, res, next) {
        //Easy Way Of Creating Tuples 
        Member.create(
            req.params.all(), function membCreated(err, member) {
                if (err) {
                    req.session.flash = {
                        err: err
                    }
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Client-Error~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    // req.flash('err',err.ValidationError);
                    return res.redirect('gen/signup');
                }
                // res.json(member);
                res.redirect('/Member/list');

                var oldDateObj = new Date();
                var newDateOdj = new Date(oldDateObj.getTime() + 86400 * 1000);//One Day
                req.session.cookie.expires = newDateOdj;
                req.session.authenticated = true;

                console.log(req.session);
                req.session.Member = member;
            }
        );
    },
    
    login: function (req, res, next) {
        console.log(req.params.all());
        if (!req.param('email') || !req.param('password')) {
            var missInput = [{ name: 'usernamePasswordRequired', message: 'You need to provide the appropriate credentials' }];
            req.session.flash = {
                err: missInput
            }
            res.redirect('gen/signup');
            return;
        }
        Member.findOne({email:req.param('email')}).exec(function (err, member) {
            //General Error Detection
            if (err) { return next(err); }
            //No Member Found With Email
            if (!member) {
                var missMember = [{ name: 'noMemberFound', message: 'Incorrect Credentials' }];
                req.session.flash = {
                    err: missMember
                }
                res.redirect('gen/signup');
                return;
            }
            //
            var bcrypt=require('bcrypt');
            bcrypt.compare(req.param('password'), member.ePassword, function (err, valid) {
                //General Error Detection
                if (err) { return next(err); }
                //Password is Incorrect
                if (!valid) {
                    var missMember = [{ name: 'noMemberFound', message: 'Incorrect Credentials' }];
                    req.session.flash = {
                        err: missMember
                    }
                    res.redirect('gen/signup');
                    return;
                }
                var oldDateObj = new Date();
                var newDateOdj = new Date(oldDateObj.getTime() + 86400 * 1000);//One Day
                req.session.cookie.expires = newDateOdj;
                req.session.authenticated = true;
                
                console.log(req.session);
                req.session.Member = member;
                res.redirect('/');
            });
        });
    },

    destroySession:function(req,res){
        req.session.destroy();
        res.redirect('gen/signup');
    },
    list: function (req, res) {
        Member.find({}).exec(function (err, member) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0002' });
            }
            res.view('sb-admin-layout/pages/listMembers', { member: member });
        });
    },
    listToJSON: function (req, res) {
        Member.find({}).exec(function (err, member) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0002' });
            }
            res.view('listMembers', { member: member });
        });
    },
    delete: function (req, res) {
        Member.destroy({ id: req.params.id }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0003' });
            }
            res.redirect('/Member/list');
        });
        return false;
    },
    edit: function (req, res) {
        Member.findOne({ id: req.params.id }).exec(function (err, edits) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0004' });
            }
            res.view('editMember', { edits: edits });
        });
    },
    update: function (req, res) {
        var body = req.body;
        var assets = [body.fname, body.lname, body.email, body.password];
        Member.update({ id: req.params.id }, { fname: assets[0], lname: assets[1], email: assets[2], password: assets[3] }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0005' });
            }

            res.redirect('/Member/list');
        });
        return false;
    }
};

