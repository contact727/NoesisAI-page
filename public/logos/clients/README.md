# Logos clients

Pour ajouter un client à la bande « Ils nous font confiance » :

1. Déposez le fichier du logo ici (PNG ou SVG de préférence, fond transparent idéalement).
2. Ouvrez `src/data/content.ts` et ajoutez une ligne dans `CLIENT_LOGOS` :

   ```ts
   { name: "Nom du client", src: "/logos/clients/mon-fichier.png" },
   ```

Les logos sont affichés dans des cartes blanches uniformes, donc les fonds différents
(photo, fond noir, etc.) ne posent pas de problème visuel.
