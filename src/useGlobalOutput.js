import createGlobalState from 'react-create-global-state'
 
// create the global for your hook
const initialState = []
 
const [useGlobalOutput, Provider] = createGlobalState(initialState)
 
// export the provider to link in the application
export const GlobalOuputProvider = Provider
 
// export the hook
export default useGlobalOutput