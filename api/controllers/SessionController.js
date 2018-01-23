/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'new': function (req, res) {
        var oldDateObj = new Date();
        var newDateOdj = new Date(oldDateObj.getTime() + 86400 * 1000);//One Day
        req.session.cookie.expires = newDateOdj;

        req.session.authenticated = true;
        console.log(req.session);
        res.view();
    },
};

