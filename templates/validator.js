import Joi from "joi";
export const validate{modelName} = (req, res, next) => {
  const data = {dataFields};

  const schema = Joi.object({schemaFields});

  const { error } = schema.validate(data);

  if (error) {
    return res.status(422).json({ message: error.message, data: req.body });
  }
  next();
};
