const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'userToken.json'
);
//class User, dung fs de doc thong tin tu data file

module.exports = class User {
  
  all() {
		return JSON.parse(fs.readFileSync(p, 'utf8'));
	}
  static getAll(){
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  }
};