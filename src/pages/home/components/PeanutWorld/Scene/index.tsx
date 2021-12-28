import React, { memo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";

import { useHomePageAnimationHasRunContext } from "context/HomePageAnimationHasRun";
import { useHasMounted } from "hooks/useHasMounted";
import { useIsDebugContext } from "context/IsDebug";
import { usePrefersReducedMotionContext } from "context/PrefersReducedMotion";
import { styled } from "stitches";

import type { PeanutWorldProps } from "..";

import { Lights } from "./Lights";
import { Stars } from "./Stars";
import { Planet } from "./Planet";
import { Controls } from "./Controls";
import { ZoomIn } from "./ZoomIn";

const StyledCanvas = styled(Canvas);

export const PeanutWorldScene = memo(
  ({ setTitleIsVisible }: PeanutWorldProps) => {
    const hasMounted = useHasMounted();
    const isDebug = useIsDebugContext() ?? false;
    const prefersReducedMotion = usePrefersReducedMotionContext();
    const [hasRun, setHasRun] = useHomePageAnimationHasRunContext();

    const isShortAnimation = prefersReducedMotion || hasRun;

    const CAMERA_FAR = 1300;
    const CONTROLS_ORBIT_SPEED = prefersReducedMotion ? 0.06 : 0.26;
    const ZOOM_START = isShortAnimation ? 6 : CAMERA_FAR;
    const ZOOM_END = 5;
    const TITLE_TIMEOUT = isShortAnimation ? 0 : 240;

    const onZoomRest = () => {
      setTimeout(() => {
        setTitleIsVisible(true);
        setHasRun(true);
      }, TITLE_TIMEOUT);
    };

    return (
      <StyledCanvas
        camera={{ far: CAMERA_FAR }}
        css={{
          backgroundColor: "$spaceNavy",
          transition: "opacity 2000ms",
          opacity: isShortAnimation && !hasMounted ? "0" : "1",
          pointerEvents: isDebug ? "initial" : "none",
        }}
      >
        <fog args={["#000004", 0, CAMERA_FAR * 0.1]} attach="fog" />
        <EffectComposer>
          <Noise opacity={0.035} />
        </EffectComposer>
        <Suspense fallback={null}>
          <ZoomIn from={ZOOM_START} to={ZOOM_END} onRest={onZoomRest}>
            <Planet willRotate={!isShortAnimation} />
            <Lights />
            <Stars count={1000} maxDistance={CAMERA_FAR} />
          </ZoomIn>
          <Controls
            targetZ={ZOOM_END}
            orbitSpeedMax={CONTROLS_ORBIT_SPEED}
            userControllable={isDebug}
          />
        </Suspense>
      </StyledCanvas>
    );
  },
  (previous, next) => {
    if (previous.setTitleIsVisible !== next.setTitleIsVisible) {
      return false;
    }
    return true;
  }
);

PeanutWorldScene.displayName = "PeanutWorldScene";

export default PeanutWorldScene; // Default export required for simple dynamic importing
