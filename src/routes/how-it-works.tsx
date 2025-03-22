import React from "react";
import { Container } from "@/components/container";

const HowItWorksPage = () => {
  return (
    <div className="py-12">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How Mockify Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform makes interview preparation simple, effective, and tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-blue-500 mb-4">01</div>
            <h3 className="text-xl font-semibold mb-3">Create Your Interview</h3>
            <p className="text-gray-600">
              Select your target role, experience level, and tech stack. Our AI generates a customized interview session based on your requirements.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-blue-500 mb-4">02</div>
            <h3 className="text-xl font-semibold mb-3">Practice With Realistic Questions</h3>
            <p className="text-gray-600">
              Face challenging technical questions that simulate real interviews. Our AI adapts to your performance, just like a real interviewer would.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-blue-500 mb-4">03</div>
            <h3 className="text-xl font-semibold mb-3">Get Detailed Feedback</h3>
            <p className="text-gray-600">
              Receive comprehensive feedback on your answers, including strengths, areas for improvement, and suggested resources for further study.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-blue-500 text-white p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">AI-Powered Interviews</h3>
                <p className="text-gray-600">Advanced AI technology that understands technical concepts and can evaluate your answers.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-500 text-white p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Customized Experience</h3>
                <p className="text-gray-600">Tailor interviews to your target role, experience level, and specific technologies.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-500 text-white p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Detailed Analytics</h3>
                <p className="text-gray-600">Track your progress over time and identify areas where you need more practice.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-500 text-white p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Resource Recommendations</h3>
                <p className="text-gray-600">Get tailored learning resources based on your performance.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Ace Your Next Interview?</h2>
          <a 
            href="/generate" 
            className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Your First Interview
          </a>
        </div>
      </Container>
    </div>
  );
};

export default HowItWorksPage; 