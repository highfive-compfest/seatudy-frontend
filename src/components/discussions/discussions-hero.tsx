import React from "react";

const DiscussionsHero = () => {
  return (
    <>
      <header
        className="flex flex-col sm:flex-row justify-between items-center mb-8 text-white blur-animation wiggle-bg"
        style={{
          backgroundImage: "url('https://miro.medium.com/v2/resize:fit:8000/1*7iBUzC4UvwNi8agIsCrZ7w.png')",
          backgroundPosition: "center bottom",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative flex flex-col items-start justify-start h-full w-full bg-black/20 blur-animation pt-32 px-6 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-0" style={{ textShadow: "4px 4px 12px rgba(0, 0, 0, 0.5)" }}>
            Join the Discussion
          </h1>
          <p className="text-lg sm:text-xl" style={{ textShadow: "4px 4px 12px rgba(0, 0, 0, 0.5)" }}>
            Engage with our community, share your insights, and learn from others.
          </p>
        </div>
      </header>
    </>
  );
};

export default DiscussionsHero;
