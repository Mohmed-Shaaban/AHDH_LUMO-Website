import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router';

interface IProps {
  duration?: number;
}

const AuthPageTransition = ({ duration = 0.3 }: IProps) => {
  const location = useLocation();
  const currentOutlet = useOutlet();

  return (
    <div className="w-full">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: duration,
            ease: 'easeInOut',
          }}
        >
          {currentOutlet}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthPageTransition;
