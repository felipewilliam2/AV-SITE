import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';
import { Calendar, User, ArrowLeft, Clock, Share2, Tag } from 'lucide-react';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = BLOG_POSTS.find(p => p.slug === slug);

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffdf5]">
                <h1 className="text-4xl font-black text-brand-dark mb-4">Ops! Artigo não encontrado.</h1>
                <Link to="/blog" className="text-brand-cyan font-bold hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Voltar para o Blog
                </Link>
            </div>
        );
    }

    // Related posts (excluding current)
    const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2);

    return (
        <article className="min-h-screen bg-[#fffdf5]">

            {/* Hero Header */}
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent opacity-90"></div>

                <div className="absolute inset-0 flex items-end pb-20 pt-32">
                    <div className="container mx-auto px-6">
                        <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 font-bold uppercase tracking-wider text-xs transition-colors backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full w-fit hover:bg-white/20 border border-white/20">
                            <ArrowLeft className="w-4 h-4" /> Voltar para o Blog
                        </Link>
                        <div className="max-w-4xl">
                            {/* Etiqueta Principal - Estilo Sticker */}
                            <div className="flex items-center gap-3 mb-6">
                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 ${post.color} shadow-[4px_4px_0px_rgba(0,0,0,0.3)] font-black text-xs uppercase tracking-widest transform -rotate-1`}>
                                    <Tag className="w-3 h-3 fill-current opacity-50" />
                                    {post.category}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] drop-shadow-lg tracking-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-white/90 font-medium border-t border-white/20 pt-6">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-md">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <span>Por <span className="font-bold text-white border-b-2 border-brand-yellow/50">{post.author}</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-md">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-md">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <span>5 min de leitura</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-6 relative z-10 -mt-20 mb-24">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-gray-100">

                            {/* Corpo do Texto Tipografia Editorial */}
                            <div
                                className="
                                prose prose-lg md:prose-xl max-w-none 
                                prose-headings:font-sans prose-headings:font-black prose-headings:tracking-tight prose-headings:text-brand-dark
                                prose-p:font-serif prose-p:text-gray-600 prose-p:leading-8 prose-p:mb-6
                                prose-a:text-brand-cyan prose-a:font-bold prose-a:no-underline prose-a:border-b-2 prose-a:border-brand-cyan/30 hover:prose-a:border-brand-cyan hover:prose-a:text-brand-cyanDark hover:prose-a:bg-brand-cyan/5 prose-a:transition-all
                                prose-strong:text-brand-dark prose-strong:font-black
                                prose-ul:list-disc prose-ul:pl-6 prose-ul:marker:text-brand-yellow
                                prose-li:font-serif prose-li:text-gray-600
                                prose-img:rounded-3xl prose-img:shadow-lg prose-img:my-10 prose-img:w-full
                                prose-blockquote:border-l-4 prose-blockquote:border-brand-yellow prose-blockquote:bg-yellow-50 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:font-serif prose-blockquote:text-gray-700
                                first-letter:text-5xl first-letter:font-black first-letter:text-brand-dark first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]
                            "
                                dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p><p>Conteúdo completo em breve...</p>` }}
                            />

                            {/* Share Section */}
                            <div className="mt-16 pt-10 border-t-2 border-dashed border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-brand-dark text-lg">Gostou? Espalhe a palavra:</span>
                                </div>
                                <div className="flex gap-3">
                                    <button className="flex items-center gap-2 px-6 py-3 bg-brand-light text-brand-cyan font-bold rounded-full hover:bg-brand-cyan hover:text-white transition-all shadow-sm">
                                        <Share2 className="w-5 h-5" /> Compartilhar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-1/3">
                        {/* Container Sticky que agrupa Autor e Relacionados */}
                        <div className="sticky top-32 space-y-8">

                            {/* Author Widget */}
                            <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 text-center relative overflow-hidden shadow-lg group hover:border-brand-yellow/30 transition-colors">
                                {/* Decor */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:scale-110"></div>

                                <div className="w-28 h-28 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden border-[6px] border-white shadow-xl relative z-10">
                                    <div className="w-full h-full flex items-center justify-center bg-brand-dark text-white text-4xl font-black">
                                        {post.author.charAt(0)}
                                    </div>
                                </div>
                                <h4 className="font-black text-2xl text-brand-dark mb-1">{post.author}</h4>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 bg-gray-50 inline-block px-3 py-1 rounded-full">Travel Expert</p>
                                <p className="text-gray-600 font-serif italic text-base mb-8 leading-relaxed">
                                    "Apaixonado por descobrir lugares novos e compartilhar dicas que não estão nos guias turísticos."
                                </p>
                                <button className="w-full py-4 bg-white border-2 border-brand-dark text-brand-dark font-black tracking-wide text-sm uppercase rounded-xl hover:bg-brand-dark hover:text-white transition-colors shadow-[4px_4px_0px_#0f172a] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]">
                                    Seguir Autor
                                </button>
                            </div>

                            {/* Related Posts */}
                            <div className="bg-white/50 backdrop-blur-sm p-2 rounded-3xl">
                                <h3 className="font-black text-xl text-gray-800 mb-6 pl-2 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-brand-vibrant rounded-full"></span>
                                    Leia Também
                                </h3>
                                <div className="space-y-4">
                                    {relatedPosts.map(related => (
                                        <Link to={`/blog/${related.slug}`} key={related.id} className="group flex gap-5 items-center bg-white p-4 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 duration-300">
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-gray-100 shadow-sm relative">
                                                <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            </div>
                                            <div className="flex flex-col h-full justify-center">
                                                {/* Etiqueta Lateral Corrigida */}
                                                <div className="mb-2">
                                                    <span className={`inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${related.color} bg-opacity-50`}>
                                                        {related.category}
                                                    </span>
                                                </div>
                                                <h5 className="font-bold text-gray-800 leading-tight group-hover:text-brand-cyan transition-colors text-base mb-2 font-sans">
                                                    {related.title}
                                                </h5>
                                                <span className="text-xs text-gray-400 font-bold flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> 5 min
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogPost;