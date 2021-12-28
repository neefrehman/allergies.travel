import React from "react";

import { Card } from "components/Card";

export interface AllergenCardProps {
  allergenName: string;
  containingFoods: string[];
  linkPath: string;
}

export const AllergenCard = ({
  allergenName,
  containingFoods,
  linkPath,
}: AllergenCardProps) => (
  <Card linkPath={linkPath} title={allergenName}>
    <p>
      found in{" "}
      {containingFoods.map(food => (
        <span key="food">{food}</span>
      ))}
    </p>
  </Card>
);
