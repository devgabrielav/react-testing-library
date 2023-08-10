import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Teste se a página contém as informações sobre a Pokédex.', () => {
  renderWithRouter(<About />);

  const text1 = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon.';
  const text2 = 'One can filter Pokémon by type, and see more details for each one of them.';
  const getText1 = screen.getByText(text1);
  const getText2 = screen.getByText(text2);

  expect(getText1).toBeInTheDocument();
  expect(getText2).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
  renderWithRouter(<About />);
  const headingAbout = screen.getByRole('heading', { level: 2 });

  expect(headingAbout).toBeInTheDocument();
  expect(headingAbout).toHaveTextContent('About Pokédex');
});

test('Teste se a página contém a imagem de uma Pokédex', () => {
  renderWithRouter(<About />);

  const image = screen.getByRole('img');

  expect(image).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
