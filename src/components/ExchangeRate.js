import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { actionCreatorsAPI } from '../store/ExchangeCurrencies';


class ExchangeRate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: 'none',
            ChangeExchangeCurrencies: 'AED',
            changeExchangeCurrenciesTo:'AED'
        };
        this.covertExchange = this.covertExchange.bind(this);
        this.handleChangeExchangeCurrencies = this.handleChangeExchangeCurrencies.bind(this);
        this.exchangeCurrenciesTo = this.exchangeCurrenciesTo.bind(this);
        this.handleChangeInputText = this.handleChangeInputText.bind(this);
        this.showConvertRate = this.showConvertRate.bind(this);
        this.checkConvertRate = this.checkConvertRate.bind(this);

    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate() {
        // This method is called when the route parameters change
        if (this.props.forceReload) {
            this.fetchData();
        }
    }

    covertExchange() {

        var inputCurrenciesAmount = this.state.textInputAmountVal;
        if (inputCurrenciesAmount == "") {
            this.setState({ errorMessage: "Please Enter Amount" });
            return;
        }
        else
        {
            this.setState({ errorMessage: "" });
        }

        var changeExchangeCurrenciesFrom = this.state.ChangeExchangeCurrencies;
        var changeExchangeCurrenciesTo = this.state.exchangeCurrenciesTo;
        var currenciesFrom = this.props.exchanges.exchanges.conversion_rates[changeExchangeCurrenciesFrom]
        var currenciesTo = this.props.exchanges.exchanges.conversion_rates[changeExchangeCurrenciesTo];
        var totalConvertAmount = (inputCurrenciesAmount * currenciesTo) / currenciesFrom;
        this.setState({ totalAmount: totalConvertAmount });
        this.setState({ currenciesCode: changeExchangeCurrenciesTo });
        this.setState({ conversion_rates: JSON.stringify(this.props.exchanges.exchanges.conversion_rates) });

    }

    showConvertRate() {
        debugger;
        var isVisible = this.state.isVisible;
        if (isVisible == 'none') {
            this.setState({ isVisible: '' });
        }
        if (isVisible == '')
        {
            this.setState({ isVisible: 'none' });
        }
         
    }

    handleChangeExchangeCurrencies(e) {
        this.setState({ ChangeExchangeCurrencies: e.target.value });
    }
    checkConvertRate(e) {
        debugger;
        this.setState({ convertRate: e.target.value });
        var convertRate = this.props.exchanges.exchanges.conversion_rates[e.target.value];
        this.setState({ convertRateRup: convertRate });

    }
    exchangeCurrenciesTo(e) {
        this.setState({ exchangeCurrenciesTo: e.target.value });
    }
    handleChangeInputText(e) {
        this.setState({ textInputAmountVal: e.target.value });
    }

    fetchData() {
        this.props.requestExchangeCurrencies();
    }
    render() {
        
        let countriesList = [];
        if (this.props.exchanges.exchangescode != null) {
            if (this.props.exchanges.exchangescode.result == "success") {
                countriesList = this.props.exchanges.exchangescode.supported_codes.length > 0
                    && this.props.exchanges.exchangescode.supported_codes.map((item, i) => {
                        return (
                            <option key={item[0]} value={item[0]}>{item[1]}</option>
                        )
                    }, this);
            }
        }
        return (
            <div>
                <table >
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><select value={this.state.convertRate} name="exchangeCurrencies" id="exchangeCurrencies" onChange={this.checkConvertRate}>
                            {countriesList}
                        </select>
                        </td>
                        <td></td>
                        <td><label htmlFor="exchangeCurrencieslbl">Convert Rate Against 1 USD :</label>{this.state.convertRateRup}</td>
                        <td>&nbsp;</td>
                    </tr>
                </table>
               
            </div>
        )
    }
}

//Make contacts array available in  props
function mapStateToProps(state) {
    return {
        exchanges: state.exchanges.exchangeslist,
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreatorsAPI, dispatch),
)(ExchangeRate);