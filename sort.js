export default function sort(arr) {
    if(arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const leftHalf = sort(arr.slice(0, mid));
    const rightHalf = sort(arr.slice(mid, arr.length));
    
    const sortedArr = [];
    let i = 0;
    let j = 0;
    while (i < leftHalf.length && j < rightHalf.length) {
        if(leftHalf[i] < rightHalf[j]) {
            sortedArr.push(leftHalf[i]);
            i++;
        } else {
            sortedArr.push(rightHalf[j]);
            j++;
        }
    }
    
    if (i < leftHalf.length) {
        sortedArr.push(...leftHalf.slice(i));
    } 
    if(j < rightHalf.length) {
        sortedArr.push(...rightHalf.slice(j));
    }
    return sortedArr;
}


export function randomValueArrayGenerator(len) {
    if (len > 1000) {
        console.log(
            "Max permissible length:", 1000, "\nYou provided:", 
            len,"\nTherefore, the generated array contains only", 1000, "item:"
        );
        len = 1000;
    }
    const array = []
    while(array.length < len) {
        array.push(Math.floor(Math.random() * 10 + (array.length) - 10));
    }
    return array; 
}

export function sortedValueArrayGenerator(len) {
    if (len > 1000) {
        console.log(
            "Max permissible length:", 1000, "\nYou provided:", 
            len,"\nTherefore, the generated array contains only", 1000, "item:"
        );
        len = 1000;
    }
    const arr = [];
    while(arr.length < len) {
        arr.push(arr.length + 1);
    }
    return arr;
}