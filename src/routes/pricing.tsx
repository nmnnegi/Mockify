import React from "react";
import { Container } from "@/components/container";

const PricingPage = () => {
  return (
    <div className="py-12">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Flexible Pricing for All Needs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan to help you prepare for your next technical interview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Basic Plan */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">Free</h2>
              <div className="text-4xl font-bold mb-2">$0<span className="text-gray-500 text-lg font-normal">/month</span></div>
              <p className="text-gray-600">Perfect for getting started</p>
            </div>
            
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>3 interviews per month</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Basic feedback</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Standard question bank</span>
              </li>
              <li className="flex items-center text-gray-400">
                <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Advanced customization</span>
              </li>
              <li className="flex items-center text-gray-400">
                <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Performance analytics</span>
              </li>
            </ul>
            
            <a 
              href="/generate" 
              className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-center text-gray-800 font-medium rounded-md transition-colors"
            >
              Get Started
            </a>
          </div>
          
          {/* Pro Plan - Highlighted */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-500 flex flex-col relative transform md:scale-105 z-10">
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-medium">
              MOST POPULAR
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">Pro</h2>
              <div className="text-4xl font-bold mb-2">$19<span className="text-gray-500 text-lg font-normal">/month</span></div>
              <p className="text-gray-600">For serious interview preparation</p>
            </div>
            
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Unlimited interviews</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Detailed feedback</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Advanced question bank</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Role-specific interviews</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Basic performance analytics</span>
              </li>
            </ul>
            
            <a 
              href="/generate" 
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-center text-white font-medium rounded-md transition-colors"
            >
              Start Pro Trial
            </a>
          </div>
          
          {/* Enterprise Plan */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">Enterprise</h2>
              <div className="text-4xl font-bold mb-2">$49<span className="text-gray-500 text-lg font-normal">/month</span></div>
              <p className="text-gray-600">For teams and professionals</p>
            </div>
            
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Everything in Pro</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Company-specific questions</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Advanced analytics dashboard</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Interview history & progression</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Priority support</span>
              </li>
            </ul>
            
            <a 
              href="/generate" 
              className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-900 text-center text-white font-medium rounded-md transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-600">Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">How do I upgrade my plan?</h3>
              <p className="text-gray-600">You can upgrade your plan at any time from your account settings. The new pricing will be prorated for the remainder of your billing cycle.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Do you offer discounts for students?</h3>
              <p className="text-gray-600">Yes! We offer a 50% discount for students with a valid .edu email address. Contact our support team to get your discount.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and Apple Pay.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PricingPage; 