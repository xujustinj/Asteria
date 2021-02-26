// Vanishing gradient countermeasures
function positive(x: number): number {
    return (isFinite(x) && x > 0) ? x : Number.MIN_VALUE;
}
function product(x: number, y: number): number {
    const xy = x * y;
    return (xy === 0) ? (Math.sign(x) * Math.sign(y) * Number.MIN_VALUE) : xy;
}

export { positive, product };
