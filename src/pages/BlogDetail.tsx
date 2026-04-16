import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { platformAnnouncements, type Announcement } from "../data/announcements";
import { SEO } from "../components/SEO";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Announcement | null>(null);

  useEffect(() => {
    const found = platformAnnouncements.find((p) => p.id === id);
    setPost(found || null);
  }, [id]);

  if (!post) {
    return <div className="p-20 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <SEO 
        title={post.title} 
        description={post.excerpt} 
        ogType="article" 
        canonicalUrl={window.location.href}
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
        <div className="aspect-video w-full rounded-2xl overflow-hidden mb-12">
           <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </header>
      
      <article className="prose prose-lg prose-slate max-w-none">
         <div className="text-slate-700 leading-relaxed font-inter space-y-6">
            {post.content.split('\n').map((para, idx) => {
               if (!para.trim()) return null;

               const parseInline = (text: string) => {
                 let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                 html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#1E3A8A] font-bold underline decoration-blue-200 underline-offset-4 hover:text-blue-700 transition-colors">$1</a>');
                 return { __html: html };
               };

               if (para.startsWith('![')) {
                   const match = para.match(/!\[(.*?)\]\((.*?)\)/);
                   if (match) {
                       return <div key={idx} className="my-8"><img src={match[2]} alt={match[1]} className="max-w-[200px] mx-auto rounded-lg shadow-sm" /></div>
                   }
               }

               if (para.startsWith('### ')) {
                   return <h3 key={idx} className="text-2xl font-bold font-playfair text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2" dangerouslySetInnerHTML={parseInline(para.replace('### ', ''))} />
               }
               
               if (para.startsWith('- ') || para.startsWith('1. ') || para.startsWith('2. ') || para.startsWith('3. ')) {
                   return <p key={idx} className="ml-4 flex items-start gap-2">
                      <span className="text-blue-900 font-bold">•</span>
                      <span dangerouslySetInnerHTML={parseInline(para.replace(/^- |^\d+\. /, ''))} />
                   </p>
               }
               if (para.startsWith('**') && para.endsWith('**') && para.length < 50) {
                   return <h3 key={idx} className="text-xl font-bold font-playfair text-slate-900 mt-8 mb-4" dangerouslySetInnerHTML={parseInline(para.replace(/\*\*(.*?)\*\*/g, '$1'))} />
               }
               return <p key={idx} dangerouslySetInnerHTML={parseInline(para)} />
            })}
         </div>
      </article>

      <div className="mt-16 pt-12 border-t border-slate-100 flex items-center justify-between">
         <button 
           onClick={() => window.history.back()}
           className="text-sm font-bold text-slate-500 hover:text-[#1E3A8A] transition-colors flex items-center gap-2"
         >
           ← Back to Announcements
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
            className="text-sm font-bold text-[#1E3A8A] underline hover:text-blue-700 transition-colors"
         >
            Share this Article
         </button>
      </div>
    </div>
  );
};

export default BlogDetail;
