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
 * api/photos/categorys
 */
routerGroup.get('/photos/categorys', categoryController.view);

routerGroup.post('/photos/categorys', categoryController.new);

routerGroup.get('/photos/categorys/:id', categoryController.details);

routerGroup.put('/photos/categorys/:id', categoryController.update);

routerGroup.delete('/photos/categorys/:id', categoryController.delete);

/*
 * api/photos/tags
 */
routerGroup.get('/photos/tags', tagController.view);

routerGroup.post('/photos/tags', tagController.new);

routerGroup.get('/photos/tags/:id', tagController.details);

routerGroup.put('/photos/tags/:id', tagController.update);

routerGroup.delete('/photos/tags/:id', tagController.delete);

/*
 * Entry poind
 */
routerIndex.use('/api', routerGroup);

module.exports = routerIndex;