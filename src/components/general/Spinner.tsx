"use client";

import {CSSProperties} from "react";
import {MoonLoader} from "react-spinners";


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "gray",
};

export default function Spinner({size = 80}) {
  return (
    <div>
      <MoonLoader
        color='white'
        loading={true}
        cssOverride={override}
        size={size}
        aria-label="Spinner Spinner"
        data-testid="loader"
      />
    </div>
  )
}
