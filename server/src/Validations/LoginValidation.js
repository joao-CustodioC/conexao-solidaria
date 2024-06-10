const yup = require("yup");

const loginValidate = yup.object({
  body: yup.object({
    email: yup.string().email("Insira um email válido").required('O campo email é obrigatório'),
    password: yup.string().required('O campo senha é obrigatório')
  }),
});


const userCreate = () => async (req, res, next) => {
  try {
    await loginValidate.validate({
      body: req.body,
    }, {
      abortEarly: false
    });
    return next();
  } catch (err) {
    return res.status(500).json({
      type: err.name,
      message: err.message,
      errors: err?.errors
    });
  }
};

module.exports = {
  userCreate,
};
