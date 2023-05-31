/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import Card from './components/card-component/card';
import Header from './components/header-component/header';
import Loading from './components/loading/loading';
import PrevOrNextPage from './components/prev-next-component/prev-next';
import { Pokemon } from './dto/pokemon-dto';

interface Filters {
  searchBar: string;
  select: string;
}

function App() {
  const [pokemons, setPokemon] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    searchBar: '',
    select: '',
  });
  const [loader, setLoader] = useState<boolean>(false);

  function updateDecreaseSetPage() {
    if (page === 1) return;

    setPage((state) => state - 1);
  }

  function updatePlusSetPage() {
    setPage((state) => state + 1);
  }

  function updateSetFiltersSearchBar(searchBarValue: string) {
    setFilters((state) => ({
      searchBar: searchBarValue,
      select: state.select,
    }));
  }

  function updateSetFiltersSelect(selectValue: string) {
    setFilters((state) => ({
      searchBar: state.searchBar,
      select: selectValue,
    }));
  }

  async function fetchPokemon(offset: number) {
    setLoader(true);
    const result = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=24&offset=${offset}`
    );

    const { results } = await result.json();

    await Promise.all(
      results.map(async (pokemonsList: any) => {
        const fetchedPokemon = await fetch(pokemonsList.url);
        const resultPokemon = await fetchedPokemon.json();

        setPokemon((state) => [...state, resultPokemon]);
      })
    );
    setLoader(false);
  }

  function filterAndLoadPokemon() {
    const { searchBar, select } = filters;

    return pokemons
      .filter((pokemon) => {
        if (searchBar !== '' && select !== '') {
          return (
            pokemon.types
              .map(({ type }) => type.name.toUpperCase())
              .includes(select.toUpperCase()) &&
            pokemon.name.toUpperCase().includes(searchBar.toUpperCase())
          );
        }

        if (searchBar !== '') {
          return pokemon.name.toUpperCase().includes(searchBar.toUpperCase());
        }

        if (select !== '') {
          return pokemon.types
            .map(({ type }) => type.name.toUpperCase())
            .includes(select.toUpperCase());
        }

        return pokemons;
      })
      .map((pokemon: Pokemon) => <Card key={pokemon.id} {...pokemon} />);
  }

  useEffect(() => {
    setPokemon([]);
    fetchPokemon(24 * (page - 1));
  }, [page]);

  return (
    <div className="App">
      <Header
        onChangeSearchBar={updateSetFiltersSearchBar}
        onChangeSelect={updateSetFiltersSelect}
        pokemons={pokemons}
      />

      <main className="main container">
        <PrevOrNextPage
          onClickNext={updatePlusSetPage}
          onClickPrev={updateDecreaseSetPage}
          page={page}
        />
        {loader ? (
          <Loading />
        ) : (
          <ul className="card-container">{filterAndLoadPokemon()}</ul>
        )}
      </main>
    </div>
  );
}

export default App;
