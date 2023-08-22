const Genre = require('../models/genres');
const Movie = require('../models/movies');
const Video = require('../models/videos')
const PageLimit = 20;
////////////
//controller xu li cac yeu cau front end gui den thong quan cac router
////xuat danh sach phim, theo thu tu tu popularity cao den thap
exports.getTrending = (req , res , next)=>{


  const sortedPopularity = Movie.getAll();// lay het thong tin movie tu data
  sortedPopularity.sort((a, b) => {///ham xep danh sach theo huong popularity cao den thap
         return b.popularity - a.popularity;
    });
  ////paging
  const page = req.query.page || 1;
  const startIndex = (page - 1) * PageLimit;
  const endIndex = page * PageLimit;
  const results = sortedPopularity.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sortedPopularity.length / PageLimit);
  ///gui responde ve frontend
  res.status(200).send({
    page: page,
    results: results,
    total_pages:totalPages,
    total_results:sortedPopularity.length
  });

}

////xuat danh sach phim, theo thu tu rating cao den thap
exports.getRating = (req , res , next)=>{

  const sortedRating = Movie.getAll();// lay het thong tin movie tu data
  sortedRating.sort((a, b) => {///ham xep danh sach theo huong vote_average cao den thap
    
        return b.vote_average - a.vote_average;
        
    });
    // const Pages = sortedRating.length / PageLimit +1;
  ////paging
  const page = req.query.page || 1;// tra ve page dau tien neu khong co pag query trong params
  const startIndex = (page - 1) * PageLimit;
  const endIndex = page * PageLimit;
  const results = sortedRating.slice(startIndex, endIndex);// tra ve list result theo page hien tai
  const totalPages = Math.ceil(sortedRating.length / PageLimit);//tinh so page

  // const data = JSON.stringify(sortedRating);
  res.status(200).send({
    page: page,
    results: results,
    total_pages:totalPages,
    total_results:sortedRating.length
  });
}
////tim danh sach phim theo the loai(name), nhan tham so la phan with_genres nguoi dung dat tren params
exports.getDiscoverByName = (req , res , next)=>{
  if (!req.query.hasOwnProperty('with_genres')) {//kiem tra co phan querywith_genres khong
    return res.status(400).json({ message: 'Not found gerne parram' });/// tra neu khong thay with_genres
  }
  const genresName = req.query.with_genres;
  const genresId = Genre.getAll().filter(genre => genre.name===genresName);//tim id theo genre name tuong ung
  //neu co id do
  if(genresId.length){
  const sortedDiscover = Movie.getAll().filter(movie => movie.genre_ids.includes(parseInt(genresId[0].id)));//tra ve cac bo phim co id tuong ung
  const page = req.query.page || 1;//paging
  const startIndex = (page - 1) * PageLimit;
  const endIndex = page * PageLimit;
  const results = sortedDiscover.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedDiscover.length / PageLimit);
  //gui ve responde cac movie tim duoc theo the loai do
  res.status(200).send({
    page: page,
    results: results,
    total_pages:totalPages,
    total_results:sortedDiscover.length
  });
  }
  else
  {
    return res.status(400).json({ message: 'Not found that gerne id' });///kiem tra neu khong thay genre
  }
}
////tim danh sach phim theo the loai (id), nhan tham so la phan with_genres nguoi dung dat tren params
exports.getDiscover = (req , res , next)=>{
  if (!req.query.hasOwnProperty('with_genres')) {
    return res.status(400).json({ message: 'Not found gerne parram' });///kiem tra neu khong thay params
  }
  //tra ve cac bo phim co id tuong ung
  const genresID = parseInt(req.query.with_genres);
  const genres = Genre.getAll().filter(genre => genre.id===genresID);
  if(!genres.length)
  {

    return res.status(400).json({ message: 'Not found that gerne parram' });///kiem tra neu khong thay genre
  }
  //tra ve danh sach phim co id tuong ung
  const sortedDiscover = Movie.getAll().filter(movie => movie.genre_ids.includes(genresID));
  const page = req.query.page || 1;
  const startIndex = (page - 1) * PageLimit;
  const endIndex = page * PageLimit;
  const results = sortedDiscover.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedDiscover.length / PageLimit);
  //gui ve responde cac movie tim duoc theo the loai do

  res.status(200).send({
    page: page,
    results: results,
    total_pages:totalPages,
    total_results:sortedDiscover.length
  });
}
//// tim trailer bo phim theo id bo phim do
exports.getTrailer = (req , res , next)=>{
  const id = req.body.film_id;
  
  //kiem tra id phim truyen vao co ton tai
  if (!id) {
    return res.status(400).json({ message: 'Not found film id parram' });///tra ve neu khong thay film_id trong request
  }
  // //tim cac video co lien quan den phim co id do
  const videos = Video.getAll().find(videoL=>videoL.id === id);
  // tra ve neu khong thay trailer hay teaser nao trong video list cua phim
  if (!videos || !videos.videos) {
    return res.status(404).json({ message: 'Not found video, there is no trailer or teaser for this movie' });
  }
  // tim trailer thoa cac tieu chi, neu khong thay trailer thi dang teaser
  let videoList = videos.videos;
  let videoPrio = videoList.filter(video => video.official&&video.site=='YouTube'&&video.type=="Trailer"); 
  if(!videoPrio.length)
  videoPrio = videoList.filter(video => video.official&&video.site=='YouTube'&&video.type=="Teaser");
  if(!videoPrio.length)
  {
      res.status(404).json({ message: 'Not found video' });//tra ve ma loi message khong thay video
     
  }

  //sort lai cac video tim thay de xem cai nao ra gan day nhat
  else{

    videoPrio.sort((a,b)=>{
      return Date.parse(b.published_at) - Date.parse(a.published_at);
  })
    let chosenvideo = [];
    chosenvideo.push(videoPrio[0]);
    //tra ve responde voi video duoc chon, chi tra ve trailer tease voi 1 video duy nhat
    res.status(200).send({
      page: 1,
      id:id,
      results:chosenvideo,
      total_pages:1,
      total_results:1
    });
  }

  
}

//tim phim voi nut search
exports.getSearch = (req , res , next)=>{
  
// console.log(req.body.keywords);
  if(!!req.body.keywords){
  const keywords =req.body.keywords.toLowerCase();
  //tim phim theo overview va title xem co chua phan keywords do khong
  const movieList = Movie.getAll().filter(movie => {
    
    const overview = movie.overview ? movie.overview.toLowerCase() : '';
    const title = movie.title ? movie.title.toLowerCase() : '';
    return overview.includes(keywords) || title.includes(keywords);
  });
  //paging
  const page = req.query.page || 1;
  const startIndex = (page - 1) * PageLimit;
  const endIndex = page * PageLimit;
  const results = movieList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(movieList.length / PageLimit);
  //tra ve responde la cac phim tim duoc
  res.status(200).send({
    page: page,
    results: results,
    total_pages:totalPages,
    total_results:movieList.length
  });
  }
  else  
  {
    res.status(404).json({ message: 'Not found keyword parram' });//tra ve ma loi request body khong co keyworks
  }
  
}