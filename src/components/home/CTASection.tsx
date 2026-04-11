import { ArrowRight, ArrowUpRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'


const CTASection = () => {
  return (
    <div>
      {/* CTA Banner */}
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12">
				<div className="relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm shadow-gray-100 p-8 sm:p-12 lg:p-14">
					{/* Cyan accent stripe */}
					<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#09BACF] via-[#34cee0] to-transparent" />

					{/* Decorative number */}
					<span className="absolute right-8 top-4 text-[10rem] font-black leading-none text-gray-50 select-none pointer-events-none">
						↗
					</span>

					<div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
						<div className="max-w-lg">
							<p className="text-[#09BACF] text-xs font-bold uppercase tracking-[0.2em] mb-4">
								Ready to start?
							</p>
							<h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tight text-gray-950 mb-4">
								Let's build{' '}
								<span className="text-[#09BACF]">something</span>
								<br />
								<span className="text-gray-300">extraordinary.</span>
							</h2>
							<p className="text-gray-400 text-sm leading-relaxed">
								Tell us about your vision — we'll respond within 24 hours with a tailored plan.
							</p>
						</div>

						<div className="flex flex-col gap-3 flex-shrink-0">
							<Link
								to="/contact"
								className="group inline-flex items-center gap-3 px-8 py-4 bg-[#09BACF] text-gray-950 rounded-full font-bold text-sm hover:bg-[#07a8bc] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#09BACF]/25"
							>
								Start a Project
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</Link>
							<Link
								to="/work"
								className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-200 text-gray-500 rounded-full font-medium text-sm hover:border-gray-400 hover:text-gray-950 transition-all duration-300"
							>
								View Our Work
								<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
							</Link>
						</div>
					</div>
				</div>
			</div>
    </div>
  )
}

export default CTASection
