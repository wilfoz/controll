const FindAll = (mongooseModel) => {
    return (req, res) => {

        const pageSize = +req.query.pagesize;
        const currentPage = +req.query.page;
        const modelQuery = mongooseModel.find();

        if (pageSize && currentPage) {
            modelQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
        }

        modelQuery
            .exec((err, model) => {
                if (!model) {
                    return res
                        .status(404)
                        .json({ "message": "leader not found" });
                } else if (err) {
                    return res
                        .status(404)
                        .json(err);
                } else {
                    return res
                        .status(200)
                        .json(model);
                }
            });
    }
}

const ReadOne = (mongooseModel) => {
    return (req, res) => {
        mongooseModel
            .findById(req.params.id)
            .exec((err, model) => {
                if (!model) {
                    return res
                        .status(404)
                        .json({ "message": `${model} not found` });
                } else if (err) {
                    return res
                        .status(404)
                        .json(err);
                } else {
                    return res
                        .status(200)
                        .json(model);
                }
            });
    };
}

const DeleteOne = (mongooseModel) => {
    return (req, res) => {
        const { id } = req.params;

        if (id) {
            mongooseModel
                .findByIdAndRemove(id)
                .exec((err, model) => {
                    if (err) {
                        return res
                            .status(404)
                            .json(err);
                    }
                    res
                        .status(204)
                        .json({
                            "message": `Delected ${model}`
                        })
                }
                );
        } else {
            res
                .status(404)
                .json({
                    "message": `No ${model}`
                });
        }
    }
}

module.exports = {
    FindAll,
    ReadOne,
    DeleteOne
};