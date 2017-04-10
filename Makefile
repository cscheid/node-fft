all:
	rollup index.js --format iife --config rollup-config.js --output build/fft-iife.js
	rollup index.js --format es                             --output build/fft-es.js
