import Ajv from "ajv";

const validation = (schema) => async (req, res, next) => {
  try {
    const { body } = req;

    const ajv = new Ajv({ allErrors: true, strictTuples: false });
    const validate = ajv.compile(schema);

    const isValid = validate(body);

    if (!isValid)
      return res
        .status(422)
        .json({ error: true, message: "Not correct data." });

    await next();
  } catch (error) {
    throw error;
  }
};

export default validation;
