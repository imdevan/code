(function() {
    window.addEventListener("DOMContentLoaded", function() {

        function Node(val) {
            this.val = val;
            this.next = null;
        }

        Node.prototype.push = function (value) {
            if(!this.val) {
                this.val = value;
            } else if(this.next) {
                this.next.push(value);
            } else {
                this.next = new Node(value);
            }
        };

        function removeNodesRecursive(head, rmv) {
            if(!head) {
                return;
            } else {
                if(head.val === rmv) {

                }
            }
        }
        Node.prototype.remove = function (value) {
            if(this.val === value && this.next) {
                this.val = this.next.val;
                this.next = this.next.next;
                this.remove(value);
            }
            if(this.val === value && !this.next) {
                self = undefined;
            }
            if(this.next) {
                this.next.remove(value);
            }
        };

        function removeNodes(head, rmv) {
            while(head && head.val === rmv){
                head = head.next;
            }
            if(!head) {
                return;
            }

            var current = head;
            while(current.next) {
                if(current.next.val === rmv) {
                    var temp = current.next;
                    current.next = temp.next;
                } else {
                    current = current.next;
                }
            }
            // return head;
        }

        var sll = new Node();
        sll.push(3);
        sll.push(5);
        sll.push(3);
        sll.push(3);
        sll.push(4);
        sll.push(3);

        sll.remove(3);

        console.log(sll);

    });
}());
