(function () {
  'use strict';

  window.addEventListener('DOMContentLoaded', function () {
    // This is one of the most common interview practice questions.
    // Given an array of integers (positive and negative) find the largest
    // continuous sum.

    var array = [1, 1, 3, 3, 2];

    function findLargestSum(arr) {
      if(arr.length === 0)
        return;

      var sum = currentSum = arr[0];

      for(var i = 1; i < arr.length; i++) {
        var currentSum = Math.max(sum + arr[i], arr[i]);
        sum = Math.max(currentSum, sum);
      }

      return sum;
    }

    console.log(findLargestSum(array));
  });
}());
