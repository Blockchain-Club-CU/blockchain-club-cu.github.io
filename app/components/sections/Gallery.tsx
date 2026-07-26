import { SectionHeader } from "../ui/SectionHeader";
import { GalleryImages } from "@/app/data/constants";

export default function Gallery() {
    const half = Math.ceil(GalleryImages.length / 2);
    const upperImages = GalleryImages.slice(0, half);
    const lowerImages = GalleryImages.slice(half);

    return (
        <section
            id="gallery"
            className="py-24 bg-white dark:bg-[#1C1C1C] relative border-t border-white/5 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <SectionHeader title="GALLERY" subtitle="Moments Captured" />
            </div>

            <div className="flex flex-col gap-6">
                <div className="relative flex overflow-hidden">
                    <div className="flex min-w-max shrink-0 animate-marquee-left gap-6 px-3 hover:[animation-play-state:paused] will-change-transform">
                        {[...upperImages, ...upperImages].map((src, idx) => (
                            <div key={idx} className="relative w-72 h-48 md:w-96 md:h-64 rounded-lg overflow-hidden shrink-0">
                                <img
                                    src={src}
                                    loading="lazy"
                                    alt={`Gallery Image ${idx + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative flex overflow-hidden">
                    <div className="flex min-w-max shrink-0 animate-marquee-right gap-6 px-3 hover:[animation-play-state:paused] will-change-transform">
                        {[...lowerImages, ...lowerImages].map((src, idx) => (
                            <div key={`lower-${idx}`} className="relative w-72 h-48 md:w-96 md:h-64 rounded-lg overflow-hidden shrink-0">
                                <img
                                    src={src}
                                    loading="lazy"
                                    alt={`Gallery Image ${idx + 1 + half}`}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}