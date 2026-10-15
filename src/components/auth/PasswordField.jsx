import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PasswordField({
  label = "Password",
  value,
  onChange,
  placeholder = "Enter your password",
  autoComplete = "current-password",
  minLength,
  required = true,
  name = "password",
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {label && (
        <label htmlFor={name} className="text-sm font-bold text-slate-700">
          {label}
        </label>
      )}

      <div className="relative mt-2">
        <input
          id={name}
          name={name}
          required={required}
          minLength={minLength}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 pr-12 text-slate-900 caret-violet-600 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
        />

        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute right-2.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl text-slate-400 transition hover:bg-violet-50 hover:text-violet-600"
          aria-label={visible ? "Hide password" : "Show password"}
          title={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
        </button>
      </div>
    </div>
  );
}
