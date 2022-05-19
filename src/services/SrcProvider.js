import { createContext } from "react"


export const SrcContext = createContext({
  dataSource : ''
});

function SrcProvider (props) {


    return (
      /**
       * you can modify value property to change data source
       * BACKEND = server data
       * MOCKED = mocked data
       */
      <SrcContext.Provider value={{dataSource:'BACKEND'}}>
        {props.children}
      </SrcContext.Provider>
    );

}

export default SrcProvider;