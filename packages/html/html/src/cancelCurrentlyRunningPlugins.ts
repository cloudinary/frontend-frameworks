export function cancelCurrentlyRunningPlugins(toBeCanceled: any){
  toBeCanceled.forEach((fn: any) => {
    fn();// resolve each promise with 'canceled'
  })
}
