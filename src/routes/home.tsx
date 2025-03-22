import { Sparkles } from "lucide-react";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex-col w-full pb-24">
      <Container>
        <div className="my-8">
          <h2 className="text-3xl text-center md:text-left md:text-6xl">
            <span className=" text-outline font-extrabold md:text-8xl">
              Mockify
            </span>
            <span className="text-gray-500 font-extrabold">
              - Ace your tech interviews
            </span>
            <br />
            with AI-powered mock interviews
          </h2>

          <p className="mt-4 text-muted-foreground text-sm">
            Practice makes perfect. Our AI technology creates realistic interview scenarios tailored to
            your experience, tech stack, and target position. Be prepared for anything and land your dream job.
          </p>
        </div>

        <div className="flex w-full items-center justify-evenly md:px-12 md:py-16 md:items-center md:justify-end gap-12">
          <p className="text-3xl font-semibold text-gray-900 text-center">
            150k+
            <span className="block text-xl text-muted-foreground font-normal">
              Users Trained
            </span>
          </p>
          <p className="text-3xl font-semibold text-gray-900 text-center">
            1M+
            <span className="block text-xl text-muted-foreground font-normal">
              Interviews Created
            </span>
          </p>
        </div>

        {/* image section */}
        <div className="w-full mt-4 rounded-xl bg-gray-100 h-[420px] drop-shadow-md overflow-hidden relative">
          <img
            src="/assets/img/hero.jpg"
            alt=""
            className="w-full h-full object-cover"
          />

          <div className="absolute top-4 left-4 px-4 py-2 rounded-md bg-white/40 backdrop-blur-md">
            Mockify Interview Assistant
          </div>

          <div className="hidden md:block absolute w-80 bottom-4 right-4 px-4 py-2 rounded-md bg-white/60 backdrop-blur-md">
            <h2 className="text-neutral-800 font-semibold">Tech Interview Prep</h2>
            <p className="text-sm text-neutral-500">
              Create custom mock interviews for your specific tech stack and job role.
              Get AI-generated questions and evaluate your answers.
            </p>

            <Button className="mt-3">
              Create Interview <Sparkles />
            </Button>
          </div>
        </div>
      </Container>

      <Container className="py-8 space-y-8 mt-12">
        <h2 className="tracking-wide text-xl text-gray-800 font-semibold">
          Practice like it's the real thing with Mockify's simulated interviews tailored to your industry.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="col-span-1 md:col-span-3">
            <img
              src="/assets/img/office.jpg"
              alt=""
              className="w-full max-h-96 rounded-md object-cover"
            />
          </div>

          <div className="col-span-1 md:col-span-2 gap-8 max-h-96 min-h-96 w-full flex flex-col items-center justify-center text-center">
            <p className="text-center text-muted-foreground">
              Don't just hope for the best on interview day. With Mockify, you'll get realistic questions
              based on your experience level and tech stack. Practice, get feedback, and walk into your
              next interview with confidence.
            </p>

            <Link to={"/generate"} className="w-full">
              <Button className="w-3/4">
                Create Interview <Sparkles className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
