import React from "react";
import Page from "./components/Page";
import TestText from "./components/TestText";

function App() {
  return (
    <div>
      <Page innerSx={{ px: 3, py: 1 }}>
        <TestText />
      </Page>
    </div>
  );
}

export default App;
