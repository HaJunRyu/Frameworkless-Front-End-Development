import createTemplate from '../utils/createTemplate.js';

const Header = () => {
  const header = createTemplate(`
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autofocus />
    </header>
  `);

  return header;
};

export default Header;
