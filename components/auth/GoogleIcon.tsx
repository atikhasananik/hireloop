// lucide 1.x has no brand icons, so the Google "G" is an inline SVG path set
// shared by the auth forms (signup / signin "Continue with Google")
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="size-4">
    <path
      fill="#EA4335"
      d="M12 5.04c1.75 0 3.32.6 4.56 1.8l3.4-3.4C17.8 1.4 15.15.36 12 .36 7.32.36 3.3 3.03 1.38 6.9l3.96 3.07C6.3 7.13 8.93 5.04 12 5.04Z"
    />
    <path
      fill="#4285F4"
      d="M23.64 12.26c0-.79-.07-1.55-.2-2.26H12v4.51h6.5a5.55 5.55 0 0 1-2.4 3.64l3.85 2.98c2.25-2.08 3.69-5.15 3.69-8.87Z"
    />
    <path
      fill="#FBBC05"
      d="M5.34 14.03a6.63 6.63 0 0 1 0-4.06L1.38 6.9a11.26 11.26 0 0 0 0 10.2l3.96-3.07Z"
    />
    <path
      fill="#34A853"
      d="M12 23.64c3.15 0 5.8-1.04 7.74-2.83l-3.85-2.98c-1.07.72-2.44 1.14-3.89 1.14-3.07 0-5.7-2.09-6.62-4.92l-3.96 3.07c1.92 3.87 5.94 6.52 10.58 6.52Z"
    />
  </svg>
)

export default GoogleIcon
