const Drawer = require('./../models/drawer');

exports.writeDrawer = (req, res, next) => {

    const drawer = new Drawer({
        name: req.body.name,
        type: req.body.type
    });

    drawer.save()
        .then(result => {
            res.status(201).json({ id: result._id, drawer });
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        });
}

exports.getDrawerByType = (req, res, next) => {

    const typeName = req.query.type;

    var drawerQuery;
    if (typeName != "") {
        drawerQuery = Drawer.find({ 'type': typeName });
    } else {
        drawerQuery = Drawer.find();
    }

    let fetchedDrawers;

    drawerQuery
        .then(documents => {
            fetchedDrawers = [...documents];
            return documents.length;
        })
        .then(count => {
            res.status(200).json({ Colors: fetchedDrawers, maxColors: count });
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        });
};

exports.getDrawerByName = (req, res, next) => {

    const name = req.query.nom;

    var drawerQuery = Drawer.find({ 'name': { "$regex": name, "$options": "i" } });

    let fetchedDrawers;

    drawerQuery
        .then(documents => {
            fetchedDrawers = [...documents];
            return documents.length;
        })
        .then(count => {
            res.status(200).json({ Colors: fetchedDrawers, maxDrawer: count });
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        });
};

exports.getDrawers = (req, res, next) => {

    let fetchedDrawers;

    const drawerQuery = Drawer.find();

    drawerQuery
        .then(documents => {
            fetchedDrawers = [...documents];
            return documents.length;
        })
        .then(count => {
            res.status(200).json({ Drawers: fetchedDrawers, maxDrawers: count });
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        });
};

exports.deleteDrawer = (req, res, next) => {

    Drawer.deleteOne({ _id: req.params.id })
        .then((result) => {
            if (result.n > 0) {
                res.status(200).json(result);
            } else {
                res.status(401).json(result);
            }
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        });
};
