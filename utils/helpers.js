const toBigNumber = (number) => {
    return web3.utils.toBN(number)
}

const toWei = (amount) => {
    return web3.utils.toWei(amount.toString(), "ether")
}

const fromWei = (amount) => {
    return web3.utils.fromWei(amount.toString(), "ether")
}


const obtainGasFee = async (receipt) => {

    const gasUsed = receipt.receipt.gasUsed;

    const tx = await web3.eth.getTransaction(receipt.tx);
    const gasPrice = toBigNumber(tx.gasPrice);

    const gasFee = gasPrice.mul(toBigNumber(gasUsed))

    return gasFee

}


module.exports = {
    toBigNumber,
    toWei,
    obtainGasFee,
    fromWei
}