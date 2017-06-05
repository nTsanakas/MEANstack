// var request = require('request');
var imgURL,
    currentSegment = [],
    paper;
var TRANS_MAT = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
var SCORE = 50;
// var SERVER_URL = "http://localhost:5000/api/playfield/"
var SERVER_URL = "https://shielded-dusk-68238.herokuapp.com/api/playfield/";
//Simulate having different users, keep user1 out of it
// var USER = 'user' + Math.floor(Math.random() * 10 + 2);
var USER = 'user1408';

var saveSeg = function(imgURL) {

  // if (process.env.NODE_ENV === 'production') {
  //   SERVER_URL = "https://shielded-dusk-68238.herokuapp.com/playfield/";
  // }

  var rURL = SERVER_URL + USER + "/" + imgURL;
  var resultDiv = $("#resultDivContainer");

  $.ajax({
    url: rURL,
    type: "POST",
    data: JSON.stringify({
            'points' : currentSegment,
            'transformationMatrix' : TRANS_MAT,
            'shapeScore' : SCORE
          }),
    dataType: "json",
    traditional: true,
    success: function (result) {
      if (result) {
        processResponse(result);
        alert(result);
      } else {
        resultDiv.html(result);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.status);
      alert(thrownError);
    }
  });
};

window.onload = function() {
  var src = 'images/Serifos.JPG';
  var height = 512;
  var width = Math.floor(16*height/9);

  console.log(JSON.stringify({points : currentSegment, transformationMatrix : TRANS_MAT, shapescore : SCORE}));

  // Create a Raphael canvas and paint the image on it
  paper = new Raphael(document.getElementById('myCanvas'), width, height);
  var drawnImage = paper.image('/'+src, 0,0, width, height);

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

  document.getElementById('btnClose').addEventListener('click', function() {
    paper.path('M'+ + currentSegment[0][0] + ' ' + currentSegment[0][1] + 'L'
    + currentSegment[currentSegment.length-1][0] + ' ' + currentSegment[currentSegment.length-1][1]);

    src = "http://beispiel.com";
    imgURL = src.replace(/\//g, "%2F").replace(/:/g, "%3A");
    saveSeg(imgURL);
    // var requestOptions = {
    //   url : "http://localhost:5000/api/playfield/" + USER + "/" + imgURL,
    //   method : "PUT";
    //   json : {
    //            points : currentSegment,
    //            transformationMatrix : TRANS_MAT,
    //            shapescore : SCORE
    //          }
    // };

    // request(requestOptions, function(){
    //   alert("Data sent to server.");
    // });

    currentSegment = [];
  });

  document.getElementById('btnRestart').addEventListener('click', function() {

    currentSegment = [];
  });

  document.getElementById('btnSave').addEventListener('click', function() {

    currentSegment = [];
  });
}
