import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineX } from 'react-icons/hi'

export default function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="glass max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-mist-100">{title}</h3>
              <button onClick={onClose} className="text-mist-500 hover:text-mist-100">
                <HiOutlineX size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
