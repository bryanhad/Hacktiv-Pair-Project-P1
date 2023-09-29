module.exports = function numberToIDR(numberInput) {
    return numberInput.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
}