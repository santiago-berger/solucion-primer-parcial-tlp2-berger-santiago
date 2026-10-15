// * ARCHIVO A COMPLETAR
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const ProjectTechnologyModel = sequelize.define(
  "ProjectTechnology",
  {
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Projects",
        key: "id",
      },
    },
    technology_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Technologies",
        key: "id",
      },
    }
    // TODO: 1. id: entero, clave primaria y autoincremental.
    // TODO: 2. project_id: entero, obligatorio, clave foránea hacia Project.
    // TODO: 3. technology_id: entero, obligatorio, clave foránea hacia Technology.
  },
  {
    // TODO: 4. Desactivar las columnas createdAt y updatedAt.
    timestamps: false,
  },
);
