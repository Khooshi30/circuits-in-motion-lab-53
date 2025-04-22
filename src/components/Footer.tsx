
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Circuits Lab</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              An interactive learning platform for understanding Kirchhoff's Laws and circuit analysis.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/kcl" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Kirchhoff's Current Law
                </Link>
              </li>
              <li>
                <Link to="/kvl" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Kirchhoff's Voltage Law
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Practice Problems
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Created to help students visualize and understand circuit laws through interactive simulations.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Circuits Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
