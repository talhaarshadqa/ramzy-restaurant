import {BlogSection} from '@/components/site/BlogSection';
import {CuisineCategoriesSection} from '@/components/site/CuisineCategoriesSection';
import {FloatingWhatsApp} from '@/components/site/FloatingWhatsApp';
import {Footer} from '@/components/site/Footer';
import {GallerySection} from '@/components/site/GallerySection';
import {GoogleRatingBar} from '@/components/site/GoogleRatingBar';
import {Header} from '@/components/site/Header';
import {Hero} from '@/components/site/Hero';
import {MasterpiecesSection} from '@/components/site/MasterpiecesSection';
import {RoomSection} from '@/components/site/RoomSection';
import {SignatureDishesSection} from '@/components/site/SignatureDishesSection';
import {StatsSection} from '@/components/site/StatsSection';
import {StorySection} from '@/components/site/StorySection';
import {VisitSection} from '@/components/site/VisitSection';
import {WordTicker} from '@/components/site/WordTicker';
import {getBlogPosts} from '@/lib/data/blog';

export default async function HomePage() {
    const posts = await getBlogPosts({take: 3});

    return (
        <>
            <Header />
            <main className="flex-1">
                <Hero />
                <GoogleRatingBar />
                <StorySection />
                <MasterpiecesSection />
                <WordTicker />
                <CuisineCategoriesSection />
                <SignatureDishesSection />
                <StatsSection />
                <GallerySection />
                <RoomSection />
                <BlogSection posts={posts} />
                <VisitSection />
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
