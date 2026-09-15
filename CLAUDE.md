# Site du Lycée privé Abulkacem Echebbi — contexte projet

Site vitrine de l'établissement (Moularès, Gafsa — Tunisie), en production sur
https://college-lycee-echebbi.com

## Nature du projet

Site **statique** : ni build, ni gestionnaire de paquets, ni runtime serveur.
`public/` est servi tel quel par un conteneur nginx. Il n'y a pas de `package.json`
et il ne doit pas y en avoir un sans décision explicite (voir « Dette technique »).

```
public/
├── index.html          point d'entrée, charge React + Babel depuis unpkg.com
├── styles.css          design system complet (navy + or, dérivés du blason)
├── src/*.jsx           composants, transpilés DANS LE NAVIGATEUR par Babel standalone
└── assets/             crest.png (blason), founder.jpg (portrait de la fondatrice)
```

Trilingue FR / AR / EN — toutes les chaînes vivent dans `src/i18n.jsx`.
L'arabe implique un mode RTL : la classe `body.lang-ar` porte les ajustements
directionnels dans `styles.css`. **Toute chaîne ajoutée doit l'être dans les trois
langues**, et toute règle de mise en page directionnelle doit avoir son pendant RTL.

## Vérification locale — obligatoire avant tout push

```powershell
docker run --rm -p 8080:80 -v "${PWD}\public:/usr/share/nginx/html:ro" nginx:1.27-alpine
# http://localhost:8080
```

Même image et même version qu'en production. Ce que montre `localhost:8080` est
exactement ce que servira le serveur.

⚠️ Cette commande est pour le **poste de développement**. Lancée sur la VM depuis un
répertoire système, elle publie ce répertoire sur Internet.

## Déploiement

```
poste → git push → GitHub (WaelSaidi-pro/echebbi-site) → git pull sur la VM
```

Sur la VM : `git -C /opt/apps/echebbi/repo pull`. Déclenchement **manuel**.
Aucun redémarrage de conteneur : nginx relit les fichiers statiques à chaque requête.
La VM dispose d'une deploy key en **lecture seule** — elle ne pousse jamais.

## Conventions

- Fins de ligne : LF partout, imposé par `.gitattributes`. Ne pas le contourner.
- Messages de commit en français, préfixés `feat:` / `fix:` / `perf:` / `chore:`.
- Pas de dépendance ajoutée sans en peser le coût pour le visiteur : le public est
  majoritairement sur mobile en réseau tunisien. Le poids de la page est un critère
  de conception, pas une optimisation tardive.

### Images

Cibles dimensionnées à **2× la taille d'affichage CSS réelle**, jamais plus.
Méthode retenue (Pillow) : redimensionnement LANCZOS, puis
`quantize(colors=256, method=FASTOCTREE)` pour un PNG à canal alpha, ou
`JPEG quality=82 progressive` pour une photographie.

Le WebP a été évalué et écarté sur le blason : plus lourd **et** moins fidèle que le
PNG palettisé sur cette image à aplats. Mesurer avant de choisir un format.

Aucune image au-delà de ~150 Ko ne doit entrer dans `public/`.

## Dette technique connue

`index.html` charge React et **Babel standalone depuis unpkg.com**, et les `.jsx` sont
transpilés dans le navigateur à chaque visite. Conséquences : ~1,5 Mo de Babel par
visiteur, coût CPU au chargement, et dépendance de disponibilité à un CDN tiers hors
contrôle pour un site d'établissement scolaire.

Le corriger suppose d'introduire une étape de build, donc de faire évoluer le
déploiement au-delà du `git pull`. **C'est une décision d'architecture, pas un
refactor de routine** — ne pas l'engager sans validation explicite de Wael.

## Historique

Le site a été mis en ligne en avril 2026 et est resté **injoignable du 19 juillet au
15 septembre 2026** : son vhost empruntait « temporairement » le certificat d'un autre
domaine, lequel a expiré sans que personne ne le voie. Le dépôt Git, le contrôle
d'expiration quotidien et la chaîne de déploiement datent de la remise en service.

La leçon vaut pour la suite : sur ce projet, ce qui n'est ni versionné ni surveillé
finit par casser en silence.
