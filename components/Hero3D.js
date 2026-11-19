"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const vert = "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}";
const fogFrag = "uniform vec3 uC;uniform float uO;varying vec2 vUv;void main(){float d=clamp(length(vUv-.5)*2.,0.,1.);gl_FragColor=vec4(uC,pow(1.-d,2.)*uO);}";

function Fog({ color, pos, size, o, speed }) {
  const m = useRef(); const uni = useMemo(() => ({ uC: { value: new THREE.Color(color) }, uO: { value: o } }), [color, o]);
  useFrame((s) => { m.current.position.x = pos[0] + Math.sin(s.clock.elapsedTime * speed) * .5; });
  return (<mesh ref={m} position={pos} scale={size}><planeGeometry /><shaderMaterial vertexShader={vert} fragmentShader={fogFrag} uniforms={uni} transparent depthWrite={false} blending={THREE.AdditiveBlending} /></mesh>);
}

function Streaks({ reduced }) {
  const refs = useRef([]);
  const cfg = useMemo(() => Array.from({ length: 7 }, (_, i) => ({ y: (i - 3) * .9 + Math.random() * .4, z: -2 - Math.random() * 2, sp: .15 + Math.random() * .25, off: Math.random() * 14, c: i % 3 === 0 ? "#E63946" : "#367BF0" })), []);
  useFrame((s) => { if (!reduced) refs.current.forEach((m, i) => m && (m.position.x = ((s.clock.elapsedTime * cfg[i].sp * 4 + cfg[i].off) % 16) - 8)); });
  return cfg.map((c, i) => (<mesh key={i} ref={(r) => (refs.current[i] = r)} position={[0, c.y, c.z]} rotation={[0, 0, -.3]}><planeGeometry args={[3.5, .012]} />
    <meshBasicMaterial color={c.c} transparent opacity={.28} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>));
}

function Particles({ count, reduced, mouse }) {
  const r = useRef();
  const [pos, colors] = useMemo(() => { const p = new Float32Array(count * 3), c = new Float32Array(count * 3), pal = ["#F5F5F5", "#367BF0", "#E63946"];
    for (let i = 0; i < count; i++) { p.set([(Math.random() - .5) * 14, (Math.random() - .5) * 8, -5 + Math.random() * 7], i * 3); new THREE.Color(pal[Math.random() < .75 ? 0 : Math.random() < .6 ? 1 : 2]).toArray(c, i * 3); } return [p, c]; }, [count]);
  useFrame((s, dt) => { if (!reduced) r.current.rotation.y += dt * .02; r.current.position.x = -mouse.current.x * .4; r.current.position.y = mouse.current.y * .25; });
  return (<points ref={r}><bufferGeometry><bufferAttribute attach="attributes-position" args={[pos, 3]} /><bufferAttribute attach="attributes-color" args={[colors, 3]} /></bufferGeometry>
    <pointsMaterial size={.028} vertexColors transparent opacity={.65} sizeAttenuation depthWrite={false} /></points>);
}

function Rig({ mouse }) {
  useFrame((s) => { s.camera.position.x += (mouse.current.x * .45 - s.camera.position.x) * .04; s.camera.position.y += (-mouse.current.y * .25 - s.camera.position.y) * .04; s.camera.lookAt(0, 0, 0); });
  return null;
}

// Low-poly solid with a blue wireframe skin, so the figure reads as a rendered hacker avatar.
const Part = ({ children, ...p }) => (<group {...p}>
  <mesh>{children}<meshStandardMaterial color="#0a0f1c" metalness={.45} roughness={.5} /></mesh>
  <mesh scale={1.015}>{children}<meshBasicMaterial color="#367BF0" wireframe transparent opacity={.22} /></mesh></group>);

