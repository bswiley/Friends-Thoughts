const router = require('express').Router();
const { createThought, deleteThought, updateThought, getAllThoughts, getThoughtById } = require ('../../controllers/thoughtsController');


router.route('/')
  .get(getAllThoughts)
  .post(createThought);

router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);


  module.exports = router;