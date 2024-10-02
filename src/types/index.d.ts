type TActiveLinkProps = {
  url: string;
  children: React.ReactNode;
};
type TMenuItem = {
  url: string;
  title: string;
  icon: React.ReactNode;
};
// User
type TCreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
avatar?: string;
  name?: string;
};
export { TMenuItem, TActiveLinkProps, TCreateUserParams };
