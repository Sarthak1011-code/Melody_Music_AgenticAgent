import React from 'react';
import { Play } from 'lucide-react';

const PlaylistCard = ({ title, description, image }) => (
    <div className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all cursor-pointer group">
        <div className="relative mb-4">
            <img src={image} alt={title} className="w-full aspect-square object-cover rounded shadow-lg" />
            <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl text-black">
                <Play size={24} fill="currentColor" className="ml-1" />
            </button>
        </div>
        <h3 className="text-white font-bold truncate mb-1">{title}</h3>
        <p className="text-[#b3b3b3] text-sm line-clamp-2">{description}</p>
    </div>
);

const HomeView = () => {
    const sections = [
        {
            title: "Made For Sarthak Kumar",
            items: [
                { title: "Daily Mix 1", description: "Pritam, Vishal-Shekhar, Arijit Singh", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop" },
                { title: "Daily Mix 2", description: "Ellie Goulding, Calvin Harris, Dua Lipa", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop" },
                { title: "Discover Weekly", description: "Your weekly mixtape of fresh music.", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop" },
                { title: "Release Radar", description: "Catch up on the latest releases.", image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=300&h=300&fit=crop" },
            ]
        },
        {
            title: "Albums featuring songs you like",
            items: [
                { title: "Om Shanti Om", description: "Vishal-Shekhar", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop" },
                { title: "Delirium (Deluxe)", description: "Ellie Goulding", image: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=300&h=300&fit=crop" },
                { title: "Bachna Ae Haseeno", description: "Vishal-Shekhar", image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop" },
                { title: "Love Songs", description: "Various Artists", image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop" },
            ]
        }
    ];

    return (
        <div className="bg-gradient-to-b from-[#1f1f1f] to-[#121212] flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[#4d4d4d] scrollbar-track-transparent">
            {/* Greeting */}
            <h1 className="text-3xl font-bold text-white mb-6">Good Afternoon</h1>

            {/* Grid Sections */}
            <div className="space-y-8">
                {sections.map((section, idx) => (
                    <section key={idx}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">{section.title}</h2>
                            <span className="text-[#b3b3b3] text-sm font-bold hover:underline cursor-pointer">Show all</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {section.items.map((item, i) => (
                                <PlaylistCard key={i} {...item} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default HomeView;
