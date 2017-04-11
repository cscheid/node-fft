import { fft } from "./fft";
import { multiplyVec } from "./complex";

export function gaussianKernel(N, sigma2) {
    function gaussian(mu, sigma2, x) {
        var d = mu - x;
        return Math.exp(- (d * d) / sigma2) / Math.sqrt(Math.PI * 2 * sigma2);
    }
    
    var result = [], i;
    for (i=0; i<N; ++i) {
        result.push(gaussian(0, sigma2, Math.abs(N/2-i-1)));
    }
    var s=0;
    for (i=0; i<N; ++i) {
        s += result[i];
    }
    for (i=0; i<N; ++i) {
        result[i] /= s;
    }
    
    return result;
}

function pad(v, n) {
    v = v.slice();
    for (var i=0; i<n; ++i)
        v.push(0);
    return v;
}

function transpose(a) {
    var result = [], i, j;
    for (i=0; i<a[0].length; ++i) {
        result.push([]);
    }
    for (i=0; i<a.length; ++i) {
        for (j=0; j<a[0].length; ++j) {
            result[j].push(a[i][j]);
        }
    }
    return result;
}

export function convolve(data, kernel) {
    var n = data.length;
    data   = pad(data.slice().reverse(), n);
    kernel = pad(kernel, n);
    var f2 = fft(data);
    var f1 = fft(kernel);
    var m = transpose(fft(multiplyVec(f1, f2)))[0]
            .map(function(d) { return d * Math.sqrt(data.length); });
    return m;
}

export function gaussianBlur(data, sigma2) {
    var n = data.length;
    if (n & (n-1)) {
        throw new Error("data must be power of 2");
    }
    var kernel = gaussianKernel(n, sigma2);
    var result = convolve(data, kernel);
    return result.slice(data.length/2+2, data.length/2+data.length+2);
}
