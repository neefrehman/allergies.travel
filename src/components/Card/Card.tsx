import type { ReactNode } from "react";
import React from "react";
import Link from "next/link";

import { styled } from "stitches";

const StyledCard = styled("div", {
  borderRadius: "$large",
  boxShadow: "$small",
  display: "flex",
  flexDirection: "column",
  padding: "2em",
  textDecoration: "none",
  textAlign: "center",
  fontSize: "1.3rem",

  variants: {
    square: {
      true: {
        aspectRatio: "1 / 1",
      },
    },
    /** To force the nested link to cover the whole size of the containing element */
    linkBox: {
      true: {
        position: "relative",
        "& a::after": {
          content: "",
          position: "absolute",
          inset: 0,
        },
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
  },
});

export interface CardProps {
  title: string;
  children: ReactNode;
  linkPath?: string;
  square?: boolean;
}

export const Card = ({ title, children, linkPath, square }: CardProps) => {
  return (
    <StyledCard linkBox={!!linkPath} square={square}>
      <h3>
        {linkPath ? (
          <Link href={linkPath}>
            <a>{title}</a>
          </Link>
        ) : (
          title
        )}
      </h3>
      <div>{children}</div>
    </StyledCard>
  );
};
