<?php

declare(strict_types=1);
?>
<section class="pt-10 pb-8">
  <h1 id="frontend-intro" class="text-3xl font-bold tracking-tight">Frontend React</h1>
  <p class="mt-2 text-gray-600 dark:text-gray-400">Consommez l’API REST et structurez vos composants pour un développement rapide.</p>
  <div class="mt-6 space-y-6">
    <div id="axios" class="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
      <h2 class="text-sm font-semibold">Appel d’API avec Axios</h2>
      <pre data-lang="ts" data-height="220" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>// src/api/client.ts
import axios from 'axios'
export const api = axios.create({ baseURL: 'http://localhost:3000' })
export async function listUsers(){
const { data } = await api.get('/users')
return data
}
    </code></pre>
      <pre data-lang="ts" data-height="240" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>import { api } from './client'
api.interceptors.request.use(c => {
return c
})
api.interceptors.response.use(r => r, e => {
return Promise.reject(e)
})
    </code></pre>
    </div>
    <div id="forms" class="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
      <h2 class="text-sm font-semibold">Formulaires avec React Hook Form</h2>
      <pre data-lang="tsx" data-height="340" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>// src/components/UserForm.tsx
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../api/client'
const schema = z.object({ name: z.string().min(2), email: z.string().email() })
export function UserForm(){
  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) })
  const onSubmit = async (v:any) => { await api.post('/users', v) }
  return (
    &lt;form onSubmit={handleSubmit(onSubmit)}&gt;
      &lt;input {...register('name')} /&gt;
      &lt;input {...register('email')} /&gt;
      &lt;button disabled={formState.isSubmitting}&gt;Créer&lt;/button&gt;
    &lt;/form&gt;
  )
}
      </code></pre>
    </div>
    <div id="perf" class="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
      <h2 class="text-sm font-semibold">Organisation et performance</h2>
      <ul class="mt-3 list-disc space-y-2 pl-6 text-sm text-gray-600 dark:text-gray-400">
        <li>Découpez en composants réutilisables et pages.</li>
        <li>Utilisez le cache de requêtes ou la pagination pour les listes.</li>
        <li>Mémorisez les calculs lourds et évitez les re-renders inutiles.</li>
        <li>Chargez paresseusement les vues et les dépendances lourdes.</li>
      </ul>
      <h3 id="code-splitting" class="mt-6 text-sm font-semibold">Code splitting</h3>
      <pre data-lang="tsx" data-height="260" class="mt-2 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>import { lazy, Suspense } from 'react'
const UsersPage = lazy(() => import('./UsersPage'))
export default function App(){
  return (
    &lt;Suspense fallback={&lt;div&gt;Chargement...&lt;/div&gt;}&gt;
      &lt;UsersPage /&gt;
    &lt;/Suspense&gt;
  )
}
      </code></pre>
      <h3 id="memoization" class="mt-6 text-sm font-semibold">Mémoïsation</h3>
      <pre data-lang="tsx" data-height="260" class="mt-2 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>import { memo, useMemo } from 'react'
function List({ items }){
  const total = useMemo(() => items.reduce((a,b) => a + b.value, 0), [items])
  return &lt;div&gt;Total: {total}&lt;/div&gt;
}
export default memo(List)
      </code></pre>
      <h3 id="virtualization" class="mt-6 text-sm font-semibold">Virtualisation de listes</h3>
      <pre data-lang="tsx" data-height="300" class="mt-2 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>import { FixedSizeList as VList } from 'react-window'
export default function HugeList({ rows }){
  return (
    &lt;VList height={400} width={600} itemSize={42} itemCount={rows.length}&gt;
      {({ index, style }) => (
        &lt;div style={style}&gt;{rows[index].label}&lt;/div&gt;
      )}
    &lt;/VList&gt;
  )
}
      </code></pre>
      <pre data-lang="text" data-height="240" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>src/
  api/
  components/
  pages/
  hooks/
  lib/
  styles/
      </code></pre>
    </div>
    <pre data-lang="tsx" data-height="320" class="mt-4 overflow-x-auto rounded bg-gray-50 p-4 text-xs dark:bg-gray-800"><code>import { useForm } from 'react-hook-form'
export function UserForm(){
  const { register, handleSubmit, formState } = useForm()
  const onSubmit = async (v:any) => {}
  return (
    &lt;form onSubmit={handleSubmit(onSubmit)} className="space-y-3"&gt;
      &lt;input {...register('name', { required: 'Nom requis' })} /&gt;
      {formState.errors.name && &lt;span&gt;{String(formState.errors.name.message)}&lt;/span&gt;}
      &lt;input {...register('email', { required: 'Email requis' })} /&gt;
      &lt;button disabled={formState.isSubmitting}&gt;Créer&lt;/button&gt;
    &lt;/form&gt;
  )
}
      </code></pre>
  </div>
  <dl class="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
    <div>
      <dt class="font-display text-sm font-medium text-slate-900 dark:text-white">Précédent</dt>
      <dd class="mt-1">
        <a class="flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 flex-row-reverse" href="?page=backend#init">
          Backend Node.js avec Express
          <svg viewBox="0 0 16 16" aria-hidden="true" class="h-4 w-4 flex-none fill-current -scale-x-100">
            <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z"></path>
          </svg>
        </a>
      </dd>
    </div>
    <div class="ml-auto text-right">
      <dt class="font-display text-sm font-medium text-slate-900 dark:text-white">Suivant</dt>
      <dd class="mt-1">
        <a class="flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300" href="?page=api#api-intro">
          API REST
          <svg viewBox="0 0 16 16" aria-hidden="true" class="h-4 w-4 flex-none fill-current">
            <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z"></path>
          </svg>
        </a>
      </dd>
    </div>
  </dl>
  </section>
