import ReactDom from 'react-dom/client';
import App from './app';
import React from 'react';
import './index.less';

ReactDom.createRoot(document.getElementById("root") as Element).render(<App />);