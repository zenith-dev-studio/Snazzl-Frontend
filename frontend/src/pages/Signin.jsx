import { SignIn } from "@clerk/clerk-react";

export default function AuthPage() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-[#2A85FF] flex items-center justify-center">
        <h1 className="text-white text-6xl font-bold">Snazzl</h1>
      </div>
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8">
          <div className="rounded-2xl shadow-md bg-white p-8">
            <SignIn
              path="/sign-in"
              routing="path"
              signUpUrl="/sign-up"
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-[#2A85FF] hover:bg-[#1a5dcc] text-white text-sm normal-case",
                  headerTitle: "hidden",
                  headerSubtitle: "text-gray-600",
                },
                variables: {
                  colorPrimary: "#2A85FF",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
