import { LogOut } from "lucide-react";
import { Button } from "@components/ui/button";
import QuoteSlide from "./QuoteSlide";
const Auth = ({ user, LoginLink, LogoutLink, RegisterLink }) => {
  console.log(user);
  let content;

  content = (
    <div className="space-x-2 flex">
      {user ? (
        <>
          <QuoteSlide />
          <Button className={"drop-shadow-md text-white "} variant="ghost">
            <LogoutLink>
              <LogOut />
            </LogoutLink>
          </Button>
        </>
      ) : (
        <>
          <Button
            className={"drop-shadow-md bg-primary text-white"}
            variant="ghost"
          >
            <LoginLink postLoginRedirectURL="dashboard">
              {/* <DoorOpenIcon /> */}
              Sign In
            </LoginLink>
          </Button>

          <Button
            className={"drop-shadow-md bg-primary text-white"}
            variant="ghost"
          >
            <RegisterLink postLoginRedirectURL="/dashboard/saveusertodb">
              {/* <PowerIcon /> */}
              Sign Up
            </RegisterLink>
          </Button>
        </>
      )}
    </div>
  );
  return content;
};
export default Auth;
