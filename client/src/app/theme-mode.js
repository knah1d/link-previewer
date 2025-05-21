{
  "theme-mode": "script",
  "script": "(function() {\n  function getThemePreference() {\n    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {\n      return localStorage.getItem('theme');\n    }\n    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';\n  }\n\n  var theme = getThemePreference();\n\n  if (theme === 'dark') {\n    document.documentElement.classList.add('dark');\n  } else {\n    document.documentElement.classList.remove('dark');\n  }\n})();"
}
