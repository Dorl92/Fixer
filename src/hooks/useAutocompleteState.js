import { useState } from 'react';

export default () => {
    const [value, setValue] = useState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: ""
    });
    }
    return  [value, setValue];
}