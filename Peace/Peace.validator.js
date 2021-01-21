import Joi from "joi";
export const validatePeace = (req, res, next) => {
  const data = {
	AString : req.body.AString,
	ANumber : req.body.ANumber
};

  const schema = Joi.object({
	AString : Joi.string().required(),
	ANumber : Joi.number()
});

  const { error } = schema.validate(data);

  if (error) {
    return res.status(422).json({ message: error.message, data: req.body });
  }
  next();
};
