import { Link } from "react-router-dom";
import MaterialCard from "../components/MaterialCard";

const subjects = [
  {
    name: "Indian Polity",
    chapters: [
      { id: "1", title: "Fundamental Rights", price: 49, description: "Detailed question bank on Part III of the Constitution." },
      { id: "2", title: "Parliament of India", price: 59, description: "Comprehensive analysis of Lok Sabha and Rajya Sabha." },
    ]
  },
  {
    name: "Modern History",
    chapters: [
      { id: "3", title: "1857 Revolt", price: 39, description: "Key questions on the first war of independence." },
      { id: "4", title: "Gandhian Era", price: 69, description: "Study of the freedom struggle through Mahatma Gandhi." },
    ]
  }
];

const StudyMaterials = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-playfair font-bold text-slate-900 mb-4">Question Bank & Study Materials</h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Structured, high-quality question banks designed for deep conceptual clarity and rigorous practice.
        </p>
      </header>

      <div className="space-y-16">
        {subjects.map((subject) => (
          <section key={subject.name}>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-blue-900">{subject.name}</h2>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subject.chapters.map((chapter) => (
                <div key={chapter.id} className="relative group">
                  <Link to={`/study-materials/${chapter.id}`} target="_blank" rel="noopener noreferrer">
                    <MaterialCard 
                     title={chapter.title} 
                     subtitle={chapter.description} 
                     tag={`₹${chapter.price}`}
                    />
                  </Link>
                  <div className="mt-4 flex items-center justify-between px-2">
                    <span className="text-sm font-semibold text-slate-900">₹{chapter.price}</span>
                    <Link 
                      to={`/study-materials/${chapter.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-bold uppercase tracking-widest text-blue-900 hover:text-blue-700 transition-colors"
                    >
                      Buy Now →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterials;
