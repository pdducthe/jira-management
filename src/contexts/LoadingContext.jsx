// LoadingContext.js
import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import spinner from "./Spinner-1s-200px.gif"

const LoadingContext = createContext({
    loading: false,
    setLoading: null,
});

const LoadingProvider= ({ children })=> {
    const [loading, setLoading] = useState(false);
    const value = { loading, setLoading };

    return (
        <LoadingContext.Provider value={value}>
            {loading && (
                <LoaderContainer>
                    <LoaderImg src={spinner}/>
                </LoaderContainer>
            )}
            {children}
        </LoadingContext.Provider>
    );
}

export {LoadingProvider,LoadingContext}

const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background:  rgba(255,255,255,0.7);
  z-index: 100;
`;
const LoaderImg = styled.img`
  position: absolute;
`;

export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within LoadingProvider");
    }
    return context;
}