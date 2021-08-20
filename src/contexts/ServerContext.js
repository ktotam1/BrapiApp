import React from 'react';

const ServerContext = React.createContext({});

export function ServerContextProvider(props) {
  return (
    <ServerContext.Provider value={props.serverInfo}>
      {props.children}
    </ServerContext.Provider>
  );
}

export const withServerContext = ChildComponent => props => (
  <ServerContext.Consumer>
    {serverInfo => <ChildComponent {...props} serverInfo={serverInfo} />}
  </ServerContext.Consumer>
);
