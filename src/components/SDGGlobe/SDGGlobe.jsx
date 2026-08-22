import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { sdgGoals } from "../../../utils/sdgData";

// Batangas State University Alangilan approximate spherical coordinate
const BATSTATEU_LAT = 13.78;
const BATSTATEU_LON = 121.07;
const GLOBE_RADIUS = 2.7;
const ORBIT_RADIUS = 4.1;

// Convert Lat/Lon to 3D Cartesian coordinates on sphere of given radius
function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Generate 17 Non-Overlapping, Fixed 3D Spherical Orbital Positions
function getEquispacedSDGPositions(radius) {
  const positions = [];

  // Ring 1: Northern Orbit (5 Goals: 1 to 5 at Lat +38°)
  const lat1 = 38 * (Math.PI / 180);
  for (let i = 0; i < 5; i++) {
    const lon = (i * (360 / 5) + 12) * (Math.PI / 180);
    positions.push(
      new THREE.Vector3(
        radius * Math.cos(lat1) * Math.sin(lon),
        radius * Math.sin(lat1),
        radius * Math.cos(lat1) * Math.cos(lon)
      )
    );
  }

  // Ring 2: Equatorial Orbit (7 Goals: 6 to 12 at Lat 0°)
  const lat2 = 0;
  for (let i = 0; i < 7; i++) {
    const lon = (i * (360 / 7) + 36) * (Math.PI / 180);
    positions.push(
      new THREE.Vector3(
        radius * Math.cos(lat2) * Math.sin(lon),
        radius * Math.sin(lat2),
        radius * Math.cos(lat2) * Math.cos(lon)
      )
    );
  }

  // Ring 3: Southern Orbit (5 Goals: 13 to 17 at Lat -38°)
  const lat3 = -38 * (Math.PI / 180);
  for (let i = 0; i < 5; i++) {
    const lon = (i * (360 / 5) + 48) * (Math.PI / 180);
    positions.push(
      new THREE.Vector3(
        radius * Math.cos(lat3) * Math.sin(lon),
        radius * Math.sin(lat3),
        radius * Math.cos(lat3) * Math.cos(lon)
      )
    );
  }

  return positions;
}

