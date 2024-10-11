import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const detectOSAndRedirect = () => {
      const userAgent = navigator.userAgent;
      const alipayDeepLink =
        "alipayhk://platformapi/startapp?appId=2102020209380055";
      const appStoreLink =
        "https://apps.apple.com/us/app/alipayhk/id1210638245";
      const playStoreLink =
        "https://play.google.com/store/apps/details?id=hk.alipay.wallet&hl=en-GB";
      const fallbackLink = "https://campaign.yas.io/yas_alipayhk_zh";

      // Try to open the app first
      const openApp = () => {
        // Create and click a hidden anchor element for the deep link
        const linkElement = document.createElement("a");
        linkElement.href = alipayDeepLink;
        document.body.appendChild(linkElement);
        linkElement.click();
        document.body.removeChild(linkElement);
      };

      // Function to handle store redirects
      const redirectToStore = () => {
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          window.location.href = appStoreLink;
        } else if (/Android/.test(userAgent)) {
          window.location.href = playStoreLink;
        } else {
          window.location.href = fallbackLink;
        }
      };

      // First, try to open the app
      openApp();

      // Set up detection for whether app was successfully opened
      const timeoutDuration = 2000; // 2 seconds
      const appOpenedTimeout = setTimeout(() => {
        // If we're still here after the timeout, the app probably isn't installed
        redirectToStore();
      }, timeoutDuration);

      // Listen for visibility change to clear timeout if app is opened
      const handleVisibilityChange = () => {
        if (document.hidden) {
          clearTimeout(appOpenedTimeout);
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Cleanup function
      return () => {
        clearTimeout(appOpenedTimeout);
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    };

    // Start the detection and redirect process
    detectOSAndRedirect();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to Our App!</h1>
      <p className="mb-2">
        If you have AlipayHK installed, you will be redirected shortly.
      </p>
      <p className="mb-4">If not, you'll be redirected to download the app.</p>
      <div className="animate-pulse">Loading...</div>
    </div>
  );
}

export default App;
