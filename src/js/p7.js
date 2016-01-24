(function(){
    window.addEventListener("DOMContentLoaded", function(){
        // Given binary tree check wheher it is a bst or NetworkTransform
        function Node(val) {
            this.value = val || null;
            this.left = null;
            this.right = null;
        };
        Node.prototype.push = function (val) {
            if(!this.value) {
                this.value = val;
            } else {
                if(this.value > val) {
                    if(this.left === null) {
                        this.left = new Node(val);
                    } else {
                        this.left.push(val);
                    }
                } else {
                    if(this.right === null) {
                        this.right = new Node(val);
                    } else {
                        this.right.push(val);
                    }
                }
            }
        };

        // Pre-order traversal
        function isBst(bst, min, max) {
            var min = min || Number.MIN_VALUE,
                max = max || Number.MAX_VALUE;

            if(!bst) {
                return true;
            }
            if(bst.value < min || bst.value > max) {
                return false;
            }
            return (isBst(bst.left, min, bst.value) && isBst(bst.right, bst.value, max))
        }

        // In order traversal
        function isBst2(bst, lastNode) {
            var lastNode = lastNode || Number.MIN_VALUE;

            if(!bst)
                return true

            if(!isBst2(bst.left, lastNode))
                return false

            if(bst.value < lastNode)
                return false

            return isBst2(bst.right, bst.value)
        }

        var tree = new Node();
        tree.push(3);
        tree.push(5);
        tree.push(5);
        tree.push(3);
        tree.push(2);
        tree.push(5);

        console.log(tree);
        console.log(isBst2(tree));
    });
}());
