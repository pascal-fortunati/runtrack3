<?php

declare(strict_types=1);
?>
<section class="pt-10 pb-8">
  <h1 id="init" class="text-3xl font-bold tracking-tight">Backend Node.js avec Express</h1>
  <p class="mt-2 text-gray-600 dark:text-gray-400">Créez une API REST sécurisée connectée à MySQL, avec validation et architecture claire.</p>
  <div class="mt-6 space-y-6">
    <div class="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
      <h2 class="text-sm font-semibold">Initialisation</h2>
      <pre data-lang="bash" data-height="200" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>npm install express mysql2 dotenv cors zod
touch src/server.ts src/routes/index.ts src/controllers/user.controller.ts src/services/user.service.ts
      </code></pre>
      <pre data-lang="ts" data-height="260" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>import express from 'express'
import dotenv from 'dotenv'
import router from './routes'
dotenv.config()
const app = express()
app.use(express.json())
app.use(router)
app.listen(process.env.PORT || 3000)
      </code></pre>
    </div>
    <div id="mysql" class="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
      <h2 class="text-sm font-semibold">Connexion MySQL</h2>
      <pre data-lang="ts" data-height="240" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>// src/db/mysql.ts
import mysql from 'mysql2/promise'
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
})
      </code></pre>
    </div>
    <div id="env" class="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
      <h2 class="text-sm font-semibold">Configuration .env</h2>
      <pre data-lang="env" data-height="180" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=syntax_docs
PORT=3000
      </code></pre>
    </div>
    <div id="routes" class="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
      <h2 class="text-sm font-semibold">Routes et contrôleurs</h2>
      <pre data-lang="ts" data-height="220" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>// src/routes/index.ts
import { Router } from 'express'
import { createUser, listUsers } from '../controllers/user.controller'
const router = Router()
router.get('/users', listUsers)
router.post('/users', createUser)
export default router
      </code></pre>
      <pre data-lang="ts" data-height="340" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>// src/controllers/user.controller.ts
import { z } from 'zod'
import { createUserDb, listUsersDb } from '../services/user.service'
const schema = z.object({ name: z.string().min(2), email: z.string().email() })
export async function createUser(req, res){
  const parse = schema.safeParse(req.body)
  if(!parse.success) return res.status(400).json({ errors: parse.error.flatten() })
  const id = await createUserDb(parse.data)
  res.status(201).json({ id })
}
export async function listUsers(req, res){
  const users = await listUsersDb()
  res.json(users)
}
      </code></pre>
    </div>
    <div id="services" class="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
      <h2 class="text-sm font-semibold">Service et sécurité</h2>
      <pre data-lang="ts" data-height="340" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>// src/services/user.service.ts
import { pool } from '../db/mysql'
export async function createUserDb(data){
  const sql = 'INSERT INTO users(name,email) VALUES(?,?)'
  const [r] = await pool.execute(sql, [data.name, data.email])
  return r.insertId
}
export async function listUsersDb(){
  const [rows] = await pool.query('SELECT id,name,email FROM users ORDER BY id DESC')
  return rows
}
      </code></pre>
      <pre data-lang="ts" data-height="280" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>import { z } from 'zod'
const schema = z.object({
  name: z.string().min(2).transform(s => s.trim()),
  email: z.string().email().transform(s => s.toLowerCase())
})
      </code></pre>
    </div>
    <div id="middleware" class="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
      <h2 class="text-sm font-semibold">Middleware</h2>
      <pre data-lang="ts" data-height="280" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>import cors from 'cors'
import express from 'express'
const app = express()
app.use(cors())
app.use(express.json())
app.use(function(err, _req, res, _next){
  res.status(500).json({ error: 'Internal Server Error' })
})
      </code></pre>
    </div>
    <div id="schema" class="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
      <h2 class="text-sm font-semibold">Schéma SQL utilisateurs</h2>
      <pre data-lang="sql" data-height="220" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
      </code></pre>
    </div>
  </div>
  <dl class="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
    <div>
      <dt class="font-display text-sm font-medium text-slate-900 dark:text-white">Précédent</dt>
      <dd class="mt-1">
        <a class="flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 flex-row-reverse" href="?page=docs#getting-started">
          Démarrage rapide
          <svg viewBox="0 0 16 16" aria-hidden="true" class="h-4 w-4 flex-none fill-current -scale-x-100">
            <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z"></path>
          </svg>
        </a>
      </dd>
    </div>
    <div class="ml-auto text-right">
      <dt class="font-display text-sm font-medium text-slate-900 dark:text-white">Suivant</dt>
      <dd class="mt-1">
        <a class="flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300" href="?page=frontend#frontend-intro">
          Frontend React
          <svg viewBox="0 0 16 16" aria-hidden="true" class="h-4 w-4 flex-none fill-current">
            <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z"></path>
          </svg>
        </a>
      </dd>
    </div>
  </dl>
</section>