import { useRouter } from "next/router";

export default function UserId() {
  const router = useRouter();
  const id = router.query.id;
  return <div>Ini user ke {id}</div>;
}
