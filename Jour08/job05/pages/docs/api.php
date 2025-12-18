<?php

declare(strict_types=1);
?>
<section class="pt-10 pb-8">
    <h1 id="api-intro" class="text-3xl font-bold tracking-tight">API REST</h1>
    <p class="mt-2 text-gray-600 dark:text-gray-400">Endpoints clés et conventions pour communiquer entre le backend et le frontend.</p>
    <div class="mt-6 space-y-6">
        <div id="conventions" class="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
            <h2 class="text-sm font-semibold">Conventions</h2>
            <ul class="mt-3 list-disc space-y-2 pl-6 text-sm text-gray-600 dark:text-gray-400">
                <li>JSON partout, avec codes HTTP corrects.</li>
                <li>Endpoints versionnés, ex: <code>/v1/users</code>.</li>
                <li>Validation stricte des entrées et réponses typées.</li>
                <li>Protection CORS et rate limiting si nécessaire.</li>
            </ul>
        </div>
        <div id="endpoints" class="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
            <h2 class="text-sm font-semibold">Exemple d’endpoints</h2>
            <pre data-lang="text" data-height="200" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>GET    /users         → Liste des utilisateurs
POST   /users         → Création
GET    /users/:id     → Détail
PUT    /users/:id     → Mise à jour
DELETE /users/:id     → Suppression
            </code></pre>
            <pre data-lang="json" data-height="220" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>{
  "id": 1,
  "name": "Ada",
  "email": "ada@example.com"
}
            </code></pre>
        </div>
        <div id="erreurs" class="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
            <h2 class="text-sm font-semibold">Format d’erreurs</h2>
            <pre data-lang="json" data-height="220" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>{
  "error": "ValidationError",
  "details": {
    "email": "email invalide"
  }
}
      </code></pre>
        </div>
        <div id="pagination" class="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
            <h2 class="text-sm font-semibold">Pagination & filtrage</h2>
            <pre data-lang="ts" data-height="280" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>import { Request, Response } from 'express'
export async function listUsers(req: Request, res: Response){
  const page = Math.max(parseInt(String(req.query.page || '1'), 10), 1)
  const size = Math.min(Math.max(parseInt(String(req.query.size || '20'), 10), 1), 100)
  const q = String(req.query.q || '')
  // SELECT ... WHERE name LIKE ? LIMIT ? OFFSET ?
  res.json({ items: [], page, size, total: 0 })
}
      </code></pre>
        </div>
        <div id="auth" class="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
            <h2 class="text-sm font-semibold">Auth (JWT)</h2>
            <pre data-lang="ts" data-height="280" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>import jwt from 'jsonwebtoken'
export function auth(req, res, next){
  const h = req.headers.authorization || ''
  const token = h.startsWith('Bearer ') ? h.slice(7) : ''
  try { jwt.verify(token, process.env.JWT_SECRET || 'dev') } catch { return res.status(401).json({ error: 'Unauthorized' }) }
  next()
}
      </code></pre>
        </div>
    </div>
    <dl class="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
        <div>
            <dt class="font-display text-sm font-medium text-slate-900 dark:text-white">Précédent</dt>
            <dd class="mt-1">
                <a class="flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 flex-row-reverse" href="?page=frontend#frontend-intro">
                    Frontend React
                    <svg viewBox="0 0 16 16" aria-hidden="true" class="h-4 w-4 flex-none fill-current -scale-x-100"><path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z"></path></svg>
                </a>
            </dd>
        </div>
        <div class="ml-auto text-right">
            <dt class="font-display text-sm font-medium text-slate-900 dark:text-white">Suivant</dt>
            <dd class="mt-1">
                <span class="text-base font-semibold text-slate-400">—</span>
            </dd>
        </div>
    </dl>
</section>
