import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [isRedirecting, setIsRedirecting] = useState(false);

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

      const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
      const isAndroid = /Android/.test(userAgent);

      // Function to handle iOS deep linking
      const handleIOSRedirect = () => {
        setIsRedirecting(true);

        // Create an iframe and hide it
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.style.width = "0";
        iframe.style.height = "0";
        iframe.src = alipayDeepLink;

        // Insert iframe to trigger deep link
        document.body.appendChild(iframe);

        // Set timeout for store fallback
        setTimeout(() => {
          iframe.remove();
          window.location.href = appStoreLink;
        }, 2000);
      };

      // Function to handle Android deep linking
      const handleAndroidRedirect = () => {
        setIsRedirecting(true);
        window.location.href = alipayDeepLink;

        setTimeout(() => {
          window.location.href = playStoreLink;
        }, 2000);
      };

      // Handle redirects based on OS
      if (isIOS) {
        handleIOSRedirect();
      } else if (isAndroid) {
        handleAndroidRedirect();
      } else {
        window.location.href = fallbackLink;
      }

      // Listen for visibility change
      const handleVisibilityChange = () => {
        if (document.hidden) {
          // App was successfully opened
          setIsRedirecting(false);
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    };

    // Start the detection and redirect process
    // Small delay to ensure everything is ready
    const initTimeout = setTimeout(() => {
      detectOSAndRedirect();
    }, 100);

    return () => {
      clearTimeout(initTimeout);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to Our App!</h1>
      {isRedirecting ? (
        <div className="space-y-4">
          <p>Opening AlipayHK...</p>
          <div className="animate-pulse">Please wait...</div>
        </div>
      ) : (
        <p>Initializing...</p>
      )}
    </div>
  );
}

export default App;
