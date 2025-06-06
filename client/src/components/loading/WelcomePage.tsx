'use client';
import React from 'react';
import { motion } from 'motion/react';

const loadingMessages = [
  'Preparing your learning environment...',
  'Loading your courses...',
  'Setting up your dashboard...',
  'Almost ready to learn!'
];

const WelcomePage = () => {
  const [isClient, setIsClient] = React.useState(false);
  const [currentMessage, setCurrentMessage] = React.useState(0);

  // Fixed random values to ensure consistency between server and client
  const fixedPositions = React.useMemo(() => {
    const positions = [];
    // Use a seed-based approach for consistent "random" positions
    for (let i = 0; i < 15; i++) {
      positions.push({
        left: `${(i * 7 + 10) % 90}%`,
        top: `${(i * 11 + 15) % 90}%`,
        symbol: ['π', '∑', '∞', '∫', 'α', 'β', '∆', '√', '≈', '≤'][i % 10],
        delay: (i * 0.3) % 3,
        duration: 5 + (i % 10)
      });
    }
    return positions;
  }, []);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isClient]);

  // Container animation
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.15 }
    }
  };

  // Logo animation
  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  // Book pages flipping animation
  const pageVariants = {
    animate: {
      rotateY: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  // Floating knowledge icons
  const floatVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  // Progress dots animation
  const dotVariants = {
    animate: (i: number) => ({
      scale: [1, 1.5, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: i * 0.2,
        ease: 'easeInOut'
      }
    })
  };

  // Text typing animation
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.5 }
    }
  };

  // Progress bar animation
  const progressVariants = {
    initial: { width: '0%' },
    animate: {
      width: ['0%', '30%', '60%', '85%', '100%'],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div
      className='relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      variants={containerVariants}
      initial='initial'
      animate='animate'
    >
      {/* Background educational elements */}
      <div className='absolute inset-0 opacity-10'>
        {/* Floating mathematical formulas */}
        {fixedPositions.map((pos, i) => (
          <motion.div
            key={i}
            className='absolute font-mono text-lg text-indigo-600'
            initial={{
              opacity: 0
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.3, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay
            }}
            style={{
              left: pos.left,
              top: pos.top
            }}
          >
            {pos.symbol}
          </motion.div>
        ))}
      </div>

      {/* Main loading content */}
      <div className='z-10 mx-auto max-w-md px-6 text-center'>
        {/* Learnova Logo with Book Animation */}
        <motion.div variants={logoVariants} className='mb-8'>
          <div className='relative'>
            {/* Animated Book SVG */}
            <motion.svg
              width='120'
              height='120'
              viewBox='0 0 120 120'
              className='mx-auto mb-4'
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Book base */}
              <motion.rect
                x='20'
                y='30'
                width='80'
                height='60'
                rx='4'
                fill='url(#bookGradient)'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              />

              {/* Book spine */}
              <motion.rect
                x='20'
                y='30'
                width='8'
                height='60'
                fill='#4F46E5'
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />

              {/* Book pages */}
              <motion.g variants={pageVariants} animate='animate'>
                <rect
                  x='35'
                  y='45'
                  width='50'
                  height='2'
                  fill='#E5E7EB'
                  rx='1'
                />
                <rect
                  x='35'
                  y='52'
                  width='45'
                  height='2'
                  fill='#E5E7EB'
                  rx='1'
                />
                <rect
                  x='35'
                  y='59'
                  width='40'
                  height='2'
                  fill='#E5E7EB'
                  rx='1'
                />
                <rect
                  x='35'
                  y='66'
                  width='48'
                  height='2'
                  fill='#E5E7EB'
                  rx='1'
                />
              </motion.g>

              {/* Floating knowledge symbols */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.circle
                  cx='105'
                  cy='25'
                  r='8'
                  fill='#F59E0B'
                  variants={floatVariants}
                  animate='animate'
                />
                <text
                  x='105'
                  y='30'
                  textAnchor='middle'
                  fill='white'
                  fontSize='10'
                  fontWeight='bold'
                >
                  !
                </text>

                <motion.circle
                  cx='15'
                  cy='25'
                  r='8'
                  fill='#10B981'
                  variants={floatVariants}
                  animate='animate'
                  transition={{ delay: 0.5 }}
                />
                <text
                  x='15'
                  y='30'
                  textAnchor='middle'
                  fill='white'
                  fontSize='10'
                  fontWeight='bold'
                >
                  ?
                </text>

                <motion.circle
                  cx='105'
                  cy='105'
                  r='8'
                  fill='#EF4444'
                  variants={floatVariants}
                  animate='animate'
                  transition={{ delay: 1 }}
                />
                <text
                  x='105'
                  y='110'
                  textAnchor='middle'
                  fill='white'
                  fontSize='10'
                  fontWeight='bold'
                >
                  ★
                </text>
              </motion.g>

              <defs>
                <linearGradient
                  id='bookGradient'
                  x1='0%'
                  y1='0%'
                  x2='100%'
                  y2='100%'
                >
                  <stop offset='0%' stopColor='#6366F1' />
                  <stop offset='100%' stopColor='#8B5CF6' />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Learnova Text Logo */}
            <motion.h1
              className='bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Learnova
            </motion.h1>
            <motion.p
              className='mt-1 text-sm font-medium text-indigo-500'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Learning Management System
            </motion.p>
          </div>
        </motion.div>

        {/* Progress Animation */}
        <motion.div
          className='mb-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {/* Progress Dots */}
          <div className='mb-6 flex justify-center space-x-3'>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className='h-3 w-3 rounded-full bg-indigo-400'
                variants={dotVariants}
                animate='animate'
                custom={i}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className='mx-auto mb-4 w-full max-w-xs'>
            <div className='h-2 overflow-hidden rounded-full bg-indigo-100'>
              <motion.div
                className='h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500'
                variants={progressVariants}
                animate='animate'
              />
            </div>
          </div>
        </motion.div>

        {/* Dynamic Loading Messages */}
        <motion.div variants={textVariants} className='mb-8'>
          <motion.h2
            className='mb-3 text-2xl font-semibold text-gray-700'
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            Welcome Back!
          </motion.h2>

          <motion.p
            className='text-lg text-gray-500'
            key={`message-${currentMessage}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {loadingMessages[currentMessage]}
          </motion.p>
        </motion.div>

        {/* Educational Icons Animation */}
        <motion.div
          className='flex justify-center space-x-8 opacity-60'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {/* Graduation Cap */}
          <motion.svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            className='text-indigo-400'
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <path
              fill='currentColor'
              d='M16 2L3 9l13 7 13-7-13-7zM6.5 10.5v8L16 23l9.5-4.5v-8L16 15l-9.5-4.5z'
            />
          </motion.svg>

          {/* Lightbulb */}
          <motion.svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            className='text-yellow-400'
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              fill='currentColor'
              d='M16 2C11.582 2 8 5.582 8 10c0 2.395 1.094 4.531 2.781 5.969L12 28h8l1.219-12.031C22.906 14.531 24 12.395 24 10c0-4.418-3.582-8-8-8z'
            />
          </motion.svg>

          {/* Certificate */}
          <motion.svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            className='text-green-400'
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <path
              fill='currentColor'
              d='M26 6H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8l2 4 2-4h8c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-3 14H9v-2h14v2zm0-4H9v-2h14v2zm0-4H9V10h14v2z'
            />
          </motion.svg>
        </motion.div>
      </div>

      {/* Decorative Corner Elements */}
      <div className='absolute top-8 left-8 opacity-20'>
        <motion.div
          className='h-16 w-16 rotate-45 border-2 border-indigo-300'
          animate={{ rotate: [45, 225, 45] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className='absolute right-8 bottom-8 opacity-20'>
        <motion.div
          className='h-12 w-12 rounded-full bg-gradient-to-r from-purple-300 to-indigo-300'
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};
export default WelcomePage;
