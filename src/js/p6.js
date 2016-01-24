(function(){
    window.addEventListener("DOMContentLoaded", function(){
        // detect shuffle
        var str1 = "abc",
            str2 = "def",
            str3 = "dabecf";

        function inspectShuffle(st1, st2, st3) {
            if((st1.length + st2.length) !== st3.length) {
                return false;
            } if(!st1 || !st2 || !st3) {
                if(st1.concat(st2) === st3) {
                    return true;
                } else {
                    return false;
                }
            } if(st1.charAt(0) !== st3.charAt(0) && st2.charAt(0) !== st3.charAt(0)) {
                return false;
            } if(st1.charAt(0) === st3.charAt(0) && inspectShuffle(st1.substring(1), st2, st3.substring(1))) {
                return true;
            } if(st2.charAt(0) === st3.charAt(0) && inspectShuffle(st2.substring(1), st1, st3.substring(1))) {
                return true;
            }
            return false;
        };

        console.log(inspectShuffle(str1, str2, str3));
        console.log(inspectShuffle("str1", "str2", "str3"));
        console.log(inspectShuffle("a", "a", "a"));
        console.log(inspectShuffle("a", "ab", "aab"));
        console.log(inspectShuffle("a", "a", "aa"));
        console.log(inspectShuffle("a", "a", "aa"));
    })
}());
