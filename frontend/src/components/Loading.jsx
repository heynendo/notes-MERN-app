import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { AnimatePresence, motion } from 'framer-motion'

function Loading(){
    const [toggle, setToggle] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setToggle(x => !x)
        }, 5000)

        return () => clearInterval(interval)
    },[])

    return(
        <div className='loading'>
            <AnimatePresence mode="wait">
                {toggle ? (
                    <motion.p
                        key="msg1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        Data is loading...
                    </motion.p>
                ) : (
                    <motion.p
                        key="msg2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        ...load times vary, please be patient!
                    </motion.p>
                )}
            </AnimatePresence>
            <BeatLoader
                color={"rgb(0, 140, 255, 0.75)"}
                size={20}
            />
        </div>
    )
}

export default Loading