const mongoose = require('mongoose');
const TasksModel = require('./model')
const { paginationParseParams, sortParseParams } = require('./../../../utils')
const { Schema } = mongoose

exports.all = async (req, res, next) => {
  const { query = {} } = req;
  const { limit, skip } = paginationParseParams(query);
  const { sortBy, direction } = sortParseParams(query);
  const populate = [
    ...Object.getOwnPropertyNames({
      author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    })
  ].join(' ');

  try {
    const [data = [], total = 0] = await Promise.all([
      TasksModel.find({})
        .limit(limit)
        .skip(skip)
        .sort({
          [sortBy]: direction,
        })
        .populate(populate)
        .exec(),
      TasksModel.countDocuments(),
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
    next(error);
  }
};

exports.id = async (req, res, next) => {
  const { params = {} } = req;
  const { id = '' } = params;

  try {
    const data = await TasksModel.findById(id)
      .populate([
        ...Object.getOwnPropertyNames({
          author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
          }
        })
      ].join(' '))
      .exec();

    if (data) {
      req.doc = data;
      next();
    } else {
      next({
        statusCode: 404,
        message: 'Document not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { body = {}, decoded = {} } = req;
    const { id } = decoded;
    const taskData = new TasksModel({
      ...body,
      author: id
    })
    response = await taskData.save()
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
    const response = await TasksModel.findById(params.id ?? '').exec()
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
    const data = await TasksModel.findByIdAndUpdate(id, body, {
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
    const response = await TasksModel.findByIdAndDelete(id);
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
