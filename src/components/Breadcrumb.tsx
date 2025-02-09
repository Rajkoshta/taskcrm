
import { ChevronRight, HomeIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <HomeIcon className="w-4 h-4 mr-2" />
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          
          return (
            <li key={name}>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <Link
                  to={routeTo}
                  className={`ml-1 text-sm font-medium md:ml-2 ${
                    isLast
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {name.split("-").map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(" ")}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
