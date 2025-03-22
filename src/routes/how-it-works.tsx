const HowItWorksPage = () => {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">How Mockify Works</h1>
      
      <div className="space-y-16">
        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">1. Create Your Interview</h2>
          <p className="text-gray-700 mb-6">
            Start by creating a personalized interview based on the position you're applying for.
            Specify your target role, experience level, and the technical skills you want to practice.
          </p>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-600">
              Our AI system will create a realistic interview scenario tailored to your specifications,
              matching the types of questions you might encounter in actual interviews.
            </p>
          </div>
        </section>
        
        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">2. Practice with AI</h2>
          <p className="text-gray-700 mb-6">
            Engage in a realistic interview with our AI interviewer. The system adapts to your responses
            and provides a natural conversation flow, just like a real interview.
          </p>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-600">
              You can practice using voice or text responses. Our AI listens and responds intelligently,
              asking follow-up questions when appropriate.
            </p>
          </div>
        </section>
        
        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">3. Receive Detailed Feedback</h2>
          <p className="text-gray-700 mb-6">
            After completing your mock interview, receive comprehensive feedback on your performance,
            including strengths, areas for improvement, and specific suggestions.
          </p>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-600">
              Our AI analyzes your responses for technical accuracy, communication clarity,
              and overall interview performance, helping you identify where to focus your preparation.
            </p>
          </div>
        </section>
        
        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">4. Track Your Progress</h2>
          <p className="text-gray-700 mb-6">
            Monitor your improvement over time with our progress tracking system. See how you're
            improving across different skills and interview types.
          </p>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-600">
              Each practice session builds your confidence and skills. The system recommends
              focus areas based on your performance history.
            </p>
          </div>
        </section>
      </div>
      
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to ace your next interview?</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition">
          Create Your First Interview
        </button>
      </div>
    </div>
  );
};

export default HowItWorksPage; 