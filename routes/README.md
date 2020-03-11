# Routes
##### une petite doc pour les routes

## /addvisit (POST)
* Explications

Cette route permet d'ajouter une nouvelle visite.

* Elément de requête

|keys|description|type de valeur|exemple|nombre|
|----|----|----|----|----|
|title|Titre de la visite|String|`title=Titre ici`|1|
|desc|Déscription de la visite|String|`desc=Description ici`|1|
|city|(adresse) ville|String (lowerCase)|`city=paris`|1|
|country|(adresse) pays|String (2 char)|`country=fr`|1|
|street|(adresse) rue|String|`street=43 rue saint-denis`|1|
|zip|(adresse) code postal|Number|`zip=75001`|1|
|host|id/ref de l'hôte|String|`host=5e5f997d9b80313c8411dd5e`|1|
|pic|les url des images de la visite|String|`pic=https://image.com/image.png`|1>=|
|cover|les url de la cover de la visite|String|`cover=https://image.com/image.png`|1|


* Exemple de requête :
```
"city=paris&country=fr&street=43 rue saint-denis&zip=75001&desc=Super visite&host=5e5f997d9b80313c8411dd5e&cover=https://image.com&pic=https://image.com&pic=https://image.com"
```

* Pour les images :

Ajoutez avec la même key pour en ajouter plusieurs ("pic"); 
```
...&pic=https://image.com&pic=https://image.com&pic=https://image.com"
```
