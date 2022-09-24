
export function formatTokenValue(num: number): string {
    if(num < 100){
        return num.toFixed(3)
    }else {
        return Math.floor(num).toLocaleString()
    }
}