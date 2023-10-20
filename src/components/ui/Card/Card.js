import React, { Fragment, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import classes from "./Card.module.css";
import Cart from "../../Modal/Cart";

//ICONS
import { PiInfoLight } from "react-icons/pi";
import { ImCross } from "react-icons/im";

function Card(props) {
  const { id, droppableId, index, pokemon } = props;
  const [showInfo, setInfo] = useState(false);

  const onCheck = () => {
    setInfo(true);
  };

  const onRemove = () => {
    props.dispatchPokemon({ type: "remove", id, droppableId, index });
  };

  const getColor = (type) => {
    //console.log(type);
    if (type === "Fire") {
      return { light: "#FF9999", medium: "#FF6666", dark: "#E63900" };
    } else if (type === "Water") {
      return { light: "#ADD8E6", medium: "#6495ED", dark: "#00008B" };
    } else if (type === "Grass") {
      return { light: "#C2F0A5", medium: "#66B032", dark: "#3C6A1C" };
    } else if (type === "Poison") {
      return { light: "#B86BF2", medium: "#9852D4", dark: "#7A3DAA" };
    } else if (type === "Psychic") {
      return { light: "#B47EFC", medium: "#4E73E6", dark: "#6B28D4" };
    } else if (type === "Ice") {
      return { light: "#A0E9E0", medium: "#68C3D4", dark: "#3A8D9E" };
    } else if (type === "Bug") {
      return { light: "#A8B820", medium: "#8C8C2A", dark: "#6C6842" };
    } else if (type === "Fighting") {
      return { light: "#D56723", medium: "#A1390F", dark: "#7E2B0A" };
    } else if (type === "Dragon") {
      return { light: "rgb(217, 202, 255)", medium: "rgb(170, 143, 223)", dark: "#21046B" };
    }else if (type === "Ground") {
      return { light: "#E0C068", medium: "#8B6914", dark: "#6D4E1E" };
    }else if (type === "Rock") {
      return { light: "#C5B291", medium: "#A79775", dark: "#91875C" };
    }else if (type === "Ghost") {
      return { light: "#F5F5F5", medium: "#D3D3D3", dark: "#A9A9A9" };
    }else if (type === "Electric") {
      return { light: "#FFECB3", medium: "#FFD54F", dark: "#FFC107" };
    }
    
    
    return {light: "#E5E5E5", medium: "#CCCCCC", dark: "#B2B2B2"};
  };

  const {light, medium} = getColor(props.type.split(",")[0]);

  return (
    <Fragment>
      {showInfo && (
        <Cart
          pokemon={pokemon}
          onClose={() => {
            setInfo(false);
          }}
        />
      )}
      <Draggable key={props.id} draggableId={props.id} index={props.index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={classes.card}
          >
            <div
              style={{ backgroundColor: medium }}
              className={classes.imageDiv}
            >
              <img src={props.img} alt={props.name} />
            </div>
            <div
              style={{ backgroundColor: light }}
              className={classes.info}
            >
              <h3 className={classes.h3}>{props.name}</h3>
              <div className={classes.type}>{props.type}</div>
            </div>
            {id !== "catch-droppable" && (
              <div onClick={onCheck} className={classes.detailCard}>
                <PiInfoLight />
              </div>
            )}
            {id !== "catch-droppable" && (
              <div onClick={onRemove} className={classes.removeCard}>
                <ImCross />
              </div>
            )}
          </div>
        )}
      </Draggable>
    </Fragment>
  );
}
//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
export default Card;
