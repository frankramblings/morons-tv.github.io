// Type definitions to patch the window object
interface Window {
  apiRequest?: (method: string, endpoint: string, data?: any) => Promise<any>;
}