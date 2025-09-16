import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  index: number;
  accent?: boolean;
  className?: string;
}

export default function AnimatedSection({ 
  children, 
  index, 
  accent = false, 
  className = "" 
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className={`rounded-2xl ${
        accent ? "bg-amber-50 ring-amber-100" : "bg-white ring-gray-100"
      } p-5 shadow-md ring-1 ${className}`}
    >
      {children}
    </motion.section>
  );
}
