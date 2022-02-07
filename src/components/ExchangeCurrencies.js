import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { actionCreatorsAPI } from '../store/ExchangeCurrencies';


class ExchangeCurrencies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: 'none',
            ChangeExchangeCurrencies: 'AED',
            changeExchangeCurrenciesTo: 'AED',
            convertRate:'AED'
        };
        this.covertExchange = this.covertExchange.bind(this);
        this.handleChangeExchangeCurrencies = this.handleChangeExchangeCurrencies.bind(this);
        this.exchangeCurrenciesTo = this.exchangeCurrenciesTo.bind(this);
        this.handleChangeInputText = this.handleChangeInputText.bind(this);
        this.showConvertRate = this.showConvertRate.bind(this);
        this.checkConvertRate = this.checkConvertRate.bind(this);
       /* this.setState({ ChangeExchangeCurrencies: 'AED' });*/
        

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

        debugger;
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
                        <td><label htmlFor="exchangeCurrencieslbl">Select Currency:</label></td>
                        <td> <select value={this.state.ChangeExchangeCurrencies} name="exchangeCurrencies" id="exchangeCurrencies" onChange={this.handleChangeExchangeCurrencies}>
                            {countriesList}
                        </select>
                        </td>
                        <td><label htmlFor="exchangeCurrencieslbl">Enter Amount:</label></td>
                        <td><InputText type="text" id="AmountId" name="AmountId" onChange={this.handleChangeInputText} />
                            &nbsp;&nbsp;&nbsp; <label style={{ color: 'red' }} htmlFor="exchangeCurrencieslbl">{this.state.errorMessage}</label>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td> <label htmlFor="exchangeCurrencieslbl">Convert Currency To:</label></td>
                        <td> <select value={this.state.exchangeCurrenciesTo} name="exchangeCurrenciesId" id="exchangeCurrenciesId" onChange={this.exchangeCurrenciesTo}>
                            {countriesList}
                        </select></td>
                        <td >&nbsp;&nbsp;&nbsp;</td>
                        <td><Button label="Convert Currency" icon="pi pi-plus" onClick={this.covertExchange} /></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr >

                        <td colspan="4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;<label htmlFor="exchangeCurrencieslbl">{this.state.totalAmount} <label htmlFor="exchangeCurrencieslbl">{this.state.currenciesCode}</label></label></td>

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
)(ExchangeCurrencies);