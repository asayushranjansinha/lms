'use client';
/**
 * Packages & Libraries
 */
import { motion } from 'framer-motion';
import {
  Award,
  BarChart3,
  Book,
  BookOpen,
  Clock,
  MessageSquare,
  Settings,
  Shield,
  Smartphone,
  UserCheck,
  Users
} from 'lucide-react';

/**
 * Components & Utilities
 */
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export const FeaturesSection = () => {
  return (
    <section id='features' className='container mx-auto px-4 py-24 md:px-0'>
      {/* Admin Features */}
      <div className='mb-16 space-y-4 text-center'>
        <Badge variant='outline' className='mx-auto w-fit'>
          <Settings className='mr-1 h-3 w-3' />
          Admin Features
        </Badge>
        <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
          Everything you need to manage your LMS
        </h2>
        <p className='text-muted-foreground mx-auto max-w-[800px] text-xl'>
          Powerful tools and insights to help you create, manage, and optimize
          your learning platform.
        </p>
      </div>

      <motion.div
        className='mb-24 grid gap-8 md:grid-cols-2 lg:grid-cols-3'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
      >
        {[
          {
            icon: <Users className='h-5 w-5 text-blue-600' />,
            iconBg: 'bg-blue-100',
            title: 'Student Management',
            description:
              'Comprehensive student profiles, enrollment tracking, and progress monitoring with detailed analytics.'
          },
          {
            icon: <BookOpen className='h-5 w-5 text-green-600' />,
            iconBg: 'bg-green-100',
            title: 'Course Builder',
            description:
              'Intuitive drag-and-drop course creation with multimedia support, quizzes, and assignments.'
          },
          {
            icon: <BarChart3 className='h-5 w-5 text-purple-600' />,
            iconBg: 'bg-purple-100',
            title: 'Advanced Analytics',
            description:
              'Real-time dashboards, performance metrics, and detailed reports to track learning outcomes.'
          },
          {
            icon: <Shield className='h-5 w-5 text-orange-600' />,
            iconBg: 'bg-orange-100',
            title: 'Security & Compliance',
            description:
              'Enterprise-grade security with GDPR compliance, SSO integration, and role-based access control.'
          },
          {
            icon: <Clock className='h-5 w-5 text-red-600' />,
            iconBg: 'bg-red-100',
            title: 'Automated Workflows',
            description:
              'Streamline operations with automated enrollment, notifications, and certificate generation.'
          },
          {
            icon: <Award className='h-5 w-5 text-yellow-600' />,
            iconBg: 'bg-yellow-100',
            title: 'Certification System',
            description:
              'Create and manage digital certificates with blockchain verification and custom branding.'
          }
        ].map(({ icon, iconBg, title, description }) => (
          <motion.div
            key={title}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            whileFocus={{ scale: 1.03 }}
            className='cursor-pointer'
          >
            <Card className='border-0 shadow-lg transition-shadow hover:shadow-xl'>
              <CardHeader>
                <div className='flex items-center space-x-2'>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}
                  >
                    {icon}
                  </div>
                  <CardTitle>{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Student Features */}
      <div className='mb-16 space-y-4 text-center'>
        <Badge variant='outline' className='mx-auto w-fit'>
          <UserCheck className='mr-1 h-3 w-3' />
          Student Features
        </Badge>
        <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
          Designed to empower learners
        </h2>
        <p className='text-muted-foreground mx-auto max-w-[800px] text-xl'>
          Tools and features focused on providing an engaging and effective
          learning experience.
        </p>
      </div>

      <motion.div
        className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
      >
        {[
          {
            icon: <Book className='h-5 w-5 text-teal-600' />,
            iconBg: 'bg-teal-100',
            title: 'Personalized Learning',
            description:
              'Adaptive content recommendations tailored to individual learning styles and progress.'
          },
          {
            icon: <BarChart3 className='h-5 w-5 text-cyan-600' />,
            iconBg: 'bg-cyan-100',
            title: 'Progress Tracking',
            description:
              'Visual dashboards that help students monitor their learning achievements and goals.'
          },
          {
            icon: <MessageSquare className='h-5 w-5 text-purple-600' />,
            iconBg: 'bg-purple-100',
            title: 'Discussion Forums',
            description:
              'Engage with peers and instructors through real-time discussion boards and Q&A.'
          },
          {
            icon: <Smartphone className='h-5 w-5 text-pink-600' />,
            iconBg: 'bg-pink-100',
            title: 'Mobile Access',
            description:
              'Full-featured mobile app support to learn anytime, anywhere.'
          },
          {
            icon: <Award className='h-5 w-5 text-yellow-600' />,
            iconBg: 'bg-yellow-100',
            title: 'Achievements & Badges',
            description:
              'Earn badges and certificates as motivation and proof of your learning milestones.'
          }
        ].map(({ icon, iconBg, title, description }) => (
          <motion.div
            key={title}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            whileFocus={{ scale: 1.03 }}
            className='cursor-pointer'
          >
            <Card className='border-0 shadow-lg transition-shadow hover:shadow-xl'>
              <CardHeader>
                <div className='flex items-center space-x-2'>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}
                  >
                    {icon}
                  </div>
                  <CardTitle>{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};
