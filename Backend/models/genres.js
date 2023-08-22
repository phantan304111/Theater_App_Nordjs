const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'genreList.json'
);
//class Genre, dung fs de doc thong tin tu data file

module.exports = class Genre {
  
  all() {
		return JSON.parse(fs.readFileSync(p, 'utf8'));
	}
  static getAll(){
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  }
};