//-------------------------------------------------
// Add two complex numbers
//-------------------------------------------------
function add(a, b)
{
    return [a[0] + b[0], a[1] + b[1]];
}

//-------------------------------------------------
// Subtract two complex numbers
//-------------------------------------------------
function subtract(a, b)
{
    return [a[0] - b[0], a[1] - b[1]];
}

//-------------------------------------------------
// Multiply two complex numbers
//
// (a + bi) * (c + di) = (ac - bd) + (ad + bc)i
//-------------------------------------------------
function multiply(a, b) 
{
    return [(a[0] * b[0] - a[1] * b[1]), 
            (a[0] * b[1] + a[1] * b[0])];
}

//-------------------------------------------------
// Calculate |a + bi|
//
// sqrt(a*a + b*b)
//-------------------------------------------------

/*===========================================================================*\
 * Fast Fourier Transform Frequency/Magnitude passes
 *
 * (c) Vail Systems. Joshua Jung and Ben Bryan. 2015
 *
 * This code is not designed to be highly optimized but as an educational
 * tool to understand the Fast Fourier Transform.
\*===========================================================================*/

//-------------------------------------------------
// The following code assumes a complex number is
// an array: [real, imaginary]
//-------------------------------------------------

var mapExponent = {};
//-------------------------------------------------
// By Eulers Formula:
//
// e^(i*x) = cos(x) + i*sin(x)
//
// and in DFT:
//
// x = -2*PI*(k/N)
//-------------------------------------------------
function exponent(k, N) {
    var x = -2 * Math.PI * (k / N);
    
    mapExponent[N] = mapExponent[N] || {};
    mapExponent[N][k] = mapExponent[N][k] || [Math.cos(x), Math.sin(x)];// [Real, Imaginary]
    
    return mapExponent[N][k];
}

//-------------------------------------------------
// Calculate FFT Magnitude for complex numbers.
//-------------------------------------------------


//-------------------------------------------------
// Calculate Frequency Bins
// 
// Returns an array of the frequencies (in hertz) of
// each FFT bin provided, assuming the sampleRate is
// samples taken per second.
//-------------------------------------------------

/*===========================================================================*\
 * Fast Fourier Transform (Cooley-Tukey Method)
 *
 * (c) Vail Systems. Joshua Jung and Ben Bryan. 2015
 *
 * This code is not designed to be highly optimized but as an educational
 * tool to understand the Fast Fourier Transform.
\*===========================================================================*/

//------------------------------------------------
// Note: Some of this code is not optimized and is
// primarily designed as an educational and testing
// tool.
// To get high performace would require transforming
// the recursive calls into a loop and then loop
// unrolling. All of this is best accomplished
// in C or assembly.
//-------------------------------------------------

//-------------------------------------------------
// The following code assumes a complex number is
// an array: [real, imaginary]
//-------------------------------------------------

//-------------------------------------------------
// Calculate FFT for vector where vector.length
// is assumed to be a power of 2.
//-------------------------------------------------

function fft(vector) {
    var X = [],
        N = vector.length;

    // Base case is X = x + 0i since our input is assumed to be real only.
    if (N == 1) {
        if (Array.isArray(vector[0])) //If input vector contains complex numbers
            return [[vector[0][0], vector[0][1]]];      
        else
            return [[vector[0], 0]];
    }

    // Recurse: all even samples
    var X_evens = fft(vector.filter(even)),

        // Recurse: all odd samples
        X_odds  = fft(vector.filter(odd));

    // Now, perform N/2 operations!
    for (var k = 0; k < N / 2; k++) {
        // t is a complex number!
        var t = X_evens[k],
            e = multiply(exponent(k, N), X_odds[k]);

        X[k] = add(t, e);
        X[k + (N / 2)] = subtract(t, e);
    }

    function even(__, ix) {
        return ix % 2 == 0;
    }

    function odd(__, ix) {
        return ix % 2 == 1;
    }

    return X;
}

/*===========================================================================*\
 * Inverse Fast Fourier Transform (Cooley-Tukey Method)
 *
 * (c) Maximilian Bügler. 2016
 *
 * Based on and using the code by
 * (c) Vail Systems. Joshua Jung and Ben Bryan. 2015
 *
 * This code is not designed to be highly optimized but as an educational
 * tool to understand the Fast Fourier Transform.
\*===========================================================================*/

//------------------------------------------------
// Note: Some of this code is not optimized and is
// primarily designed as an educational and testing
// tool.
// To get high performace would require transforming
// the recursive calls into a loop and then loop
// unrolling. All of this is best accomplished
// in C or assembly.
//-------------------------------------------------

//-------------------------------------------------
// The following code assumes a complex number is
// an array: [real, imaginary]
//-------------------------------------------------

function ifft(signal){
    //Interchange real and imaginary parts
    var csignal=[];
    for(var i=0; i<signal.length; i++){
        csignal[i]=[signal[i][1], signal[i][0]];
    }
    
    //Apply fft
    var ps=fft(csignal);
    
    //Interchange real and imaginary parts and normalize
    var res=[];
    for(var j=0; j<ps.length; j++){
        res[j]=[ps[j][1]/ps.length, ps[j][0]/ps.length];
    }
    return res;
}

export { fft, ifft };
