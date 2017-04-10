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

import {multiply, add, subtract} from "./complex";
import {exponent} from "./fftutil";

export function fft(vector) {
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
