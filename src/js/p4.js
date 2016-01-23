(function () {
  'use strict';

  window.addEventListener('DOMContentLoaded', function () {
    // There is an array of non-negative integers
    // a second array is formed by shuffling the ints and deleting a random element.
    // Find which element is missing in the second array
    var arrayA = [1, 1, 3, 3, 2];
    var arrayB = [1, 1, 3, 2];

    function findMissingElm(arrA, arrB) {
      var missingElm = {};

      arrA.forEach(function(elm){
        if(missingElm.hasOwnProperty(elm)) {
          missingElm[elm] += 1;
        } else {
          missingElm[elm] = 1;
        }
      });

      arrB.forEach(function(elm){
        if(missingElm[elm] === 1) {
          delete missingElm[elm];
        } else {
          missingElm[elm] -= 1;
        }
      });

      return Object.keys(missingElm).shift();
    }

    function findMissingElmXOR(arrA, arrB) {
      var missingElm = 0;

      arrA.forEach(function (elm){
        missingElm ^= elm;
      });

      arrB.forEach(function (elm){
        missingElm ^= elm;
      });

      return missingElm;
    }

    console.log(findMissingElm(arrayA, arrayB));
  });
}());
