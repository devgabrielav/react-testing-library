import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const linksNames = ['Home', 'About', 'Favorite Pokémon'];
const roleL = 'link';
const roleH = 'heading';

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);

  linksNames.forEach((nameL) => {
    screen.getByRole(roleL, { name: nameL });
  });
});

test('Teste se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação', async () => {
  const { user } = renderWithRouter(<App />);

  const linkHome = screen.getByRole(roleL, { name: linksNames[0] });
  await user.click(linkHome);

  expect(screen.getByRole(roleH, { name: 'Encountered Pokémon' })).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', async () => {
  const { user } = renderWithRouter(<App />);

  const linkHome = screen.getByRole(roleL, { name: linksNames[1] });
  await user.click(linkHome);

  expect(screen.getByRole(roleH, { name: 'About Pokédex' })).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', async () => {
  const { user } = renderWithRouter(<App />);

  const linkHome = screen.getByRole(roleL, { name: linksNames[2] });
  await user.click(linkHome);

  expect(screen.getByRole(roleH, { name: linksNames[2] })).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
  renderWithRouter(<App />, { route: '/random' });

  expect(screen.getByRole(roleH, { name: 'Page requested not found' })).toBeInTheDocument();
});
