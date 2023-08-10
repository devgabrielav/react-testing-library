import { screen } from '@testing-library/react';
import App from '../App';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito', () => {
  renderWithRouter(<FavoritePokemon />);

  expect(screen.getByText('No favorite Pokémon found')).toBeInTheDocument();
});

test('Apenas são exibidos os Pokémon favoritados', async () => {
  const { user } = renderWithRouter(<App />);

  const detalhes = screen.getByRole('link', { name: 'More details' });
  await user.click(detalhes);

  const favoritar = screen.getByRole('checkbox');
  await user.click(favoritar);

  const goToFavorites = screen.getByRole('link', { name: 'Favorite Pokémon' });
  await user.click(goToFavorites);

  const nomeP = screen.getByText('Pikachu');
  const star = screen.getByAltText('Pikachu is marked as favorite');
  const tipoP = screen.getByText('Electric');
  const pesoP = screen.getByText('Average weight: 6.0 kg');
  const imagemP = screen.getByAltText('Pikachu sprite');
  const detalhesF = screen.getByRole('link', { name: 'More details' });

  expect(nomeP).toBeInTheDocument();
  expect(star).toBeInTheDocument();
  expect(tipoP).toBeInTheDocument();
  expect(pesoP).toBeInTheDocument();
  expect(imagemP).toBeInTheDocument();
  expect(detalhesF).toBeInTheDocument();
});
