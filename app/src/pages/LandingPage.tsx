import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export function LandingPage() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}