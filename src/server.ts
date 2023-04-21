import App from '@/app';
import AuthRoute from "@routes/auth.route";
import ProjectRoute from "@/routes/operations.route";


const app = new App([new AuthRoute(), new ProjectRoute()]);

app.listen();

