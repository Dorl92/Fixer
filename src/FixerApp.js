import React, { useEffect } from 'react';
import { database } from "./firebase";
import { Route, Switch } from 'react-router-dom';
//style
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//contexts
import { useAuth } from './contexts/authContext';
import { useServicesContext } from './contexts/servicesContext';
import { useUsersContext } from './contexts/usersContext';
import { usePurchasesContext } from './contexts/purchasesContext';
import { useReviewsContext } from './contexts/reviewsContext';
//components
import Page from './Page';
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
//material-ui
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

function FixerApp() {

    const { loggedUser } = useAuth();
    const { services, setServices } = useServicesContext();
    const { setUsers } = useUsersContext();
    const { setPurchases } = usePurchasesContext();
    const { setReviews } = useReviewsContext();

    const fetchData = async () => {
        database.ref('users/')
            .on('value', (snapshot) => {
                const data = snapshot.val();
                setUsers(data && Object.values(data))
            })
        database.ref('services/')
            .on('value', (snapshot) => {
                const data = snapshot.val();
                setServices(data && Object.values(data))
            })
        database.ref('reviews/')
            .on('value', (snapshot) => {
                const data = snapshot.val();
                setReviews(data && Object.values(data))
            })
        database.ref('purchases/')
            .on('value', (snapshot) => {
                const data = snapshot.val();
                setPurchases(data && Object.values(data))
            })
    }

    useEffect(() => {
        fetchData();
    }, []);

    const findService = (id) => {
        return services.find(service => service.serviceId === id);
    }

    const THEME = createMuiTheme({
        typography: {
            "fontFamily": `"Nunito", sans-serif`,
        }
    });

    return (
        <ThemeProvider theme={THEME}>
            <div>
                <Route render={({ location }) => (
                    <TransitionGroup>
                        <CSSTransition key={location.key} timeout={500} classNames="Page">
                            <Switch location={location}>
                                <Route exact path="/" render={(routePros) =>
                                    <Page><Home {...routePros} /></Page>}
                                />
                                {loggedUser && loggedUser.isSeller &&
                                    <Route exact path="/services/new" render={(routePros) =>
                                        <Page><NewServiceForm {...routePros} /></Page>} />
                                }
                                {!loggedUser &&
                                    <Route exact path="/signup" render={(routePros) =>
                                        <Page><Signup {...routePros} /></Page>} />
                                }
                                <Route exact path="/signup/new-seller" render={(routePros) =>
                                    <Page><NewSellerForm {...routePros} /></Page>
                                }
                                />
                                {!loggedUser &&
                                    <Route exact path="/login" render={(routePros) =>
                                        <Page><Login {...routePros} /></Page>} />
                                }
                                <Route exact path="/services" render={(routePros) =>
                                    <Page><ServicesList {...routePros} /></Page>
                                }
                                />
                                <Route exact path="/services/:serviceId/info" render={(routePros) =>
                                    <Page>
                                        <ServiceInfo
                                            {...routePros}
                                            service={findService(routePros.match.params.serviceId)}
                                        />
                                    </Page>
                                }
                                />
                                {loggedUser &&
                                    <Route exact path="/favorites" render={(routePros) =>
                                        <Page><FavoritesServices {...routePros} /></Page>}
                                    />
                                }
                                <Route exact path="/services/:id/edit" render={(routePros) =>
                                    <Page>
                                        <EditServiceForm
                                            {...routePros}
                                            serviceToEdit={findService(routePros.match.params.id)}
                                        />
                                    </Page>
                                }
                                />
                                <Route exact path="/services/:category" render={(routePros) =>
                                    <Page>
                                        <ServicesList
                                            {...routePros}
                                            category={routePros.match.params.category}
                                        />
                                    </Page>}
                                />
                                <Route exact path="/user-info/:userId" render={(routePros) =>
                                    <Page><UserInfo {...routePros} /> </Page>
                                }
                                />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )} />
            </div>
        </ThemeProvider>
    );
}

export default FixerApp;

