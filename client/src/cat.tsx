import React from "react";

interface Props {
  id: number;
  name: string;
}

export function MyComponent(props: Props) {
  const { id, name } = props;
  return (
    <div
      onClick={() => {
        alert(name);
      }}
    >
      <span>{name}</span>
      <button>Press me</button>
    </div>
  );
}
