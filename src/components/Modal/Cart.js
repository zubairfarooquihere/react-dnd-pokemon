import Modal from "./Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
  let { pokemon } = props;
  const img = pokemon.pokedexImg.front_default;

  const capitalizeAndReplace = (inputString) =>
    typeof inputString !== "string" || inputString.length === 0
      ? inputString
      : inputString
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

  // const inputString = "cloud-nine";
  // const result = capitalizeAndReplace(inputString);
  // console.log(result); // Output: "Cloud Nine"

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.card}>
        <div className={classes["top-section"]}>
          <div className={classes.border}>
            <span>{capitalizeAndReplace(pokemon.name)}</span>
          </div>
          <img className={classes.image} src={img} alt={pokemon.name} />
        </div>
        <div className={classes["bottom-section"]}>
          <span className={classes.title}>ABILITIES</span>
          <div className={classes.row}>
            <div className={classes.item}>
              <span className={classes["big-text"]}>
                {capitalizeAndReplace(pokemon.pokedexAbilities[0])}
              </span>
            </div>
            {pokemon.pokedexAbilities[1] && (
              <div className={classes.item}>
                <span className={classes["big-text"]}>
                  {capitalizeAndReplace(pokemon.pokedexAbilities[1])}
                </span>
              </div>
            )}
            {pokemon.pokedexAbilities[2] && (
              <div className={classes.item}>
                <span className={classes["big-text"]}>
                  {capitalizeAndReplace(pokemon.pokedexAbilities[2])}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className={classes["bottom-section"]}>
          <span className={classes.title}>INITIATE MOVES</span>
          <div className={classes.row}>
            <div className={classes.item}>
              <span className={classes["big-text"]}>
                {capitalizeAndReplace(pokemon.pokedexMoves[0])}
              </span>
            </div>
            <div className={classes.item}>
              <span className={classes["big-text"]}>
                {capitalizeAndReplace(pokemon.pokedexMoves[1])}
              </span>
            </div>
            <div className={classes.item}>
              <span className={classes["big-text"]}>
                {capitalizeAndReplace(pokemon.pokedexMoves[2])}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default Cart;
