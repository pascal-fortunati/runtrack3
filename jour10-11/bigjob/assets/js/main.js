import { initStorage, listUsers, loadFromAssets, restoreDirHandle } from "./storage.js";
import { mountApp, registerRoute, startRouter, navigate } from "./router.js";
import { currentUser } from "./auth.js";
import { Login } from "./components/login.js";
import { Register } from "./components/register.js";
import { Dashboard } from "./components/dashboard.js";
import { Moderator } from "./components/moderator.js";
import { Admin } from "./components/admin.js";
import { ConnectDB } from "./components/connectdb.js";

await initStorage();
await restoreDirHandle();
if ((listUsers()?.length ?? 0) === 0) {
  await loadFromAssets();
  try { sessionStorage.setItem("lap_session", JSON.stringify({ userId: null, isLoggedIn: false })); } catch {}
}
mountApp();
registerRoute("/", Dashboard, { auth: true });
registerRoute("/login", Login);
registerRoute("/register", Register);
registerRoute("/dashboard", Dashboard, { auth: true, roles: ["user"] });
registerRoute("/moderator", Moderator, { auth: true, roles: ["moderator"] });
registerRoute("/admin", Admin, { auth: true, roles: ["admin"] });
registerRoute("/connectdb", ConnectDB);
startRouter();

// Redirection en fonction de l'état de connexion et du rôle de l'utilisateur
const u = currentUser();
if (!u) navigate("/login");
else if (u.role === "admin") navigate("/admin");
else if (u.role === "moderator") navigate("/moderator");
else navigate("/dashboard");
