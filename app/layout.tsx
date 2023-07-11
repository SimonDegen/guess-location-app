import AuthCheck from "@/components/AuthCheck";
import AuthProvider from "./AuthProvider";
import { NavMenu } from "./NavMenu";
import "./globals.css";

export const metadata = {
  title: "Secret Game",
  description: "Play a game with your friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <NavMenu />
          <AuthCheck>{children}</AuthCheck>
        </body>
      </html>
    </AuthProvider>
  );
}
