const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'videoList.json'
);
//class videoList, dung fs de doc thong tin tu data file

module.exports = class videoList {
  
  all() {
		return JSON.parse(fs.readFileSync(p, 'utf8'));
	}
  static getAll(){
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  }
};