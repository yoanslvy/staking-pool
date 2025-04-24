export function calculateRewards(amount: number, apy = 0.072) {
    const daily = ((amount * apy) / 365).toFixed(4)
    const annual = (amount * apy).toFixed(2)
    return { daily, annual }
}