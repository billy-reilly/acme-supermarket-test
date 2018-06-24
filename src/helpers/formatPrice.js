export default function formatPrice (priceInPence) {
    let string = priceInPence.toString();
    string = string.padStart(3, '0');
    const decimalPos = string.length - 2;
    return string.slice(0, decimalPos) + '.' + string.slice(decimalPos);
}
