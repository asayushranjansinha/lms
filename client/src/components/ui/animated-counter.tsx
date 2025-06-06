'use client';

import {
  motion,
  MotionValue,
  useSpring,
  useTransform,
  useInView
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const fontSize = 30;
const padding = 15;
const height = fontSize + padding;

export function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      setDisplayValue(value);
    }
  }, [isInView, value]);

  const digitsStr = displayValue.toString();

  // Generate array of place values for digits, e.g. for '1205': [1000, 100, 10, 1]
  const placeValues = digitsStr
    .split('')
    .map((_, i) => Math.pow(10, digitsStr.length - i - 1));

  return (
    <div
      ref={ref}
      style={{ fontSize }}
      className='bg-card text-card-foreground flex overflow-hidden rounded-l-md px-2 leading-none'
    >
      {placeValues.map((place, idx) => (
        <Digit key={idx} value={displayValue} place={place} />
      ))}
    </div>
  );
}

function Digit({ value, place }: { value: number; place: number }) {
  // Extract digit at this place, e.g. for value=1205 and place=100, digit=2
  const digitValue = Math.floor((value / place) % 10);
  const animatedValue = useSpring(digitValue, { damping: 20, stiffness: 100 });

  useEffect(() => {
    animatedValue.set(digitValue);
  }, [animatedValue, digitValue]);

  return (
    <div style={{ height }} className='relative w-[1ch] tabular-nums'>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  const y = useTransform(mv, (latest) => {
    const offset = (10 + number - latest) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className='absolute inset-0 flex items-center justify-center'
    >
      {number}
    </motion.span>
  );
}
