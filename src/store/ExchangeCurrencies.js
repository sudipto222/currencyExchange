const initialState = {
    exchangeslist: [],
    loading: false,
    errors: {},
    forceReload: false
}
export const actionCreatorsAPI = {
    requestExchangeCurrencies: () => async (dispatch, getState) => {

        var url = "https://v6.exchangerate-api.com/v6/c267ae4629e1b5128a1cec5e/latest/USD";
        const response1 = await fetch(url);
        const exchanges = await response1.json();

        var url = "https://v6.exchangerate-api.com/v6/c267ae4629e1b5128a1cec5e/codes";
        const response = await fetch(url);
        const exchangescode = await response.json();

        dispatch({ type: 'EXCHANGE_CURRENCIES', exchangeslist: { exchangescode, exchanges} });
    }
};
export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'EXCHANGE_CURRENCIES': {
            return {
                ...state,
                exchangeslist: action.exchangeslist,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        default:
            return state;
    }
};
