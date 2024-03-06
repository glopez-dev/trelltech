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
