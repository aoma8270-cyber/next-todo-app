import Script from "next/script";

export default function Head() {
  return (
    <>
      <Script id="theme-init" strategy="beforeInteractive">
        {`(function () {
  try {
    var theme = localStorage.getItem('theme');
    var root = document.documentElement;
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === 'dark' || (!theme && prefersDark)) {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  } catch (e) {}
})();`}
      </Script>
    </>
  );
}
