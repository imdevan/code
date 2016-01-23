(function () {
  'use strict';

  window.addEventListener('DOMContentLoaded', function () {
    // find missing pair
    var arr = [1, 1, 3, 3, 2],
        found = new Set();

    arr.forEach(function (elm){
      if(found.has(elm)){
        found.delete(elm);
      } else {
        found.add(elm);
      }
    });

    console.log(found);
  });
}());
