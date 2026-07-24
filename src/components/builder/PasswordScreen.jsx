export default function PasswordScreen({
  password,
  setPassword,
}) {
  return (
    <>
      <h1 className="mb-3 text-4xl font-bold text-white">
        Password Protection
      </h1>

      <p className="mb-8 text-gray-400">
        Set a password for your surprise website.
      </p>

      <input
        type="text"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none"
      />
    </>
  );
}