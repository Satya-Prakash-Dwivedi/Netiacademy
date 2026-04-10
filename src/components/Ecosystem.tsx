import { Link } from "react-router-dom";

const ecosystemItems = [
  {
    title: "PDF Question Banks",
    text: "Topic-wise structured MCQs with detailed explanations for deeper conceptual understanding.",
    icon: "📚",
    status: "Coming Soon",
    path: "#"
  },
  {
    title: "Daily Current Affairs",
    text: "Curated and exam-focused daily analysis to keep you ahead in the changing trends.",
    icon: "📰",
    status: "Active",
    path: "/current-affairs"
  },
  {
    title: "Live Sessions",
    text: "Interactive sessions to sharpen speed, accuracy, and clear doubts in real-time.",
    icon: "🎥",
    status: "Coming Soon",
    path: "#"
  }
];

const Ecosystem = () => {
  return (
    <section className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900">
            Comprehensive Study Ecosystem
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto italic font-medium">
            "Everything you need to crack Prelims and Mains in one focused platform."
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ecosystemItems.map((item) => (
            <div 
              key={item.title} 
              className="p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:border-blue-200 hover:shadow-md transition-all group relative flex flex-col h-full"
            >
              {item.status === "Coming Soon" && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-blue-100 text-blue-900 text-[10px] uppercase font-bold tracking-widest rounded-full border border-blue-200">
                  Coming Soon
                </div>
              )}
              
              <div className="text-4xl mb-8 grayscale group-hover:grayscale-0 transition-all">
                {item.icon}
              </div>
              
              <h3 className="text-2xl font-playfair font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-8 flex-1">
                {item.text}
              </p>

              {item.status === "Active" ? (
                <Link 
                  to={item.path} 
                  className="inline-flex items-center gap-2 text-blue-900 font-bold text-sm group-hover:gap-3 transition-all"
                >
                  Access Now <span>→</span>
                </Link>
              ) : (
                <div className="text-slate-400 font-medium text-sm flex items-center gap-2 cursor-not-allowed">
                  Under Preparation <span>..</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
