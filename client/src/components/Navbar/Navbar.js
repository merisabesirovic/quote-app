import React from "react";
import image from "../../assets/quill-pen.png";

export default function Navbar() {
  return (
    <div className="row justify-between">
      <img className="sm" src={image}></img>{" "}
      <button class="rounded-full">Logout</button>
    </div>
  );
}
