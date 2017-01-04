'use strict';
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/personal');
var request = require('request');
var cheerio = require('cheerio');
var Horseman = require('node-horseman');
var horseman = new Horseman();
var XM = require('./models/XM');

function getXM(){
  horseman
    .open('http://www.dogstarradio.com/now_playing.php')
    .html()
    .then(function(html){
      let $ = cheerio.load(html);
      $('td').each(function(i, e){
        if(i == 0 || i == 4 || i > 69) { return; }
        var arr = $(this).text().split('\n');
        var res = arr.filter(function(v){
          v.replace(/\s+/g, '');
          return v != '';
        });
        request(`https://api.spotify.com/v1/search?q=track:${res[3]}%20artist:${res[2].replace(' - ', '')}&type=track`, function(e,r,b){
          if(!e && r.statusCode == 200){
            var j = JSON.parse(b);
            if(j.tracks.total > 0) {
              XM.findOne({ 'num': res[0].replace(' - ', '') }, function(err, doc){
                if(doc){
                  doc.artist = res[2].replace(' - ', '');
                  doc.song = res[3];
                  doc.uri = j.tracks.items[0].uri;
                  doc.save(function (err, upDoc) {
                    if (err) {
                      console.log(err);
                    }
                  });
                }else {
                  var newXM = new XM({
                    num: res[0].replace(' - ', ''),
                    station: res[1],
                    artist: res[2].replace(' - ', ''),
                    song: res[3],
                    uri: j.tracks.items[0].uri
                  });
                  newXM.save(function (err, nX) {
                    if (err) return console.error(err);
                  });
                }
              });
            }
          }
        });
      });
    });
}

module.exports = getXM;
