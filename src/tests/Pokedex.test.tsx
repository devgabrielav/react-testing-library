import { screen } from '@testing-library/react';
import { Pokedex } from '../pages';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

test('Teste se a página contém um heading h2 com o texto Encountered Pokémon.', async () => {
  const { user } = renderWithRouter(<Pokedex pokemonList={pokemonList} favoritePokemonIdsObj={{}} />);
  const titulo = screen.getByRole('heading', { name: 'Encountered Pokémon' });
  const buttonNext = screen.getByRole('button', { name: 'Próximo Pokémon' });

  expect(titulo).toBeInTheDocument();
  expect(screen.getByText(pokemonList[0].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[1].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[2].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[3].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[4].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[5].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[6].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[7].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[8].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[0].name)).toBeInTheDocument();
});

test('Teste se a Pokédex tem os botões de filtro', async () => {
  const { user } = renderWithRouter(<Pokedex pokemonList={pokemonList} favoritePokemonIdsObj={{}} />);
  const buttons = screen.getAllByTestId('pokemon-type-button');
  const buttonA = screen.getByRole('button', { name: 'All' });
  const buttonFire = screen.getByRole('button', { name: 'Fire' });
  const buttonNext = screen.getByRole('button', { name: 'Próximo Pokémon' });

  buttons.forEach((button) => {
    expect(button).toBeInTheDocument();
  });

  expect(buttonA).toBeInTheDocument();
  await user.click(buttonFire);
  expect(screen.getByText('Charmander')).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText('Rapidash')).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText('Charmander')).toBeInTheDocument();
  await user.click(buttonA);
  expect(screen.getByText(pokemonList[0].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[1].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[2].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[3].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[4].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[5].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[6].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[7].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[8].name)).toBeInTheDocument();
  await user.click(buttonNext);
  expect(screen.getByText(pokemonList[0].name)).toBeInTheDocument();
});
