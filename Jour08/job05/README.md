# Syntax PHP Docs

<div align="center">

![PHP Version](https://img.shields.io/badge/PHP-8.0+-777BB4?style=flat-square&logo=php)
![MySQL](https://img.shields.io/badge/MySQL-5.7+-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

**Clone pédagogique du site [Syntax](https://syntax.tailwindui.com/) en PHP avec documentation Node.js/Express/React**

[Démo en ligne](#) • [Documentation](#fonctionnalités) • [Installation](#installation)

</div>

---

## 📋 À propos

Reproduction fidèle de l'interface [Syntax](https://syntax.tailwindui.com/) développée en **PHP** avec **Tailwind CSS**, **Flowbite** et **Heroicons**. Ce projet démontre comment reproduire un design moderne tout en servant de documentation complète pour un stack **Node.js / Express / MySQL / React**.

### 🎯 Objectifs

- ✅ **Reproduire** l'UI/UX de Syntax (hero, navigation, dark mode)
- ✅ **Documenter** un stack technique moderne (Node/Express/React)
- ✅ **Démontrer** l'intégration PHP/MySQL avec formulaires fonctionnels
- ✅ **Illustrer** les bonnes pratiques de sécurité et validation

> 💡 **Note** : Le site affiche une documentation pour Node.js/Express/React, mais fonctionne lui-même en PHP/MySQL.

---

## ✨ Fonctionnalités

### Interface utilisateur

- 🎨 **Clone visuel authentique** de Syntax
  - Layout responsive en 3 colonnes (sidebar, contenu, table des matières)
  - Hero sombre avec cartes de code animées et effets de halo
  - Navigation sticky avec transitions fluides
- 🌓 **Dark mode complet**
  - Gestion via `localStorage` (light / dark / system)
  - Synchronisation avec l'éditeur de code Monaco
- 🔍 **Recherche intelligente**
  - Recherche en temps réel dans les sections
  - Filtrage par titre et contenu

### Documentation technique

- 📚 **Backend Node.js / Express / MySQL**
  - Architecture MVC complète
  - Validation avec Zod
  - Sécurité et middleware
- ⚛️ **Frontend React**
  - Hooks et composants modernes
  - Formulaires avec react-hook-form
  - Optimisations de performance
- 🔌 **API REST**
  - Conventions et endpoints
  - Authentification JWT
  - Pagination et filtrage

### Formulaires fonctionnels

- 📝 **Trois formulaires reliés à MySQL**
  - Contact
  - Newsletter
  - Signalement de problème
- 🛡️ **Sécurité intégrée**
  - Validation des données
  - Sanitation HTML
  - Requêtes préparées
- 👨‍💼 **Interface d'administration**
  - Vue d'ensemble des entrées
  - Suppression sécurisée

---

## 🛠️ Stack technique

### Frontend

| Technologie       | Usage                           |
| ----------------- | ------------------------------- |
| **PHP 8+**        | Templates et routing            |
| **Tailwind CSS**  | Styles et composants            |
| **Flowbite**      | Composants UI                   |
| **Heroicons**     | Icônes SVG                      |
| **Monaco Editor** | Éditeur de code intégré         |
| **Vanilla JS**    | Navigation AJAX et interactions |

### Backend

| Technologie             | Usage                   |
| ----------------------- | ----------------------- |
| **PHP / PDO**           | Persistance des données |
| **MySQL**               | Base de données         |
| **Prepared Statements** | Sécurité SQL            |

---

## 📁 Structure du projet

```
.
├── 📄 index.php                 # Point d'entrée et routing
├── 📁 templates/
│   ├── layout.php              # Layout global
│   └── partials/               # Composants réutilisables
│       ├── header.php
│       ├── hero.php
│       ├── sidebar.php
│       └── onpage.php
├── 📁 pages/
│   ├── docs/                   # Pages de documentation
│   │   ├── home.php
│   │   ├── backend.php
│   │   ├── frontend.php
│   │   └── api.php
│   └── forms/                  # Formulaires
│       ├── contact.php
│       ├── subscribe.php
│       ├── issue.php
│       └── admin.php
├── 📁 actions/                 # Traitement des formulaires
│   ├── contact_submit.php
│   ├── subscribe_submit.php
│   ├── issue_submit.php
│   └── delete_entry.php
├── 📁 config/
│   └── db.php                  # Configuration MySQL
├── 📁 database/
│   └── schema.sql              # Schéma de la base
└── 📁 assets/
    ├── css/custom.css
    └── js/theme.js
```

---

## 🚀 Installation

### Prérequis

- PHP 8.0+
- MySQL 5.7+ ou 8.x
- Composer (optionnel)

### Installation rapide

```bash
# 1. Cloner le repository
git clone https://github.com/votre-compte/syntax-php-docs.git
cd syntax-php-docs

# 2. Créer la base de données
mysql -u root -p < database/schema.sql

# 3. Configurer les identifiants
nano config/db.php
# Éditer config/db.php avec vos identifiants

# 4. Lancer le serveur
php -S localhost:8000
```

### Configuration de la base de données

#### Option 1 : Variables d'environnement (recommandé)

```bash
export DB_HOST=localhost
export DB_NAME=syntax_docs
export DB_USER=root
export DB_PASS=votre_mot_de_passe
```

#### Option 2 : Édition directe

Modifiez `config/db.php` :

```php
$host = 'localhost';
$db   = 'syntax_docs';
$user = 'root';
$pass = 'votre_mot_de_passe';
```

### Accès à l'application

- 🏠 **Page d'accueil** : `http://localhost:8000`
- 📧 **Contact** : `http://localhost:8000?page=contact`
- 📰 **Newsletter** : `http://localhost:8000?page=subscribe`
- 🐛 **Signaler un bug** : `http://localhost:8000?page=issue`
- 👨‍💼 **Administration** : `http://localhost:8000?page=admin`

---

## 📝 Utilisation

### Navigation

La navigation entre les sections se fait via le paramètre `?page=` :

- `?page=docs` - Documentation principale
- `?page=backend` - Guide Backend
- `?page=frontend` - Guide Frontend
- `?page=api` - Référence API

### Formulaires

Tous les formulaires incluent :

- ✅ Validation côté serveur
- 🛡️ Protection XSS et injection SQL
- 📧 Validation d'email
- 🔒 Requêtes préparées

**Exemple de flux** :

1. Utilisateur remplit le formulaire
2. Soumission vers `actions/[form]_submit.php`
3. Validation et sanitation
4. Insertion en base via PDO
5. Redirection avec message de confirmation

### Administration

La page d'administration (`?page=admin`) permet de :

- 👀 Visualiser toutes les entrées
- 🗑️ Supprimer des entrées
- 📊 Voir les statistiques

---

## 🎨 Design et personnalisation

### Tailwind CSS

Le projet utilise intensivement Tailwind avec :

- **Classes utilitaires** pour tous les composants
- **Dark mode** via la classe `dark:`
- **Responsive design** avec les breakpoints `sm:`, `md:`, `lg:`, `xl:`

### Modification du thème

Le thème peut être personnalisé dans `assets/css/custom.css` :

```css
:root {
  --primary-color: #3b82f6;
  --hero-gradient: linear-gradient(...);
}
```

### Ajout de nouvelles pages

1. Créer le fichier dans `pages/docs/`
2. Ajouter l'entrée dans la sidebar (`templates/partials/sidebar.php`)
3. Ajouter le cas dans le routing (`index.php`)

---

## 🔒 Sécurité

Le projet implémente plusieurs mesures de sécurité :

| Mesure            | Implémentation                                 |
| ----------------- | ---------------------------------------------- |
| **Validation**    | `filter_var()`, expressions régulières         |
| **Sanitation**    | `trim()`, `strip_tags()`, `htmlspecialchars()` |
| **SQL Injection** | Requêtes préparées PDO                         |
| **XSS**           | Échappement HTML systématique                  |

---

## 🙏 Remerciements

- [Syntax](https://syntax.tailwindui.com/) pour l'inspiration du design
- [Tailwind CSS](https://tailwindcss.com/) pour le framework CSS
- [Flowbite](https://flowbite.com/) pour les composants
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) pour l'éditeur de code

---
