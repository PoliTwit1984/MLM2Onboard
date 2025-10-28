import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CommunityVideo {
  id: string;
  videoId: string;
  title: string;
  creator: string;
}

const COMMUNITY_VIDEOS: CommunityVideo[] = [
  {
    id: "1",
    videoId: "eZByk27-B3M",
    title: "New Rapsodo MLM2PRO Practice Modes that are going to improve your game!",
    creator: "Joe Lagowski Golf"
  },
  {
    id: "2",
    videoId: "tIY4XFybeVs",
    title: "Why SERIOUS Golfers Are Turning to the Rapsodo MLM2PRO",
    creator: "Handicap Golf"
  },
  {
    id: "3",
    videoId: "_ZqVSdB5BjM",
    title: "Rapsodo MLM2PRO: Almost Perfect—Almost",
    creator: "Golfible"
  },
  {
    id: "4",
    videoId: "EpGMHhVwToo",
    title: "Every Change Coming to the Rapsodo MLM2PRO in 2026 (Allegedly)",
    creator: "Unreal Golf"
  },
  {
    id: "5",
    videoId: "E3UXAFbwL5E",
    title: "I was WRONG about Rapsodo MLM2Pro Launch Monitor?",
    creator: "Golfers Authority"
  },
];

export const CommunityCarousel = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  const minSwipeDistance = 50;

  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % COMMUNITY_VIDEOS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % COMMUNITY_VIDEOS.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + COMMUNITY_VIDEOS.length) % COMMUNITY_VIDEOS.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const currentVideo = COMMUNITY_VIDEOS[currentIndex];

  return (
    <section className="w-full bg-genericblack py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading-72-9xl-hero font-[number:var(--heading-72-9xl-hero-font-weight)] [font-style:var(--heading-72-9xl-hero-font-style)] text-genericwhite text-[length:var(--heading-72-9xl-hero-font-size)] tracking-[var(--heading-72-9xl-hero-letter-spacing)] leading-[var(--heading-72-9xl-hero-line-height)] mb-4">
            COMMUNITY CONTENT
          </h2>
          <p className="font-paragraph-18-lg-medium font-[number:var(--paragraph-18-lg-medium-font-weight)] text-genericwhite text-[length:var(--paragraph-18-lg-medium-font-size)] tracking-[var(--paragraph-18-lg-medium-letter-spacing)] leading-[var(--paragraph-18-lg-medium-line-height)] opacity-80">
            See what others are saying about the MLM2PRO
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative aspect-video bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
            <a
              href={`https://www.youtube.com/watch?v=${currentVideo.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full group"
            >
              <img
                src={`https://img.youtube.com/vi/${currentVideo.videoId}/maxresdefault.jpg`}
                alt={currentVideo.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-primary600-main rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-paragraph-12-xs-semibold text-primary600-main uppercase mb-2">
                  {currentVideo.creator}
                </p>
                <h3 className="font-heading-32-4xl-standard font-[number:var(--heading-32-4xl-standard-font-weight)] text-genericwhite text-[length:var(--heading-32-4xl-standard-font-size)] tracking-[var(--heading-32-4xl-standard-letter-spacing)] leading-[var(--heading-32-4xl-standard-line-height)]">
                  {currentVideo.title}
                </h3>
              </div>
            </a>
          </div>

          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110 z-10"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-6 h-6 text-genericblack" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110 z-10"
            aria-label="Next video"
          >
            <ChevronRight className="w-6 h-6 text-genericblack" />
          </button>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {COMMUNITY_VIDEOS.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-primary600-main'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.youtube.com/results?search_query=rapsodo+mlm2pro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-paragraph-16-base-semibold text-primary600-main hover:text-primary600-main/80 transition-colors"
          >
            View More on YouTube →
          </a>
        </div>
      </div>
    </section>
  );
};
