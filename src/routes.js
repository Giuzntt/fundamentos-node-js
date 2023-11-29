import { Database } from './database.js';
import { randomUUID } from 'crypto';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: async (req, res) => {
      const users = await database.select('users');
      res.setHeader('Content-Type', 'application/json');

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: async (req, res) => {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };
      console.log('user', user);

      database.insert('users', user);

      return res.end('Criação de Usuários');
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/user/:id'),
    handler: async (req, res) => {
      console.log('🚀 ~ file: routes.js:42 ~ handler: ~ req:', req.params);

      res.writeHead(204, { 'Content-Type': 'application/json' });
      const { id } = req.params;

      database.delete('users', id);

      return res.end('Usuário deletado');
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/user/:id'),
    handler: async (req, res) => {
      const { id } = req.params;

      res.writeHead(201, { 'Content-Type': 'application/json' });
      const { name, email } = req.body;

      database.update('users', id, {
        name,
        email,
      });

      return res.end('Usuário atualizado');
    },
  },
];
