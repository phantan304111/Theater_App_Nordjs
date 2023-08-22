const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'movieList.json'
);
//class movie, dung fs de doc thong tin tu data file
module.exports = class Movies {
  all() {
		return JSON.parse(fs.readFileSync(p, 'utf8'));
	}
  
  static fetchAll(cb) {
    getMoviesFromFile(cb);
  }

  static findById(id, cb) {
    getMoviesFromFile(Movies => {
      const Movie = Movies.find(p => p.id === id);
      cb(Movie);
    });
  }
  static getAll(){
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  }

// 
};