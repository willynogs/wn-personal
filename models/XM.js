'use strict';

var mongoose = require('mongoose');

var XMSchema = new mongoose.Schema({
  num: Number,
  station: String,
  artist: String,
  song: String,
  uri: String
});

module.exports = mongoose.model('XM', XMSchema);
