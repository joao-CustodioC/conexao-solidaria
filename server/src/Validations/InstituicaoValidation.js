const yup = require("yup");

const instituicaoSchema = yup.object({
  body: yup.object({
    name: yup.string().required('O campo nome é obrigatório'),
    description: yup.string().required('O campo descricao éobrigatório')
  })
});


const instituicaoCreate = () => async (req, res, next) => {
  try {
    await instituicaoSchema.validate({
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

const instituicaoUpdate = () => async (req, res, next) => {
  try {
    await yup.object({
      body: yup.object({
        name: yup.string().required('O campo nome é obrigatório'),
        description: yup.string().required('O campo descricao éobrigatório')
      }),
      params: yup.object({
        id: yup.number().required(),
      }),
    }).validate({
        body: req.body,
        params: req.params,
      },
      {
        abortEarly: false
      })
    return next();

  } catch (err) {
    return res.status(500).json({
      type: err.name,
      message: err.message,
      errors: err?.errors
    });
  }
};

const instituicaoDelete = () => async (req, res, next) => {
  try {
    await yup.object({
      params: yup.object({
        id: yup.number().required(),
      }),
    }).validate({
        params: req.params,
      },
      {
        abortEarly: false
      })
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
  instituicaoUpdate,
  instituicaoCreate,
  instituicaoDelete,
};
