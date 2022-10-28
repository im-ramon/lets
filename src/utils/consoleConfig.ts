export default function consoleFeedback(type: 'info' | 'warn' | 'error' | 'log', func: string, message?: any) {
    console[type](`@lets-log [${type}] | function: ${func} | message: ${JSON.stringify(message)} | id: ${new Date().getTime()}`)
}