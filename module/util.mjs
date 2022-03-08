export const clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max);
};

export const constrain = (num, low, high) => {
    return Math.max(Math.min(num, high), low);
};

export const randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
};

export const randomRangeInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

export const map = (n, start1, stop1, start2, stop2, bounds) => {
    const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if(!bounds) {
        return newval;
    }

    if(start2 < stop2) {
        return constrain(newval, start2, stop2);
    } else {
        return constrain(newval, stop2, start2);
    }
}