export function cancelCurrentlyRunningPlugins(toBeCanceled: any): void{
  toBeCanceled.forEach((fn: any) => {
    fn();// resolve each promise with 'canceled'
  })
}
