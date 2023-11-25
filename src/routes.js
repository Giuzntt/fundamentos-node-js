import { Database } from "./database.js";
import { randomUUID } from "crypto";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/users",
    handler: async (req, res) => {
      const users = await database.select("users");
      res.setHeader("Content-Type", "application/json");

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: async (req, res) => {
      res.writeHead(201, { "Content-Type": "application/json" });
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };
      console.log("user", user);

      database.insert("users", user);

      return res.end("Criação de Usuários");
    },
  },
];