// Procedural 3D model: fedora, shadowed face with glowing crimson eyes, suited shoulders.
function AnonModel({ reduced, mouse, small }) {
  const root = useRef(), head = useRef(), eyes = useRef(), ring = useRef(); const vp = useThree((s) => s.viewport);
  useFrame((s, dt) => {
    const t = s.clock.elapsedTime, k = Math.min(vp.height / 4.2, vp.width / 3.2) * (small ? .9 : 1);
    root.current.scale.setScalar(k); root.current.position.set(0, -.1 * k + (reduced ? 0 : Math.sin(t * .8) * .05), -1);
    root.current.rotation.y += (mouse.current.x * .14 - root.current.rotation.y) * .05;
    head.current.rotation.y += (mouse.current.x * .55 - head.current.rotation.y) * .06;
    head.current.rotation.x += (mouse.current.y * .25 - head.current.rotation.x) * .06;
    eyes.current.scale.y = (t % 4) > 3.88 ? .08 : 1 + (reduced ? 0 : Math.sin(t * 3) * .12);
    if (!reduced) ring.current.rotation.z += dt * .12;
  });
  return (<group ref={root}>
    <mesh ref={ring} position={[0, .25, -.9]}><torusGeometry args={[1.9, .014, 8, 96]} /><meshBasicMaterial color="#E63946" transparent opacity={.55} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
    <Part position={[0, -1.2, 0]} scale={[1.5, .95, .8]}><sphereGeometry args={[1, 24, 16]} /></Part>
    <Part position={[0, -.42, 0]}><cylinderGeometry args={[.22, .3, .4, 16]} /></Part>
    <group ref={head}>
      <Part position={[0, .1, 0]} scale={[.88, 1.1, .9]}><sphereGeometry args={[.5, 24, 16]} /></Part>
      <group ref={eyes}>{[-1, 1].map((s) => <mesh key={s} position={[s * .17, .12, .43]} scale={[1.5, .7, 1]}><sphereGeometry args={[.06, 12, 8]} /><meshBasicMaterial color="#E63946" /></mesh>)}</group>
      <pointLight position={[0, .15, .9]} color="#E63946" intensity={4} distance={3} />
      <group rotation={[0, 0, .05]}>
        <Part position={[0, .74, 0]}><cylinderGeometry args={[.4, .5, .5, 24]} /></Part>
        <mesh position={[0, .64, 0]}><cylinderGeometry args={[.515, .515, .09, 24]} /><meshBasicMaterial color="#367BF0" /></mesh>
        <Part position={[0, .5, 0]}><cylinderGeometry args={[1.05, 1.05, .045, 40]} /></Part>
      </group></group></group>);
}

export default function Hero3D({ reduced, small }) {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const f = (e) => { mouse.current = { x: (e.clientX / innerWidth - .5) * 2, y: (e.clientY / innerHeight - .5) * 2 }; };
    addEventListener("pointermove", f, { passive: true }); return () => removeEventListener("pointermove", f);
  }, []);
  return (<Canvas dpr={[1, small ? 1.25 : 1.75]} camera={{ position: [0, 0, 5], fov: 45 }} frameloop={reduced ? "demand" : "always"} gl={{ antialias: !small, alpha: true }}>
    <fog attach="fog" args={["#080B12", 9, 18]} />
    <ambientLight intensity={.25} /><pointLight position={[-3, 2, 2]} color="#367BF0" intensity={70} /><pointLight position={[3, 1, -1]} color="#E63946" intensity={45} /><directionalLight position={[0, 2, -3]} color="#7fa8ff" intensity={2} />
    <Fog color="#E63946" pos={[.8, -.4, -3.5]} size={10} o={.3} speed={.2} /><Fog color="#367BF0" pos={[-2.6, 1.4, -4]} size={7} o={.14} speed={.15} />
    <Streaks reduced={reduced} /><Particles count={small ? 260 : 650} reduced={reduced} mouse={mouse} /><AnonModel reduced={reduced} mouse={mouse} small={small} /><Rig mouse={mouse} />
  </Canvas>);
}
