import React from "react";
import Lottie from "lottie-react"; // Assuming Lottie is the default export
import animationData from "../assets/Animation - 1725277556364.json"; // Update with your actual path

const PageTransition = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default PageTransition;
