#!/usr/bin/env node

((module) => {
	'use strict';
	
	require('.')(process.env.CLONED_NODE_REPO, {
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
