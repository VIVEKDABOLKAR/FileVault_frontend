import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import Home from "./page/home/HomePage.jsx";
import PdfOnlyForm from "./page/pdfOnly/PdfOnlyPage.jsx";
import TextPage from "./page/text/TextPage.jsx";
import HelpFaqPage from "./page/help/Help_FAQsPage.jsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/home',
        element: <Home />,
    },
    {
        path: '/pdf_only',
        element: <PdfOnlyForm />,
    },
    {
        path: '/text',
        element: <TextPage />,
    },
    {
        path: '/faqs',
        element: <HelpFaqPage />
    }
]);

export default router;