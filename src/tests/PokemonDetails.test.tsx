import { screen } from '@testing-library/react';
import App from '../App';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

const role = 'link';
const role2 = 'heading';
const detailsName = 'More details';
const pokemonFav = 'Favorite Pokémon';
const pokeN = pokemonList[0].name;

test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', async () => {
  const { user } = renderWithRouter(<App />);
  const detalhesF1 = screen.getByRole(role, { name: detailsName });
  await user.click(detalhesF1);
  const linkToFavorites = screen.getByRole(role, { name: pokemonFav });
  const checkboxFav = screen.getByRole('checkbox');
  await user.click(checkboxFav);
  await user.click(linkToFavorites);
  const detalhesDoF = screen.getByRole(role, { name: detailsName });
  await user.click(detalhesDoF);

  expect(screen.getByRole(role2, { name: `${pokemonList[0].name} Details` }))
    .toBeInTheDocument();
  expect(screen.queryByRole(role, { name: detailsName })).not.toBeInTheDocument();
  expect(screen.getByRole(role2, { name: 'Summary' })).toBeInTheDocument();
  expect(screen
    .getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.'))
    .toBeInTheDocument();
  expect(screen
    .getByRole(role2, { name: `Game Locations of ${pokeN}` })).toBeInTheDocument();
});

test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', async () => {
  const { user } = renderWithRouter(<App />);

  const linkToFavoritess = screen.getByRole(role, { name: pokemonFav });
  await user.click(linkToFavoritess);
  const detalhesDoFa = screen.getByRole(role, { name: detailsName });
  await user.click(detalhesDoFa);

  expect(screen
    .getByRole(role2, { name: `Game Locations of ${pokeN}` })).toBeInTheDocument();
  expect(screen.getByText('Kanto Viridian Forest')).toBeInTheDocument();
  expect(screen.getByText('Kanto Power Plant')).toBeInTheDocument();

  const maps = screen.getAllByAltText(`${pokemonList[0].name} location`);
  expect(maps[0]).toHaveProperty('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
  expect(maps[1]).toHaveProperty('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
});

test('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
  const { user } = renderWithRouter(<App />);

  const linkToFavoritesm = screen.getByRole(role, { name: pokemonFav });
  await user.click(linkToFavoritesm);
  const detalhesDoFam = screen.getByRole(role, { name: detailsName });
  await user.click(detalhesDoFam);

  const checkboxFave = screen.getByLabelText('Pokémon favoritado?');

  expect(checkboxFave).toHaveProperty('checked', true);
  await user.click(checkboxFave);
  expect(checkboxFave).toHaveProperty('checked', false);
  await user.click(checkboxFave);
  expect(checkboxFave).toHaveProperty('checked', true);
});
