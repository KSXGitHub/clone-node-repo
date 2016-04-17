#! /usr/bin/env node --es-staging

((module) => {
	'use strict';
	
	require('.')(process.argv[2], {
		onallclean() {
			console.log('Cleanning completed.');
		},
		oneachclean(detail) {
			console.log('Clean', detail);
		},
		onclonebegin(childprc) {
			['stdout', 'stderr']
				.forEach((stream) => childprc[stream].on('data', (chunk) => process[stream].write(chunk)));
		},
		oncloneend() {
			console.log('Cloning completed.');
		}
	});

})();
