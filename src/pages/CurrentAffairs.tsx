import { Link } from "react-router-dom";
import { dailyDigests } from "../data/currentAffairs";

/**
 * CurrentAffairs listing page
 * 
 * Shows a chronological list of Daily Current Affairs digests.
 * Now fully integrated with the site's global navigation.
 */

const CurrentAffairs = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-4 md:pt-8">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <header className="mb-10 md:mb-16 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-[10px] md:text-sm font-bold text-blue-900 bg-blue-50 rounded-full border border-blue-100 uppercase tracking-widest">
            UPSC 2026 Daily Digest
          </div>
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-slate-900 mb-6">Daily Current Affairs</h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Stay ahead with curated daily analysis. We filter the noise and provide only what matters for your Prelims and Mains.
          </p>
        </header>

        <div className="space-y-6 md:space-y-8">
          {(Array.isArray(dailyDigests) ? [...dailyDigests] : []).reverse().map((digest) => (
            <div key={digest.id} className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6 md:p-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8 border-b border-slate-100 pb-6">
                  <div>
                    <span className="text-[10px] md:text-xs font-bold text-blue-900 tracking-widest uppercase mb-1 block">
                      {digest.day}, {digest.date}
                    </span>
                    <h2 className="text-xl md:text-2xl font-playfair font-bold text-slate-900">
                      {digest.tagline}
                    </h2>
                  </div>
                  <Link 
                    to={`/current-affairs/${digest.id}`}
                    className="px-6 py-3 bg-slate-900 text-white text-xs md:text-sm font-bold rounded-xl hover:bg-slate-800 transition-all text-center active:scale-95 shadow-lg shadow-slate-900/5 group"
                  >
                    Read Today's Points
                    <span className="inline-block ml-1 group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-6">
                  {digest.topics.map((topic, idx) => (
                    <Link key={topic.id} to={`/current-affairs/${digest.id}`} className="group">
                      <div className="flex gap-4 items-start">
                        <span className="text-slate-200 font-playfair italic text-lg md:text-xl group-hover:text-blue-900 transition-colors shrink-0">0{idx + 1}</span>
                        <div>
                          <h3 className="text-xs md:text-sm font-bold text-slate-800 group-hover:text-blue-900 transition-colors leading-tight mb-1">
                            {topic.title}
                          </h3>
                          <p className="text-[10px] md:text-xs text-slate-400 line-clamp-1 uppercase tracking-tighter">{topic.subtitle}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-8 md:mt-10 flex items-center justify-between pt-6 border-t border-slate-50">
                   <a 
                     href="https://t.me/netiacademy01" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-[10px] md:text-xs font-bold text-blue-800 hover:text-blue-900 flex items-center gap-2 uppercase tracking-wide"
                   >
                     Get Daily PDF Question Bank
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                   </a>
                   <div className="text-[9px] md:text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em]">
                     {digest.topics.length} Primary Focus Areas
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentAffairs;