// Generate Realistic Earth Day Map Canvas Texture
function createEarthDayTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // 1. Deep Ocean Base
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGrad.addColorStop(0, "#081d38");
  oceanGrad.addColorStop(0.5, "#0d2b52");
  oceanGrad.addColorStop(1, "#081d38");
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Helper to convert [lon, lat] to canvas [x, y]
  const mapPoint = (lon, lat) => [
    ((lon + 180) / 360) * canvas.width,
    ((90 - lat) / 180) * canvas.height,
  ];

  // Helper to draw continent polygons with smooth styling
  const drawLandmass = (coords, fillColor = "#2e5c30", strokeColor = "#3d7a40") => {
    if (!coords || coords.length === 0) return;
    ctx.beginPath();
    const [startX, startY] = mapPoint(coords[0][0], coords[0][1]);
    ctx.moveTo(startX, startY);
    for (let i = 1; i < coords.length; i++) {
      const [x, y] = mapPoint(coords[i][0], coords[i][1]);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 4;
    ctx.stroke();
  };

  // Continents Geometries (Equirectangular polygons)
  // Africa & Arabia
  drawLandmass(
    [
      [-17, 30], [-5, 36], [10, 37], [25, 32], [32, 31], [43, 12], [51, 12],
      [40, -4], [35, -20], [28, -34], [18, -34], [12, -15], [9, 4], [0, 6],
      [-15, 12], [-17, 21], [-17, 30]
    ],
    "#38663b",
    "#4a854e"
  );

  // Eurasia (Europe + Asia)
  drawLandmass(
    [
      [-9, 36], [-9, 43], [2, 51], [5, 60], [20, 70], [40, 68], [70, 73],
      [100, 76], [135, 72], [170, 66], [160, 52], [140, 50], [130, 42],
      [122, 30], [108, 20], [100, 5], [90, 22], [75, 10], [68, 24],
      [50, 30], [40, 40], [28, 41], [15, 45], [0, 45], [-9, 36]
    ],
    "#2d5e32",
    "#3d7843"
  );

  // North America
  drawLandmass(
    [
      [-168, 65], [-160, 71], [-130, 70], [-90, 70], [-60, 60], [-65, 45],
      [-75, 35], [-80, 25], [-97, 20], [-105, 23], [-120, 34], [-124, 48],
      [-135, 58], [-168, 65]
    ],
    "#336336",
    "#447e48"
  );

  // South America
  drawLandmass(
    [
      [-75, 10], [-60, 10], [-50, 0], [-35, -5], [-40, -22], [-55, -38],
      [-68, -55], [-75, -45], [-72, -30], [-80, -5], [-75, 10]
    ],
    "#28612e",
    "#3a7f41"
  );

  // Australia
  drawLandmass(
    [
      [113, -22], [115, -34], [135, -38], [150, -37], [153, -28], [142, -11],
      [130, -13], [113, -22]
    ],
    "#6b5832",
    "#877042"
  );

  // Antarctica & Greenland
  drawLandmass(
    [
      [-55, 60], [-45, 60], [-20, 70], [-30, 82], [-55, 75], [-55, 60]
    ],
    "#e0e7ed",
    "#ffffff"
  );

  drawLandmass(
    [
      [-180, -65], [180, -65], [180, -90], [-180, -90]
    ],
    "#d6e2eb",
    "#ffffff"
  );

  // Highlight Philippine Archipelago (BatStateU Home Region)
  const drawIsland = (lon, lat, r) => {
    const [x, y] = mapPoint(lon, lat);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "#8bc34a";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();
  };
  drawIsland(121.07, 13.78, 9); // Luzon / Batangas
  drawIsland(124.0, 10.5, 7); // Visayas
  drawIsland(125.0, 7.5, 8); // Mindanao
  drawIsland(118.5, 9.5, 5); // Palawan

  // 2. Add subtle continental shading and clouds
  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  for (let i = 0; i < 40; i++) {
    const cx = Math.random() * canvas.width;
    const cy = Math.random() * canvas.height;
    const cr = 30 + Math.random() * 80;
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Generate SDG Node Badge Texture
function createSDGNodeTexture(goal) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  // Colored circle background
  ctx.beginPath();
  ctx.arc(64, 64, 56, 0, Math.PI * 2);
  ctx.fillStyle = goal.hexColor || "#1B5E20";
  ctx.fill();

  // White crisp border
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#FFFFFF";
  ctx.stroke();

  // Outer ambient glow
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
  ctx.stroke();

  // Goal Number
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 52px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(goal.number.toString(), 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function SDGGlobeInner({ activeGoal, onHoverGoal, onSelectGoal }) {
  const mountRef = useRef(null);

  // Store activeGoal and callbacks in refs to decouple Three.js lifecycle from React re-renders
  const activeGoalRef = useRef(activeGoal || sdgGoals[0]);
  const onHoverGoalRef = useRef(onHoverGoal);
  const onSelectGoalRef = useRef(onSelectGoal);

  const isDraggingRef = useRef(false);
  const pointerDownPosRef = useRef({ x: 0, y: 0 });
  const hoverThrottleRef = useRef(0);

  // Synchronously sync refs whenever parent props change (without tearing down Three.js scene)
  useEffect(() => {
    activeGoalRef.current = activeGoal || sdgGoals[0];
  }, [activeGoal]);

  useEffect(() => {
    onHoverGoalRef.current = onHoverGoal;
    onSelectGoalRef.current = onSelectGoal;
  }, [onHoverGoal, onSelectGoal]);

  // Main Three.js Scene Setup — Runs ONCE on mount, NEVER resets rotation on prop changes!
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 520;
    const initialAspect = width / height;

    // 1. Scene & Camera with Mobile-Aware Distance Calculation
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, initialAspect, 0.1, 100);

    const updateCameraDistance = (aspect) => {
      // If mobile portrait (narrow width), scale camera back so side nodes never clip!
      if (aspect < 1.0) {
        camera.position.z = 12.2 * (1.18 / Math.max(0.62, aspect));
      } else {
        camera.position.z = 12.2;
      }
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    };

    updateCameraDistance(initialAspect);

    // 2. WebGL Renderer with Alpha Transparency
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.touchAction = "none"; // Enables smooth touch dragging on mobile
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8e7, 1.8);
    sunLight.position.set(8, 6, 8);
    scene.add(sunLight);

    const blueAtmosphereLight = new THREE.DirectionalLight(0x64b5f6, 0.8);
    blueAtmosphereLight.position.set(-8, -4, -4);
    scene.add(blueAtmosphereLight);

    // 4. Main 3D Earth Group (Preserves rotation permanently during user session)
    const globeGroup = new THREE.Group();
    globeGroup.position.set(0, 0, 0);
    scene.add(globeGroup);

    // Realistic Textured Earth Sphere
    const earthTexture = createEarthDayTexture();
    const earthGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 48, 48);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.65,
      metalness: 0.15,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // Translucent Glowing Blue Atmosphere Rim
    const atmosGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.03, 36, 36);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x4fc3f7,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    globeGroup.add(atmosMesh);

    // BatStateU Alangilan Golden Campus Pin
    const campusPos = latLonToVector3(
      BATSTATEU_LAT,
      BATSTATEU_LON,
      GLOBE_RADIUS,
    );
    const pinGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0xffd54f });
    const campusPin = new THREE.Mesh(pinGeo, pinMat);
    campusPin.position.copy(campusPos);
    globeGroup.add(campusPin);

    // Campus Beacon Pulsing Glow Ring
    const ringGeo = new THREE.RingGeometry(0.16, 0.28, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffd54f,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const campusRing = new THREE.Mesh(ringGeo, ringMat);
    campusRing.position.copy(campusPos.clone().multiplyScalar(1.01));
    campusRing.lookAt(new THREE.Vector3(0, 0, 0));
    globeGroup.add(campusRing);

    // 5. 17 Perfectly Equispaced Fixed Orbiting SDG Node Sprites & Curved Arcs
    const nodeSprites = [];
    const arcLines = [];
    const textures = [earthTexture];
    const nodePositions = getEquispacedSDGPositions(ORBIT_RADIUS);

    sdgGoals.forEach((goal, index) => {
      const nodePos = nodePositions[index];

      // Node Sprite
      const texture = createSDGNodeTexture(goal);
      textures.push(texture);

      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
        depthTest: true,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.copy(nodePos);
      sprite.scale.set(0.85, 0.85, 1);
      sprite.userData = { goal, index };
      globeGroup.add(sprite);
      nodeSprites.push(sprite);

      // Connection Arc from BatStateU Pin to SDG Node
      const midPoint = new THREE.Vector3()
        .addVectors(campusPos, nodePos)
        .multiplyScalar(0.5);
      const arcAltitude = campusPos.distanceTo(nodePos) * 0.35;
      midPoint.normalize().multiplyScalar(GLOBE_RADIUS + arcAltitude);

      const curve = new THREE.QuadraticBezierCurve3(
        campusPos,
        midPoint,
        nodePos,
      );
      const arcPoints = curve.getPoints(36);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);

      const arcMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(goal.hexColor),
        transparent: true,
        opacity: 0.35,
        linewidth: 1,
        depthTest: true,
        depthWrite: false,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcLine.userData = { goalNumber: goal.number };
      globeGroup.add(arcLine);
      arcLines.push(arcLine);
    });

    // 6. Interaction & Drag Handlers with Strict Occlusion Check
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0.15;
    let targetRotationY = 0;
    let autoRotate = true;
    let resumeRotateTimeout = null;

    // Helper: Find visible front-facing hovered node
    const getVisibleHoveredNode = () => {
      if (mouse.x < -1 || mouse.x > 1 || mouse.y < -1 || mouse.y > 1) return null;

      raycaster.setFromCamera(mouse, camera);

      // Check distance to Earth surface
      const earthHits = raycaster.intersectObject(earthMesh);
      const earthDist = earthHits.length > 0 ? earthHits[0].distance : Infinity;

      // Check distance to sprites
      const spriteHits = raycaster.intersectObjects(nodeSprites);
      if (spriteHits.length === 0) return null;

      // Filter and find closest valid front-facing hit
      for (let i = 0; i < spriteHits.length; i++) {
        const hit = spriteHits[i];

        // 1. If Earth is in front of the sprite, it's occluded
        if (earthDist < hit.distance - 0.1) continue;

        // 2. Check world position: Sprite must be in front hemisphere
        const spriteWorldPos = new THREE.Vector3();
        hit.object.getWorldPosition(spriteWorldPos);
        if (spriteWorldPos.z < -0.2) continue;

        // 3. Strict circular radius check (slightly generous for easy mobile tap)
        const distToCenter = hit.point.distanceTo(spriteWorldPos);
        const radius = (hit.object.scale.x / 2) * 1.1;
        if (distToCenter > radius) continue;

        return hit.object.userData.goal;
      }

      return null;
    };

    const handleNodeTrigger = (goal) => {
      if (!goal) return;
      if (activeGoalRef.current && activeGoalRef.current.number === goal.number) return;
      
      // Update immediately locally to guarantee instant 3D sync
      activeGoalRef.current = goal;
      
      if (onHoverGoalRef.current) {
        onHoverGoalRef.current(goal);
      }
    };

    const onPointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDraggingRef.current) {
        autoRotate = false;
        if (resumeRotateTimeout) clearTimeout(resumeRotateTimeout);

        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        targetRotationY += deltaX * 0.007;
        targetRotationX += deltaY * 0.007;
        targetRotationX = Math.max(-0.9, Math.min(0.9, targetRotationX));

        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        // Throttled clean hover detection
        const now = performance.now();
        if (now - hoverThrottleRef.current > 30) {
          hoverThrottleRef.current = now;
          const hovered = getVisibleHoveredNode();
          if (hovered) {
            handleNodeTrigger(hovered);
          }
        }
      }
    };

    const onPointerDown = (e) => {
      isDraggingRef.current = true;
      pointerDownPosRef.current = { x: e.clientX, y: e.clientY };
      previousMousePosition = { x: e.clientX, y: e.clientY };
      autoRotate = false;
      if (resumeRotateTimeout) clearTimeout(resumeRotateTimeout);

      // Update mouse coordinate immediately on down
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerUp = (e) => {
      const dragDist = Math.hypot(
        e.clientX - pointerDownPosRef.current.x,
        e.clientY - pointerDownPosRef.current.y,
      );

      isDraggingRef.current = false;

      // Clean Tap / Click: Select goal on card without opening modal
      if (dragDist < 10) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        const clickedGoal = getVisibleHoveredNode();
        if (clickedGoal) {
          handleNodeTrigger(clickedGoal);
        }
      }

      // Resume auto rotation after 3 seconds of inactivity
      if (resumeRotateTimeout) clearTimeout(resumeRotateTimeout);
      resumeRotateTimeout = setTimeout(() => {
        autoRotate = true;
      }, 3000);
    };

    const dom = renderer.domElement;
    dom.addEventListener("pointermove", onPointerMove);
    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    dom.addEventListener("pointerleave", () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    // 7. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();
    const tempWorldPos = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotation with damping
      if (autoRotate) {
        globeGroup.rotation.y += 0.0022;
      } else {
        globeGroup.rotation.y +=
          (targetRotationY - globeGroup.rotation.y) * 0.1;
        globeGroup.rotation.x +=
          (targetRotationX - globeGroup.rotation.x) * 0.1;
      }

      // Pulse campus pin ring
      const ringScale = 1 + Math.sin(elapsedTime * 4) * 0.15;
      campusRing.scale.set(ringScale, ringScale, ringScale);

      // Update cursor style
      const currentlyHovered = getVisibleHoveredNode();
      if (currentlyHovered) {
        dom.style.cursor = "pointer";
      } else {
        dom.style.cursor = isDraggingRef.current ? "grabbing" : "grab";
      }

      // Active goal from single synchronous source of truth
      const activeNumber = activeGoalRef.current?.number;

      // Update sprites position, scale, opacity and renderOrder deterministically
      nodeSprites.forEach((sprite) => {
        sprite.getWorldPosition(tempWorldPos);

        // Realistic Horizon Occlusion: smoothly fade out nodes as they pass behind the Earth
        const z = tempWorldPos.z;
        let depthOpacity = 1.0;
        if (z < 0) {
          depthOpacity = Math.max(0, Math.min(1, (z + 2.4) / 2.4));
        }

        const isHighlight = sprite.userData.goal.number === activeNumber;
        const targetScale = isHighlight ? 1.25 : 0.85;
        
        // Fast, smooth scale transition
        sprite.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.35);

        // Strict deterministic renderOrder: active node ALWAYS on top
        sprite.renderOrder = isHighlight ? 999 : (z > 0 ? 10 : 1);

        // Set opacity based on depth so nodes behind the Earth vanish realistically
        sprite.material.opacity = depthOpacity * (isHighlight ? 1.0 : 0.92);
        sprite.visible = depthOpacity > 0.05;
      });

      arcLines.forEach((arc) => {
        const isHighlighted = arc.userData.goalNumber === activeNumber;
        const matchedSprite = nodeSprites.find(
          (s) => s.userData.goal.number === arc.userData.goalNumber,
        );

        let arcDepthOpacity = 1.0;
        if (matchedSprite) {
          matchedSprite.getWorldPosition(tempWorldPos);
          if (tempWorldPos.z < 0) {
            arcDepthOpacity = Math.max(
              0,
              Math.min(1, (tempWorldPos.z + 2.0) / 2.0),
            );
          }
        }

        arc.material.opacity = arcDepthOpacity * (isHighlighted ? 0.9 : 0.25);
        arc.visible = arcDepthOpacity > 0.05;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 8. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      const aspect = newWidth / newHeight;
      updateCameraDistance(aspect);
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // 9. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resumeRotateTimeout) clearTimeout(resumeRotateTimeout);
      window.removeEventListener("resize", handleResize);
      dom.removeEventListener("pointermove", onPointerMove);
      dom.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);

      earthGeo.dispose();
      earthMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      pinGeo.dispose();
      pinMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();

      textures.forEach((t) => t.dispose());
      nodeSprites.forEach((s) => s.material.dispose());
      arcLines.forEach((a) => {
        a.geometry.dispose();
        a.material.dispose();
      });

      renderer.dispose();
      if (dom.parentNode) {
        dom.parentNode.removeChild(dom);
      }
    };
  }, []); // Run ONCE on mount — NEVER re-instantiate or reset rotation on hover/prop updates!

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[580px] flex items-center justify-center select-none touch-none">
      {/* Seamless Transparent 3D Realistic Earth Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative flex items-center justify-center touch-none"
      />
    </div>
  );
}

const SDGGlobe = React.memo(SDGGlobeInner);
export default SDGGlobe;
