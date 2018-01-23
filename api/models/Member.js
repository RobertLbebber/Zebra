/**
 * Member.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema:true,

  // attributes: {
  //   autoPK:false,
    attributes: {    
      // memid  :{
      //   type:'string',
      //   // primaryKey:true,
      //   // required:true,
      //   size:15
      // },
      fname :{
        type:'string',
        required:true,
        size:20
      },
      lname :{
        type:'string',
        required:true,
        size:25
      },    
      email :{
        type:'string',
        email:true,
        required:true,
        // unique:true,
        size:45
      },
      // profile:{
      //   type:'string'
      // },
      ePassword:{
        type:'string',
        // required:true,
      },    
      // phone:{
      //   type:'string',
      //   // required:true,
      //   size:15
      // },
      // searchAttr:[
      //   {
      //     radius:{
      //       type: 'int'
      //     },
      //     curSex:{
      //       type: 'boolean'
      //     },
      //     interest1:{
      //       type: 'string'
      //     },
      //     interest2:{
      //       type: 'string'
      //     },
      //     interest3:{
      //       type: 'string'
      //     },
      //     interest4:{
      //       type: 'string'
      //     },
      //     interest5:{
      //       type: 'string'
      //     }
      //   }
      // ]
    },

    toJSON: function(){
      var obj= this.toObject();
      // var jstring=json(obj);
      delete jstring.ePassword;
      // delete obj.confirmation;
      // delete obj.encryptedPassword;
      // delete obj._csrf;
      return obj;
    },

  beforeCreate:function(values,next){
    if(!values.password|| values.password!= values.confirmation){
      return next({err:["Password doesn't match password Confirmation ERR#0006"]});
    }

    require('bcrypt').hash(values.password,10, function passwordEncrypter(err, ePassword){
      if(err){return next(err);}
      values.ePassword= ePassword;
      values.online=true;
      next();
    });
  },

  connection: 'ZebraDB'
};

