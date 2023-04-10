import Link from "next/link";

export default function Button(props) {
  return (
    <button className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80">
      <Link href={props.route}>{props.name}</Link>
    </button>
  );
}
