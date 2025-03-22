import { motion } from 'framer-motion';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export function AnimatedAbout() {
  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 -z-10 bg-muted/50" />
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 flex flex-col items-center text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4">About Me</Badge>
          </motion.div>
          <motion.h2 className="mb-6 text-3xl font-bold md:text-4xl" variants={fadeInUp}>
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              My Background
            </span>
          </motion.h2>
          <motion.div variants={fadeInUp}>
            <Separator className="mb-6 w-24" />
          </motion.div>
          <motion.p className="max-w-2xl text-muted-foreground" variants={fadeInUp}>
            Learn more about my journey, experience, and what drives me as a developer.
          </motion.p>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-12">
          <motion.div
            className="relative h-64 w-64 overflow-hidden rounded-xl border"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
              delay: 0.2,
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5"
              animate={{
                opacity: [0.6, 0.8, 0.6],
                rotate: [0, 3, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.img
                src="/img.png"
                alt="Paul Ionut Doros"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          <motion.div
            className="flex max-w-3xl flex-col justify-center text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 className="mb-4 text-2xl font-bold" variants={fadeInUp}>
              Hi, I&apos;m Paul Ionut Doros
            </motion.h3>
            <motion.p className="mb-6 text-muted-foreground" variants={fadeInUp}>
              As a front-end developer, I don&apos;t just write code I create solutions. Over the
              past couple of years, I&apos;ve worked on a wide range of tasks, from building
              responsive, user-friendly features to troubleshooting complex issues. But what truly
              sets me apart is my adaptability and willingness to step outside of my role whenever
              necessary.
            </motion.p>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <motion.div className="space-y-2" variants={fadeInUp}>
                <h4 className="font-semibold">Frontend Development</h4>
                <p className="text-sm text-muted-foreground">
                  My expertise lies in JavaScript/TypeScript, React, Remix, and React Native.
                  I&apos;m experienced in UI/UX improvements, implementing animations and
                  transitions, and building reusable component libraries for optimized development
                  workflows.
                </p>
              </motion.div>
              <motion.div className="space-y-2" variants={fadeInUp}>
                <h4 className="font-semibold">Mobile Development</h4>
                <p className="text-sm text-muted-foreground">
                  I&apos;ve developed cross-platform applications using React Native, optimizing for
                  both iOS and Android. My experience includes app store deployment, performance
                  optimization, and implementing responsive layouts.
                </p>
              </motion.div>
            </div>
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
              variants={fadeInUp}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  <a href="/#contact">Get In Touch</a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" asChild className="border-primary/20">
                  <a href="/#projects">View Projects</a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
