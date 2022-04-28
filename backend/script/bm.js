function bmMatch(text, pattern) {
    let last = buildLast(pattern);
    let n = text.length;
    let m = pattern.length;
    let i = m-1;
    if (i > n-1) {
        return -1; 
    }
    let j = m-1;
    do {
        if (pattern[j] == text[i]){
            if (j == 0) {
                return i;
            }
            else {
                i--;
                j--;
            }
        }
        else {
            let lo = last[text[i].charCodeAt(0)];
            i = i + m - Math.min(j, 1+lo);
            j = m - 1;
        }
    } while (i <= n-1);
    return -1;
    }


function buildLast(pattern) {
    let last = [];
    for(let i=0; i < 128; i++) {
        last[i] = -1;
    }
    for (let i = 0; i < pattern.length; i++){
        last[pattern[i].charCodeAt(0)] = i; 
    }
    return last;
}
