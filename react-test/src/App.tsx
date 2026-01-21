import { useState } from "react";
import "./App.css";
import request from "@berry/hermes-request";

function App() {
  const [count, setCount] = useState(0);

  const onClick = () => {
    request
      .get<{}>("/get", {
        username: "admin",
      })
      .then((res) => {
        console.log("/get", res);
      });
    setCount((count) => count + 1);

    // request
    //   .post("/post", {
    //     username: ["admin", "mkoo"],
    //     password: "123456",
    //   })
    //   .then((res) => {
    //     console.log("/post", res);
    //   });
    // setCount((count) => count + 1);
    //
    // const formData = new FormData();
    // formData.append("username", "admin");
    // formData.append("password", "123456");
    // request.post("/post", formData).then((res) => {
    //   console.log("/post formData", res);
    // });
    // setCount((count) => count + 1);
  };

  return (
    <>
      <button onClick={onClick}>count is {count}</button>
    </>
  );
}

export default App;
