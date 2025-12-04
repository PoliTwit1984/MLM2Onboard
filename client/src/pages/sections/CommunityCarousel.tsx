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
  {
    id: "6",
    videoId: "rrJwJGcJzLg",
    title: "Why is EVERYONE buying the Rapsodo MLM2PRO Launch Monitor!?",
    creator: "Golfers Authority"
  },
  {
    id: "7",
    videoId: "UUrvVn1beoo",
    title: "The Rapsodo MLM2PRO Update NO ONE Expected is FINALLY HERE!",
    creator: "Golficity"
  },
  {
    id: "8",
    videoId: "9AZs9Nr_HmE",
    title: "MLM2PRO is Getting 2 New Features in 2025… AGAIN (Early Access Beta Testing)",
    creator: "Unreal Golf"
  },
];

export const CommunityCarousel = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  const minSwipeDistance = 40;

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
    setIsPaused(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart !== null && touchEnd !== null) {
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe) {
        goToNext();
      } else if (isRightSwipe) {
        goToPrevious();
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsPaused(false);
  };

  const currentVideo = COMMUNITY_VIDEOS[currentIndex];

  return (
    <section id="community" className="w-full bg-genericblack py-16 sm:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 max-w-4xl mx-auto px-2">
          <h2
            className="font-heading-72-9xl-hero font-[number:var(--heading-72-9xl-hero-font-weight)] [font-style:var(--heading-72-9xl-hero-font-style)] text-genericwhite text-3xl leading-tight sm:text-[length:var(--heading-48-6xl-hero-font-size)] sm:leading-[var(--heading-48-6xl-hero-line-height)] lg:text-[length:var(--heading-72-9xl-hero-font-size)] lg:leading-[var(--heading-72-9xl-hero-line-height)] tracking-[var(--heading-72-9xl-hero-letter-spacing)] mb-4"
          >
            COMMUNITY CONTENT
          </h2>
          <p className="font-paragraph-18-lg-medium font-[number:var(--paragraph-18-lg-medium-font-weight)] text-genericwhite text-base sm:text-[length:var(--paragraph-18-lg-medium-font-size)] tracking-[var(--paragraph-18-lg-medium-letter-spacing)] leading-relaxed sm:leading-[var(--paragraph-18-lg-medium-line-height)] opacity-80 max-w-3xl mx-auto">
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
          <div className="space-y-4">
            <div className="relative aspect-video bg-neutral-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
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
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary600-main rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>

            <div className="text-center sm:text-left px-1">
              <p className="font-paragraph-12-xs-semibold text-primary600-main uppercase mb-2">
                {currentVideo.creator}
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${currentVideo.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-heading-32-4xl-standard font-[number:var(--heading-32-4xl-standard-font-weight)] text-genericwhite text-[length:var(--heading-32-4xl-standard-font-size)] tracking-[var(--heading-32-4xl-standard-letter-spacing)] leading-[var(--heading-32-4xl-standard-line-height)] hover:text-primary600-main transition-colors"
              >
                {currentVideo.title}
              </a>
            </div>
          </div>

          <button
            onClick={goToPrevious}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full items-center justify-center transition-all shadow-lg hover:scale-110 z-10"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-6 h-6 text-genericblack" />
          </button>

          <button
            onClick={goToNext}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full items-center justify-center transition-all shadow-lg hover:scale-110 z-10"
            aria-label="Next video"
          >
            <ChevronRight className="w-6 h-6 text-genericblack" />
          </button>
        </div>

        <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 flex-wrap">
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

        <div className="text-center mt-6 sm:mt-8">
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
