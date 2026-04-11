import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { dailyDigests, type DailyDigest } from "../data/currentAffairs";

const linkify = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      return (
        <a 
          key={i} 
          href={match[2]} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline transition-colors font-medium decoration-blue-300 underline-offset-4"
        >
          {match[1]}
        </a>
      );
    }
    return part;
  });
};

const renderTextInChunks = (text: string) => {
  if (!text) return null;
  const sentences = text.split(/(?<=[.?!]["']?)\s+(?=[A-Z])/);
  const chunks = [];
  for (let i = 0; i < sentences.length; i += 3) {
    chunks.push(sentences.slice(i, i + 3).join(' ').trim());
  }
  return chunks.map((chunk, pIdx) => (
    <p key={pIdx}>{linkify(chunk)}</p>
  ));
};

/**
 * CurrentAffairDetail Component
 * 
 * Renders the detailed view of a Daily Current Affairs digest.
 * Hardened for full mobile responsiveness and static-only frontend.
 */

const CurrentAffairDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [digest, setDigest] = useState<DailyDigest | null | undefined>(undefined);

  useEffect(() => {
    const found = dailyDigests.find((d) => d.id === id);
    setDigest(found || null);
    window.scrollTo(0, 0);
  }, [id]);

  if (digest === undefined) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-slate-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (digest === null) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 max-w-lg shadow-sm">
          <span className="text-4xl mb-6 block grayscale">🔍</span>
          <h2 className="text-3xl font-playfair font-bold text-slate-900 mb-4">Digest Not Found</h2>
          <p className="text-slate-600 mb-10 leading-relaxed font-inter">
            The Daily Current Affairs for this date isn't in our library yet, or the link may have expired.
          </p>
          <Link
            to="/current-affairs"
            className="px-10 py-4 bg-blue-900 text-white font-bold rounded-2xl hover:bg-blue-800 transition-all shadow-lg active:scale-95"
          >
            Explore Recent Updates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-4 md:pt-8">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <header className="mb-10 md:mb-16 text-center">
          <Link to="/current-affairs" className="text-[10px] md:text-xs font-bold text-slate-400 hover:text-blue-900 uppercase tracking-[0.2em] inline-block mb-6 md:mb-8 transition-colors">
            ← Back to Daily Listing
          </Link>
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <span className="text-[10px] md:text-sm font-bold text-blue-900 tracking-widest uppercase py-1 border-y border-blue-900/10">
              DAY {dailyDigests.indexOf(digest) + 1} | {digest.day}, {digest.date}
            </span>
            <h1 className="text-3xl md:text-5xl font-playfair font-bold text-slate-900 leading-tight">
              {digest.tagline}
            </h1>
          </div>
        </header>

        {digest.announcement && (
          <section className="mb-12 md:mb-16 bg-gradient-to-br from-blue-50 to-white border border-blue-200/60 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 rounded-l-3xl"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl"></div>
            <div className="relative z-10 space-y-5">
              {digest.announcement.split('\n').map((para, idx) => (
                <p key={idx} className={`text-slate-800 font-inter leading-relaxed text-[15px] md:text-[17px] ${idx === 0 ? 'font-bold text-blue-950 text-xl md:text-2xl mb-8 tracking-tight' : ''}`}>
                  {linkify(para)}
                </p>
              ))}
            </div>
          </section>
        )}

        <div className="space-y-12 md:space-y-16">
          {(digest.topics || []).map((topic, idx) => (
            <article key={topic.id} className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 p-6 md:p-12 shadow-sm relative overflow-hidden group">
              <span className="absolute top-0 right-0 p-6 md:p-8 text-4xl md:text-6xl font-playfair italic font-bold text-slate-50 z-0 select-none group-hover:text-blue-50/50 transition-colors">
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </span>

              <div className="relative z-10">
                <span className="text-[10px] md:text-xs font-bold text-blue-900 uppercase tracking-widest mb-3 md:mb-4 inline-block px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                  {topic.subtitle}
                </span>

                <h2 className="text-xl md:text-3xl font-playfair font-bold text-slate-900 mb-6 md:mb-8 border-b border-slate-100 pb-4 leading-snug">
                  {topic.title}
                </h2>

                <div className="prose prose-slate max-w-none">
                  <div className="text-slate-700 leading-relaxed md:leading-[1.9] text-[15px] md:text-[17px] font-inter mb-10 space-y-6">
                    {renderTextInChunks(topic.content)}
                  </div>

                  <div className="flex flex-col gap-6 mt-10 md:mt-14">
                    <div className="bg-slate-50 p-6 md:p-10 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group/matter">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-800 transition-colors group-hover/matter:bg-blue-900"></div>
                      <h4 className="text-xs md:text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">
                        Why it matters for UPSC
                      </h4>
                      <div className="text-sm md:text-base text-slate-700 leading-relaxed font-inter space-y-4">
                        {renderTextInChunks(topic.whyItMatters)}
                      </div>
                    </div>

                    <div className="bg-blue-50/50 p-6 md:p-10 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden group/revise">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 transition-colors group-hover/revise:bg-blue-800"></div>
                      <h4 className="text-xs md:text-sm font-bold text-blue-900 uppercase tracking-widest mb-4">
                        REVISE
                      </h4>
                      <div className="text-sm md:text-base text-slate-800 leading-relaxed font-inter space-y-4">
                        {renderTextInChunks(topic.revise)}
                      </div>
                    </div>
                  </div>

                  {topic.pyqConnect && (
                    <div className="mt-6 md:mt-8 p-4 md:p-5 bg-blue-50/50 rounded-xl border border-blue-100/50 flex items-start gap-3">
                      <span className="bg-blue-900 text-white text-[9px] px-2 py-0.5 rounded font-bold uppercase mt-1 shrink-0 italic">PYQ</span>
                      <p className="text-[11px] md:text-sm text-blue-900 font-medium leading-relaxed">
                        {topic.pyqConnect}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Daily Summary Section (Revise Today) */}
        {digest.reviseSummary && digest.reviseSummary.length > 0 && (
          <section className="mt-12 md:mt-16 bg-white rounded-2xl md:rounded-3xl border border-slate-200 p-6 md:p-12 shadow-sm">
            <h3 className="text-[10px] md:text-xs font-bold text-blue-900 uppercase tracking-[0.2em] mb-6 md:mb-8 flex items-center gap-3">
              <span className="w-6 md:w-8 h-px bg-blue-900"></span>
              REVISE TODAY
            </h3>
            <ul className="space-y-4 md:space-y-5">
              {digest.reviseSummary.map((point, i) => (
                <li key={i} className="flex items-start gap-3 md:gap-4 text-slate-700 font-inter text-sm md:text-base leading-relaxed">
                  <span className="text-blue-900 mt-1 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="md:w-[18px] md:h-[18px]"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Dynamic Navigation - Next/Prev */}
        <nav className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
            {(() => {
              const currentIndex = dailyDigests.indexOf(digest as DailyDigest);
              const prevDigest = currentIndex > 0 ? dailyDigests[currentIndex - 1] : null;
              const nextDigest = currentIndex < dailyDigests.length - 1 && currentIndex !== -1 ? dailyDigests[currentIndex + 1] : null;

              return (
                <>
                  <div className="flex flex-col">
                    {prevDigest && (
                      <Link 
                        to={`/current-affairs/${prevDigest.id}`}
                        className="group bg-white border border-slate-200 p-5 md:p-6 rounded-2xl md:rounded-3xl hover:border-blue-900 transition-all flex flex-col items-start gap-2 shadow-sm hover:shadow-md active:scale-95"
                      >
                         <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-900">← Previous Day</span>
                         <span className="text-xs md:text-sm font-playfair font-bold text-slate-900">{prevDigest.date}</span>
                      </Link>
                    )}
                  </div>
                  <div className="flex flex-col">
                    {nextDigest && (
                      <Link 
                        to={`/current-affairs/${nextDigest.id}`}
                        className="group bg-white border border-slate-200 p-5 md:p-6 rounded-2xl md:rounded-3xl hover:border-blue-900 transition-all flex flex-col items-start md:items-end gap-2 text-left md:text-right shadow-sm hover:shadow-md active:scale-95"
                      >
                         <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-900">Next Day →</span>
                         <span className="text-xs md:text-sm font-playfair font-bold text-slate-900">{nextDigest.date}</span>
                      </Link>
                    )}
                  </div>
                </>
              )
            })()}
        </nav>

        {/* Global Telegram CTA - Refined Light Theme */}
        <section className="mt-16 md:mt-20 p-8 md:p-12 bg-white rounded-2xl md:rounded-[3rem] text-center border border-slate-200 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-blue-100/50 transition-colors"></div>
          <p className="text-slate-800 mb-6 md:mb-8 max-w-2xl mx-auto relative z-10 leading-relaxed font-inter text-[15px] md:text-[17px] font-medium">
            For the crisp revision sheet, 5 Prelims MCQs, and 2 Mains practice questions on today's topics, download the PDF from our Telegram channel!
          </p>
          <div className="space-y-6 relative z-10">
            <p className="text-[10px] md:text-xs font-bold text-blue-900 uppercase tracking-widest">
              Get the full PDF with 5 practice MCQs daily
            </p>
            <div className="flex justify-center">
              <a
                href="https://t.me/netiacademy01"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 md:px-10 py-4 md:py-5 bg-blue-900 text-white font-bold rounded-2xl hover:bg-blue-800 transition-all inline-flex items-center gap-3 shadow-xl shadow-blue-900/10 active:scale-95 group/btn text-sm md:text-base"
              >
                Join our Telegram Channel
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </a>
            </div>
            <p className="text-[9px] md:text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em]">
              Join the Neti Academy community
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CurrentAffairDetail;
