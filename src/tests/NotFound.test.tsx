import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste o componente <NotFound.tsx />', () => {
  renderWithRouter(<App />, { route: '/random' });
  const aspa = '\'';
  const titulo = screen.getByRole('heading', { name: 'Page requested not found' });
  const image = screen.getByAltText(
    `Clefairy pushing buttons randomly with text I have no idea what i${aspa}m doing`,
  );

  expect(titulo).toBeInTheDocument();
  expect(image).toBeInTheDocument();
});
