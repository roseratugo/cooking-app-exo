const { DataTypes } = require('sequelize');
const config = require('../../config');
const bcrypt = require('bcrypt');


class User {
    constructor(id, username, password, email, is_moderator, is_verified) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.email = email;
      this.is_moderator = is_moderator;
      this.is_verified = is_verified;
    }
  }
  
  module.exports = User;
  
