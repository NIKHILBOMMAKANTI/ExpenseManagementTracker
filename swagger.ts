import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expense Management API Docs",
      version: "1.0.0",
      description: "API documentation for Expense Management Tracker",
    },
  },
  apis: ["src/app/server/api/**/*.ts"], 
};

export const swaggerSpec = swaggerJSDoc(options);
