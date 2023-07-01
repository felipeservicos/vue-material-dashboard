import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import About from "@/pages/About.vue";


const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "PAC Learning Dashboard for make best decision in ML algorithms adoption",
        component: Dashboard,
      },
      {
        path: "user",
        name: "About, Docs and References",
        component: About,
      },
      
    ],
  },
];

export default routes;
