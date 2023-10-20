import { useReducer } from 'react';

const initialData = {
  pokemons: {},
  columns: {
    myTeam: {
      id: "myTeam",
      pokemonIds: [],
    },
    myStorage: {
      id: "myStorage",
      pokemonIds: [],
    },
    catch: {
      id: "catch",
      pokemon: null,
    },
  },
  columnOrder: ["myTeam", "myStorage"],
};
     
const usePokemonReducer = () => {
  const pokemonReducer = (state, action) => {
    if (action.type === "caughtPokemon") {
      const destinationPokemonIds = [
        ...state.columns[action.gotDestinationId].pokemonIds,
      ];
      destinationPokemonIds.splice(
        action.destinationIndex,
        0,
        action.pokemon.id
      );

      let destinationState = {
        ...state,
        columns: {
          ...state.columns,
          [action.gotDestinationId]: {
            ...state.columns[action.gotDestinationId],
            pokemonIds: destinationPokemonIds,
          },
        },
      };

      if (action.gotSourceId !== "catch-droppable") {
        const sourcePokemonIds = [
          ...state.columns[action.gotSourceId].pokemonIds,
        ];
        sourcePokemonIds.splice(action.sourceIndex, 1);

        return {
          ...destinationState,
          columns: {
            ...destinationState.columns,
            [action.gotSourceId]: {
              ...destinationState.columns[action.gotSourceId],
              pokemonIds: sourcePokemonIds,
            },
          },
        };
      } else {
        //Enter New pokemon data in state.pokemons id.
        return {
          ...destinationState,
          pokemons: {
            ...destinationState.pokemons,
            [action.pokemon.id]: action.pokemon,
          },
        };
      }
    } else if (action.type === "sorting") {
      const updatedPokemonIds = [...state.columns[action.array].pokemonIds];
      // Remove the element at the source index
      updatedPokemonIds.splice(action.sourceIndex, 1);
      // Insert the element at the destination index
      updatedPokemonIds.splice(action.destinationIndex, 0, action.pokemonId);

      return {
        ...state,
        columns: {
          ...state.columns,
          [action.array]: {
            ...state.columns[action.array],
            pokemonIds: updatedPokemonIds,
          },
        },
      };
    } else if (action.type === "remove") {
      const updatedPokemonIds = [...state.columns[action.droppableId].pokemonIds];
      // Remove the element at the index
      updatedPokemonIds.splice(action.index, 1);
      const pokemonsId = state.pokemons;
      delete pokemonsId[action.id];

      return {
        ...state,
        pokemons: {
          ...pokemonsId,
        },
        columns: {
          ...state.columns,
          [action.droppableId]: {
            ...state.columns[action.droppableId],
            pokemonIds: updatedPokemonIds,
          },
        },
      };
    }

    return state;
  };

  const [pokemonState, dispatchPokemon] = useReducer(
    pokemonReducer,
    initialData
  );

  return {pokemonState, dispatchPokemon};
};
 
export default usePokemonReducer;
