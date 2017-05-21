var segmentJSON = {},
    segmentCounter = 0,
    currentSegment = [],
    paper;

window.onload = function() {
  var src = '/images/Serifos.JPG';
  var height = 512;
  var width = Math.floor(16*height/9);

  /* If the image has to be responsive, I will have to work with this.*/
  /*var myImg = new Image();
  myImg.src = '/images/Serifos.JPG';
  myImg.addEventListener('load', function() {
    width = myImg.width;
    height = myImg.height;
    var paper = new Raphael(document.getElementById('myCanvas'), width, height);
    var drawnImage = paper.image('/images/Serifos.JPG', 0,0, width, height);
  });*/

  /*Apparently this makes the image "clicky", but sends all click coords
  to the server. BAD as it might generate too much traffic./*
  /*myImg.isMap = true;
  console.log(myImg.isMap);*/

  paper = new Raphael(document.getElementById('myCanvas'), width, height);
  var drawnImage = paper.image(src, 0,0, width, height);
  segmentJSON["image"] = JSON.stringify(src);

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

  document.getElementById('btnNew').addEventListener('click', function() {
    paper.path('M'+ + currentSegment[0][0] + ' ' + currentSegment[0][1] + 'L'
    + currentSegment[currentSegment.length-1][0] + ' ' + currentSegment[currentSegment.length-1][1]);
    segmentJSON["Segment " + (++segmentCounter)] = JSON.stringify(currentSegment);
    alert(segmentJSON["Segment " + segmentCounter]);
    currentSegment = [];
  });

  document.getElementById('btnRestart').addEventListener('click', function() {
    segmentJSON = {};
    segmentCounter = 0;
    currentSegment = [];
  });

  document.getElementById('btnSave').addEventListener('click', function() {
    segmentJSON = {};
    segmentCounter = 0;
    currentSegment = [];
  });
}
