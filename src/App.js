import React from 'react';
//contexts
import { AuthProvider } from './contexts/authContext';
import { ServicesProvider } from './contexts/servicesContext';
import { UsersProvider } from './contexts/usersContext';
import { PurchasesProvider } from './contexts/purchasesContext';
import { ReviewsProvider } from './contexts/reviewsContext';
//components
import ServiceimApp from './ServiceimApp';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <UsersProvider>
          <ServicesProvider>
            <PurchasesProvider>
              <ReviewsProvider>
                <ServiceimApp />
              </ReviewsProvider>
            </PurchasesProvider>
          </ServicesProvider>
        </UsersProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

