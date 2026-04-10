import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Placeholder data (In real usage, this would be fetched from /api/products/:id)
const materials = [
  { id: "1", title: "Fundamental Rights", price: 49, subject: "Indian Polity", description: "A comprehensive question bank covering Part III of the Indian Constitution. Includes detailed explanations for every answer, case laws, and recent amendments.", thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1000" },
  { id: "2", title: "Parliament of India", price: 59, subject: "Indian Polity", description: "Expertly curated questions on the legislative organ of the Union government. Includes parliamentary procedures and constitutional provisions.", thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1000" },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const found = materials.find((m) => m.id === id);
    setProduct(found);
  }, [id]);

  const handleBuyNow = async () => {
    try {
      // 1. Create order on the backend
      const { data: order } = await axios.post("http://localhost:5000/api/razorpay/create-order", {
        amount: product.price,
        currency: "INR",
      });

      // 2. Initialize Razorpay Checkout
      const options = {
        key: "rzp_test_placeholder", // Replace with your actual Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Netiedu.com",
        description: `Purchase: ${product.title}`,
        order_id: order.id,
        handler: async (response: any) => {
          // 3. Verify payment on the backend
          const result = await axios.post("http://localhost:5000/api/razorpay/verify-payment", response);
          if (result.data.status === "success") {
            alert("Payment Successful! Your PDF will download shortly.");
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Student Name",
          email: "student@example.com",
        },
        theme: {
          color: "#1E3A8A",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!product) {
    return <div className="p-20 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Product Image/Thumbnail */}
        <div className="w-full md:w-1/2 aspect-[4/5] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200">
           <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
           <span className="text-xs font-bold uppercase tracking-widest text-blue-900 mb-4 inline-block">
             {product.subject}
           </span>
           <h1 className="text-4xl font-playfair font-bold text-slate-900 mb-6 font-primary">
             {product.title}
           </h1>
           <p className="text-3xl font-bold text-slate-900 mb-8">
             ₹{product.price}
           </p>
           
           <div className="prose prose-slate max-w-none mb-10">
             <p className="text-slate-600 leading-relaxed text-lg">
               {product.description}
             </p>
           </div>

           <div className="space-y-4">
              <button 
                onClick={handleBuyNow}
                className="w-full py-5 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                Buy Now & Download PDF
              </button>
              <p className="text-center text-xs text-slate-400">
                Secure transaction powered by Razorpay.
              </p>
           </div>

           {/* Features/Highlights */}
           <div className="mt-12 grid grid-cols-2 gap-6 pt-12 border-t border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Chapter Wise</h4>
                <p className="text-xs text-slate-500">Structured categorized content.</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Detailed Answers</h4>
                <p className="text-xs text-slate-500">Step-by-step conceptual clarity.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
