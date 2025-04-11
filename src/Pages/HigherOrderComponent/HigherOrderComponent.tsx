interface RequiredRole {
  [key: string]: string;
  admin: string;
  editor: string;
  viewer: string;
}
const userRequiredRole: RequiredRole = {
  admin: "admin",
  editor: "editor",
  viewer: "viewer",
};

interface WithRoleProps {
  [key: string]: string | number | boolean | undefined;
}

interface WrappedComponentType {
  (props: WithRoleProps): JSX.Element;
}

const WithRole = (
  WrappedComponent: WrappedComponentType,
  requiredRole: string
) => {
  return (props: WithRoleProps) => {
    const isRoleValid = userRequiredRole[requiredRole] === props.role;

    if (!isRoleValid) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default WithRole;
