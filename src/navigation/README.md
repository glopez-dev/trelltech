## Les Options d'un Screen

Chaque `Screen` peut configurer différents aspects de comment il est représenté par le `Navigator` qui va l'afficher en spécifiant certaines options.

Par exemple :

- le "header title" pour le `Stack Navigator`
- L'icône de la barre de navigation pour le `Tab Navigator`

Il existe trois méthodes pour spécifier les options d'un `Screen`

### La prop `options` de `Screen`

La prop `options` peut contenir un objet avec les différentes options du `Screen`

```javascript
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{ title: "Awesome app" }}
/>
```

`options` peut également prendre une fonction qui recevra la prop `navigation` et la prop `route` du `Screen`.

Cela peut être utile si l'on veut effectuer de la navigation dans les options :

```js
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={({ navigation }) => ({
    title: "Awesome app",
    headerLeft: () => (
      <DrawerButton onPress={() => navigation.toggleDrawer()} />
    ),
  })}
/>
```

### La prop `screenOptions` du `Navigator`

Les options spécifiées dans `screenOptions` sont les mêmes que pour un `Screen` mais s'appliquent à tous les `Screens` qu'il contient.

Cette prop peut également être un objet ou un fonction au choix.

### La méthode `navigation.setOptions()`

La prop `navigation` possède un méthode qui permet de mettre à jour les options du screen depuis un component.

```js
<Button
  title="Update options"
  onPress={() => navigation.setOptions({ title: "Updated!" })}
/>
```

### La prop `route` de `Screen`

C'est un objet qui contient divers attributs fournissant des informations sur la route actuelle :

- `key` - Clé unique pour le `Screen`. Créée automatiquement ou ajoutée lors de la navigation vers ce `Screen`.
- `name` - Nom de l'écran. Défini dans la hiérarchie des composants du `Navigator`.
- `path` - Une `string` facultative contenant le `path` qui a ouvert le `Screen`, existe lorsque l'écran a été ouvert via un deep link.
- `params` - Un objet facultatif contenant des paramètres qui sont définis lors de la navigation, par exemple `navigate('Twitter', { user: 'Dan Abramov' })`.

### La prop `navigation` de `Screen`

Chaque composant `Screen` recoit la prop `navigation` automatiquement, elle fournit diverses fonctions qui fournissent des actions de navigation.

`navigation`

- `navigate` - go to another screen, figures out the action it needs to take to do it
- `reset` - wipe the navigator state and replace it with a new route
- `goBack` - close active screen and move back in the stack
- `setParams` - make changes to route's params
- `dispatch` - send an action object to update the navigation state
- `setOptions` - update the screen's options
- `isFocused` - check whether the screen is focused
- `addListener` - subscribe to updates to events from the navigators
