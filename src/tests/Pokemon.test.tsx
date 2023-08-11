import { screen } from '@testing-library/react';
import { Pokemon } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
  renderWithRouter(
    <Pokemon
      pokemon={ pokemonList[0] }
      showDetailsLink
      isFavorite={ false }
    />,
  );
  const nome = screen.getByText('Pikachu');
  const tipo = screen.getByText(pokemonList[0].type);
  const peso = screen.getByText('Average weight: 6.0 kg');
  const image = screen.getByAltText('Pikachu sprite') as HTMLImageElement;
  const detalhes = screen.getByRole('link', { name: 'More details' });

  expect(nome).toBeInTheDocument();
  expect(tipo).toBeInTheDocument();
  expect(peso).toBeInTheDocument();
  expect(image).toBeInTheDocument();
  expect(image.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  expect(detalhes).toHaveAttribute('href', `/pokemon/${pokemonList[0].id}`);
});

test('Teste se existe um ícone de estrela nos Pokémon favoritados', async () => {
  const { user } = renderWithRouter(<App />);

  const detalhesF = screen.getByRole('link', { name: 'More details' });

  await user.click(detalhesF);
  const linkToFavorites = screen.getByRole('link', { name: 'Favorite Pokémon' });
  const checkboxFav = screen.getByRole('checkbox');
  await user.click(checkboxFav);
  await user.click(linkToFavorites);
  const star = screen.getByAltText(`${pokemonList[0].name} is marked as favorite`);
  expect(star).toHaveAttribute('src', '/star-icon.png');
});
