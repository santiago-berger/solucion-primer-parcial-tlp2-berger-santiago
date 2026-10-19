// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import {
  ProjectModel,
  TechnologyModel,
  UserModel,
} from "../../models/index.js";

export const createProjectValidation = [
  // TODO: 1. Validar code: obligatorio y único (ProjectModel).
  body("code")
    .trim().notEmpty().withMessage("El código es obligatorio")
    .isAlphanumeric().withMessage("El código solo puede contener letras y números")
    .isLength({ min: 3, max: 20 }).withMessage("El código debe tener entre 3 y 20 caracteres")
    .custom(async (code) => {
      const found = await ProjectModel.findOne({ where: { code } });
      if (found) throw new Error("El código ya está en uso");
      return true;
    }),
  // TODO: 2. Validar name y description como obligatorios.
  body("name")
    .trim().notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 3, max: 100 }).withMessage("El nombre debe tener entre 3 y 100 caracteres"),
  
  body("description")
  .trim().notEmpty().withMessage("La descripción es obligatoria")
  .isLength({ min: 10, max: 500 }).withMessage("La descripción debe tener entre 10 y 500 caracteres"),
  // TODO: 3. Validar status: opcional y limitado a los estados permitidos.
  body("status")
    .optional()
    .trim()
    .isIn(["planning", "in_progress", "paused", "finished"]).withMessage("El estado debe ser planning, in_progress, paused o finished"),
  // TODO: 4. Validar start_date como fecha válida y budget como número positivo, ambos obligatorios.
  body("start_date")
    .trim().notEmpty().withMessage("La fecha de inicio es obligatoria")
    .isDate().withMessage("La fecha de inicio debe ser una fecha válida"),

  body("budget")
    .notEmpty().withMessage("El presupuesto es obligatorio")
    .isNumeric().withMessage("El presupuesto debe ser un número")
    .custom((budget) => budget > 0)
    .withMessage("El presupuesto debe ser un número positivo"),  
  // TODO: 5. Validar leader_id: debe existir y pertenecer a un usuario activo (UserModel).
  // ? Un usuario eliminado lógicamente no puede ser líder: comprobar que la búsqueda lo deje afuera.
  body("leader_id")
    .optional()
    .isInt().withMessage("El leader_id debe ser un número entero")
    .custom(async (leader_id) => {
      const user = await UserModel.findByPk(leader_id);
      if (!user) throw new Error("El líder no existe o no es un usuario activo");
      return true;
    }),  
  // TODO: 6. Validar technologies: lista de ids que existan (TechnologyModel).
  body("technologies")
    .notEmpty().withMessage("Las technologies son obligatorias")
    .isArray().withMessage("Las technologies deben ser un array de ids")
    .custom(async (technologies) => {
      const count = await TechnologyModel.count({
        where: { id: technologies },
      });
      if (count !== technologies.length)
        throw new Error("Una o más technologies no existen");
      return true;
    }),  
];

export const updateProjectValidation = [
  // TODO: 7. Validar code como opcional y único, excluyendo el propio proyecto que se edita.
  // ? Para saber qué proyecto se edita, el id se obtiene de los parámetros de la ruta (req.params).
  body("code")
    .optional()
    .trim()
    .notEmpty().withMessage("El código no puede estar vacío")
    .isAlphanumeric().withMessage("El código solo puede contener letras y números")
    .isLength({ min: 3, max: 20 }).withMessage("El código debe tener entre 3 y 20 caracteres")
    .custom(async (code, { req }) => {
      const found = await ProjectModel.findOne({ where: { code } });
      if (found && found.id !== Number(req.params.id))
        throw new Error("El código ya está en uso");
      return true;
    }),
  // TODO: 8. Validar name y description como opcionales y no vacíos.
  body("name")
    .optional()
    .trim()
    .notEmpty().withMessage("El nombre no puede estar vacío")
    .isLength({ min: 3, max: 100 }).withMessage("El nombre debe tener entre 3 y 100 caracteres"),

  body("description")
    .optional()
    .trim()
    .notEmpty().withMessage("La descripción no puede estar vacía")
    .isLength({ min: 10, max: 500 }).withMessage("La descripción debe tener entre 10 y 500 caracteres"),
  // TODO: 9. Validar status, start_date y budget como opcionales, con las mismas reglas que al crear.
  body("status")
    .optional()
    .trim()
    .isIn(["planning", "in_progress", "paused", "finished"]).withMessage("El estado debe ser planning, in_progress, paused o finished"),

  body("start_date")
    .optional()
    .trim()
    .notEmpty().withMessage("La fecha de inicio no puede estar vacía")
    .isDate().withMessage("La fecha de inicio debe ser una fecha válida"),

  body("budget")
    .optional()
    .notEmpty().withMessage("El presupuesto no puede estar vacío")
    .isNumeric().withMessage("El presupuesto debe ser un número")
    .custom((budget) => budget > 0).withMessage("El presupuesto debe ser un número positivo"),
  // TODO: 10. Validar leader_id como opcional, existente y de un usuario activo.
  body("leader_id")
    .optional()
    .isInt().withMessage("El leader_id debe ser un número entero")
    .custom(async (leader_id) => {
      const user = await UserModel.findByPk(leader_id);
      if (!user) throw new Error("El líder no existe o no es un usuario activo");
      return true;
    }),

  // TODO: 11. Validar technologies como opcional, con ids que existan.
  body("technologies")
    .optional()
    .isArray().withMessage("Las technologies deben ser un array de ids")
    .custom(async (technologies) => {
      const count = await TechnologyModel.count({
        where: { id: technologies },
      });
      if (count !== technologies.length)
        throw new Error("Una o más technologies no existen");
      return true;
    }),

];
