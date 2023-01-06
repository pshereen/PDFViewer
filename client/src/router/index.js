import { createRouter,createWebHistory} from 'vue-router'
import  OpenFolder from "@/components/FileSystem"
import  ViewPDF from "@/components/PDFMainViewer"

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
          {
            path: "/",
            name: "OpenFolder",
            component: OpenFolder
          },
          {
            path: "/viewpdf",
            name: "ViewPDF",
            component: ViewPDF
          },
 ]
})