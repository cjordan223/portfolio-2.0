import React, { useEffect, useRef, useState } from 'react';
import './AuroraBackground.css';

interface SimplexNoise {
  noise2D(x: number, y: number): number;
  noise3D(x: number, y: number, z: number): number;
  noise4D(x: number, y: number, z: number, w: number): number;
}

declare global {
  interface Window {
    SimplexNoise: new () => SimplexNoise;
  }
}

// Aurora theme presets
export const AURORA_THEMES = {
  purple: {
    rayCount: 800,
    baseLength: 300,
    rangeLength: 300,
    baseSpeed: 0.07,
    rangeSpeed: 0.18,
    baseWidth: 15,
    rangeWidth: 30,
    baseHue: 270,
    rangeHue: 90,
    baseTTL: 65,
    rangeTTL: 150,
    noiseStrength: 170,
    xOff: 0.0024,
    yOff: 0.0019,
    zOff: 0.0028,
    backgroundColor: 'hsla(260,80%,2%,0.9)'
  },
  cyan: {
    rayCount: 650,
    baseLength: 230,
    rangeLength: 220,
    baseSpeed: 0.06,
    rangeSpeed: 0.12,
    baseWidth: 10,
    rangeWidth: 20,
    baseHue: 185,
    rangeHue: 80,
    baseTTL: 55,
    rangeTTL: 100,
    noiseStrength: 120,
    xOff: 0.0018,
    yOff: 0.0015,
    zOff: 0.0020,
    backgroundColor: 'hsla(230,80%,1%,0.97)'
  },
  green: {
    rayCount: 500,
    baseLength: 200,
    rangeLength: 200,
    baseSpeed: 0.05,
    rangeSpeed: 0.1,
    baseWidth: 10,
    rangeWidth: 20,
    baseHue: 120,
    rangeHue: 60,
    baseTTL: 50,
    rangeTTL: 100,
    noiseStrength: 100,
    xOff: 0.0015,
    yOff: 0.0015,
    zOff: 0.0015,
    backgroundColor: 'hsla(220,60%,3%,1)'
  },
  red: {
    rayCount: 650,
    baseLength: 280,
    rangeLength: 220,
    baseSpeed: 0.06,
    rangeSpeed: 0.14,
    baseWidth: 14,
    rangeWidth: 28,
    baseHue: 0, // Red
    rangeHue: 60, // Allows variation from red to orange/yellow
    baseTTL: 55,
    rangeTTL: 110,
    noiseStrength: 130,
    xOff: 0.002,
    yOff: 0.002,
    zOff: 0.002,
    backgroundColor: 'hsla(0,70%,3%,0.9)'
  }
};

export type ThemeKey = keyof typeof AURORA_THEMES;

