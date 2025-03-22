import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="container mx-auto py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
          Choose the plan that's right for your interview preparation needs
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Free Tier */}
        <Card className="border-2 border-gray-200 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xl">Free</CardTitle>
            <div className="mt-4 flex items-baseline text-gray-900">
              <span className="text-5xl font-extrabold tracking-tight">$0</span>
              <span className="ml-1 text-xl font-semibold">/month</span>
            </div>
            <CardDescription className="mt-5">
              Perfect for occasional interview practice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-base text-gray-700">
                  3 mock interviews per month
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-base text-gray-700">
                  Basic interview feedback
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-base text-gray-700">
                  Standard question library
                </p>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Start Free
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Tier */}
        <Card className="border-2 border-blue-500 relative flex flex-col justify-between">
          <div className="absolute top-0 right-0 -translate-y-1/2 px-4 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
            Most Popular
          </div>
          <CardHeader>
            <CardTitle className="text-xl">Pro</CardTitle>
            <div className="mt-4 flex items-baseline text-gray-900">
              <span className="text-5xl font-extrabold tracking-tight">$19</span>
              <span className="ml-1 text-xl font-semibold">/month</span>
            </div>
            <CardDescription className="mt-5">
              For serious job seekers who need regular practice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-base text-gray-700">
                  Unlimited mock interviews
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-base text-gray-700">
                  Detailed performance analytics
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-base text-gray-700">
                  Advanced question customization
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-base text-gray-700">
                  Progress tracking
                </p>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Upgrade to Pro
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Tier */}
        <Card className="border-2 border-gray-200 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xl">Enterprise</CardTitle>
            <div className="mt-4 flex items-baseline text-gray-900">
              <span className="text-5xl font-extrabold tracking-tight">$49</span>
              <span className="ml-1 text-xl font-semibold">/month</span>
            </div>
            <CardDescription className="mt-5">
              For teams and companies with advanced needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-base text-gray-700">
                  Everything in Pro
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-base text-gray-700">
                  Team management features
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-base text-gray-700">
                  Custom question libraries
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-base text-gray-700">
                  Priority support
                </p>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Contact Sales
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold mb-4">Need a custom solution?</h3>
        <p className="text-gray-500 mb-6 max-w-2xl mx-auto">
          We offer custom plans for organizations with specific requirements.
          Contact our sales team to learn more.
        </p>
        <Button variant="outline">Contact Us</Button>
      </div>
    </div>
  );
} 