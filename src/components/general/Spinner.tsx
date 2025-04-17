"use client";

import {CSSProperties} from "react";
import {BeatLoader} from "react-spinners";


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "gray",
};

export default function Spinner({size = 15}) {
  return (
    <div>
      <BeatLoader
        color='white'
        className="opacity-60"
        loading={true}
        cssOverride={override}
        size={size}
        aria-label="Spinner Spinner"
        data-testid="loader"
      />
    </div>
  )
}
