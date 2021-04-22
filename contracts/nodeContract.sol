pragma solidity ^0.4.24;
contract nodeContract{
    
    address public owner = msg.sender;
    Transaction[] public arrayBuy;
    Transaction[] public arraySell;
   
    struct Transaction{
        uint price;
        uint amount_kw;
        uint timestamp;
    }

    constructor () public{
    arrayBuy.push(Transaction(4 ether,6,2));
    arrayBuy.push(Transaction(4 ether,6,2));
    arrayBuy.push(Transaction(4 ether,6,2));
    arraySell.push(Transaction(2 ether,6,2));
    arraySell.push(Transaction(2 ether,6,2));
    arraySell.push(Transaction(2 ether,6,2));
    }
    function buy(uint amount_kw,uint timestamp) public payable {
        require(msg.value !=0);
        arrayBuy.push(Transaction(msg.value,amount_kw,timestamp));
    }

    function sell(uint price,uint amount_kw,uint timestamp) public {
        require(price !=0);
        require(address(this).balance >= price);
        owner.transfer(price);
        arraySell.push(Transaction(price,amount_kw,timestamp));

    }
 
    function getBalance() public view returns (uint){
        return address(this).balance;
    }
    
     function totalTransactionsBuy() public view returns (uint){
        return arrayBuy.length;
    }
    function totalTransactionsSell() public view returns (uint){
        return arraySell.length;
    }
    
}