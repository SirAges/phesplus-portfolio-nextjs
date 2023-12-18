import {
  Briefcase,
  DoorOpenIcon,
  LogOut,
  PowerIcon,
  ShoppingCart,
} from "lucide-react";
import { Button, buttonVariants } from "@components/ui/button";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import QuoteSlide from "./QuoteSlide";
const Auth = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

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
            <LoginLink>
              {/* <DoorOpenIcon /> */}
              Sign In
            </LoginLink>
          </Button>

          <Button
            className={"drop-shadow-md bg-primary text-white"}
            variant="ghost"
          >
            <RegisterLink postLoginRedirectURL="/saveUserToDb">
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
