function regex(input) {
    const pattern1 = new RegExp('\w{0}\b3{1}[0-1]{1}\b|\b[1-2]{1}[0-9]{1}\b|\b[1-9]{1}\b [A-Z]{1}[a-z]+ [0-2]?[0-9]?[0-9]?[0-9]{1}$');
    const pattern2 = new RegExp('\w{0}(\b3{1}[0-1]{1}\b|\b[1-2]{1}[0-9]{1}\b|\b[1-9]{1}\b) [A-Z]{1}[a-z]+ [0-2]?[0-9]?[0-9]?[0-9]{1} (\w+ *-* *)+');
    if (pattern1.test(input)) {
        regexDate(input);
    }
    else if (pattern2.test(input)) {
        regexDateDisease(input);
    }
    else {
        regexDisease(input);
    }
}

function regexDate(input)
{
    const splitterPattern = /'\b\w+\b'/g;
    const resArray = [...input.matchAll(splitterPattern)];
    resArray.append('date');
    // resArray[0][0] for date, resArray[1][0] for month, resArray[2][0] for year, resArray[3][0] for input type identifier
    return resArray;
}

function regexDateDisease(input)
{
    const splitterPattern = /'\b\w+\b'/g;
    const resArray = [...input.matchAll(splitterPattern)];
    resArray.append('datedisease');
    // resArray[0][0] for date, resArray[1][0] for month, resArray[2][0] for year, combine resArray[i][0] with 2 < i < resArray.length - 1 for the disease name
    // resArray[resArray.length - 1][0] for input type identifier
    return resArray;
}

function regexDisease(input)
{
    const splitterPattern = /'\b\w+\b'/g;
    const resArray = [...input.matchAll(splitterPattern)];
    resArray.append('disease');
    // Combine resArray[i][0] with 0 <= i < resArray.length - 1 for the disease name
    // resArray[resArray.length - 1][0] for input type identifier
    return resArray;
}

function isTanggal(str) {
    return /^[0-9-]+$/.test(str);
}

function isSafe(str) {
    return /^[ATGC]+$/.test(str);
}
export default isTanggal, isSafe;