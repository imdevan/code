(function () {
  'use strict';

  window.addEventListener('DOMContentLoaded', function () {
    // Linked list Remove Nodes
    // Given a linked list of ints and an integer value
    // delete every node of the linkedlinst containing
    // that value.
    function LinkedList() {
      this.head = null;
    };

    LinkedList.prototype.push = function(val) {
      var node = {
        value: val,
        next: null
      }, current;

      if(!this.head) {
        this.head = node;
      }

      else {
        current = this.head;
        while(current.next) {
          current = current.next;
        }
        current.next = node;
      }
    }

    LinkedList.prototype.remove = function(val) {
      var current = this.head;

      if(current.value === val) {
        this.head = current.next;
      }
      else {
        var previous = current;

        while(current.next) {
          if(current.value === val) {
            previous.next = current.next;
            break;
          }
          previous = current;
          current = current.next;
        }

        if(current.value === val) {
          previous.next == null;
        }
      }
    }

    var sll = new LinkedList();
    sll.push(2);
    sll.push(3);
    sll.push(4);
    var k = 3;

    console.log(sll);
  });

}());
