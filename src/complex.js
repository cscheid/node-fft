//-------------------------------------------------
// Add two complex numbers
//-------------------------------------------------
export function add(a, b)
{
    return [a[0] + b[0], a[1] + b[1]];
}

//-------------------------------------------------
// Subtract two complex numbers
//-------------------------------------------------
export function subtract(a, b)
{
    return [a[0] - b[0], a[1] - b[1]];
}

//-------------------------------------------------
// Multiply two complex numbers
//
// (a + bi) * (c + di) = (ac - bd) + (ad + bc)i
//-------------------------------------------------
export function multiply(a, b) 
{
    return [(a[0] * b[0] - a[1] * b[1]), 
            (a[0] * b[1] + a[1] * b[0])];
}

export function multiplyVec(a, b)
{
    var result = [];
    for (var i=0; i<a.length; ++i) {
        result.push(multiply(a[i], b[i]));
    }
    return result;
}

//-------------------------------------------------
// Calculate |a + bi|
//
// sqrt(a*a + b*b)
//-------------------------------------------------
export function magnitude(c) 
{
    return Math.sqrt(c[0]*c[0] + c[1]*c[1]); 
}
