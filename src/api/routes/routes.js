module.exports = app => {
    const router = require('express').Router();
    const postController = require('../controllers/post.controller');
    const tacheController = require('../controllers/tache.controller');
    const projetController = require('../controllers/projet.controller');
    const userController = require('../controllers/userController');

    // Routes pour les posts
    router.post('/posts', postController.create);
    router.get('/posts', postController.findAll);
    router.get('/posts/:id', postController.findOne);
    router.delete('/posts/:id', postController.delete);
    router.put('/posts/:id', postController.update);

    // Routes pour les tâches
    router.post('/taches', tacheController.create);
    router.get('/taches', tacheController.findAll);
    router.get('/taches/:id', tacheController.findOne);
    router.delete('/taches/:id', tacheController.delete);
    router.put('/taches/:id', tacheController.update);

    //routes pour les projets
    router.post('/projets', projetController.create);
    router.get('/projets', projetController.findAll);
    router.get('/projets/:id', projetController.findOne);
    router.put('/projets/:id', projetController.update);
    router.delete('/projets/:id', projetController.delete);

    //routes pour l'authentification
    router.post('/register', userController.registerUser);
    router.post('/login', userController.loginUser);


    app.use('/api', router);
}
