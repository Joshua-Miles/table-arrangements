import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.body.appendChild(document.createElement("div"));
rootElement.style.height = `98vh`;
rootElement.style.display = 'flex';
rootElement.style.flexDirection = 'column';

document.body.style.margin = '0px';

const root = createRoot(
  rootElement
);

root.render(
    <App />
);
