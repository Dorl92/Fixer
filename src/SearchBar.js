import React, { useState } from 'react';
//utils
import { searchData } from './utils/searchData';
import { withRouter } from 'react-router-dom';
//contexts
import { useServicesContext } from './contexts/servicesContext';
//style
import styles from './styles/SearchBarStyles';
//material-ui
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/styles';

function AutocompleteSearch(props) {
    const { classes, history } = props;
    
    const { services } = useServicesContext();

    const [state, setState] = useState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: ""
    });

    const { filteredSuggestions, showSuggestions, userInput } = state;

    const onSearchChange = evt => {
        const userInput = evt.currentTarget.value;
        const filteredSuggestions = searchData(services).filter(
            category => category.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: evt.currentTarget.value
        });
    };

    const onSearchClick = evt => {
        setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: evt.currentTarget.innerText
        });
    };

    const onSearchKeyDown = evt => {
        const { activeSuggestion, filteredSuggestions } = state;
        if (evt.keyCode === 13) {
            setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        } else if (evt.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            setState({
                activeSuggestion: activeSuggestion - 1
            });
        }
        else if (evt.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            setState({
                activeSuggestion: activeSuggestion + 1
            });
        }
    };

    const handleSearch = () => {
        history.push(`/services/${userInput.toLowerCase()}`)
    }

    let suggestionsListComponent;
    if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (
                <ul className={classes.suggestions} >
                    {
                        filteredSuggestions.map(suggestion => {

                            return (
                                <li key={suggestion} onClick={onSearchClick}>
                                    {suggestion}
                                </li>
                            );
                        })
                    }
                </ul>
            );
        } else {
            suggestionsListComponent = (
                <ul className={classes.noSuggestions}>
                    <li>None, you're on your own!</li>
                </ul>
            );
        }
    }

    return (

        <div className={classes.searchBar}>
            <span className={classes.searchIcon}>
                <SearchIcon />
            </span>
            <div className={classes.input}>
                <input
                    value={userInput}
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown}
                    label="Search a service"
                    variant="outlined"
                    placeholder="Search..."
                />
                {suggestionsListComponent}
            </div>
            <button onClick={handleSearch} className={classes.searchButton}>Search</button>
        </div>
    );
}

export default withRouter(withStyles(styles)(AutocompleteSearch));
