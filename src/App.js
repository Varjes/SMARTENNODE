import React, { Component } from "react";
import Panel from "./Panel";
import getWeb3 from "./getWeb3";
import nodeContract from "./node";
import {nodeService} from "./nodeService";

const converter = (web3) =>{
    return(value)=>{
        return web3.utils.fromWei(value.toString(),'ether');
    }
}

export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: undefined,
            balance : 0,
            buys : [] ,
            sells : []
        };
    }

    async componentDidMount(){
        this.web3 = await getWeb3();
        this.nodeContract = await nodeContract(this.web3.currentProvider);
        this.toEther = converter(this.web3);
        this.nodeService = new nodeService(this.nodeContract);
        var account =(await this.web3.eth.getAccounts())[0];
        this.setState({
            account: account
        },()=>{
            this.load();
        });
    }

    async load(){
        this.getBalance();
        this.getBuys();
        this.getSells();
    }

    async getBalance(){
        let weiBalance = await this.web3.eth.getBalance(this.state.account);
        this.setState({
            balance:this.toEther(weiBalance)
        })
    }

    async getBuys(){
        let buys = await this.nodeService.getBuyTransactions();
        this.setState({
            buys
        });
    }

    async getSells(){
        let sells = await this.nodeService.getSellTransactions();
        this.setState({
            sells
        });
    }

    render() {
        return <React.Fragment>
            <div className="jumbotron">
                <h4 className="display-4">Welcome to Smarten Node!</h4>
            </div>

            <div className="row">
                <div className="col-sm">
                    <Panel title="Account">
                        <p><strong>{this.state.account}</strong></p>
                    </Panel>
                </div>
                <div className="col-sm">
                    <Panel title="Balance in ether">
                        <span><strong>Balance</strong>:{this.state.balance}</span>
                    </Panel>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <Panel title="Your energy bought">
                        {this.state.buys.map((buy,i)=>{
                            return <div key={i}>
                                <span>cost: {this.toEther(buy.price)} - amount_kw: {buy.amount_kw} - timestamp: {buy.timestamp}</span>
                                
                            </div>
                        })}
                    </Panel>
                </div>
                <div className="col-sm">
                    <Panel title="Your energy selled">
                    {this.state.sells.map((sell,i)=>{
                            return <div key={i}>
                                <span>cost: {this.toEther(sell.price)} - amount_kw: {sell.amount_kw} - timestamp: {sell.timestamp}</span>
                                
                            </div>
                        })}
                    </Panel>
                </div>
            </div>
        </React.Fragment>
    }
}