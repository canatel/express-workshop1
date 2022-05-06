const UserModel = require('./model')
const { paginationParseParams, sortParseParams } = require('./../../../utils')

exports.all = async (req, res, next) => {
    const { query = {} } = req;
    const { limit, skip } = paginationParseParams(query);
    const { sortBy, direction } = sortParseParams(query);
    try {
        const [data = [], total = 0] = await Promise.all([
            UserModel.find({})
                .limit(limit)
                .skip(skip)
                .sort({
                    [sortBy]: direction,
                })
                .exec(),
            UserModel.countDocuments(),
        ]);

        // const data = await Model.find({}).limit(limit).skip(skip).exec();
        // const total = await Model.countDocuments();

        res.json({
            data,
            meta: {
                limit,
                skip,
                total,
                sortBy,
                direction,
            },
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
};

exports.create = async (req, res, next) => {
    const { body = {}, decoded = {} } = req;
    console.log(body)
    try {
        const userData = new UserModel(body)
        response = await userData.save()
        res.status(201);
        res.json({
            response
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
};

exports.read = async (req, res, next) => {
    try {
        const { params = {}, body = {} } = req;
        console.log(params.id ?? '')
        const response = await UserModel.findById(params.id ?? '').exec()
        if (response) {
            res.status(200);
            res.json({
                response: response
            });
        }
        else {
            next({
                statusCode: 404,
                message: 'Document not found',
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { body = {}, params = {} } = req;
        const { id } = params;
        const data = await UserModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.json({
            data,
        });
    } catch (error) {
        next(error)
    }
};

exports.delete = async (req, res, next) => {
    const { params = {} } = req;
    const { id } = params;

    try {
        const response = await UserModel.findByIdAndDelete(id);
        if (response) {
            res.status(200);
            res.json({
                response: response
            });
        }
        else {
            next({
                statusCode: 404,
                message: 'Document not found',
            });
        }
    } catch (error) {
        next(error);
    }
};
