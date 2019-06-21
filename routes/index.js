var routerIndex        = require('express').Router();
var routerGroup        = require('express').Router();
var photoController    = require('../controllers/photo');
var categoryController = require('../controllers/category');
var tagController      = require('../controllers/tag');

/*
 * api/photos
 */
routerGroup.get('/', photoController.index);

routerGroup.get('/photos', photoController.view);

routerGroup.post('/photos', photoController.new);

routerGroup.get('/photos/:id', photoController.details);

routerGroup.put('/photos/:id', photoController.update);

routerGroup.delete('/photos/:id', photoController.delete);

/*
 * api/categorys
 */
routerGroup.get('/categorys', categoryController.view);

routerGroup.post('/categorys', categoryController.new);

routerGroup.get('/categorys/:id', categoryController.details);

routerGroup.put('/categorys/:id', categoryController.update);

routerGroup.delete('/categorys/:id', categoryController.delete);

/*
 * api/tags
 */
routerGroup.get('/tags', tagController.view);

routerGroup.post('/tags', tagController.new);

routerGroup.get('/tags/:id', tagController.details);

routerGroup.put('/tags/:id', tagController.update);

routerGroup.delete('/tags/:id', tagController.delete);

/*
 * Entry point
 */
routerIndex.use('/api', routerGroup);

module.exports = routerIndex;