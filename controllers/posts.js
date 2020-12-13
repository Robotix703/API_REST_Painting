const Post = require('./../models/post');

//Ecriture de post
exports.writePost = (req, res, next) => {
    //URL du serveur
    const url = req.protocol + '://' + req.get("host");

    //Construction du post
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId
    });

    //Sauvegarde dans la BDD
    post.save()
    .then(result => {
        //Renvoi d'une réponse
        res.status(201).json({id: result._id ,post});
    })
    .catch(error => {
        res.status(500).json({
            message: "La création à échoué"
        })
    });    
};

//Récupération des posts
exports.getPosts = (req, res, next) => {

    //Récupération des éléments de pagination
    const pageSize = parseInt(req.query.pageSize);
    const currentPage = parseInt(req.query.currentPage);

    const postQuery = Post.find();

    let fetchedPosts;

    //Vérifie la présence des éléments de pagination
    if(pageSize && currentPage)
    {
        //Ajout d'éléments dans la requête
        postQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }

    //Récupérations de données
    postQuery
    .then(documents => {
        fetchedPosts = documents;
        return Post.count();
    })
    .then(count => {
        //Réponse
        res.status(200).json({posts: fetchedPosts, maxPosts: count});
    })
    .catch(error => {
        res.status(500).json({
            message: "La récupération à échoué"
        })
    }); 
};

//Récupération d'un post
exports.getPost = (req, res, next) => {
    //Recherche d'un élément particulier
    Post.findById(req.params.id)
    .then(post => {
        if(post)
        {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "Mauvais ID"});
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "La récupération à échoué"
        })
    });  
};

//MAJ d'un post
exports.updatePost = (req, res, next) => {

    let imagePath = req.body.imagePath;
    //Vérification présence image
    if(req.file){
        //URL du serveur
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename
    }

    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    })

    //MAJ d'un élément avec Mangoose
    Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post)
    .then(result => {
        if(result.n > 0){
            res.status(200).json(post);
        }else{
            res.status(401).json({message: "Pas d'autorisation"});
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "La Mise à jour à échoué"
        })
    });
};

//Suppression d'un post
exports.deletePost = (req, res, next) => {
    
    //Demande à la BDD
    Post.deleteOne({_id: req.params.id, creator: req.userData.userId})
    .then((result) => {
        if(result.n > 0){
            res.status(200).json(result);
        }else{
            res.status(401).json(result);
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "La suppression à échoué"
        })
    });
};