export class nodeService {
    constructor(contract){
        this.contract = contract;
       }

    async getTotalBuyTransactions(){
        return (await this.contract.totalTransactionsBuy()).toNumber();
    }

    async getBuyTransactions(){
        let total = await this.getTotalBuyTransactions();
        let arrayBuy = [];
        for (var i = 0; i <total;i++){
            let buy = await this.contract.arrayBuy(i);
            arrayBuy.push(buy);
        }

        return this.mapbuys(arrayBuy);
    }

    mapbuys(arrayBuy){
        return arrayBuy.map(buy => {
            return{
                price : buy[0].toNumber(),
                amount_kw : buy[1].toNumber(),
                timestamp : buy[2].toNumber()
            }
        });
    }

    async getTotalSellTransactions(){
        return (await this.contract.totalTransactionsSell()).toNumber();
    }

    async getSellTransactions(){
        let total = await this.getTotalSellTransactions();
        let arraySell = [];
        for (var i = 0; i <total;i++){
            let sell = await this.contract.arraySell(i);
            arraySell.push(sell);
        }

        return this.mapsells(arraySell);
    }

    mapsells(arraySell){
        return arraySell.map(sell => {
            return{
                price : sell[0].toNumber(),
                amount_kw : sell[1].toNumber(),
                timestamp : sell[2].toNumber()
            }
        });
    }
}