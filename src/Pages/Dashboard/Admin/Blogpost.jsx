import React, { useState } from 'react';
// এখানে পরিবর্তন: react-quill এর বদলে react-quill-new
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios';
import { Send, Image as ImageIcon } from 'lucide-react';

const WriteBlog = () => {
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'color', 'background'],
            ['clean']
        ],
    };



    const handlePublish = async (e) => {
        e.preventDefault();
        if (!content || content === '<p><br></p>') return alert("Content is empty!");

        setIsSubmitting(true); // পাবলিশ শুরু হলে বাটন ডিজেবল করুন

        const blogData = { title, img, desc: content, author: "Admin" };

        try {
            const res = await axios.post(`http://localhost:3000/blogs`, blogData);
            if (res.data.insertedId) {
                alert("Blog Published Successfully!");
                setTitle(''); setImg(''); setContent('');
            }
        } catch (err) {
            console.error("Error:", err);
            // যদি ডাটাবেস থেকে ডুপ্লিকেট মেসেজ আসে
            alert(err.response?.data?.message || "Failed to publish");
        } finally {
            setIsSubmitting(false); // কাজ শেষ হলে বাটন আবার সচল করুন
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 md:p-10">
            <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                <div className="bg-emerald-600 p-8 text-white">
                    <h2 className="text-3xl font-black">Create New Article</h2>
                    <p className="opacity-80 text-sm font-medium">Share your knowledge with the community</p>
                </div>

                <form onSubmit={handlePublish} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Blog Title</label>
                        <input
                            type="text" required placeholder="e.g., How to study effectively"
                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-slate-800"
                            value={title} onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                            <ImageIcon size={16} /> Featured Image URL
                        </label>
                        <input
                            type="url" required placeholder="https://images.unsplash.com/..."
                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-600"
                            value={img} onChange={(e) => setImg(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Content (Word Style)</label>
                        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={modules}
                                className="h-72 mb-12"
                                placeholder="Start writing your magic..."
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting} // সাবমিট হওয়ার সময় ক্লিক করা যাবে না
                        className={`w-full font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg 
    ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'}`}
                    >
                        {isSubmitting ? 'Publishing...' : <><Send size={20} /> Publish Article</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WriteBlog;