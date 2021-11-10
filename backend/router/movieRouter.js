const express = require("express");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../controllers/authControllers");
const {
  getOneMovie,
  getAllMovies,
  addNewMovie,
  getMovie,
  deleteMovie,
  updateMovie,
  getRandomMovie,
  getRandomRelatedMovie,
} = require("../controllers/movieControllers");
const router = express.Router();

//Add Movie
router.post(
  "/movie/add",
  isAuthenticated,
  authorizeRoles("admin"),
  addNewMovie
);

router
  .route("/movie/:id")
  .get(getMovie)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteMovie)
  .put(isAuthenticated, authorizeRoles("admin"), updateMovie);

//Get Random Movie
router.route("/random").get(getRandomMovie);
router.get("/related", getRandomRelatedMovie);

// //Get All Movies
// router.get('/movies/:userId', isLogin, isAuthenticated, isAdmin, getAllMovies)

router.route("/movies").get(getAllMovies);

module.exports = router;