interface AuroraBackgroundProps {
  theme?: ThemeKey;
}

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ theme = 'cyan' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>(theme);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Update if theme prop changes
  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  // Separate the script loading from the aurora setup
  useEffect(() => {
    // Add SimplexNoise script
    let script = document.getElementById('simplex-noise-script') as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement('script');
      script.id = 'simplex-noise-script';
      script.src = 'https://cdn.jsdelivr.net/npm/simplex-noise@2.4.0/simplex-noise.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
    
    const handleScriptLoad = () => {
      setIsInitialized(true);
    };
    
    if (script.loaded) {
      setIsInitialized(true);
    } else {
      script.addEventListener('load', handleScriptLoad);
    }
    
    return () => {
      if (script) {
        script.removeEventListener('load', handleScriptLoad);
      }
    };
  }, []);
  
  // Setup Aurora when script is loaded and when theme changes
  useEffect(() => {
    if (isInitialized && containerRef.current && window.SimplexNoise) {
      console.log('Setting up Aurora with theme:', currentTheme);
      setupAurora();
    }
  }, [isInitialized, currentTheme]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      const canvasElement = document.querySelector('.aurora-canvas-b');
      if (canvasElement) {
        canvasElement.remove();
      }
    };
  }, []);

  const setupAurora = () => {
    // Get the current theme settings
    const themeSettings = AURORA_THEMES[currentTheme];
    
    const rayCount = themeSettings.rayCount;
    const rayPropCount = 8;
    const rayPropsLength = rayCount * rayPropCount;
    const baseLength = themeSettings.baseLength;
    const rangeLength = themeSettings.rangeLength;
    const baseSpeed = themeSettings.baseSpeed;
    const rangeSpeed = themeSettings.rangeSpeed;
    const baseWidth = themeSettings.baseWidth;
    const rangeWidth = themeSettings.rangeWidth;
    const baseHue = themeSettings.baseHue;
    const rangeHue = themeSettings.rangeHue;
    const baseTTL = themeSettings.baseTTL;
    const rangeTTL = themeSettings.rangeTTL;
    const noiseStrength = themeSettings.noiseStrength;
    const xOff = themeSettings.xOff;
    const yOff = themeSettings.yOff;
    const zOff = themeSettings.zOff;
    const backgroundColor = themeSettings.backgroundColor;

    let container: HTMLElement;
    let canvas: { a: HTMLCanvasElement; b: HTMLCanvasElement };
    let ctx: { a: CanvasRenderingContext2D; b: CanvasRenderingContext2D };
    let center: number[];
    let tick: number;
    let simplex: SimplexNoise;
    let rayProps: Float32Array;

    function setup() {
      createCanvas();
      resize();
      initRays();
      draw();
    }

    function initRays() {
      tick = 0;
      simplex = new window.SimplexNoise();
      rayProps = new Float32Array(rayPropsLength);

      let i;

      for (i = 0; i < rayPropsLength; i += rayPropCount) {
        initRay(i);
      }
    }

    function initRay(i: number) {
      const length = baseLength + rand(rangeLength);
      const x = rand(canvas.a.width);
      let y1 = center[1] + noiseStrength;
      let y2 = center[1] + noiseStrength - length;
      const n = simplex.noise3D(x * xOff, y1 * yOff, tick * zOff) * noiseStrength;
      y1 += n;
      y2 += n;
      const life = 0;
      const ttl = baseTTL + rand(rangeTTL);
      const width = baseWidth + rand(rangeWidth);
      const speed = baseSpeed + rand(rangeSpeed) * (round(rand(1)) ? 1 : -1);
      const hue = baseHue + rand(rangeHue);

      rayProps.set([x, y1, y2, life, ttl, width, speed, hue], i);
    }

    function drawRays() {
      let i;

      for (i = 0; i < rayPropsLength; i += rayPropCount) {
        updateRay(i);
      }
    }

    function updateRay(i: number) {
      const i2=1+i, i3=2+i, i4=3+i, i5=4+i, i6=5+i, i7=6+i, i8=7+i;
      let x = rayProps[i];
      const y1 = rayProps[i2];
      const y2 = rayProps[i3];
      let life = rayProps[i4];
      const ttl = rayProps[i5];
      const width = rayProps[i6];
      const speed = rayProps[i7];
      const hue = rayProps[i8];

      drawRay(x, y1, y2, life, ttl, width, hue);

      x += speed;
      life++;

      rayProps[i] = x;
      rayProps[i4] = life;

      if (checkBounds(x) || life > ttl) {
        initRay(i);
      }
    }

    function drawRay(x: number, y1: number, y2: number, life: number, ttl: number, width: number, hue: number) {
      const gradient = ctx.a.createLinearGradient(x, y1, x, y2);
      gradient.addColorStop(0, `hsla(${hue},100%,65%,0)`);
      gradient.addColorStop(0.5, `hsla(${hue},100%,65%,${fadeInOut(life, ttl)})`);
      gradient.addColorStop(1, `hsla(${hue},100%,65%,0)`);

      ctx.a.save();
      ctx.a.beginPath();
      ctx.a.strokeStyle = gradient;
      ctx.a.lineWidth = width;
      ctx.a.moveTo(x, y1);
      ctx.a.lineTo(x, y2);
      ctx.a.stroke();
      ctx.a.closePath();
      ctx.a.restore();
    }

    function checkBounds(x: number) {
      return x < 0 || x > canvas.a.width;
    }

    function createCanvas() {
      container = containerRef.current as HTMLElement;
      canvas = {
        a: document.createElement('canvas'),
        b: document.createElement('canvas')
      };
      canvas.b.className = 'aurora-canvas-b';
      canvas.b.style.position = 'fixed';
      canvas.b.style.top = '0';
      canvas.b.style.left = '0';
      canvas.b.style.width = '100%';
      canvas.b.style.height = '100%';
      canvas.b.style.zIndex = '-10';
      
      container.appendChild(canvas.b);
      ctx = {
        a: canvas.a.getContext('2d') as CanvasRenderingContext2D,
        b: canvas.b.getContext('2d') as CanvasRenderingContext2D
      };
      center = [];
    }

    function resize() {
      const { innerWidth, innerHeight } = window;
      
      canvas.a.width = innerWidth;
      canvas.a.height = innerHeight;

      ctx.a.drawImage(canvas.b, 0, 0);

      canvas.b.width = innerWidth;
      canvas.b.height = innerHeight;
      
      ctx.b.drawImage(canvas.a, 0, 0);

      center[0] = 0.5 * canvas.a.width;
      center[1] = 0.5 * canvas.a.height;
    }

    function render() {
      ctx.b.save();
      ctx.b.filter = 'blur(12px)';
      ctx.a.globalCompositeOperation = 'lighter';
      ctx.b.drawImage(canvas.a, 0, 0);
      ctx.b.restore();
    }

    function draw() {
      tick++;
      ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
      ctx.b.fillStyle = backgroundColor;
      ctx.b.fillRect(0, 0, canvas.b.width, canvas.a.height);
      drawRays();
      render();

      window.requestAnimationFrame(draw);
    }

    function rand(max: number) {
      return Math.random() * max;
    }

    function round(num: number) {
      return Math.round(num);
    }

    function fadeInOut(t: number, m: number) {
      const hm = 0.5 * m;
      return Math.abs((t + hm) % m - hm) / hm;
    }

    window.addEventListener('resize', resize);
    setup();
  };

  return (
    <div ref={containerRef} className="aurora-background-container">
      <div className="aurora-overlay"></div>
    </div>
  );
};

export default AuroraBackground; 