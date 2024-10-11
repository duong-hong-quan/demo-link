import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Function to detect the user's OS
    const detectOSAndRedirect = () => {
      const userAgent = navigator.userAgent;
      const alipayDeepLink =
        "alipayhk://platformapi/startapp?appId=2102020209380055";
      setTimeout(() => {
        if (window.location.href === alipayDeepLink) {
          if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            // Redirect to the App Store
            window.location.href =
              "https://apps.apple.com/us/app/alipayhk/id1210638245"; // Replace with actual link
          }
          // Check for Android
          else if (/Android/.test(userAgent)) {
            // Redirect to Google Play
            window.location.href =
              "https://play.google.com/store/apps/details?id=hk.alipay.wallet&hl=en-GB"; // Replace with actual link
          } else {
            // Fallback for unsupported OS
            window.location.href = "https://campaign.yas.io/yas_alipayhk_zh";
          }
        }
      }, 2000); // Adjust the timeout duration as needed
      // Check for iOS
    };

    // Attempt to open the AlipayHK app first

    // Set a timeout to check if the app is installed
    const timeout = setTimeout(detectOSAndRedirect, 1500);

    // Cleanup timeout on unmount
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <h1>Welcome to Our App!</h1>
      <p>If you have AlipayHK installed, you will be redirected shortly.</p>
      <p>If not, please download the app:</p>
      <a href="https://www.example.com/download-alipayhk">Download AlipayHK</a>
    </div>
  );
}

export default App;
