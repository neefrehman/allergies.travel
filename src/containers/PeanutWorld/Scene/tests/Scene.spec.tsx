import React from "react";
import ReactThreeTestRenderer from "@react-three/test-renderer";
import { render } from "test-utils";

import { PeanutWorldScene } from "../";

describe("PeanutWorld", () => {
    const setTitleIsVisible = jest.fn();

    describe("When the PeanutWorld container mounts", async () => {
        // it("setTitleIsVisible is called once", () => {
        //     render(<PeanutWorldScene setTitleIsVisible={setTitleIsVisible} />);
        //     expect(setTitleIsVisible).toHaveBeenCalledTimes(1);
        // });
        // it("It matches the scene graph snapshot", async () => {
        //     const renderer = await ReactThreeTestRenderer.create(
        //         <PeanutWorldScene setTitleIsVisible={setTitleIsVisible} />
        //     );
        //     expect(renderer.toGraph()).toMatchSnapshot();
        // });
    });
});
