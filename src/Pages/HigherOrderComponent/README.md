### HIGHER ORDER FUNCTION BASED ON ROLES

1. App.js

```ts
import React, { useState, useEffect } from "react";
import "./style.css";
import Editor from "./Editor";
import Admin from "./Admin";
import Viewer from "./Viewer";
// Sample user roles (this would typically come from your app's state or context)
const userRoles = {
  editor: Editor,
  admin: Admin,
  viewer: Viewer,
};

export default function App() {
  const [role, setRole] = useState("editor");

  useEffect(() => {
    let timer = setTimeout(() => {
      setRole("admin");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const ComponentToRender = userRoles[role];

  return (
    <div>
      <h1>My Application</h1>

      {<ComponentToRender role={role} />}
    </div>
  );
}
```

2. Higher.js

```ts
import React from "react";

// Higher-Order Component to check roles
const withRole = (WrappedComponent) => {
  return (props) => {
    // Render the wrapped component if the role matches
    return <WrappedComponent {...props} />;
  };
};

export default withRole;
```

3. Admin.js

```ts
import React from "react";

import withRole from "./Higher";
const AdminPanel = () => {
  return <div>Welcome to the Admin Panel!</div>;
};

const Admin = withRole(AdminPanel);

export default Admin;
```

4. Viewer.js

```ts
import React from "react";

import withRole from "./Higher";
const ViewerDashboard = () => {
  return <div>Welcome to the Viewer Dashboard!</div>;
};

const Viewer = withRole(ViewerDashboard);

export default Viewer;
```

5. Editor.js

```ts
import React from "react";

import withRole from "./Higher";
const EditorDashboard = () => {
  return <div>Welcome to the Editor Dashboard!</div>;
};

const Editor = withRole(EditorDashboard);

export default Editor;
```
