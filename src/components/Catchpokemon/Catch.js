import React, { useState, useCallback } from "react";
import { Droppable } from "react-beautiful-dnd";

import classes from "./Catch.module.css";

import Card from "../ui/Card/Card";
import Button from "../ui/Button/Button";

const capitalizeAndReplace = (inputString) =>
    typeof inputString !== "string" || inputString.length === 0
      ? inputString
      : inputString
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

function Catch(props) {
  const [wildPokemon, setWildPokemon] = useState(null);

  const fetchPokemon = useCallback(async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      //console.log(data);
      return data;

    } catch (error) {}
  }, []);

  const findPokemon = async () => {
    const randomNumber = Math.floor(Math.random() * 150) + 1;
    const gotWildPokemon = await fetchPokemon(randomNumber);
    let id = gotWildPokemon.id+'';
    let name = capitalizeAndReplace(gotWildPokemon.species.name);
    let SecondType = gotWildPokemon.types[1]
      ? ", " + capitalizeAndReplace(gotWildPokemon.types[1].type.name)
      : "";
    let type = capitalizeAndReplace(gotWildPokemon.types[0].type.name) + SecondType;
    let img = gotWildPokemon.sprites.front_default;

    //Pokedex
    let pokedexImg = gotWildPokemon.sprites.other.dream_world;
    let moveSecond = gotWildPokemon.moves[1] ? gotWildPokemon.moves[1].move.name : null;
    let moveThird = gotWildPokemon.moves[2] ? gotWildPokemon.moves[2].move.name : null;
    let pokedexMoves = [gotWildPokemon.moves[0].move.name, moveSecond, moveThird];

    let abilitySecond = gotWildPokemon.abilities[1] ? gotWildPokemon.abilities[1].ability.name : null;
    let abilityThird = gotWildPokemon.abilities[2] ? gotWildPokemon.abilities[2].ability.name : null;
    let pokedexAbilities = [gotWildPokemon.abilities[0].ability.name, abilitySecond, abilityThird];

    if(props.pokemonState.pokemons[id]) {
      for(let i = 2; i <= 100; i++) {
        //To create unique ID for same pokemons
        let newId = id+'-'+i;
        if(!props.pokemonState.pokemons[newId]){
          id = newId;
          break;
        }
      }
    }

    setWildPokemon({ id, name, type, img, pokedexImg, pokedexMoves, pokedexAbilities });
    props.gotWild({ id, name, type, img, pokedexImg, pokedexMoves, pokedexAbilities }, setWildPokemon);
  };

  return (
    <div className={classes.layout}>
      <Droppable droppableId="catch-droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classes.pokemonLocation}
          >
            {wildPokemon && (
              <Card
                name={wildPokemon.name}
                type={wildPokemon.type}
                img={wildPokemon.img}
                index={0}
                id={"catch-droppable"}
              />
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className={classes.btn}>
        <Button onClick={findPokemon}>Find Pokemon</Button>
      </div>
    </div>
  );
}

export default Catch;
