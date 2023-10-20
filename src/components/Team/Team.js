import React from "react";
import { Droppable } from "react-beautiful-dnd";

import classes from "./Team.module.css";

import Card from "../ui/Card/Card";

function Team(props) {
  const { team, pokemonState } = props;

  const firstSixPokemon = team.map((pokemonId, index) => {
    const pokemon = pokemonState.pokemons[pokemonId];
    return (
      <Card
        key={index}
        name={pokemon.name}
        type={pokemon.type}
        img={pokemon.img}
        index={index}
        id={pokemonId + ""}
        droppableId="myTeam"
        pokemon={pokemon}
        dispatchPokemon={props.dispatchPokemon}
      />
    );
  });

  // team.slice(6).map((pokemonId, index) => {
  //   const pokemon = pokemonState.pokemons[pokemonId];
  //   dispatchPokemon({
  //     type: "caughtPokemon",
  //     pokemon: pokemon,
  //     gotSourceId: "myTeam",
  //     sourceIndex: index + 6,
  //     gotDestinationId: "myStorage",
  //     destinationIndex: 0,
  //   });
  //   return null; // You can return null for the remaining Pokemon since they are being moved to storage
  // });

  const getTeam = [...firstSixPokemon];

  return (
    <div className={classes.team}>
      <div className={classes.header}>
        <h3>My Team</h3>
        {getTeam.length > 6 && <span>Max 6 Pokemons</span>}
      </div>
      <Droppable key="myTeam" droppableId="myTeam">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classes.teamInfo}
          >
            {getTeam}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Team;
