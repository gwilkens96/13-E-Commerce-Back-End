const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [Product]
    }
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findOne(req.params.id, {
      include: [Product]
      
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
      const categoryData = await Category.create(req.body);
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.params.id)
    res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy(req.params.id)
    res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
});

module.exports = router;
