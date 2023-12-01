import { useNavigate } from "react-router-dom";

export const useRouter = () => {
  const navigate = useNavigate();
  return (path: string) => navigate(path);
};
