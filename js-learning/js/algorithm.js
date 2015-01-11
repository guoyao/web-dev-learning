(function() {
    // bubble sort
    Array.prototype.bubbleSort = function() {
        var i, j, temp,
            len = this.length;
        for (i = 0; i < len; i++) {
            for (j = i + 1; j < len; j++) {
                if (this[i] > this[j]) {
                    temp = this[i];
                    this[i] = this[j];
                    this[j] = temp;
                }
            }
        }
        return this;
    };
    
    // quick sort
    function quickSort(a, s, e) {  
        if (s < e) {  
            var pos = partition(a, s, e);  
            quickSort(a, s, pos - 1);  
            quickSort(a, pos + 1, e);  
        }  
    }  
    function partition(a, st, en) {  
        var s = st,
            e = en + 1,
            base = a[s],
            temp;
        while (1) {  
            while (a[++s] < base) {  
            }  
            while (a[--e] > base) {  
            }  
            if (s > e) {  
                break;  
            }  
            temp = a[s];  
            a[s] = a[e];  
            a[e] = temp;  
        }  
        a[st] = a[e];  
        a[e] = base;  
        return e;  
    }
    Array.prototype.quickSort = function() {  
        quickSort(this, 0, this.length - 1);  
        return this;
    };  
    
    // insert sort, change origin array
    Array.prototype.insertSort = function() {
        var len = this.length,
            i = 0, 
            j = 0,
            sortedLen = 0,
            temp;
        while(++i < len) {
            sortedLen++;
            j = sortedLen;
            temp = this[i];
            while(--j >= 0) {
                if (temp < this[j]) {
                    this[j + 1] = this[j];
                    this[j] = temp;
                } else {
                    this[j + 1] = temp;
                    break;
                }
            }
        }
        return this;
    };
    
    // insert sort, not change origin array
    Array.prototype.insertSort2 = function() {
        var len = this.length,
            i = 0, 
            j,
            sorted = len > 0 ? [this[0]] : [];
        while (++i < len) {
            j = sorted.length;
            while (--j >= 0) {
                if (this[i] < sorted[j]) {
                    sorted[j + 1] = sorted[j];
                    sorted[j] = this[i];
                } else {
                    sorted[j + 1] = this[i];
                    break;
                }
            }
        }
        return sorted;
    };
    
    // shell sort
    Array.prototype.shellSort = function() {
        var len = this.length;
        for (var fraction = Math.floor(len / 2); fraction > 0; fraction = Math.floor(fraction / 2)) {
            for (var i = fraction; i < len; i++) {
                for (var j = i - fraction; j >= 0 && this[j] > this[fraction + j]; j -= fraction) {
                    var temp = this[j];
                    this[j] = this[fraction + j];
                    this[fraction + j] = temp;
                }
            }
        }
        return this;
    };
    
    // binary search
    Array.prototype.binarySearch = function(value) {  
        var s = 0, 
            e = this.length - 1, 
            mid, 
            tmp;  
        while (s <= e){  
            mid = Math.floor((s + e) / 2);  
            tmp = this[mid];  
            if (tmp == value) {
                return mid;  
            } else if (tmp > value) {
                e = mid - 1;
            } else {
                s = mid + 1;
            }
        }  
        return -1;  
    };
    
    var arr = [5, 8, 4, 1, 9, 2, 6, 1];
    var arr2 = [49, 38, 65, 97, 76, 13, 27, 49, 55, 04];
    
    console.log(arr);
    console.log(arr.shellSort());
    console.log(arr);
    
    console.log(arr.binarySearch(8));
})();