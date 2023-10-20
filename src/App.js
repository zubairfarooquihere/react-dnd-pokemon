import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Catch from "./components/Catchpokemon/Catch.js";
import Team from "./components/Team/Team.js";
import Storage from "./components/Storage/Storage.js";
import usePokemonReducer from "./PokemonReducer.js";

const App = () => {
  const { pokemonState, dispatchPokemon } = usePokemonReducer();

  let wildPokemon = null;
  let setWildPokemonNull = null;
  const gotWild = (pokemon, setWildPokemon) => {
    wildPokemon = pokemon;
    setWildPokemonNull = setWildPokemon;
  };

  const DragComplete = (result) => {
    let { draggableId, source, destination } = result;
    if (!destination) {
      return;
    }

    if (
      source.droppableId !== destination.droppableId &&
      destination.droppableId !== "catch-droppable"
    ) {
      dispatchPokemon({
        type: "caughtPokemon",
        pokemon: wildPokemon ? wildPokemon : pokemonState.pokemons[draggableId],
        gotSourceId: source.droppableId,
        sourceIndex: source.index,
        gotDestinationId: destination.droppableId,
        destinationIndex: destination.index,
      });

      if (wildPokemon) {
        wildPokemon = null;
        setWildPokemonNull(null);
      }
    }

    if (
      source.droppableId === destination.droppableId &&
      source.droppableId !== "catch-droppable"
    ) {
      if (pokemonState.columns[source.droppableId].pokemonIds.length <= 1) {
        console.log("return");
        return;
      }

      dispatchPokemon({
        type: "sorting",
        pokemonId: draggableId,
        array: source.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      });
    }
  };

  return (
    <React.Fragment>
      <DragDropContext
        onDragEnd={(result) => {
          DragComplete(result);
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "1.5rem",
          }}
        >
          <Team
            pokemonState={pokemonState}
            team={pokemonState.columns.myTeam.pokemonIds}
            dispatchPokemon={dispatchPokemon}
          />
          <Storage
            pokemonState={pokemonState}
            storage={pokemonState.columns.myStorage.pokemonIds}
            dispatchPokemon={dispatchPokemon}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5rem",
          }}
        >
          <Catch
            gotWild={gotWild}
            pokemonState={pokemonState}
            dispatchPokemon={dispatchPokemon}
          />
        </div>
      </DragDropContext>
    </React.Fragment>
  );
};

export default App;
