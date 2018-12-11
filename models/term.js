var db = require('../db/config');
var term = {};

term.getAll = function(req, res, next){
    db.manyOrNone("SELECT * FROM terms;")
    .then(function(result){
        res.locals.terms = result;
        next();
    }).catch(function(err){
        console.log(err);
        next();
    });
}

term.find = function(req, res, next){
    var id = req.params.id;
    db.oneOrNone("SELECT * FROM terms WHERE id=$1;", [id])
    .then(function(result){
        res.locals.term = result;
        next();
    }).catch(function(err){
        console.log(err);
        next();
    })
}

term.create = function(req, res, next){
    var termData = {
        name: req.body.name,
        definition: req.body.definition
    }
    db.one("INSERT INTO terms(name, definition) VALUES($1, $2) RETURNING id;",
    [termData.name, termData.definition])
    .then(function(result){
        res.locals.term_id = result.id;
        next();
    }).catch(function(err){
        console.log(err);
        next();
    })
}

term.update = function(req, res, next){
    var termData = {
        name: req.body.name,
        definition: req.body.definition
    }
    db.one("UPDATE terms SET name= $1, definition= $2 WHERE id=$3 RETURNING id;",
    [termData.name, termData.definition,req.params.id])
    .then(function(result){
        res.locals.term_id = result.id;
        next();
    }).catch(function(err){
        console.log(err);
        next();
    })
}

term.delete = function(req, res, next){
    db.none("DELETE FROM terms WHERE id=$1;",[req.params.id])
    .then(function(){
        next();
    }).catch(function(err){
        console.log(err);
        next();
    });
}

module.exports = term;