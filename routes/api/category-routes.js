//const router = require('express').Router();
//const { Model } = require('sequelize/types');
//const { Category, Product } = require('../../models');
const router = require('express').Router();
const { Category, Product } = require('../../models');
const sequelize = require('../../config/connection');

// The `/api/categories` endpoint
//GET all categories
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['id','category_name'],
    include: [
      {
        model: Product,
        attributes: ['product_name'] 
      }
    ]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

//GET one category
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    attributes: ['id','category_name'],
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['product_name'] 
      }
    ]
  }).then(dbCategoryData => {
    if(!dbCategoryData){
      res.status(404).json({message: 'No category found with this id'});
      return;
    }
    res.json(dbCategoryData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//POST create category
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name:req.body.category_name,
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//PUT update category
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
        if(!dbCategoryData) {
          res.status(404).json({message: 'No category found with this id' });
          return;
        }
        res.json(dbCategoryData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//DELETE category
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if(!dbCategoryData) {
        res.status(404).json({message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
