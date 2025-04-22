import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-6 h-28 w-28 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <span className="text-4xl">🔌</span>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Oops! There's a break in this circuit. The page you're looking for doesn't exist.
        </p>
        <Button asChild className="rounded-full" size="lg">
          <Link to="/">Return to Home</Link>
        </Button>
        <div className="mt-12 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <p className="text-blue-800 dark:text-blue-300">
            Why not try exploring our circuit learning modules?
          </p>
          <div className="flex gap-4 justify-center mt-4">
            <Button asChild variant="outline" size="sm">
              <Link to="/kcl">Learn KCL</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/kvl">Learn KVL</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
