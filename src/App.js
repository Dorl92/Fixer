import React, { useEffect } from 'react';
import { useAuth } from './contexts/authContext';
import { Route, Switch } from 'react-router-dom';
import { database } from "./firebase";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Page from './Page';
import useServicesState from './hooks/useServicesState';
import useUsersState from './hooks/useUsersState';
import usePurchasesState from './hooks/usePurchasesState';
import useReviewState from './hooks/useReviewState';

import Home from './Home';
import ServicesList from './ServicesList';
import NewServiceForm from './NewServiceForm';
import EditServiceForm from './EditServiceForm';
import FavoritesServices from './FavoritesServices';
import ServiceInfo from './ServiceInfo';
import Signup from './Signup';
import NewSellerForm from './NewSellerForm';
import Login from './Login';
import UserInfo from './UserInfo';

function App() {

  const { services, setServices, addNewService, removeService, editService } = useServicesState([]);
  const { users, setUsers, addNewUser, editUser, addNewSeller } = useUsersState([]);
  const { purchases, setPurchases, addNewPurchase, editPurchase, removePurchase } = usePurchasesState([]);
  const { reviews, setReviews, addNewReview, removeReview, editReview } = useReviewState([]);

  useEffect(() => {
    const fetchData = async () => {
      await database.ref('users/')
        .on('value', (snapshot) => {
          const data = snapshot.val();
          setUsers(data && Object.values(data))
        })
      await database.ref('services/')
        .on('value', (snapshot) => {
          const data = snapshot.val();
          setServices(data && Object.values(data))
        })
      await database.ref('reviews/')
        .on('value', (snapshot) => {
          const data = snapshot.val();
          setReviews(data && Object.values(data))
        })
      await database.ref('purchases/')
        .on('value', (snapshot) => {
          const data = snapshot.val();
          setPurchases(data && Object.values(data))
        })
    }
    fetchData();
  }, []);
 
  const searchData = new Set();

  if (services) {
    services.map(service => !searchData.has(service.category) && searchData.add(service.category))
    services.map(service => !searchData.has(service.subcategory) && searchData.add(service.subcategory))
  }

  const { loggedUser, currentUser } = useAuth();

  const findService = (id) => {
    return services.find(service => service.serviceId === id);
  };

  return (
    <div className="App">
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={500} classNames="Page">
            <Switch location={location}>
              <Route exact path="/" render={(routePros) =>
                <Page>
                  <Home
                    {...routePros}
                    searchData={Array.from(searchData)} /></Page>}
              />
              {loggedUser && loggedUser.isSeller &&
                <Route exact path="/services/new" render={(routePros) =>
                  <Page>
                    <NewServiceForm
                      {...routePros}
                      addNewService={addNewService}
                      services={services}
                      loggedUser={loggedUser} /></Page>}
                />
              }
              {!loggedUser &&
                <Route exact path="/signup" render={(routePros) =>
                  <Page>
                    <Signup
                      addNewUser={addNewUser}
                      {...routePros} /></Page>}
                />
              }
              <Route exact path="/signup/new-seller" render={(routePros) =>
                <Page>
                  <NewSellerForm
                    {...routePros}
                    addNewSeller={addNewSeller} /></Page>}
              />
              {!loggedUser &&
                <Route exact path="/login" render={(routePros) =>
                  <Page>
                    <Login
                      {...routePros} /></Page>}
                />
              }
              <Route exact path="/services" render={(routePros) =>
                <Page>
                  <ServicesList
                    {...routePros}
                    services={services}
                    purchases={purchases}
                    removePurchase={removePurchase}
                    removeService={removeService}
                    editUser={editUser} /></Page>}
              />
              <Route exact path="/services/:serviceId/info" render={(routePros) =>
                <Page>
                  <ServiceInfo
                    {...routePros}
                    reviews={reviews}
                    addNewPurchase={addNewPurchase}
                    removeReview={removeReview}
                    addNewReview={addNewReview}
                    editService={editService}
                    service={findService(routePros.match.params.serviceId)} /></Page>}
              />
              {loggedUser &&
                <Route exact path="/favorites" render={(routePros) =>
                  <Page>
                    <FavoritesServices
                      {...routePros}
                      services={services}
                      removeService={removeService}
                      editUser={editUser} /></Page>}
                />
              }
              <Route exact path="/services/:id/edit" render={(routePros) =>
                <Page>
                  <EditServiceForm
                    {...routePros}
                    services={services}
                    serviceToEdit={findService(routePros.match.params.id)}
                    editService={editService} /></Page>}
              />
              <Route exact path="/services/:category" render={(routePros) =>
                <Page>
                  <ServicesList
                    {...routePros}
                    editUser={editUser}
                    services={services}
                    purchases={purchases}
                    removePurchase={removePurchase}
                    category={routePros.match.params.category}
                    removeService={removeService} /></Page>}
              />
              <Route exact path="/user-info/:userId" render={(routePros) =>
                <Page>
                  <UserInfo
                    {...routePros}
                    services={services}
                    users={users}
                    editPurchase={editPurchase}
                    editUser={editUser}
                  /></Page>}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    </div>
  );
}

export default App;

