# Components
##### Un petit fichier pour explique comment nos "components" fonctionne pour s'y retrouver (une espece de doc).


## Input (Cosmo)
* Import
```
import Input from '../components/Input';
```

* Exemple d'utilisation :
```
export default function Home () {
    const [content, setContent] = useState('');
    return (
        <div>
            <Input onChange={e=>setContent(e)}/>
            
            <button onClick={()=>console.log(content)}>submit</button>
        </div>
    );
}
```

* Props :

|Props Name|Description|Obligatoire|type de valeur|Example d'utilisation|Par Default|
|----|----|----|----|----|----|
|onChange|Une props qui "return" la valeur de l'input à chaque changement|Oui|function|`onChange={(value)=>console.log(value)}`|none|
|type|Défini le type de l'input|Non|String (https://bit.ly/2uJR8rG) |`type='password'`|`'text'`|
|value|Défini la valeur de l'input|Non|String|`value='Votre email'`|`''`|
|placeholder|Défini le placeholder|Non|String|`placeholder='try paris'`|`'PLACE HOLDER PROPS MISSING'`|
|name|Défini le nom (pour les form)|Non|String|`name='firstname'`|none|
|error|Défini si l'input est en état d'érreur|Non|boolean|`error=true`|false|

## Form (Cosmo)
* Explications

Le form dépend des autres composants, il permet de creer un ensemble d'input et de lier le tout.
Attention, tout les input doivent être différents de '' pour pouvoir lancer la requete.
En définissant la route le Form utilise une methode POST et compile l'ensemble des input en requete urlencoded.

* Import
```
import Form from '../components/Form';
```

* Exemple d'utilisation :
```
<Form
    route = '/signin'
    inputList={[
    {name: 'username', placeholder: 'username'},
    {name: 'mdp',placeholder:'mdp', type:'password'}
    ]}

    btn={[{title: 'YESS'}]}

    linkList={[
    {title: "Mdp oublié", link: '/home'},
    ]}

    getRes={e=>console.log(e)}
/>
```

* Props :

|Props Name|Description|Obligatoire|type de valeur|Example d'utilisation|Par Default|
|----|----|----|----|----|----|
|route|Défini la route que le form vas utiliser|Oui|String|`route='/signin'`|none|
|inputList|regrouper les différents input|oui|tableau d'objet (voir doc input)|`inputList={[{name: 'username', placeholder: 'username'},{name: 'mdp',placeholder:'mdp', type:'password'}]}`|none|
|btn|paramètre le bouton du form|oui|tableau d'un objet (voir doc boutton)|`btn={[{title: 'YESS'}]}`|none|
|linkList|regrouper les différents liens|oui|tableau d'objet (title / lien)|`linkList={[{title: "Mdp oublié", link: '/home'}]}`|none|
|getRes|récuperer le resultat de la requete du form|oui|function|`getRes={(resultat)=>console.log(resultat)}`|none|
|match|Sert a dire a un input d'etre égal a un autre (dans l'objet d'in input)|non|Number (position de l'index a égaler)|`inputList={[{name: 'confirmpassword', match: 1, placeholder: 'confirmpassword'},{name: 'mdp',placeholder:'mdp', type:'password'}]}`|none|


## Button (Maria)
* Import
```
import Button from '../components/Button';
```
* Exemple d'utilisation :
```
 <Button buttonTitle="Go"/>
```

* Props :

|Props Name|Description|Obligatoire|type de valeur|Example d'utilisation|Par Default|
|----|----|----|----|----|----|
|buttonTitle|une props qui représente le nom du bouton|Oui|string|`buttonTitle="Résevation"`|none|
|onClick|fonction qui s'execute onclick|non|fonction|`onClick={()=>console.log('boutton)}`|none|
|link|défini le lien de redirection onClick (incompatible avec onClick)|non|string|`link='/home'`|none|

## Text/Title/Subtitle (Maria)
* Import
```
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Text from '../components/Text';
```
* Exemple d'utilisation :
```
 <Title title="MonTitre" />
 <Subtitle subtitle="MonSous-titre" />
 <Text text="MonTexte" />
```

* Props :

|Props Name|Description|Obligatoire ?|type de valeur|Example d'utilisation|Par Default|
|----|----|----|----|----|----|
|title|une props qui représente le titre|Oui|string|title="MonTitre"|
|subtitle|une props qui représente le sous-titre |Oui|string| subtitle="MonSous-titre"|
|text|une props qui représente tout le texte du paragraphe |Oui|string| text="MonTexte"|

## Card (Sophie)
##### Les composants <Card> doivent être tous encapsuler dans une balise <Row> dans la page Results comme ci-dessous pour permettre le responsive.
* Import
```
import Card from '../components/Card';
import {Row} from 'antd';
```

* Exemple d'utilisation :
```
export default function Home () {
    return (

            <Row className="card_row">
            
            <Card/>

            </Row>

    );
}
```

* Props :

|Props Name|Description|Obligatoire|type de valeur|Example d'utilisation|Par Default|
|----|----|----|----|----|----|
|info|L'information mise en avant, au dessus de l'image : ville, date, particularité... (majuscules automatiques)|Non|String|`info='paris'`|none|
|image|Source de l'image|Oui|String |`image='chanel.jpg'`|none|
|title|Titre de la visite|Oui|String|`title='Appatement Klein'`|none|
|price|Prix de la visite|Oui|Number|`price=30`|none|
|id|Lien vers la page de la visite grâce à l'ID de la BDD|Oui|String|`id='/idBDD'`|none|

## Slider (Sophie)
##### Le composant <Slider> comprend un paragraphe de texte et une Card encapsulée dans un <div> wrapper permettant le défilement horizontal.
* Import
```
import Slider from '../components/Card';
```

* Exemple d'utilisation :
```
export default function Home () {
    return (

            <Slider/>

    );
}
```

* Props :

|Props Name|Description|Obligatoire|type de valeur|Example d'utilisation|Par Default|
|----|----|----|----|----|----|
|sliderTitle|Titre du slider|Oui|String|`sliderTitle='Découvrez d'autres visites exclusives'`|none|
|info|L'information mise en avant, au dessus de l'image de la Card : ville, date, particularité... (majuscules automatiques)|Non|String|`info='paris'`|none|
|image|Source de l'image de la Card|Oui|String |`image='chanel.jpg'`|none|
|title|Titre de la visite de la Card|Oui|String|`title='Appatement Klein'`|none|
|price|Prix de la visite de la Card|Oui|Number|`price="30"`|none|
|id|Lien vers la page de la visite grâce à l'ID de la BDD de la Card|Oui|String|`id='/idBDD'`|none|
