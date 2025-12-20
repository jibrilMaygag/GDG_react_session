import { useState } from "react";

function App() {
  return (
    <div>
      <CalcDisplay />
    </div>
  );
}
function priority(val) {
  if (val === "+" || val === "-") return 1;
  else if (val === "*" || val === "/") return 2;
  else return 0;
}
function normalizeUnary(tokens) {
  let result = [];

  tokens.forEach((t, i) => {
    if (
      t === "-" &&
      (i === 0 || ["+", "-", "*", "/", "("].includes(tokens[i - 1]))
    ) {
      result.push("0");
      result.push("-");
    } else {
      result.push(t);
    }
  });

  return result;
}
function infixToPostfix(infix) {
  let postfix = [];
  let stck = [];
  let token = normalizeUnary(infix.match(/(\d+\.?\d*|\+|-|\*|\/|\(|\))/g));
  token.forEach((char) => {
    if (char.trim() !== "" && !isNaN(char)) {
      postfix.push(char);
    } else if (char === "(") stck.push(char);
    else if (char === ")") {
      while (stck.length > 0 && stck.at(-1) !== "(") postfix.push(stck.pop());
      stck.pop();
    } else {
      while (
        stck.length > 0 &&
        stck.at(-1) !== "(" &&
        priority(char) <= priority(stck[stck.length - 1])
      )
        postfix.push(stck.pop());

      stck.push(char);
    }
  });
  while (stck.length > 0) postfix.push(stck.pop());

  return postfix;
}
function postfixToResult(postfix) {
  let stck = [];
  postfix.forEach((char) => {
    if (char.trim() !== "" && !isNaN(char)) {
      stck.push(char);
    } else {
      let num1 = +stck.pop();
      let num2 = +stck.pop();
      if (char === "+") {
        stck.push(num2 + num1);
      } else if (char === "-") {
        stck.push(num2 - num1);
      } else if (char === "*") {
        stck.push(num2 * num1);
      } else if (char === "/") {
        stck.push(num2 / num1);
      }
    }
  });
  return stck[0];
}

function CalcDisplay() {
  const [result, setResult] = useState("");
  function handleClickBtn(value) {
    setResult((r) => r + value);
  }
  function handleCalculate(infix) {
    let postfix = infixToPostfix(infix);
    console.log(postfix);
    let result = postfixToResult(postfix);
    console.log(result);
    if (Number.isNaN(result) || result == Infinity) {
      //division by zero
      result = infix;
    }
    setResult(!Number.isNaN(result) ? result : infix);
  }
  return (
    <div className="calcContainer">
      <input
        type="text"
        value={result}
        onChange={(e) => setResult(e.target.value)}
      />
      <button className="btn btn--red" onClick={() => setResult("")}>
        AC
      </button>
      <Button onClickbtn={handleClickBtn} color="white">
        %
      </Button>
      <Button onClickbtn={handleClickBtn} color="white">
        /
      </Button>
      <Button onClickbtn={handleClickBtn} color="black">
        7
      </Button>
      <Button onClickbtn={handleClickBtn} color="black">
        8
      </Button>
      <Button onClickbtn={handleClickBtn} color="black">
        9
      </Button>
      <Button onClickbtn={handleClickBtn} color="black">
        /
      </Button>
      <Button onClickbtn={handleClickBtn} color="black">
        4
      </Button>
      <Button onClickbtn={handleClickBtn} color="black">
        5
      </Button>
      <Button onClickbtn={handleClickBtn} color="black">
        6
      </Button>
      <Button onClickbtn={handleClickBtn} color="black">
        *
      </Button>
      <Button onClickbtn={handleClickBtn} color="black">
        1
      </Button>
      <Button onClickbtn={handleClickBtn} color="black">
        2
      </Button>
      <Button onClickbtn={handleClickBtn} color="black">
        3
      </Button>
      <Button onClickbtn={handleClickBtn} color="black">
        -
      </Button>
      <Button onClickbtn={handleClickBtn} color="black">
        0
      </Button>
      <Button onClickbtn={handleClickBtn} color="black">
        .
      </Button>
      <button
        onClick={() => handleCalculate(result)}
        className={"btn  btn--black"}
      >
        =
      </button>
      <Button onClickbtn={handleClickBtn} color="black">
        +
      </Button>
    </div>
  );
}
function Button({ children, color, onClickbtn }) {
  return (
    <button
      onClick={() => onClickbtn(children)}
      className={`btn  btn--${color}`}
    >
      {children}
    </button>
  );
}
export default App;
