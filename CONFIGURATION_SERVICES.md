# Configuration des Services de Collecte de Données

Votre application NOESIS AI supporte maintenant **trois options de stockage** pour vos leads et données clients :

1. **Fichier local** (par défaut) - Toujours actif comme sauvegarde
2. **NocoDB** - Recommandé pour un interface type tableur
3. **Google Sheets** - Pour une intégration directe avec Google Workspace

## 🎯 Option 1 : NocoDB (Recommandé)

### Avantages
✅ Interface spreadsheet familière  
✅ API REST simple et puissante  
✅ Pas de quotas ou limitations  
✅ Tokens d'API permanents  
✅ Gratuit et open source  

### Configuration

1. **Créer un compte NocoDB** sur [nocodb.com](https://nocodb.com) ou installer localement

2. **Créer un nouveau projet** et une table "Leads" avec ces colonnes :
   - `first_name` (Single Line Text)
   - `last_name` (Single Line Text)
   - `email` (Email)
   - `company` (Single Line Text)
   - `consent` (Checkbox)
   - `source` (Single Line Text)
   - `path` (Single Line Text)
   - `timestamp` (DateTime)
   - `created_at` (DateTime)

3. **Générer un token API** :
   - Aller dans Account Settings → API Tokens
   - Créer un nouveau token (ex: "NOESIS_Integration")

4. **Ajouter les variables d'environnement** dans votre projet Replit :
```bash
NOCODB_BASE_URL=https://app.nocodb.com  # ou votre instance
NOCODB_API_TOKEN=votre_token_api_ici
NOCODB_PROJECT_ID=votre_project_id
NOCODB_TABLE_ID=Leads  # nom de votre table
```

## 📊 Option 2 : Google Sheets

### Avantages
✅ Intégration native avec Google Workspace  
✅ Partage facile avec votre équipe  
✅ Fonctionnalités avancées de Google Sheets  

### Configuration

1. **Créer un Service Account Google** :
   - Aller sur [Google Cloud Console](https://console.cloud.google.com)
   - Créer ou sélectionner un projet
   - Activer l'API Google Sheets
   - Créer un Service Account
   - Télécharger la clé JSON

2. **Créer un Google Sheet** :
   - Créer un nouveau spreadsheet
   - Nommer la première feuille "Leads"
   - Partager le document avec l'email du service account (en éditeur)

3. **Ajouter les variables d'environnement** :
```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=votre-service-account@projet.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nvotre_cle_privee\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=1ABcd2EfGh3IjKl4MnOpQr5StUvWxYz  # ID du spreadsheet dans l'URL
GOOGLE_SHEET_NAME=Leads  # nom de la feuille (optionnel)
```

## ⚙️ Configuration dans Replit

1. **Ouvrir les Secrets** dans votre projet Replit
2. **Ajouter les variables** selon le service choisi
3. **Redémarrer l'application** pour prendre en compte les nouvelles variables

## 🔄 Fonctionnement Multi-Services

Votre application sauvegarde **automatiquement** dans tous les services configurés :

- ✅ **NocoDB configuré** → Données sauvées dans NocoDB
- ✅ **Google Sheets configuré** → Données sauvées dans Google Sheets  
- ✅ **Fichier local** → Toujours utilisé comme sauvegarde

**Avantage** : Si un service externe est temporairement indisponible, vos données sont protégées !

## 📝 Structure des Données

Chaque lead capturé contient :
```json
{
  "firstName": "Jean",
  "lastName": "Dupont", 
  "email": "jean@entreprise.com",
  "company": "Mon Entreprise",
  "consent": true,
  "source": "website:noesisai",
  "path": "/",
  "timestamp": "2025-09-17T18:32:24.639Z",
  "createdAt": "2025-09-17T18:32:24.639Z"
}
```

## 🔧 Dépannage

**Problème** : "NocoDB configuration missing"
**Solution** : Vérifier que toutes les variables d'environnement NocoDB sont définies

**Problème** : "Google Sheets authentication failed"  
**Solution** : Vérifier que la clé privée est correctement formatée avec les \n

**Problème** : Données non visibles dans le service externe
**Solution** : Consulter les logs du serveur pour voir les erreurs spécifiques

## 💡 Recommandations

- **Pour démarrer rapidement** : Utilisez le stockage local (déjà actif)
- **Pour une utilisation profesionnelle** : Configurez NocoDB  
- **Si vous utilisez Google Workspace** : Configurez Google Sheets
- **Pour la sécurité maximale** : Configurez les deux services externes

Les données sont toujours sauvées localement en plus des services externes !