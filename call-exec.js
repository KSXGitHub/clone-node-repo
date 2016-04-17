
var childprc = require('child_process').spawn('node', ['--es-staging', `${__dirname}/exec.js`]);

childprc.on('exit', (code, signal) => {
	if (signal) {
		throw new Error(`Process terminated, signal: ${signal}`);
	}
	process.exit(code);
});

['stdout', 'stderr']
	.forEach((stream) => childprc[stream].on('data', (chunk) => process[stream].write(chunk)));
