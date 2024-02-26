# T-DEV-600-PAR_42

## Architecture

Model View ViewModel

### How to Use MVVM with React Native?

When you are developing a complex project with React Native, you may not be able to maintain the code and structure with ease. MVVM architecture makes the code manageable and ensures that it is scalable.

You won't need to make any additions to the architecture while adding more views or models to the project Redux and MobX. Before choosing the apt method, you will need to develop a few apps.

Before we begin coding, we will take a look at MVVM in-depth. We just touched upon how it is valid and the pros and cons. Here we will look at the individual aspects and learn how to code each one for React Native applications.

The four main blocks for any MVVM include:

- View
- ViewController
- ViewModel
- Model

Let’s understand each block in detail.

<img src="https://www.expertappdevs.com/sitebucket/images/mvvm-components.jpg" />

### View

The view is your Interface, which you build with React Native framework. This is the point where the user will interact with your application.

Either they will input a command, use mouse movements or press a key to trigger the ViewController from the interface.

The interface doesn’t do much except take in and give out the display data. For instance, if you use the tax calculator, your input will be salary and other details, while the output will be the tax liability.

The view will only display the numbers and trigger events based on the input in both cases.

```js
import React from "react";
import PokemonList from "./UI/PokemonList";
import PokemonForm from "./UI/PokemonForm";

class PokemonView extends React.Component {
  render() {
    const {
      pokemons,
      pokemonImage,
      pokemonName,
      randomizePokemon,
      setPokemonName,
      addPokemon,
      removePokemon,
      shouldDisableSubmit,
    } = this.props;

    return (
      <React.Fragment>
        <PokemonForm
          image={pokemonImage}
          onInputChange={setPokemonName}
          inputValue={pokemonName}
          randomize={randomizePokemon}
          onSubmit={addPokemon}
          shouldDisableSubmit={shouldDisableSubmit}
        />
        <PokemonList removePokemon={removePokemon} pokemons={pokemons} />
      </React.Fragment>
    );
  }
}
```

### ViewController

The ViewController will take up the command and pass it on to the ViewModel.

It is important to note that one ViewController can pass commands to several ViewModels.

You won't need to ramp up the controllers in this case. The command will be cleaned, interpreted, and passed to the ViewModel, thus enabling easy access.

```js
import React from "react";
import PokemonView from "./PokemonView";

class PokemonController extends React.Component {
  state = {
    pokemonImage: "1.gif",
    pokemonName: "",
  };

  setRandomPokemonImage = () => {
    const rand = Math.ceil(Math.random() * 10);
    this.setState({ pokemonImage: `${rand}.gif` });
  };

  setPokemonName = (e) => {
    this.setState({ pokemonName: e.target.value });
  };

  clearPokemonName() {
    this.setState({ pokemonName: "" });
  }

  savePokemon = () => {
    this.props.viewModel.addPokemon({
      image: this.state.pokemonImage,
      name: this.state.pokemonName,
    });
  };

  addPokemon = () => {
    this.savePokemon();
    this.clearPokemonName();
  };

  removePokemon = (pokemon) => {
    this.props.viewModel.removePokemon(pokemon);
  };

  render() {
    const { viewModel } = this.props;

    return (
      <PokemonView
        pokemons={viewModel.getPokemons()}
        pokemonImage={this.state.pokemonImage}
        randomizePokemon={this.setRandomPokemonImage}
        setPokemonName={this.setPokemonName}
        addPokemon={this.addPokemon}
        removePokemon={this.removePokemon}
        pokemonName={this.state.pokemonName}
        shouldDisableSubmit={!this.state.pokemonName}
      />
    );
  }
}

export default PokemonController;
```

### ViewModel

This is the third and most important block of the MVVM architecture.

At this point, the block is not communicating with the interface directly.

So, it will not know whether the interface was built using React, Vue, or any other framework.

It is a JS class that you can reuse to make any application.

```js
class PokemonViewModel {
  constructor(pokemonStore) {
    this.store = pokemonStore;
  }

  getPokemons() {
    return this.store.getPokemons();
  }

  addPokemon(pokemon) {
    this.store.addPokemon(pokemon);
  }

  removePokemon(pokemon) {
    this.store.removePokemon(pokemon);
  }
}

export default PokemonViewModel;
```

### Model

This is your source for accessing the data; from here, the `ViewModel` and `ViewController` will gain the necessary output and send it to `View`.

This part of the architecture will find databases, network layers, and services. Your logic should be restricted to helping the model send the necessary updates to the View.

This is your MVVM architecture. However, there is an extra component that you will use to bind these elements together, and it is known as a provider. The provider is not part of the MVVM architecture but will be used when creating the app solution.
