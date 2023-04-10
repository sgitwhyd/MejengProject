import Link from "next/link";

export default function ButtonWIcon(props) {
  return (
    <button className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80">
      <Link
        href={props.route}
        className="flex items-center justify-center gap-3"
      >
        {props.icon} {props.name}
      </Link>
    </button>
  );
}
