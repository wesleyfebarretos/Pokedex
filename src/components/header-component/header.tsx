/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import { Pokemon } from '../../dto/pokemon-dto';
import logo from '../../images/logotype.png';
import colorByType from '../../utils/types-color.utils';
import './header.css';

interface UpdateState {
  onChangeSearchBar: (param: string) => void;
  onChangeSelect: (param: string) => void;
  pokemons: Pokemon[];
}

export default function Header(headerState: UpdateState) {
  const { onChangeSearchBar, onChangeSelect, pokemons } = headerState;
  const [selectValue, setSelectValue] = useState('');
  const [searchBarValue, setSearchBarValue] = useState('');
  const [selectBackground, setSelectBackground] = useState('');
  const typesArray: string[] = [];

  return (
    <header className="header container">
      <img src={logo} alt="site logo" className="header-img" />
      <div className="filter-header">
        <select
          value={selectValue}
          style={{ background: selectBackground }}
          name=""
          id="types"
          className="filter-select"
          onChange={(e) => {
            setSelectValue(e.target.value);
            setSelectBackground(colorByType[e.target.value.toUpperCase()]);
            onChangeSelect(e.target.value);
          }}
        >
          <option
            style={{ background: '#FFF' }}
            value=""
            className="select-types"
          >
            none
          </option>
          {pokemons.map(({ types }) =>
            types.map(({ type }) => typesArray.push(type.name))
          )}

          {[...new Set(typesArray)].map((type) => (
            <option
              style={{ background: colorByType[type.toUpperCase()] }}
              className="select-types"
              key={type}
            >
              {type}
            </option>
          ))}
        </select>
        <input
          value={searchBarValue}
          type="text"
          className="filter-searchbar"
          onChange={(e) => {
            onChangeSearchBar(e.target.value);
            setSearchBarValue(e.target.value);
          }}
        />
        <button
          type="button"
          className="filter-reset"
          onClick={() => {
            onChangeSelect('');
            onChangeSearchBar('');
            setSearchBarValue('');
            setSelectValue('none');
            setSelectBackground('#FFF');
          }}
        >
          reset
        </button>
      </div>
    </header>
  );
}
