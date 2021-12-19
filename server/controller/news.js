const News = require("../model/news");

exports.createNews = (req, res, next) => {
    const news = new News({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        author: req.userData.id
    });
    news.save()
        .then( result => {
            return res.status(201).json({
                message: "News created!",
                news: {
                    id: result._id,
                    title: result.title
                }
            });
        })
        .catch(error => {
            console.log(error.toString());
            return res.status(500).json({
                message: 'Error creating the news!',
                error: error
            });
        });
}

exports.getNews = (req, res, next) => {
    let query, order;
    if(req.query.hasOwnProperty('archived') && req.query.archived === 'true'){
        query = { "archiveDate": {$ne:null}};
        order = { "archiveDate": "desc"}
    } else {
        query = { "archiveDate": null };
        order = { "date": "desc"}
    };

    News
        .find(query)
        .sort(order)
        .then( result => {
            return res.status(200).json({
                message: "News got satisfactorily!",
                news: result
            });
        })
        .catch( error => {
            console.log(error);
            return res.status(500).json({
                message: 'Error getting News!',
                error: error
            });
        });
}

exports.archiveNews = (req, res, next) => {

    News.findOneAndUpdate(
            { "_id": req.params.id, "archiveDate": null},
            { "archiveDate": Date.now()})
        .then( result => {
            if(result){
                console.log(result);
                return res.status(200).json({
                    message: 'News archived successfully',
                    news: result
                });
            } else {
                return res.status(404).json({
                    message: 'News not found or already archived'
                })
            }
        })
        .catch( error => {
            console.log(error);
            return res.status(500).json({
                message: 'Error archiving the news',
                error: error
            });
        });
}

exports.deleteNews = (req, res, next) => {
    News.deleteOne({ "_id": req.params.id, "archiveDate": {$ne:null} })
        .then( result => {
            if(result.deletedCount){
                return res.status(200).json({
                    message: 'News deleted successfully',
                });
            } else {
                return res.status(404).json({
                    message: 'News not found or not archived'
                });
            }
        })
        .catch( error => {
            console.log(error);
            return res.status(500).json({
                message: 'Error deleting the news',
                error: error
            });
        });
}