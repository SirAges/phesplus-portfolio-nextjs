import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const page = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  console.log(user);
  return <div>hello user</div>;
};
export default page;
