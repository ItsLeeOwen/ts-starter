import * as React from "react"
import * as ReactDOM from "react-dom"

import Hello from "./component/Hello"
import hello from "./hello"

console.log("index.ts")

hello()

const myfunc = () => {
  console.log("myfunc")
}


ReactDOM.render(
  <Hello
    compiler="TypeScript"
    framework="React" />,
  document.querySelector("main")
);