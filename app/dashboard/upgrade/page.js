import React from "react";
import UpgradeComponent from "./UpgradeComponent";

const page = () => {
  return (
    <div>
      <h2 className="text-3xl font-medium">Plans</h2>
      <p className="mb-8">
        Choose the plan that suits you best and enjoy seamless access to all
        features.
      </p>

      <UpgradeComponent />
    </div>
  );
};

export default page;
