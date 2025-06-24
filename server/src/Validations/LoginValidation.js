const yup = require("yup");

const loginValidate = yup.object({
  body: yup.object({
    email: yup.string().email("Insira um email válido").required("O campo email é obrigatório"),
    password: yup
        .string()
        .required("O campo senha é obrigatório")
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .matches(/[0-9]/, "A senha deve conter pelo menos um número")
        .matches(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial"),
  }),
});


const login = () => async (req, res, next) => {
  try {
    await loginValidate.validate({ body: req.body }, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({ type: err.name, message: err.message, errors: err.errors });
  }
};

module.exports = { login };
