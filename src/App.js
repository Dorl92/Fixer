import React from 'react';
//contexts
import { AuthProvider } from './contexts/authContext';
import { ServicesProvider } from './contexts/servicesContext';
import { UsersProvider } from './contexts/usersContext';
import { PurchasesProvider } from './contexts/purchasesContext';
import { ReviewsProvider } from './contexts/reviewsContext';
//components
import FixerApp from './FixerApp';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <UsersProvider>
          <ServicesProvider>
            <PurchasesProvider>
              <ReviewsProvider>
                <FixerApp />
              </ReviewsProvider>
            </PurchasesProvider>
          </ServicesProvider>
        </UsersProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

