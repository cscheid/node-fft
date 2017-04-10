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

import { magnitude } from "./complex";

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
export function exponent(k, N) {
    var x = -2 * Math.PI * (k / N);
    
    mapExponent[N] = mapExponent[N] || {};
    mapExponent[N][k] = mapExponent[N][k] || [Math.cos(x), Math.sin(x)];// [Real, Imaginary]
    
    return mapExponent[N][k];
}

//-------------------------------------------------
// Calculate FFT Magnitude for complex numbers.
//-------------------------------------------------
export function fftMag(fftBins) {
    var ret = fftBins.map(complex.magnitude);
    return ret.slice(0, ret.length / 2);
};

//-------------------------------------------------
// Calculate Frequency Bins
// 
// Returns an array of the frequencies (in hertz) of
// each FFT bin provided, assuming the sampleRate is
// samples taken per second.
//-------------------------------------------------
export function fftFreq(fftBins, sampleRate) {
    var stepFreq = sampleRate / (fftBins.length);
    var ret = fftBins.slice(0, fftBins.length / 2);

    return ret.map(function (__, ix) {
        return ix * stepFreq;
    });
};
