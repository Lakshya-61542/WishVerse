import { motion } from "framer-motion";

export default function FloatingStars() {

    return (

        <>

            <motion.div

                animate={{
                    y:[0,-20,0],
                }}

                transition={{
                    duration:6,
                    repeat:Infinity,
                }}

                className="absolute left-10 top-20 text-3xl"

            >

                ✨

            </motion.div>

            <motion.div

                animate={{
                    y:[0,-15,0],
                }}

                transition={{
                    duration:5,
                    repeat:Infinity,
                }}

                className="absolute right-12 top-44 text-2xl"

            >

                ⭐

            </motion.div>

        </>

    );

}