import useCustomNavigation, { RouteList } from "../hooks/Navigation/useCustomNavigation";

const Navigator = (item: keyof RouteList) => {
  const { navigate } = useCustomNavigation();

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };

  return handleClick(item);
};

export default Navigator;
