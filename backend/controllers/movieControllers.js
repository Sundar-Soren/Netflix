const ApiHelper = require("../helper/ApiHelper");
const Movie = require("../model/movieModel");

// exports.addNewMovie = async (req, res) => {
//   const newMovie = new Movie(req.body);
//   try {
//     const savedMovie = await newMovie.save();
//     res.json(savedMovie);
//   } catch (error) {
//     res.status(401).json({
//       error: "Faied To add New Movie",
//     });
//   }
// };

exports.getOneMovie = (req, res) => {
  Movie.findById(req.params.id).exec((err, movie) => {
    if (err) {
      return res.status(401).json({
        error: "Faied to Get the Movie",
      });
    }
    res.status(200).json({
      success: true,
      movie,
    });
  });
};

//GET ALL MOVIES
exports.getAllMovies = async (req, res) => {
  try {
    const apiHelper = new ApiHelper(Movie.find(), req.query).search();
    //     .filter();

    const movies = await apiHelper.query;
    //   let filterProductCount = products.length;
    res.status(200).json({
      success: true,
      movies,
      //   filterProductCount,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed To Get All The Products",
    });
  }
};

exports.addNewMovie = async (req, res) => {
  const newMovie = new Movie(req.body);
  try {
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (error) {
    res.status(401).json({
      error: "Faied To add New Movie",
    });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.json(updatedMovie);
  } catch (error) {
    res.status(401).json({
      error: "Faied To update the Movie",
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({
      message: "Movie has deleted successfully",
    });
  } catch (error) {
    res.status(401).json({
      error: "Faied To Delete this Movie",
    });
  }
};
exports.getMovie = async (req, res) => {
  console.log(req.params);
  try {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      error: "Faied To Get the Movie",
    });
  }
};

//Get Random MOVIE || SERIES

exports.getRandomMovie = async (req, res) => {
  console.log("Hey I worked");
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.json(movie);
  } catch (error) {
    res.status(401).json({
      error: "Unable to Get the random MOVIE or SERIES",
    });
  }
};

//Related Movie Suggestion
exports.getRandomRelatedMovie = async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 8 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 8 } },
      ]);
    }
    res.json(movie);
  } catch (error) {
    res.status(401).json({
      error: "Unable to Get the random MOVIE or SERIES",
    });
  }
};
