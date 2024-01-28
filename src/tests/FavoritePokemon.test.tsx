import { screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

test('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito', () => {
  renderWithRouter(<FavoritePokemon />);

  expect(screen.getByText('No favorite Pokémon found')).toBeInTheDocument();
});

test('Apenas são exibidos os Pokémon favoritados', async () => {
  renderWithRouter(<FavoritePokemon pokemonList={[pokemonList[0]]}/>);

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
