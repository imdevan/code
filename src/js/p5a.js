(function() {
  'use strict';
  window.addEventListener('DOMContentLoaded', function() {

    function LinkedList () {
      this.head = null;
    }

    LinkedList.prototype.push = function(val) {
      var node = {
        value: val,
        next: null
      }, current;

      if(this.head === null) {
        this.head = node;
      }
      else {
        current = this.head;
        while(current.next){
          current = current.next;
        }
        current.next = node;
      }
    };

    LinkedList.prototype.remove = function (val) {
      var current, prev;
      current = this.head;
      prev = current;
      // case 1
      if(current.value === val) {
        this.head = current.next;
      }
      else {
        var prev = current;

        while(current.next) {
          // case 2
          if(current.value === val) {
            prev.next = current.next;
            break;
          }
          prev = current;
          current = current.next;
        }

        // case 3
        if(current.value === val) {
          prev.next = null;
        }
      }
    }

    LinkedList.prototype.removeRecursive = function (val, current) {
      // case 1
      // reached the end of the LinkedList
      // - return
      // case 2
      // not equal to value
      // - continue recursion on next node
      // case 3
      // equal to value
      // - remove and recursion on same node
      console.log('val', val);
      console.log('current', current);
      if(!current) {
        return;
      } else if(current.value === val) {
        if(current.next){
          current = current.next;
          this.removeRecursive(val, current);
        } else{
          current = null;
          return;
        }
      } else {
        this.removeRecursive(val, current.next);
      }
    }

    var sll = new LinkedList();
    sll.push(5);
    sll.push(4);
    sll.push(5);
    sll.removeRecursive(5, sll.head);

    console.log(sll);
  });
}());
