import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { platformAnnouncements, type Announcement } from "../data/announcements";
import { SEO } from "../components/SEO";
import { FileDown, ShieldAlert, Share2, ArrowLeft } from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Announcement | null>(null);

  useEffect(() => {
    const found = platformAnnouncements.find((p) => p.id === id);
    setPost(found || null);
  }, [id]);

  // Anti-copy handler
  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
    alert("Copying content is disabled to protect our intellectual property. You can share the link instead.");
  };

  if (!post) {
    return <div className="p-20 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16" onCopy={handleCopy} onContextMenu={(e) => e.preventDefault()}>
      <SEO 
        title={post.title} 
        description={post.excerpt} 
        ogType="article" 
        canonical={window.location.href}
        ogImage={post.image}
      />
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-6">
           <span className="px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider rounded-full">
             {post.category}
           </span>
           <span className="text-xs text-slate-400 font-medium font-inter">
             {post.date} • By {post.author}
           </span>
        </div>
        <h1 className="text-5xl font-playfair font-bold text-slate-900 mb-8 font-primary">
          {post.title}
        </h1>
        <div className="aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-xl border border-slate-100">
           <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </header>
      
      <article className="prose prose-lg prose-slate max-w-none select-none">
         {/* PDF Section - Moved to top for better visibility */}
         {post.pdfUrl && post.category !== "Magazine" && (
           <div className="mb-12 p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FileDown size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 text-blue-400 mb-4">
                  <ShieldAlert size={20} />
                  <span className="text-sm font-bold tracking-widest uppercase">Secure Access</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-playfair">Download Question Paper</h3>
                <p className="text-slate-300 mb-8 text-sm max-w-lg leading-relaxed">
                  The official question paper for <strong className="text-white">{post.title}</strong> is now available for download.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={post.pdfUrl}
                    download
                    className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg active:scale-95"
                  >
                    <FileDown size={18} />
                    Download PDF
                  </a>
                </div>
              </div>
           </div>
         )}

         <div className="text-slate-700 leading-relaxed font-inter">
             {(() => {
              const lines = post.content.split('\n');
              const elements: React.ReactNode[] = [];
              let currentTable: string[][] = [];
              let inTable = false;

              const parseInline = (text: string) => {
                let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#1E3A8A] font-bold underline decoration-blue-200 underline-offset-4 hover:text-blue-700 transition-colors">$1</a>');
                return { __html: html };
              };

              const flushTable = (key: string | number) => {
                if (currentTable.length > 0) {
                  // check if second row is a divider (e.g. |---|---|)
                  const hasDivider = currentTable[1] && currentTable[1].every(cell => cell.trim().startsWith('-') || cell.trim() === '');
                  const tableRows = hasDivider ? currentTable.slice(2) : currentTable.slice(1);
                  const headers = currentTable[0];

                  elements.push(
                    <div key={`table-${key}`} className="overflow-x-auto my-8 border border-slate-200 rounded-xl shadow-sm">
                      <table className="w-full text-sm text-left text-slate-600 border-collapse">
                        <thead className="text-xs uppercase bg-slate-50 text-slate-700 border-b border-slate-200">
                          <tr>
                            {headers.map((cell, idx) => (
                              <th key={idx} className="px-6 py-4 font-bold border-r border-slate-100 last:border-r-0" dangerouslySetInnerHTML={parseInline(cell.trim())} />
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {tableRows.map((row, rowIdx) => (
                            <tr key={rowIdx} className="bg-white border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                              {row.map((cell, cellIdx) => (
                                <td key={cellIdx} className="px-6 py-4 border-r border-slate-100 last:border-r-0" dangerouslySetInnerHTML={parseInline(cell.trim())} />
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                  currentTable = [];
                  inTable = false;
                }
              };

              for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const trimmed = line.trim();

                if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
                  inTable = true;
                  const cells = line.split('|').slice(1, -1);
                  currentTable.push(cells);
                  continue;
                } else if (inTable) {
                  flushTable(i);
                }

                if (!trimmed) continue;

                if (trimmed.startsWith('![')) {
                  const match = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
                  if (match) {
                     elements.push(
                       <div key={i} className="my-8 flex justify-center"><img src={match[2]} alt={match[1]} className="max-w-[200px] mx-auto rounded-lg shadow-sm" /></div>
                     );
                  }
                  continue;
                }

                if (trimmed.startsWith('### ')) {
                  elements.push(
                    <h3 key={i} className="text-2xl font-bold font-playfair text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2" dangerouslySetInnerHTML={parseInline(trimmed.replace('### ', ''))} />
                  );
                  continue;
                }
                
                if (trimmed.startsWith('#### ')) {
                  elements.push(
                    <h4 key={i} className="text-xl font-bold font-playfair text-slate-900 mt-8 mb-3" dangerouslySetInnerHTML={parseInline(trimmed.replace('#### ', ''))} />
                  );
                  continue;
                }

                if (trimmed === '---') {
                  elements.push(<hr key={i} className="my-8 border-slate-200" />);
                  continue;
                }
                
                if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || /^\d+\. /.test(trimmed)) {
                  elements.push(
                    <p key={i} className="ml-4 flex items-start gap-2 my-2 text-slate-700">
                       <span className="text-blue-900 font-bold">•</span>
                       <span dangerouslySetInnerHTML={parseInline(trimmed.replace(/^- |^• |^\d+\. /, ''))} />
                    </p>
                  );
                  continue;
                }
                
                if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length < 100) {
                  elements.push(
                    <h3 key={i} className="text-xl font-bold font-playfair text-slate-900 mt-8 mb-4" dangerouslySetInnerHTML={parseInline(trimmed.replace(/\*\*(.*?)\*\*/g, '$1'))} />
                  );
                  continue;
                }
                
                elements.push(
                  <p key={i} className="my-4 text-slate-700 leading-relaxed font-inter" dangerouslySetInnerHTML={parseInline(line)} />
                );
              }

              if (inTable) {
                flushTable('end');
              }

              return elements;
             })()}
          </div>
         
         {/* Solution PDF Section - Displayed at the bottom */}
         {post.solutionPdfUrl && (
           <div className="mt-16 p-8 bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl border border-emerald-700 shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FileDown size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 text-emerald-400 mb-4">
                  <ShieldAlert size={20} />
                  <span className="text-sm font-bold tracking-widest uppercase">Verified Solutions</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-playfair">Download GS1 Solutions</h3>
                <p className="text-emerald-100 mb-8 text-sm max-w-lg leading-relaxed">
                  The detailed solutions document for <strong className="text-white">{post.title}</strong> is now available. 
                  Includes option-by-option elimination and source references.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={post.solutionPdfUrl}
                    download
                    className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition-all shadow-lg active:scale-95"
                  >
                    <FileDown size={18} />
                    Download Solutions PDF
                  </a>
                </div>
              </div>
           </div>
         )}

         {/* Redirect for Magazines to Courses Page */}
         {post.category === "Magazine" && (
           <div className="mt-12 p-10 bg-blue-50/50 rounded-[2rem] border border-blue-100/50 text-center relative overflow-hidden group">
              <div className="relative z-10 py-4">
                <h3 className="text-3xl font-bold text-slate-900 mb-4 font-playfair">Magazine Now Available</h3>
                <p className="text-slate-600 mb-8 text-base max-w-xl mx-auto leading-relaxed">
                  We are pleased to announce that the <strong className="text-blue-900 font-bold">{post.title}</strong> has been released. You can now access and download the full module through our dedicated Courses portal.
                </p>
                <Link 
                  to="/courses"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-blue-900 text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-slate-900 transition-all shadow-xl shadow-blue-100 group/link"
                >
                  Go to Course Page
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
           </div>
         )}
      </article>

      <div className="mt-16 pt-12 border-t border-slate-100 flex items-center justify-between">
         <button 
           onClick={() => window.history.back()}
           className="text-sm font-bold text-slate-500 hover:text-[#1E3A8A] transition-colors flex items-center gap-2"
         >
           <ArrowLeft size={16} />
           Back to Announcements
         </button>
         <button 
            onClick={async () => {
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                  });
                } catch (error) {
                  console.error('Error sharing:', error);
                }
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            className="text-sm font-bold text-[#1E3A8A] hover:text-blue-700 transition-colors flex items-center gap-2 group"
         >
            <Share2 size={16} className="group-hover:rotate-12 transition-transform" />
            Share this Article
         </button>
      </div>
    </div>
  );
};

export default BlogDetail;
