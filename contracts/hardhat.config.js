//https://eth-goerli.g.alchemy.com/v2/mkCIeDgVjG2bypcEKRanxxUHmOKEd_KW

require("@nomiclabs/hardhat-waffle");

module.exports={
  solidity:'0.8.0',
  networks:{
    goerli:{
      url: 'https://eth-goerli.g.alchemy.com/v2/mkCIeDgVjG2bypcEKRanxxUHmOKEd_KW',
      accounts:['32ce37912929be97333c5768a4ab7ad6c2013ba5d993c05ca447103e3908e05d']

    }
  }
}