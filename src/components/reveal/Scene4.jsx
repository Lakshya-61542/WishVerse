import getImageSrc from "../../utils/getImageSrc";
import { motion } from "framer-motion";

export default function Scene4({

    image,
    recipientName,

}){

return(

<div className="relative flex h-full w-full items-center justify-center overflow-hidden">

{/* Background Glow */}

<div className="absolute h-80 w-80 rounded-full bg-violet-500/20 blur-[120px]" />

{/* Floating Particles */}

{[...Array(18)].map((_,i)=>(

<motion.div

key={i}

initial={{
    opacity:0,
    y:50
}}

animate={{
    opacity:[0,.8,0],
    y:-250
}}

transition={{
    repeat:Infinity,
    duration:5+Math.random()*4,
    delay:Math.random()*4
}}

className="absolute h-2 w-2 rounded-full bg-white/70"

style={{
left:`${Math.random()*100}%`,
bottom:0
}}

/>

))}

<motion.div

initial={{
    opacity:0,
    scale:.85,
}}

animate={{
    opacity:1,
    scale:1,
}}

transition={{
    duration:1
}}

className="relative rounded-[40px] border border-white/20 bg-white/10 p-4 backdrop-blur-xl shadow-[0_0_80px_rgba(139,92,246,.35)]"

>

<motion.img
  src={getImageSrc(image)}
  alt={recipientName}
  className="h-80 w-64 rounded-[30px] object-cover"
  animate={{
    scale: [1, 1.03, 1],
  }}
  transition={{
    repeat: Infinity,
    duration: 6,
  }}
/>

</motion.div>

<motion.h2

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:.6
}}

className="absolute bottom-24 text-2xl font-semibold text-white"

>

{recipientName} ❤️

</motion.h2>

</div>

)

}