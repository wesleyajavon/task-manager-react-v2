import { useUser } from "../hooks/useUser";

const Footer = () => {
  const user = useUser();

  return (
    <footer className="mt-10 text-center py-4 text-sm text-gray-600 dark:text-gray-400 border-t dark:border-gray-700">
      {user?.email
        ? `Logged in as: ${user.email}`
        : "Not logged in"}
    </footer>
  );
};

export default Footer;
