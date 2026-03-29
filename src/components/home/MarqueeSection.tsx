const techs = [
'React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker',
'Kubernetes', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Next.js',
'Flutter', 'Swift', 'Kotlin', 'TensorFlow', 'Figma',
];

// Duplicate twice for seamless loop (translateX -50%)
const items = [...techs, ...techs];
const itemsReverse = [...techs].reverse();
const itemsR = [...itemsReverse, ...itemsReverse];

const MarqueeSection = () => {
return (
<div className="py-6 bg-[#241678] overflow-hidden border-y border-[#3d2aa0]/50 space-y-3">
{/* Forward */}
<div
className="flex whitespace-nowrap"
style={{ animation: 'marqueeF 30s linear infinite', willChange: 'transform' }}
>
{items.map((tech, i) => (
<span
key={i}
className="inline-flex items-center gap-4 mx-6 text-gray-500 text-xs font-semibold uppercase tracking-[0.15em] flex-shrink-0 hover:text-[#09BACF] transition-colors duration-200"
>
{tech}
<span className="w-1 h-1 bg-[#09BACF]/40 rounded-full flex-shrink-0" />
</span>
))}
</div>
{/* Reverse */}
<div
className="flex whitespace-nowrap"
style={{ animation: 'marqueeR 24s linear infinite', willChange: 'transform' }}
>
{itemsR.map((tech, i) => (
<span
key={i}
className="inline-flex items-center gap-4 mx-6 text-gray-700 text-xs font-semibold uppercase tracking-[0.15em] flex-shrink-0 hover:text-[#09BACF] transition-colors duration-200"
>
{tech}
<span className="w-1 h-1 bg-gray-700 rounded-full flex-shrink-0" />
</span>
))}
</div>

<style>{`
@keyframes marqueeF {
0%   { transform: translateX(0); }
100% { transform: translateX(-50%); }
}
@keyframes marqueeR {
0%   { transform: translateX(0); }
100% { transform: translateX(50%); }
}
`}</style>
</div>
);
};

export default MarqueeSection;