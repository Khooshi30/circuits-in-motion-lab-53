
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Master Circuit Analysis with{" "}
              <span className="text-blue-600 dark:text-blue-400">Kirchhoff's Laws</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Interactive visualizations and simulations to help you understand,
              practice, and master KCL and KVL concepts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/kcl">Start Learning KCL</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="rounded-full border-2"
              >
                <Link to="/kvl">Explore KVL</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Learn With Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Interactive Simulations" 
              description="Manipulate circuit components and see Kirchhoff's Laws in action with real-time validation."
              icon="✨"
            />
            <FeatureCard 
              title="Step-by-Step Explanations" 
              description="Clear, detailed breakdowns of each concept with visual aids and practical examples."
              icon="📚"
            />
            <FeatureCard 
              title="Practice Problems" 
              description="Apply your knowledge with guided practice problems and get instant feedback."
              icon="🧠"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Master Circuit Analysis?
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Start with our interactive modules and build your understanding from the ground up.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="default">
              <Link to="/kcl">Learn Kirchhoff's Current Law</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/kvl">Learn Kirchhoff's Voltage Law</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-700 dark:text-gray-300">{description}</p>
  </div>
);

export default Index;
