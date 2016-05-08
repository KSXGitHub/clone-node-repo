
'use strict';

var spawn = require('child_process').spawn;
var rm = require('fs-force/delete');

var create = Object.create;

const REPO_DIR = 'C:/programming/javascript/npm-packages';
const DONOTHING = () => {};
const THROWERR = (error) => {throw error};

var _getfunc = (fn, ...fnlist) =>
	typeof fn === 'function' ? fn : _getfunc(...fnlist);

var _getdesc = (desc) => {
	var result = create(null);
	var mkfunc = (fname, df) => result[fname] = _getfunc(desc[fname], df);
	['onallclean', 'oneachclean', 'onclonebegin', 'oncloneend'].forEach((fname) => mkfunc(fname, DONOTHING));
	mkfunc('onerror', THROWERR);
	return result;
};

var clone = (rname, desc) => {
	var target = `${REPO_DIR}/${rname}`;
	var onallclean = desc.onallclean;
	var oneachclean = desc.oneachclean;
	var onclonebegin = desc.onclonebegin;
	var oncloneend = desc.oncloneend;
	var onerror = desc.onerror;
	rm(target, rmcallback, oneachclean);
	function rmcallback(error, info) {
		if (error) {
			return onerror(error);
		}
		onallclean(info);
		var childprc = spawn('git', ['clone', `https://github.com/ksxnodemodules/${rname}.git`, target]);
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

module.exports = (rname, desc) => clone(rname, _getdesc(desc));
