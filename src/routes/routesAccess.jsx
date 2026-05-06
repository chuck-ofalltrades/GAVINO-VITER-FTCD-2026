import { devNavUrl } from "../functions/functions-general";
import CreatePassword from "../pages/access/CreatePassword";


export const routesAccess = [
    {
        path: `${devNavUrl}/create-password`,
        element: <CreatePassword />,
    },
];