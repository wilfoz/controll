const IfModelNull = (err, res, model) => {
    if (!model) {
        return res
            .status(404)
            .json({
                "message": "Not found, id is required"
            });
    } else if (err) {
        return res
            .status(400)
            .json(err);
    }
}

const IfError = (err, res, model) => {
    if (err) {
        res
            .status(404)
            .json(err);
    } else {
        res
            .status(200)
            .json(model);
    }
}

module.exports = {
    IfModelNull,
    IfError
};