export const initialState = {
    countries: [],
    searchResult: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_COUNTRIES":
            return { ...state, countries: action.payload.data }
        case "SEARCH_COUNTRY":
            //if (action.payload.query === null || action.payload.query.trim() === "") return state
            return { ...state, searchResult: [...state.countries.filter((country) => country.name.startsWith(action.payload.query))] }
        default: return state
    }
}

export default reducer;