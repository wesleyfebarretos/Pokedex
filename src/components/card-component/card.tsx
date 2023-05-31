/* eslint-disable react/destructuring-assignment */
import { Pokemon } from '../../dto/pokemon-dto';
import colorByType from '../../utils/types-color.utils';
import './card.css';

export default function Card(pokemon: Pokemon) {
  const { id, name, sprites, types } = pokemon;

  return (
    <li
      style={{
        order: id,
        background: types[1]
          ? `linear-gradient(90deg,${
              colorByType[types[0].type.name.toUpperCase()]
            }, ${colorByType[types[1].type.name.toUpperCase()]})`
          : colorByType[types[0].type.name.toUpperCase()],
      }}
      className="card"
    >
      <p className="card-id">{id}</p>
      <div className="card-img-container">
        <div className="img-light" />
        <img src={sprites.front_default} alt="" className="	card-img" />
      </div>
      <h2 className="card-name">{name}</h2>
      <div className="types-container">
        <p
          style={{ background: colorByType[types[0].type.name.toUpperCase()] }}
          className="first-type"
        >
          {types[0].type.name}
        </p>
        {types[1] ? (
          <p
            style={{
              background: colorByType[types[1].type.name.toUpperCase()],
            }}
            className="second-type"
          >
            {types[1].type.name}
          </p>
        ) : null}
      </div>
    </li>
  );
}
