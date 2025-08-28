import { Result, Button } from "antd";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#ecf0f2] dark:bg-[#111827]">
      <Result
        status="404"
        title={<span className="text-gray-900 dark:text-white">404</span>}
        subTitle={
          <span className="text-gray-700 dark:text-gray-300">
            Sorry, the page you are looking for does not exist.
          </span>
        }
        extra={
          <Link to="/">
            <Button
              type="primary"
              className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white transition-colors duration-300"
            >
              Return to home page
            </Button>
          </Link>
        }
      />
    </div>
  );
}
