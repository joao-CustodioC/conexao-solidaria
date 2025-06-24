const yup = require("yup");

// Schema para criação de usuário
const userCreateSchema = yup.object({
  body: yup.object({
    name: yup.string().required('O campo nome é obrigatório'),
    email: yup.string().email("Insira um email válido").required('O campo email é obrigatório'),
    password: yup
        .string()
        .required('O campo senha é obrigatório')
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
        .matches(/[^A-Za-z0-9]/, 'A senha deve conter pelo menos um caractere especial'),
  }),
});

const userCreate = () => async (req, res, next) => {
  try {
    await userCreateSchema.validate(
        { body: req.body },
        { abortEarly: false }
    );
    return next();
  } catch (err) {
    return res.status(400).json({
      type: err.name,
      message: err.message,
      errors: err.errors,
    });
  }
};

const userUpdate = () => async (req, res, next) => {
  try {
    await yup
        .object({
          body: yup.object({
            name: yup.string().required('O campo nome é obrigatório'),
            email: yup
                .string()
                .email("Insira um email válido")
                .required('O campo email é obrigatório'),
            password: yup
                .string()
                .required('O campo senha é obrigatório')
                .min(8, 'A senha deve ter no mínimo 8 caracteres')
                .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
                .matches(/[^A-Za-z0-9]/, 'A senha deve conter pelo menos um caractere especial'),
          }),
          params: yup.object({
            id: yup.number().required(),
          }),
        })
        .validate(
            { body: req.body, params: req.params },
            { abortEarly: false }
        );
    return next();
  } catch (err) {
    return res.status(400).json({
      type: err.name,
      message: err.message,
      errors: err.errors,
    });
  }
};

const userDelete = () => async (req, res, next) => {
  try {
    await yup
        .object({
          params: yup.object({
            id: yup.number().required(),
          }),
        })
        .validate({ params: req.params }, { abortEarly: false });
    return next();
  } catch (err) {
    return res.status(400).json({
      type: err.name,
      message: err.message,
      errors: err.errors,
    });
  }
};

module.exports = {
  userCreate,
  userUpdate,
  userDelete,
};
