import React from "react";
import { Droppable } from "react-beautiful-dnd";

import Card from "../ui/Card/Card";

import classes from "./Storage.module.css";

function Storage(props) {
  const getStorage = props.storage.map((pokemonId, index) => {
    let pokemon = props.pokemonState.pokemons[pokemonId];
    return (
      <Card
        key={index}
        name={pokemon.name}
        type={pokemon.type}
        img={pokemon.img}
        index={index}
        id={pokemonId+""}
        droppableId={"myStorage"}
        pokemon={pokemon}
        dispatchPokemon={props.dispatchPokemon}
      />
    );
  });
  return (
    <div className={classes.storage}>
      <h3>My Storage</h3>
      <Droppable key="myStorage" droppableId="myStorage">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classes.storageInfo}
          >
            {getStorage}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Storage;
