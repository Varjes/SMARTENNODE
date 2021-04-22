const nodeContract = artifacts.require('nodeContract');

let instance;

beforeEach(async()=>{
    instance = await nodeContract.new();
});

contract('nodeContract',accounts=>{
    it('',async()=>{
        let total = await instance.arrayBuy(0);
        console.log(total)
  
    });
    });
