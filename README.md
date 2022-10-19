# react-freeslider

> A simple, performant, and cross-browser component for make beautifull free responsive slider.

## Installation

```bash
npm i react-freeslider
```

## Usage

```js
import { useRef } from "react";
import FreeSlider from "react-freeslider";

const slideStyle = {
  width: 250,
  height: 350,
  borderStyle: "solid",
  borderWidth: 1,
  borderRadius: 4,
  borderColor: "black",
  textAlign: "center",
};

function MyApp() {
  const slider = useRef();

  return (
    <>
      <button onClick={() => slider.current.prev()}>Prev</button>
      <button onClick={() => slider.current.next()}>Next</button>

      <FreeSlider ref={slider}>
        <div className="slide" style={slideStyle}>
          Slide 1
        </div>
        <div className="slide" style={slideStyle}>
          Slide 2
        </div>
        <div className="slide" style={slideStyle}>
          Slide 3
        </div>
        <div className="slide" style={slideStyle}>
          Slide 4
        </div>
        <div className="slide" style={slideStyle}>
          Slide 5
        </div>
      </FreeSlider>
    </>
  );
}
```
