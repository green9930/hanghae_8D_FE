import Router from "shared/Router";
import styled from "styled-components";

const App = () => {
  return (
    <ResponsiveContainer>
      <Router />
    </ResponsiveContainer>
  );
};

const ResponsiveContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default App;
