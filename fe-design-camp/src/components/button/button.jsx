import Link from "next/link";

export default function Button(props) {
  return (
    <Link
      href={props.route}
      className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80 hover:text-white"
    >
      {props.name}
    </Link>
  );
}
