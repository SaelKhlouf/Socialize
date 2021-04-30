import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios.get("https://mocki.io/v1/39ee8b52-d01c-491a-a2a3-6319fdc059f6").then((response: any) => {
      setActivities(response);
    });
  }, []);

  return (
    <div>
      <Header as='h2' icon="users" content="The social app"/>
    </div>
  );
}

export default App;
