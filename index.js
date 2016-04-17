
'use strict';

var spawn = require('child_process').spawn;
var rm = require('fs-force/delete');

const REPO_DIR = 'D:\\JS_FILES\\NodeJS\\node_modules';

var _getfunc = (fn, ...fnlist) =>
	typeof fn === 'function' ? fn : _getfunc(...fnlist);

var clone = (rname, desc) => {
	var target = `${REPO_DIR}\\rname`;
	var onallclean = desc.onallclean;
	var oneacgclean = desc.oneachclean;
	var onclonebegin = desc.onclonebegin;
	var oncloneend = desc.oncloneend;
	var onerror = desc.onerror;
	rm(target, rmcallback, oneachclean);
	function rmcallback(error, info) {
		if (error) {
			return onerror(error);
		}
		var childprc = spawn(`git clone https://github.com/ksxnodemodules/${rname}.git ${target}`);
		onclonebegin(childprc);
		childprc.on('exit', (code, signal) => {
			if (signal) {
				return onerror({'signal': signal});
			}
			if (code) {
				return onerror({'code': code});
			}
			oncloneend({
				'cleaninfo': info,
				'cloneprc': childprc
			});
		});
	}
};
