import { Result, Button } from "antd";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you are looking for does not exist."
        extra={
          <Link to="/">
            <Button type="primary">Return to home page</Button>
          </Link>
        }
      />
    </div>
  );
}
