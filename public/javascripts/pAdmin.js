// var request = require('request');
var imgURL,
    currentSegment = [],
    paper;
var TRANS_MAT = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
var SCORE = 50;

// Unfortunately, this will have to b hard coded afaik.
var SERVER_URL = "http://localhost:5000/api/admin/";
// var SERVER_URL = "https://shielded-dusk-68238.herokuapp.com/api/playfield/";
//Simulate having different users, keep user1 out of it
// var USER = 'user' + Math.floor(Math.random() * 10 + 2);
var USER = 'user1408';

window.onload = function() {
  var src = 'images/Serifos.JPG';
  var height = 512;
  var width = Math.floor(16*height/9);

  console.log(JSON.stringify({points : currentSegment, transformationMatrix : TRANS_MAT, shapescore : SCORE}));

  // Create a Raphael canvas and paint the image on it
  paper = new Raphael(document.getElementById('myCanvas'), width, height);
  var drawnImage = paper.image('/'+src, 0,0, width, height);

  if (currentSegment[0] != null) {
    drawMyPath(currentSegment);
  }

  drawnImage.click(function(event){
    var coords,
        canoffset,
        x,
        y,
        circle,
        svgPath;

    canoffset = $(myCanvas).offset();
    x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left);
    y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canoffset.top) + 1;
    /*console.log(x);
    console.log(y);*/
    circle = paper.circle(x, y, 3);
    coords = [x, y];

    console.log(coords);

    currentSegment.push(coords);

    svgPath = 'M' + currentSegment[0][0] + ' ' + currentSegment[0][1];
    for (var i = 0; i < currentSegment.length; i++){
      svgPath += 'L' + currentSegment[i][0] + ' ' + currentSegment[i][1];
    }
    /*Closes the path, not working nicely atm.
    svgPath += 'Z';*/
    paper.path(svgPath);
  });


  var drawMyPath = function(segment, paper) {
    paper.circle(segment[0][0], segment[0][1], 3);
    var svgPath = 'M' + segment[0][0] + ' ' + segment[0][1];
    for (var i = 0; i < segment.length; i++){
      svgPath += 'L' + segment[i][0] + ' ' + segment[i][1];
      paper.circle(segment[i][0], segment[i][1], 3);
    }
    svgPath += 'Z';
    paper.path(svgPath);
    console.log('svg');
    console.log(svgPath);
  };

  var loadSeg = function(userN, imgURL, callback) {
    var rURL = "../api/admin/" + userN + "/" + imgURL;

    $.ajax({
      url: rURL,
      type: "GET",
      dataType: "json",
      success: function (result) {
        if (result) {
          result.forEach(function(document){
            console.log(document.seg.p);
            callback(document.seg.p, paper);
          });
        } else {
          console.log(result);
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.responseText);
        alert(thrownError);
      }
    });
  }

  document.getElementById('btnLoad').addEventListener('click', function() {
    src = document.getElementById('imgURL').value;
    // src = "http://beispiel.com";
    imgURL = src.replace(/\//g, "%2F").replace(/:/g, "%3A");
    USER = document.getElementById('username').value;

    alert(imgURL);

    // drawnImage = paper.image('/'+src, 0,0, width, height);
    loadSeg("user1408", imgURL, drawMyPath);
    // drawMyPath(currentSegment);
    console.log('wtf the end');
  });
}
