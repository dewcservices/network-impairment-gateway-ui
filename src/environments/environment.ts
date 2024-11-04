/* eslint-disable @typescript-eslint/no-explicit-any */
export const environment = {
  production: (window as any)?.env?.production,
  apiHost: (window as any)?.env?.apiHost,
  websocketHost: (window as any)?.env?.websocketHost,
}
