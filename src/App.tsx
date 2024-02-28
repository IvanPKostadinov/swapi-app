import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { HomePage } from 'pages/Home';
import { ItemsPage } from 'pages/Items';
import { ItemDetails } from 'components/Items/ItemDetails';

enum Params {
  TYPE = 'type',
  ID = 'id',
}

export type RouteParams = Record<Params, string>;

const App = (): JSX.Element => {
  return (
    <main>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path={`/:${Params.TYPE}`} element={<ItemsPage />}>
          <Route path={`:${Params.ID}`} element={<ItemDetails isDesktop />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
